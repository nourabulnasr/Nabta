import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { isLocale } from "@/content";
import Image from "@/components/responsive-image";
import { getSiteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };
const copy = {
  en: {
    title: "Websites for architecture & interiors studios",
    description: "Nabta builds considered portfolio websites for architecture and interiors studios in Egypt. Explore the work and request a free portfolio review.",
    home: "Back to Nabta", heading: "Let people experience your work.",
    intro: "A portfolio website should make your spaces, materials and approach easy to explore. Nabta brings architecture and interiors online with considered design, clear project stories and purposeful interaction.",
    action: "Request a free portfolio review", note: "Send your website or portfolio and tell Nour what you want to improve. We’ll agree a time to discuss it.",
    work: "See the approach in practice", detail: "Explore the project approach", visit: "Open the website",
    strata: "An architecture concept with project studies and an interactive residence experience.",
    strataDetails: ["Present the exterior before inviting visitors inside.", "Connect the overview, residence and room views so visitors understand where they are.", "Keep a clear return path and an accessible image experience alongside the interactive scene."],
    gabaly: "An architecture and engineering portfolio introducing the practice, its services and its work.",
    gabalyDetails: ["Give the practice a clear introduction and show the disciplines it covers.", "Organise project imagery so visitors can find relevant work.", "Keep contact details within reach when someone is ready to discuss a brief."],
    process: "From portfolio to project enquiry", steps: ["We review your existing work, audience and website.", "We agree the project structure, visual direction and useful interactions.", "We build, test on phones and keyboards, and prepare the site for search."],
    outcome: "Built around your practice", body: "Project pages, bilingual content where needed, responsive imagery and a clear enquiry route. Interactive scenes are chosen to explain the architecture. Scope and pricing follow your brief.",
    faq: "Before we start", questions: [["Do I need 3D for every project?", "We choose the presentation for each project. Strong photographs, plans and a clear story can be the best starting point."], ["Can the site be in Arabic and English?", "Yes. We can plan both languages, including right-to-left layouts and search metadata."], ["What should I send for the review?", "Your current website or portfolio, the type of clients you want to reach, and one thing you want the site to do better."]],
  },
  ar: {
    title: "مواقع لمكاتب العمارة والتصميم الداخلي",
    description: "نبتة بتصمم مواقع بورتفوليو لمكاتب العمارة والتصميم الداخلي في مصر. استكشف الأعمال واطلب مراجعة مجانية لموقعك.",
    home: "الرجوع إلى نبتة", heading: "خلّي الناس تعيش تفاصيل شغلك.",
    intro: "موقع البورتفوليو يسهّل اكتشاف المساحات والخامات وطريقة تفكيرك. نبتة بتقدّم العمارة والتصميم الداخلي على الإنترنت بتصميم مدروس وحكايات واضحة للمشاريع وتفاعل له هدف.",
    action: "اطلب مراجعة مجانية للبورتفوليو", note: "ابعت موقعك أو البورتفوليو وقول لنور عايز تطوّر إيه. هنتفق معاك على وقت مناسب للكلام.",
    work: "شوف الفكرة في التطبيق", detail: "اكتشف طريقة عرض المشروع", visit: "افتح الموقع",
    strata: "تصوّر معماري بدراسات مشاريع وتجربة تفاعلية لاستكشاف وحدة سكنية.",
    strataDetails: ["ابدأ بالمشهد الخارجي قبل دعوة الزائر لاستكشاف الداخل.", "اربط المشهد العام والوحدة والغرفة عشان الزائر يعرف مكانه في الرحلة.", "وفّر طريق واضح للرجوع وتجربة صور متاحة بجانب المشهد التفاعلي."],
    gabaly: "بورتفوليو للعمارة والهندسة يعرّف بالمكتب وخدماته وأعماله.",
    gabalyDetails: ["قدّم تعريف واضح بالمكتب والتخصصات اللي بيشتغل فيها.", "نظّم صور المشاريع عشان الزائر يلاقي الأعمال المناسبة لاهتمامه.", "خلّي وسائل التواصل قريبة لما الزائر يكون جاهز يناقش مشروعه."],
    process: "من البورتفوليو لاستفسار عن مشروع", steps: ["بنراجع أعمالك والجمهور المستهدف والموقع الحالي.", "بنتفق على ترتيب المشاريع والاتجاه البصري والتفاعلات المفيدة.", "بنبني ونختبر على الموبايل وبالكيبورد ونجهّز الموقع لمحركات البحث."],
    outcome: "موقع مبني حوالين مكتبك", body: "صفحات مشاريع ومحتوى بلغتين حسب الحاجة وصور متجاوبة وطريق واضح للاستفسار. بنختار المشاهد التفاعلية عشان تشرح العمارة، وبنحدد النطاق والسعر بعد فهم احتياجك.",
    faq: "قبل ما نبدأ", questions: [["هل كل مشروع محتاج تجربة ثلاثية الأبعاد؟", "بنختار العرض المناسب لكل مشروع. الصور والمخططات وحكاية واضحة ممكن يكونوا أفضل بداية."], ["ينفع الموقع يبقى عربي وإنجليزي؟", "أيوه. بنخطط للغتين، بما فيهم اتجاه الكتابة من اليمين وبيانات محركات البحث."], ["أبعت إيه للمراجعة؟", "موقعك الحالي أو البورتفوليو ونوع العملاء اللي عايز توصل لهم وحاجة واحدة عايز الموقع يعملها أحسن."]],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const text = copy[locale];
  const { origin, indexable } = getSiteConfig();
  const url = origin ? `${origin}/${locale}/studios` : undefined;
  const images = origin ? [{ url: `${origin}/images/websites/strata-atelier.jpg`, width: 1440, height: 1000, alt: "Strata Atelier architecture website" }] : undefined;
  return { title: `${text.title} | Nabta`, description: text.description, robots: { index: indexable, follow: indexable },
    alternates: origin ? { canonical: url, languages: { en: `${origin}/en/studios`, ar: `${origin}/ar/studios`, "x-default": `${origin}/en/studios` } } : undefined,
    openGraph: { title: text.title, description: text.description, url, siteName: "Nabta", type: "website", locale: locale === "ar" ? "ar_EG" : "en_US", images },
    twitter: { card: "summary_large_image", title: text.title, description: text.description, images },
  };
}

export default async function StudiosPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const text = copy[locale];
  const { origin } = getSiteConfig();
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const message = locale === "ar" ? "مرحبًا نور، عايز مراجعة مجانية لموقع أو بورتفوليو مكتب العمارة بتاعي. رابط الأعمال: " : "Hi Nour, I’d like a free review of my architecture or interiors portfolio. My website or portfolio: ";
  const reviewUrl = `https://wa.me/201069046666?text=${encodeURIComponent(message)}`;
  const schema = { "@context": "https://schema.org", "@type": "Service", name: text.title, description: text.description, serviceType: "Architecture portfolio website design", areaServed: "Egypt", provider: { "@type": "Organization", name: "Nabta", ...(origin ? { "@id": `${origin}/#organization`, url: origin } : {}) }, ...(origin ? { url: `${origin}/${locale}/studios` } : {}) };
  const projects = [
    { id: "strata-atelier", name: "Strata Atelier", summary: text.strata, details: text.strataDetails, url: "https://strata-atelier-nour.vercel.app/" },
    { id: "elgabaly-architects", name: "Elgabaly Architects", summary: text.gabaly, details: text.gabalyDetails, url: "https://www.elgabalyarchitects.com/" },
  ];
  return <>
    <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className="studio-header page-gutter"><a className="brand-link" href={`/${locale}`}>Nabta</a><nav aria-label={locale === "ar" ? "التنقل" : "Navigation"}><a href={`/${locale}`}>{text.home}</a><a href={`/${locale === "en" ? "ar" : "en"}/studios`} lang={locale === "en" ? "ar" : "en"}>{locale === "en" ? "العربية" : "English"}</a></nav></header>
    <main id="main-content" tabIndex={-1} className="studio-page">
      <section className="studio-hero page-gutter" aria-labelledby="studio-title"><div><h1 id="studio-title">{text.heading}</h1><p>{text.intro}</p><a className="studio-action" href={reviewUrl}>{text.action}</a><p className="studio-note">{text.note}</p></div><div className="studio-hero-image"><Image src="/images/websites/strata-atelier.jpg" alt={locale === "ar" ? "معاينة موقع Strata Atelier المعماري" : "Strata Atelier architecture website preview"} width={1440} height={1000} sizes="(min-width: 900px) 55vw, 100vw" preload /></div></section>
      <section className="studio-work page-gutter" aria-labelledby="studio-work-title"><h2 id="studio-work-title">{text.work}</h2>{projects.map(project => <article className="studio-project" key={project.id}><a href={project.url} aria-label={`${text.visit} — ${project.name}`}><Image src={`/images/websites/${project.id}.jpg`} alt={`${project.name} — ${locale === "ar" ? "معاينة الموقع" : "website preview"}`} width={1440} height={1000} sizes="(min-width: 900px) 60vw, 90vw" /></a><div><h3>{project.name}</h3><p>{project.summary}</p><details><summary>{text.detail}</summary><ul>{project.details.map(item => <li key={item}>{item}</li>)}</ul></details><a className="text-link" href={project.url}>{text.visit} ↗</a></div></article>)}</section>
      <section className="studio-process page-gutter"><h2>{text.process}</h2><ol>{text.steps.map(step => <li key={step}>{step}</li>)}</ol><div><h2>{text.outcome}</h2><p>{text.body}</p></div></section>
      <section className="studio-faq page-gutter"><h2>{text.faq}</h2>{text.questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
      <section className="studio-close page-gutter"><h2>{text.action}</h2><p>{text.note}</p><a className="studio-action" href={reviewUrl}>{text.action}</a><a className="text-link" href={`mailto:nourabulnasr@gmail.com?subject=${encodeURIComponent("Nabta portfolio review")}`}>{locale === "ar" ? "أو ابعت إيميل لنور" : "Or email Nour"}</a></section>
    </main><footer className="studio-footer page-gutter"><a href={`/${locale}`}>Nabta</a><a href={`/${locale}/privacy`}>{locale === "ar" ? "الخصوصية" : "Privacy"}</a><span>Powered by Nour Abulnasr</span></footer>
  </>;
}
