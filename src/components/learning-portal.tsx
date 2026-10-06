"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Locale } from "@/content";
import { SignInChallenge } from "./sign-in-challenge";
import { instaPayUrl } from "@/lib/business-links";
type Lesson = { id:string; position:number; title_en:string; title_ar:string; duration_minutes:number };
type Order = { id:string; lesson_id:string|null; user_id:string; amount_egp:number; reference:string; status:string };
type Session = { email:string; admin:boolean; mfa:boolean };
export function LearningPortal({locale,enabled,siteKey}:{locale:Locale;enabled:boolean;siteKey:string}) {
 const ar=locale==="ar", t=(en:string,arabic:string)=>ar?arabic:en;
 const [captchaToken,setCaptchaToken]=useState(""),[challengeVersion,setChallengeVersion]=useState(0);
 const [session,setSession]=useState<Session|null>(null), [loading,setLoading]=useState(enabled), [busy,setBusy]=useState(false);
 const [error,setError]=useState(""),[message,setMessage]=useState(""),[email,setEmail]=useState(""),[sent,setSent]=useState(false);
 const [lessons,setLessons]=useState<Lesson[]>([]),[access,setAccess]=useState<string[]>([]),[orders,setOrders]=useState<Order[]>([]),[review,setReview]=useState<Order[]>([]);
 const [moreOrders,setMoreOrders]=useState(false),[moreReview,setMoreReview]=useState(false);
 const [selected,setSelected]=useState<string|null|undefined>(undefined),[watch,setWatch]=useState<Lesson|null>(null);
 const [factor,setFactor]=useState<{factorId:string;secret?:string}|null>(null);
 async function api(action:string,body?:Record<string,unknown>) {
  const r=await fetch("/api/learning/"+action,body?{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}:{cache:"no-store"});
  const data=await r.json(); if(!r.ok)throw new Error(ar?"تعذّر إكمال الطلب. راجع البيانات أو حاول لاحقًا.":data.error); return data;
 }
 const refresh=useCallback(async()=>{
  try {
   const r=await fetch("/api/learning/session",{cache:"no-store"});
   if(r.status===401){setSession(null);return;}
   if(!r.ok)throw new Error(locale==="ar"?"المكتبة غير متاحة مؤقتًا.":"Library temporarily unavailable.");
   const s=await r.json();setSession(s);
   const results=await Promise.all(["library","orders",...(s.admin&&s.mfa?["admin"]:[])].map(a=>fetch("/api/learning/"+a,{cache:"no-store"})));
   if(results.some(r=>!r.ok))throw new Error(locale==="ar"?"تعذّر تحميل المكتبة.":"Unable to load your library.");
   const [library,own,owner]=await Promise.all(results.map(r=>r.json()));setLessons(library.lessons);setAccess(library.access);setOrders(own.orders);setReview(owner?.orders??[]);setMoreOrders(own.more);setMoreReview(owner?.more??false);
  }catch(e){setError((e as Error).message);}finally{setLoading(false);}
 },[locale]);
 useEffect(()=>{if(enabled)void Promise.resolve().then(refresh);},[enabled,refresh]);
 async function sendCode(){
  if(!captchaToken)throw new Error(t("Complete the human verification first.","كمّل التحقق من الاستخدام البشري الأول."));
  try { await api("login",{email,captchaToken}); } finally { setCaptchaToken("");setChallengeVersion(v=>v+1); }
 }
 async function run(work:()=>Promise<void>){setBusy(true);setError("");setMessage("");try{await work();}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 const submit=(work:(d:FormData)=>Promise<void>)=>(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const d=new FormData(e.currentTarget);void run(()=>work(d));};
 async function older(owner:boolean){await run(async()=>{const current=owner?review:orders;const data=await api((owner?"admin":"orders")+"?offset="+current.length);const unique=[...current,...data.orders].filter((o,i,a)=>a.findIndex(x=>x.id===o.id)===i);if(owner){setReview(unique);setMoreReview(data.more);}else{setOrders(unique);setMoreOrders(data.more);}});}
 const status=(s:string)=>ar?({pending:"قيد المراجعة",approved:"تم التفعيل",rejected:"مرفوض",revoked:"تم إلغاء الوصول"}[s]??s):s;
 if(!enabled)return <div className="portal-notice"><h2>{t("Recordings are in preparation","التسجيلات قيد الإعداد")}</h2><p>{t("The library will open when lessons are ready. We are not collecting recorded-course payments yet.","مكتبة الطالب هتفتح لما الدروس تكون جاهزة. مفيش تحصيل مدفوعات للكورس المسجل حاليًا.")}</p><a href="https://wa.me/201069046666">{t("Ask about tutoring","اسأل عن الدروس")}</a></div>;
 if(loading)return <p role="status">{t("Loading your library…","بنحمّل مكتبتك…")}</p>;
 return <>
 {error&&<p role="alert" className="portal-error">{error} <button onClick={()=>void refresh()}>{t("Retry","حاول تاني")}</button></p>}
 {message&&<p role="status" className="portal-notice">{message}</p>}
 {!session?<form className="portal-form" onSubmit={submit(async d=>{if(sent){await api("verify",{email,code:d.get("code")});await refresh();}else{await sendCode();setSent(true);}})}>
  <h2>{t("Sign in with your email","ادخل ببريدك الإلكتروني")}</h2><p>{t("We’ll send a one-time code. No password to remember.","هنبعتلك كود دخول لمرة واحدة، من غير كلمة مرور.")}</p>
  <label>{t("Email","البريد الإلكتروني")}<input type="email" required autoComplete="email" maxLength={254} value={email} onChange={e=>{setEmail(e.target.value);setSent(false);}}/></label>
  {sent&&<label>{t("Email code","كود الدخول")}<input name="code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6,8}" minLength={6} maxLength={8} required/></label>}
  <SignInChallenge key={challengeVersion} siteKey={siteKey} onToken={setCaptchaToken} locale={locale}/>
  <button disabled={busy||(!sent&&!captchaToken)}>{busy?t("Please wait…","لحظة…"):sent?t("Sign in","دخول"):t("Send code","ابعت الكود")}</button>
  {sent&&<button type="button" disabled={busy||!captchaToken} onClick={()=>void run(async()=>{await sendCode();setMessage(t("Check your inbox and spam for a new code.","راجع البريد والرسائل غير المرغوب فيها للكود الجديد."));})}>{t("Resend code","إعادة إرسال الكود")}</button>}
  <p>{t("Under 18? Involve your parent or guardian before purchasing.","لو أقل من ١٨ سنة، خلي ولي أمرك يشاركك قبل الشراء.")} <a href={`/${locale}/terms`}>{t("Terms","الشروط")}</a> · <a href={`/${locale}/privacy`}>{t("Privacy","الخصوصية")}</a></p>
 </form>:<>
 <div className="portal-toolbar"><span>{session.email}</span><button disabled={busy} onClick={()=>void run(async()=>{await api("logout",{});setSession(null);setWatch(null);setReview([]);setAccess([]);setOrders([]);})}>{t("Sign out","خروج")}</button></div>
 <section><h2>{t("Recorded lessons","الدروس المسجلة")}</h2><p>{t("EGP 250 per recording, with lifetime access. Live tutoring is a separate purchase.","٢٥٠ جنيه للتسجيل مع وصول دائم. الدروس المباشرة شراء منفصل.")}</p>
 {!lessons.length&&<p className="portal-notice">{t("No recordings published yet. Please don’t send a course payment.","مفيش تسجيلات منشورة لسه. من فضلك ما تبعتش مدفوعات للكورس.")}</p>}
 <ol className="lesson-list">{lessons.map(l=><li key={l.id}><div><h3>{ar?l.title_ar:l.title_en}</h3><p>{l.duration_minutes} {t("minutes","دقيقة")}</p></div>{access.includes(l.id)?<button onClick={()=>setWatch(l)}>{t("Watch lesson","شاهد الدرس")}</button>:<button onClick={()=>setSelected(l.id)}>{t("Purchase • EGP 250","شراء • ٢٥٠ جنيه")}</button>}</li>)}</ol>
 {lessons.length===20&&!orders.some(o=>o.lesson_id===null&&o.status==="approved")&&<button onClick={()=>setSelected(null)}>{t("Complete course • EGP 4,500","الكورس كامل • ٤٥٠٠ جنيه")}</button>}
 </section>
 {selected!==undefined&&<section className="portal-notice"><h2>{t("Submit your transfer for review","ابعت التحويل للمراجعة")}</h2><p>{selected===null?t("Full course: EGP 4,500","الكورس كامل: ٤٥٠٠ جنيه"):t("One recording: EGP 250","تسجيل واحد: ٢٥٠ جنيه")}</p><p>{t("Check the recipient in InstaPay before confirming. Enter the transaction reference after transferring. Access starts after Nour verifies payment; it is not instant.","راجع المستلم في إنستاباي قبل التأكيد. بعد التحويل اكتب رقم العملية. الوصول بيتفعّل بعد مراجعة نور للدفع، مش فوريًا.")}</p>
 <a href={instaPayUrl} target="_blank" rel="noreferrer">{t("Open InstaPay","افتح إنستاباي")}</a>
 <form className="portal-form" onSubmit={submit(async d=>{await api("order",{lesson:selected,reference:d.get("reference")});setSelected(undefined);await refresh();setMessage(t("Request saved for review.","تم حفظ الطلب للمراجعة."));})}>
 <label>{t("Transaction reference","رقم عملية التحويل")}<input name="reference" required minLength={6} maxLength={100}/></label>
 <label className="portal-check"><input type="checkbox" required/>{t("I have read the terms and understand access is personal.","قرأت الشروط وفاهم إن الوصول شخصي.")} <a href={`/${locale}/terms`}>{t("Terms","الشروط")}</a></label>
 <button disabled={busy}>{t("Request access","اطلب التفعيل")}</button><button type="button" onClick={()=>setSelected(undefined)}>{t("Cancel","إلغاء")}</button></form></section>}
 {watch&&<section className="portal-player"><h2>{ar?watch.title_ar:watch.title_en}</h2><div className="video-frame"><video key={watch.id} controls playsInline preload="metadata" controlsList="nodownload" disablePictureInPicture onError={()=>setError(t("Playback unavailable. Refresh or contact support.","التشغيل غير متاح. حدّث المكتبة أو تواصل مع الدعم."))} src={"/api/learning/video?lesson="+watch.id}><track kind="captions" src={"/api/learning/captions?lesson="+watch.id} srcLang="ar" label="العربية"/></video><span className="video-watermark" aria-hidden="true">{session.email}</span></div><button onClick={()=>setWatch(null)}>{t("Close recording","اقفل التسجيل")}</button></section>}
 <section><h2>{t("Your payment requests","طلبات الدفع")}</h2><button disabled={busy} onClick={()=>void refresh()}>{t("Refresh status","حدّث الحالة")}</button>{!orders.length&&<p>{t("No requests yet.","مفيش طلبات لسه.")}</p>}<ul className="lesson-list">{orders.map(o=><li key={o.id}><div><strong>{o.amount_egp} EGP · {status(o.status)}</strong><p>{o.reference}</p><small>{o.id}</small></div></li>)}</ul>{moreOrders&&<button disabled={busy} onClick={()=>void older(false)}>{t("Load older requests","طلبات أقدم")}</button>}</section>
 {session.admin&&<section className="owner-panel"><h2>{t("Owner workspace","مساحة المالك")}</h2>
 {!session.mfa?<><p>{t("An authenticator app protects payment decisions.","تطبيق المصادقة بيحمي قرارات الدفع.")}</p><button disabled={busy} onClick={()=>void run(async()=>setFactor(await api("mfa-setup",{})))}>{t("Set up or verify two-step access","إعداد أو تأكيد الدخول بخطوتين")}</button>
 {factor&&<form className="portal-form" onSubmit={submit(async d=>{await api("mfa-verify",{factorId:factor.factorId,code:d.get("code")});setFactor(null);await refresh();})}>{factor.secret&&<p>{t("Add this key to your authenticator and store it safely:","ضيف المفتاح لتطبيق المصادقة واحفظه بأمان:")} <code>{factor.secret}</code></p>}<label>{t("Authenticator code","كود المصادقة")}<input name="code" inputMode="numeric" pattern="[0-9]{6}" required/></label><button disabled={busy}>{t("Verify","تأكيد")}</button></form>}</>:<>
 <h3>{t("Payment review","مراجعة المدفوعات")}</h3><p>{t("Verify amount and reference in your InstaPay history before approving. Revoking removes access from this order.","راجع المبلغ ورقم العملية في سجل إنستاباي قبل الموافقة. الإلغاء بيشيل صلاحيات الطلب ده.")}</p>
 <ul className="lesson-list">{review.map(o=><li key={o.id}><div><strong>{o.amount_egp} EGP · {status(o.status)}</strong><p>{o.reference}</p><small>{o.user_id}</small></div><div className="portal-actions">{(o.status==="pending"?["approved","rejected"]:o.status==="approved"?["revoked"]:[]).map(d=><button key={d} disabled={busy} onClick={()=>{if(window.confirm(t("Confirm this payment decision?","تأكد قرار الدفع؟")))void run(async()=>{await api("review",{order:o.id,decision:d});await refresh();});}}>{t({approved:"Approve",rejected:"Reject",revoked:"Revoke access"}[d]!,{approved:"موافقة",rejected:"رفض",revoked:"إلغاء الوصول"}[d]!)}</button>)}</div></li>)}</ul>{moreReview&&<button disabled={busy} onClick={()=>void older(true)}>{t("Load older requests","طلبات أقدم")}</button>}
 <h3>{t("Publish or update a lesson","انشر أو حدّث درس")}</h3><p>{t("First upload MP4 and optional Arabic VTT captions to the private nabta-recordings bucket. Reuse a lesson number to update it.","ارفع MP4 وترجمة VTT عربية اختياريًا في مخزن nabta-recordings الخاص أولًا. استخدم نفس رقم الدرس للتحديث.")}</p>
 <form className="portal-form" onSubmit={submit(async d=>{await api("lesson",{position:Number(d.get("position")),en:d.get("en"),ar:d.get("ar"),minutes:Number(d.get("minutes")),path:d.get("path"),captions:d.get("captions"),published:d.get("published")==="on"});await refresh();setMessage(t("Lesson saved.","تم حفظ الدرس."));})}>
 <label>{t("Lesson number (1–20)","رقم الدرس (١–٢٠)")}<input name="position" type="number" min={1} max={20} required/></label>
 <label>{t("English title","العنوان الإنجليزي")}<input name="en" maxLength={160} required/></label><label>{t("Arabic title","العنوان العربي")}<input name="ar" maxLength={160} required/></label>
 <label>{t("Minutes","الدقائق")}<input name="minutes" type="number" min={1} max={240} required/></label>
 <label>{t("Private MP4 path","مسار MP4 الخاص")}<input name="path" required placeholder="lesson-01.mp4"/></label>
 <label>{t("Arabic captions path (optional)","مسار الترجمة العربية (اختياري)")}<input name="captions" placeholder="lesson-01.vtt"/></label>
 <label className="portal-check"><input name="published" type="checkbox"/>{t("Publish for students","انشر للطلاب")}</label><button disabled={busy}>{t("Save lesson","احفظ الدرس")}</button>
 </form></>}
 </section>}
 </>}
 <p className="portal-help">{t("Need help?","محتاج مساعدة؟")} <a href="mailto:nourabulnasr@gmail.com">nourabulnasr@gmail.com</a> · <a href="https://wa.me/201069046666">WhatsApp</a></p>
 </>;
}

