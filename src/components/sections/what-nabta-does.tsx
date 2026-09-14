import { content, type Locale } from "@/content";
import { SectionShell } from "./section-shell";

export function WhatNabtaDoes({ locale }: { locale: Locale }) {
  return (
    <SectionShell id="about" locale={locale}>
      <ol className="process-list">
        {content.about.steps.map((step, index) => (
          <li key={step.title.en}>
            <span className="process-number" aria-hidden="true">{new Intl.NumberFormat(locale, { minimumIntegerDigits: 2 }).format(index + 1)}</span>
            <div><h3>{step.title[locale]}</h3><p>{step.body[locale]}</p></div>
          </li>
        ))}
      </ol>
      <aside className="audit-offer">
        <p>{content.about.offer[locale]}</p>
        <a className="text-link" href="#contact">{content.about.cta[locale]} <span aria-hidden="true">↗</span></a>
      </aside>
    </SectionShell>
  );
}
