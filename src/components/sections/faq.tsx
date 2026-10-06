import type { Locale } from "@/content";
export function Faq({locale}:{locale:Locale}){
 const ar=locale==="ar";
 const items=ar?[
 ["هل الاستشارة مجانية؟","أيوه، ٣٠ دقيقة على Google Meet لمناقشة نشاطك وفرص الذكاء الاصطناعي. تكلفة التنفيذ بتتحدد بشكل منفصل."],
 ["أحجز إمتى؟","يوميًا من ٥ مساءً لمنتصف الليل بتوقيت القاهرة، قبل الموعد بـ٢٤ ساعة على الأقل. المواعيد المتاحة بتظهر في التقويم."],
 ["هل الدرس المباشر يشمل التسجيل؟","لا، الدروس المباشرة والتسجيلات مشتريات منفصلة. سعر الحصة في كل خيار ٢٥٠ جنيه."],
 ["الكورس المسجل جاهز؟","لسه قيد الإعداد: ٢٠ درسًا، مدة كل درس حوالي ساعة لساعتين. الحصة ٢٥٠ جنيه أو الكورس كامل ٤٥٠٠ جنيه. التسجيلات هتظهر في مكتبة الطالب عند نشرها."],
 ["إزاي يتم الدفع والتفعيل؟","إنستاباي، وبعدها مراجعة يدوية لرقم العملية. ما تحولش مقابل تسجيل غير متاح. الوصول شخصي ودائم للتسجيلات المشتراة."],
 ["لو محتاج مساعدة؟","تواصل على البريد أو واتساب للأسئلة عن الدروس أو الحجز أو الدفع."]]:[
 ["Is consultancy free?","Yes. A 30-minute Google Meet call to discuss your business and useful AI opportunities. Implementation is quoted separately."],
 ["When can I book?","Daily from 5pm to midnight Cairo time, at least 24 hours in advance. The calendar shows available appointments."],
 ["Does live tutoring include the recording?","No. Live tutoring and recorded lessons are separate purchases, each EGP 250 per session."],
 ["Is the recorded course ready?","It is in preparation: 20 lessons, about 1–2 hours each. EGP 250 per lesson or EGP 4,500 for the full course. Recordings appear in the student library when published."],
 ["How do payment and access work?","InstaPay followed by manual verification of the transaction reference. Do not transfer for an unavailable recording. Purchased recordings have lifetime personal access."],
 ["What if I need help?","Contact us by email or WhatsApp for questions about lessons, bookings or payments."]];
 return <section id="faq" className="faq-section page-gutter" aria-labelledby="faq-title"><h2 id="faq-title">{ar?"أسئلة شائعة":"A few useful answers"}</h2>{items.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>;
}
