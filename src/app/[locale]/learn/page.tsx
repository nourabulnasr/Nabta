import { PageSchema } from "@/components/page-schema";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import { learningReady } from "@/lib/learning";
import { LearningPortal } from "@/components/learning-portal";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
 const { locale } = await params;
 return { title: locale === "ar" ? "مكتبة الطالب | نبتة" : "Student library | Nabta", robots: { index: false, follow: false } };
}
export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
 const { locale } = await params;
 if (!isLocale(locale)) notFound();
 return <main id="main-content" className="portal page-gutter"><PageSchema title={locale==="ar"?"مكتبة الطالب":"Student library"} locale={locale} path="learn"/>
  <a className="text-link" href={`/${locale}`}>{locale === "ar" ? "العودة إلى نبتة" : "Back to Nabta"}</a>
  <h1>{locale === "ar" ? "مساحتك للتعلّم" : "Your space to learn"}</h1>
  <p className="portal-lead">{locale === "ar" ? "البرمجة والذكاء الاصطناعي — تانية ثانوي بكالوريا" : "Programming & AI — Secondary 2 Baccalaureate"}</p>
  <LearningPortal locale={locale} enabled={learningReady()} siteKey={process.env.TURNSTILE_SITE_KEY ?? ""} />
 </main>;
}
