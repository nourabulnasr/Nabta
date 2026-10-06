# Activate the student library
Prepared 6 October 2026. This is an activation runbook, not a claim that accounts or payments are already working.

## Owner actions
1. Create/sign into an owned Supabase Free project. Keep billing on the chosen free plan.
2. Connect a legitimate SMTP sender for sign-in codes. Supabase's default sender is limited to project-team addresses and is not a public production email service. Do not send credentials in chat.
3. Create a Cloudflare Turnstile widget for nabta.nourabulnasr.workers.dev; enable its secret in Supabase Auth CAPTCHA. Put the public site key in the Worker TURNSTILE_SITE_KEY setting. No public CAPTCHA bypass is implemented.
4. Choose private recording storage after seeing actual file sizes. Supabase Free permits files up to 50 MB and has small storage/egress allowances; typical 1–2 hour videos need another option. R2 support is ready, but its free allowance is not an unlimited or hard-capped free video service. Owner must authorize any account/billing step. Nothing paid was enabled.
5. Keep source recordings and database backups in your own protected storage. Supply real lesson titles, durations and optional Arabic VTT captions.

## Configure with Codex after account access
- Run supabase/migrations/202610060001_learning.sql once in the new project's SQL editor. This creates tables, RLS, controlled functions and a private bucket. Do not rerun blindly or apply it to an unrelated database.
- Enable email sign-in with confirmation. Set the Magic Link and Confirm Signup email templates to show `{{ .Token }}`; this website uses numeric email codes, not magic-link navigation. Keep OTP expiry short and retain provider rate limits.
- Set Auth Site URL to the production origin. Do not configure wildcard redirects. Enable TOTP MFA.
- Configure Turnstile in Supabase and test valid, missing, expired and reused tokens. Never turn CAPTCHA off to make a test succeed.
- Save SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY and SUPABASE_SERVICE_ROLE_KEY as Worker runtime secrets/settings. Never put them in next.config env, NEXT_PUBLIC variables, Git or screenshots.
- Keep LEARNING_ENABLED=false until controlled activation testing. The public library is a preparation notice while disabled.
- Supabase media: private bucket nabta-recordings, no public read policies.
- R2 media: create a private Standard bucket, keep r2.dev/public domain disabled, scoped bucket read credential in R2_ACCESS_KEY_ID/R2_SECRET_ACCESS_KEY; set R2_ACCOUNT_ID/R2_BUCKET and RECORDING_STORAGE=r2. Upload original MP4s through the owner dashboard, not through the public website. Do not add public CORS access.
- Keep database and provider backups outside the public repository. Before launch, export and restore the database in an isolated project and verify orders, entitlements and media.

## Owner enrollment and publication
After the owner has verified the account email, run this only as the database administrator:
```sql
insert into public.nabta_admins(user_id)
select id from auth.users where lower(email)='nourabulnasr@gmail.com' and email_confirmed_at is not null
on conflict do nothing;
```
Only this explicit table grants owner rights; profile data cannot grant them.
Sign in to /en/learn, enroll an authenticator, and retain its secret safely in a password manager.
Payment approval, revocation and lesson publication require an aal2 session.
If the authenticator is lost, verify ownership out of band and use Supabase's admin recovery tools; no public MFA bypass exists.

Upload files to private storage first. Use names such as course/lesson-01.mp4.
Use Owner workspace to save bilingual title, lesson number 1–20, actual minutes, MP4 path and optional Arabic VTT path.
Publishing checks file existence. R2 existence is checked by the owner API; Supabase also checks storage.objects in SQL.
Do not replace an existing lesson number with unrelated content after selling access.

## Payment operation
Recordings and live sessions are separate purchases.
One recording costs EGP250; the 20-recording bundle costs EGP4,500 and opens only when all 20 are published.
Students submit an InstaPay transaction reference. Requests do not prove payment.
Verify the actual received amount and reference independently in your InstaPay history; approve only after settlement.
One approval grants only that account's lesson(s). Repeat approval is idempotent.
Revoking an order removes only its entitlements and preserves any access from another legitimate order.
Rejected/revoked orders cannot simply be approved again; handle corrections deliberately rather than fabricating another transfer.
The page shows account IDs and transaction references, no payment-card data.
The owner and student lists load 50 orders at a time with older-page controls.
Do not assume email notifications of payment requests exist: review the owner workspace.

## Required connected acceptance test
With two owner-authorized student test accounts and one private test MP4:
- Email delivery, expiry, invalid code, CAPTCHA failure, logout and token refresh.
- Owner cannot review until MFA; ordinary students cannot read owner queue or publish.
- Published lesson appears; unpublished one cannot be purchased.
- Student A requests one lesson. Owner verifies the agreed test fixture and approves.
- A plays and seeks; B and signed-out browser receive denial, even with A's lesson URL.
- Direct bucket URLs do not work; no storage credentials or signed media URL appear in HTML/client assets.
- Duplicate reference and pending requests are rejected; repeated approval grants no duplicate access.
- Full-course gate stays closed before 20 real lessons. Test bundle permissions in an isolated project, never publish invented lessons to production.
- Revocation denies new playback/range requests; already buffered content cannot be recalled.
- Arabic/mobile keyboard controls, captions and actual file playback.
- Remove test orders/accounts through a reviewed cleanup; retain any real financial records.
- Activate publicly only after these checks. Source/database simulation alone is not end-to-end proof.

## Protection limits
The API verifies the session and entitlement on every playback/seek request and streams private media without exposing storage URLs.
Hidden download controls and an email watermark are deterrents. A browser can still capture media, and native full-screen video may hide the overlay. No DRM or impossible screen-recording guarantee is advertised.

## Official references checked 6 October 2026
- https://supabase.com/docs/guides/auth/auth-smtp
- https://supabase.com/docs/guides/storage/uploads/file-limits
- https://developers.cloudflare.com/r2/pricing/
- https://developers.cloudflare.com/r2/examples/aws/aws4fetch/


## Email setup without purchasing a domain
A possible low-volume route to investigate is the owner's existing Gmail account, if Google offers an app password for that account. Supabase accepts custom SMTP credentials; a dedicated app password must be entered directly in the provider settings, never the normal Google password or a chat message. This route is not configured or verified yet.

Google requires two-step verification for app passwords, may withhold them for some accounts, and prefers OAuth when an application supports it. Changing the main Google password revokes existing app passwords. Keep production sign-in closed until real delivery and rate limits are checked. A separate transactional sender can replace this later.

Sources: [Supabase custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [Google app-password requirements](https://support.google.com/accounts/answer/185833?hl=en).
