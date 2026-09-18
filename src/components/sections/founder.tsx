import { content, type Locale } from "@/content";
import { SectionShell } from "./section-shell";

export function Founder({ locale }: { locale: Locale }) {
  return <SectionShell id="founder" locale={locale}>
    <div className="founder-story">
      {content.founder.paragraphs.map((paragraph, index) => <p key={index}>{paragraph[locale]}</p>)}
      <a className="text-link" href="#contact">{content.founder.cta[locale]}</a>
    </div>
  </SectionShell>;
}
