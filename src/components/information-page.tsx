import { information } from "@/lib/site-information";
import type { Locale } from "@/content";
import { PageSchema } from "./page-schema";
export function InformationPage({kind,locale}:{kind:"privacy"|"terms";locale:Locale}){
 const page=information[kind];
 return <main id="main-content" className="portal information page-gutter"><PageSchema title={page.title[locale]} locale={locale} path={kind}/><a className="text-link" href={`/${locale}`}>{locale==="ar"?"العودة إلى نبتة":"Back to Nabta"}</a><h1>{page.title[locale]}</h1><p>{locale==="ar"?"آخر تحديث: ٦ أكتوبر ٢٠٢٦":"Updated 6 October 2026"}</p>{page.sections.map(s=><section key={s.title.en}><h2>{s.title[locale]}</h2><p>{s.body[locale]}</p></section>)}<p><a href={`/${locale}/learn`}>{locale==="ar"?"مكتبة الطالب":"Student library"}</a></p></main>;
}
