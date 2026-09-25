import { content, type Locale } from "@/content";
import { FounderCarousel } from "../founder-carousel";

export function Founder({ locale }: { locale: Locale }) {
  return <section id="founder" className="founder-section page-gutter" aria-labelledby="founder-title">
    <div className="work-heading"><h2 id="founder-title">{content.sections.founder.title[locale]}</h2></div>
    <div className="founder-layout"><FounderCarousel locale={locale} />
    <div className="founder-story">
      <h3 className="founder-introduction">{content.sections.founder.body[locale]}</h3>
      {content.founder.paragraphs.map((paragraph, index) => <p key={index}>{paragraph[locale]}</p>)}
      <a className="text-link" href="#contact">{content.founder.cta[locale]}</a>
    </div></div>
  </section>;
}
