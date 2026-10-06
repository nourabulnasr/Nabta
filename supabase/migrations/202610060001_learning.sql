-- Run once in the Supabase SQL editor. No seeded sales or invented lesson content.
begin;
create table public.nabta_admins (user_id uuid primary key references auth.users on delete cascade);
alter table public.nabta_admins enable row level security;
revoke all on public.nabta_admins from anon, authenticated;

create function public.nabta_is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.nabta_admins where user_id=auth.uid())
$$;
revoke all on function public.nabta_is_admin() from public;
grant execute on function public.nabta_is_admin() to authenticated;

create table public.nabta_lessons (
 id uuid primary key default gen_random_uuid(),
 position integer unique not null check(position between 1 and 20),
 title_en text not null check(length(title_en) between 1 and 160),
 title_ar text not null check(length(title_ar) between 1 and 160),
 duration_minutes integer not null check(duration_minutes between 1 and 240),
 published boolean not null default false,
 created_at timestamptz not null default now()
);
create table public.nabta_media (
 lesson_id uuid primary key references public.nabta_lessons on delete cascade,
 provider text not null default 'supabase' check(provider in ('supabase','r2')),
 object_path text unique not null check(object_path ~ '^[a-zA-Z0-9_/-]+[.]mp4$' and object_path not like '%..%'),
 captions_path text check(captions_path ~ '^[a-zA-Z0-9_/-]+[.]vtt$' and captions_path not like '%..%')
);
create table public.nabta_orders (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users,
 lesson_id uuid references public.nabta_lessons,
 amount_egp integer not null check(amount_egp in (250,4500)),
 reference text not null check(length(reference) between 6 and 100),
 status text not null default 'pending' check(status in ('pending','approved','rejected','revoked')),
 created_at timestamptz not null default now(),
 reviewed_at timestamptz,
 reviewed_by uuid references auth.users,
 check((lesson_id is null and amount_egp=4500) or (lesson_id is not null and amount_egp=250))
);
create unique index nabta_reference_unique on public.nabta_orders(lower(reference));
create unique index nabta_pending_single on public.nabta_orders(user_id,lesson_id) where status='pending' and lesson_id is not null;
create unique index nabta_pending_course on public.nabta_orders(user_id) where status='pending' and lesson_id is null;
create index nabta_orders_user on public.nabta_orders(user_id);
create table public.nabta_access (
 order_id uuid not null references public.nabta_orders,
 user_id uuid not null references auth.users,
 lesson_id uuid not null references public.nabta_lessons,
 primary key(order_id, lesson_id)
);
create index nabta_access_user_lesson on public.nabta_access(user_id,lesson_id);
create table public.nabta_audit (
 id bigint generated always as identity primary key,
 actor uuid not null references auth.users, order_id uuid references public.nabta_orders,
 action text not null, created_at timestamptz not null default now()
);
alter table public.nabta_lessons enable row level security;
alter table public.nabta_media enable row level security;
alter table public.nabta_orders enable row level security;
alter table public.nabta_access enable row level security;
alter table public.nabta_audit enable row level security;
revoke all on public.nabta_lessons,public.nabta_media,public.nabta_orders,public.nabta_access,public.nabta_audit from anon,authenticated;
grant select on public.nabta_lessons,public.nabta_orders,public.nabta_access to authenticated;
create policy lesson_read on public.nabta_lessons for select to authenticated using(published or public.nabta_is_admin());
create policy order_read on public.nabta_orders for select to authenticated using(user_id=auth.uid() or (public.nabta_is_admin() and auth.jwt()->>'aal'='aal2'));
create policy access_read on public.nabta_access for select to authenticated using(user_id=auth.uid());

create function public.nabta_request_order(p_lesson uuid, p_reference text) returns uuid
language plpgsql security definer set search_path='' as $$
declare result uuid; price integer;
begin
 if auth.uid() is null then raise exception 'Sign in required'; end if;
 if p_reference is null or p_reference !~ '^[a-zA-Z0-9 _/-]{6,100}$' then raise exception 'Invalid payment reference'; end if;
 -- Serialize each student's requests, including limits and duplicate ownership checks.
 perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text,0));
 if (select count(*) from public.nabta_orders where user_id=auth.uid() and created_at>now()-interval '1 day')>=10 then raise exception 'Daily request limit reached'; end if;
 if p_lesson is null then
  if (select count(*) from public.nabta_lessons l join public.nabta_media m on m.lesson_id=l.id where l.published)<>20 then raise exception 'Complete course is not available'; end if;
  if (select count(distinct lesson_id) from public.nabta_access where user_id=auth.uid())=20 then raise exception 'You already have all lessons'; end if;
  if exists(select 1 from public.nabta_orders where user_id=auth.uid() and status='pending') then raise exception 'Resolve existing payment requests first'; end if;
  price:=4500;
 else
  if not exists(select 1 from public.nabta_lessons l join public.nabta_media m on m.lesson_id=l.id where l.id=p_lesson and l.published) then raise exception 'Lesson is not available'; end if;
  if exists(select 1 from public.nabta_access where user_id=auth.uid() and lesson_id=p_lesson) then raise exception 'You already have access'; end if;
  if exists(select 1 from public.nabta_orders where user_id=auth.uid() and lesson_id is null and status='pending') then raise exception 'Course payment is already under review'; end if;
  price:=250;
 end if;
 if p_lesson is null and exists(select 1 from public.nabta_orders where user_id=auth.uid() and lesson_id is null and status='approved') then raise exception 'You already have course access'; end if;
 insert into public.nabta_orders(user_id,lesson_id,amount_egp,reference) values(auth.uid(),p_lesson,price,trim(p_reference)) returning id into result;
 return result;
end $$;

create function public.nabta_review_order(p_order uuid, p_decision text) returns void
language plpgsql security definer set search_path='' as $$
declare o public.nabta_orders;
begin
 if not public.nabta_is_admin() or coalesce(auth.jwt()->>'aal','')<>'aal2' then raise exception 'Owner MFA required'; end if;
 select * into o from public.nabta_orders where id=p_order for update;
 if not found then raise exception 'Order not found'; end if;
 if p_decision not in ('approved','rejected','revoked') then raise exception 'Invalid decision'; end if;
 if o.status=p_decision then return; end if;
 if not ((o.status='pending' and p_decision in ('approved','rejected')) or (o.status='approved' and p_decision='revoked')) then raise exception 'Invalid status transition'; end if;
 if p_decision='approved' then
  if o.lesson_id is null then
   if (select count(*) from public.nabta_lessons l join public.nabta_media m on m.lesson_id=l.id where l.published)<>20 then raise exception 'Complete course is not available'; end if;
   insert into public.nabta_access(order_id,user_id,lesson_id) select o.id,o.user_id,id from public.nabta_lessons where published;
  else
   if not exists(select 1 from public.nabta_lessons where id=o.lesson_id and published) then raise exception 'Lesson is not available'; end if;
   insert into public.nabta_access values(o.id,o.user_id,o.lesson_id);
  end if;
 elsif p_decision='revoked' then
  delete from public.nabta_access where order_id=o.id;
 end if;
 update public.nabta_orders set status=p_decision, reviewed_at=now(),reviewed_by=auth.uid() where id=o.id;
 insert into public.nabta_audit(actor,order_id,action) values(auth.uid(),o.id,p_decision);
end $$;

create function public.nabta_playback_asset(p_lesson uuid) returns table(object_path text,captions_path text,provider text)
language sql stable security definer set search_path='' as $$
 select m.object_path,m.captions_path,m.provider from public.nabta_media m
 join public.nabta_lessons l on l.id=m.lesson_id
 where l.id=p_lesson and l.published and exists(select 1 from public.nabta_access a where a.user_id=auth.uid() and a.lesson_id=l.id)
$$;

create function public.nabta_save_lesson(p_position integer,p_en text,p_ar text,p_minutes integer,p_path text,p_captions text,p_published boolean,p_provider text default 'supabase') returns void
language plpgsql security definer set search_path='' as $$
declare lid uuid;
begin
 if not public.nabta_is_admin() or coalesce(auth.jwt()->>'aal','')<>'aal2' then raise exception 'Owner MFA required'; end if;
 if p_provider not in ('supabase','r2') then raise exception 'Invalid storage'; end if;
 -- R2 existence is checked by the authenticated owner API before publishing.
 if p_provider='supabase' and p_published and not exists(select 1 from storage.objects where bucket_id='nabta-recordings' and name=p_path) then raise exception 'Upload recording before publishing'; end if;
 if p_provider='supabase' and p_captions is not null and not exists(select 1 from storage.objects where bucket_id='nabta-recordings' and name=p_captions) then raise exception 'Caption file missing'; end if;
 insert into public.nabta_lessons(position,title_en,title_ar,duration_minutes,published)
 values(p_position,trim(p_en),trim(p_ar),p_minutes,p_published)
 on conflict(position) do update set title_en=excluded.title_en,title_ar=excluded.title_ar,duration_minutes=excluded.duration_minutes,published=excluded.published
 returning id into lid;
 insert into public.nabta_media(lesson_id,object_path,captions_path,provider) values(lid,p_path,p_captions,p_provider)
 on conflict(lesson_id) do update set object_path=excluded.object_path,captions_path=excluded.captions_path,provider=excluded.provider;
 insert into public.nabta_audit(actor,action) values(auth.uid(),'save lesson '||p_position);
end $$;

revoke all on function public.nabta_request_order(uuid,text),public.nabta_review_order(uuid,text),public.nabta_playback_asset(uuid),public.nabta_save_lesson(integer,text,text,integer,text,text,boolean,text) from public;
grant execute on function public.nabta_request_order(uuid,text),public.nabta_review_order(uuid,text),public.nabta_playback_asset(uuid),public.nabta_save_lesson(integer,text,text,integer,text,text,boolean,text) to authenticated;
-- Bucket stays private. No student storage SELECT policy: only the server can sign after authorization.
insert into storage.buckets(id,name,public,allowed_mime_types) values('nabta-recordings','nabta-recordings',false,array['video/mp4','text/vtt'])
on conflict(id) do nothing;
commit;

