import { content, type Locale } from "@/content";
import Image from "next/image";

export function Founder({ locale }: { locale: Locale }) {
  return <section id="founder" className="founder-section page-gutter" aria-labelledby="founder-title">
    <div className="work-heading"><h2 id="founder-title">{content.sections.founder.title[locale]}</h2></div>
    <div className="founder-layout"><div className="portrait-stage"><Image src="/images/founder/portrait-1.webp" alt={locale === "ar" ? "نورالدين أبو النصر" : "Noureldin Abulnasr"} fill sizes="(min-width: 768px) 42vw, 90vw" style={{ objectFit: "cover" }} /></div>
    <div className="founder-story">
      <h3 className="founder-introduction">{content.sections.founder.body[locale]}</h3>
      {content.founder.paragraphs.map((paragraph, index) => <p key={index}>{paragraph[locale]}</p>)}
      <a className="text-link" href="#contact">{content.founder.cta[locale]}</a>
    </div></div>
  </section>;
}

