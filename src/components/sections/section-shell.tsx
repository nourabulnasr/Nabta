import type { ReactNode } from "react";
import { content, type Locale, type SectionId } from "@/content";

type SectionShellProps = {
  id: SectionId;
  locale: Locale;
  children?: ReactNode;
};

export function SectionShell({ id, locale, children }: SectionShellProps) {
  const section = content.sections[id];

  return (
    <section id={id} className={`section-shell section-${id} page-gutter`} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{section.title[locale]}</h2>
      <div className="section-content">
        {section.body[locale] && <p>{section.body[locale]}</p>}
        {children}
      </div>
    </section>
  );
}
