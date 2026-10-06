import { content, type Locale } from "@/content";
export function SiteFooter({ locale }: { locale: Locale }) {
 return <footer className="site-footer page-gutter">
 <span>{content.footer.copyright[locale]}</span><span><bdi dir="ltr">{content.footer.credit[locale]}</bdi></span>
 <nav className="footer-links" aria-label={locale==="ar"?"روابط إضافية":"More from Nabta"}>
 <a href={`/${locale}/learn`}>{locale==="ar"?"مكتبة الطالب":"Student library"}</a>
 <a href={`/${locale}/privacy`}>{locale==="ar"?"الخصوصية":"Privacy"}</a>
 <a href={`/${locale}/terms`}>{locale==="ar"?"الشروط":"Terms"}</a>
 </nav><a href="#top">{content.footer.backToTop[locale]} <span aria-hidden="true">↑</span></a></footer>;
}
