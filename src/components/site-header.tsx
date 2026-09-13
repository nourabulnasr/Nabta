import Link from "next/link";
import { content, sectionIds, type Locale } from "@/content";

export function SiteHeader({ locale }: { locale: Locale }) {
  const alternateLocale = locale === "en" ? "ar" : "en";

  return (
    <header className="site-header page-gutter">
      <a className="brand-link" href="#top" aria-label={content.accessibility.home[locale]}>
        <span className="brand-seed" aria-hidden="true" />
        <span>{content.brand.name[locale]}</span>
      </a>
      <nav className="main-nav" aria-label={content.accessibility.mainNavigation[locale]}>
        {sectionIds.map((id) => (
          <a key={id} href={`#${id}`}>{content.sections[id].navigation[locale]}</a>
        ))}
      </nav>
      <Link
        className="language-link"
        href={`/${alternateLocale}`}
        lang={alternateLocale}
        dir={alternateLocale === "ar" ? "rtl" : "ltr"}
        hrefLang={alternateLocale}
        aria-label={content.language.switchLabel[alternateLocale]}
        prefetch={false}
      >
        {content.language.label[alternateLocale]}
      </Link>
    </header>
  );
}
