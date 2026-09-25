import { content, type Locale } from "@/content";
import { SectionShell } from "./section-shell";
import { MagneticLink } from "@/components/motion/magnetic-link";
import { instaPayUrl } from "@/lib/business-links";

export function Tutoring({ locale }: { locale: Locale }) {
  return (
    <SectionShell id="tutoring" locale={locale}>
      <h3 className="tutoring-subject">{content.tutoring.subject[locale]}</h3>
      <div className="tutoring-details">{content.tutoring.details.map((detail) => <p key={detail.en}>{detail[locale]}</p>)}</div>
      <MagneticLink href={content.tutoring.bookingUrl ?? "#contact"} describedBy={content.tutoring.bookingUrl ? undefined : "booking-note"}>
        {content.tutoring.cta[locale]} <span aria-hidden="true">↗</span>
      </MagneticLink>
      {!content.tutoring.bookingUrl && <p className="small-note" id="booking-note">{content.tutoring.note[locale]}</p>}
      <p className="small-note">{locale === "ar" ? "الدفع للحصص المؤكدة فقط: تواصل معنا لتأكيد الحصة والمبلغ قبل التحويل. التحويل لا يفعّل دخول التسجيلات تلقائيًا." : "For confirmed lessons only: contact us to confirm the lesson and amount before transferring. A transfer does not automatically unlock recordings."}</p>
      <a className="text-link" href={instaPayUrl}>{locale === "ar" ? "رابط InstaPay للحصص المؤكدة" : "InstaPay for confirmed lessons"} ↗</a>
    </SectionShell>
  );
}
