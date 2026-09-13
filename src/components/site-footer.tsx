import { content, type Locale } from "@/content";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer page-gutter">
      <span>{content.footer.copyright[locale]}</span>
      <a href="#top">{content.footer.backToTop[locale]} <span aria-hidden="true">↑</span></a>
    </footer>
  );
}
