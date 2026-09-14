export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export type LocalizedText = Record<Locale, string>;

export const sectionIds = ["about", "work", "tutoring", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

type SectionContent = {
  title: LocalizedText;
  navigation: LocalizedText;
  body: LocalizedText;
};

type EditorialItem = { title: LocalizedText; body: LocalizedText };
export type Project = { id: string; title: LocalizedText; category: LocalizedText; summary: LocalizedText; url: string | null };

type Content = {
  brand: { name: LocalizedText; descriptor: LocalizedText; location: LocalizedText };
  metadata: { title: LocalizedText; description: LocalizedText };
  accessibility: { skipToContent: LocalizedText; mainNavigation: LocalizedText; home: LocalizedText };
  language: { label: LocalizedText; switchLabel: LocalizedText };
  hero: { title: LocalizedText; body: LocalizedText; explore: LocalizedText };
  sections: Record<SectionId, SectionContent>;
  about: { steps: EditorialItem[]; offer: LocalizedText; cta: LocalizedText };
  work: { projects: Project[]; view: LocalizedText; pending: LocalizedText };
  tutoring: { subject: LocalizedText; details: LocalizedText[]; cta: LocalizedText; note: LocalizedText; bookingUrl: string | null };
  contact: { services: EditorialItem[]; invitation: LocalizedText; emailLabel: LocalizedText; whatsappLabel: LocalizedText; email: LocalizedText; whatsapp: LocalizedText; emailUrl: string | null; whatsappUrl: string | null; placeholderNote: LocalizedText };
  footer: { copyright: LocalizedText; backToTop: LocalizedText };
};

// Edit both languages here. Null URLs render pending states until real destinations are supplied.
export const content: Content = {
  brand: {
    name: { en: "Nabta", ar: "نبتة" },
    descriptor: { en: "AI consultancy", ar: "استشارات الذكاء الاصطناعي" },
    location: { en: "Rooted in Cairo, Egypt", ar: "جذورنا في القاهرة، مصر" },
  },
  metadata: {
    title: { en: "Nabta — AI consultancy", ar: "نبتة — استشارات الذكاء الاصطناعي" },
    description: {
      en: "Nabta is an AI consultancy in Egypt. We identify useful AI opportunities, build tailored solutions, and offer private Programming & AI tutoring.",
      ar: "نبتة لاستشارات الذكاء الاصطناعي في مصر. بنحدد فرص مفيدة لشغلك، ونبني حلول مناسبة ليك، وبنقدم دروس خصوصية في البرمجة والذكاء الاصطناعي.",
    },
  },
  accessibility: {
    skipToContent: { en: "Skip to content", ar: "انتقل إلى المحتوى" },
    mainNavigation: { en: "Main navigation", ar: "التنقل الرئيسي" },
    home: { en: "Nabta home", ar: "نبتة — الرئيسية" },
  },
  language: {
    label: { en: "English", ar: "العربية" },
    switchLabel: { en: "View in English", ar: "اعرض الموقع بالعربية" },
  },
  hero: {
    title: { en: "Nabta", ar: "نبتة" },
    body: { en: "AI solutions that grow your business", ar: "حلول ذكاء اصطناعي بتنمّي شغلك" },
    explore: { en: "Explore Nabta", ar: "اكتشف نبتة" },
  },
  sections: {
    about: {
      title: { en: "What Nabta does", ar: "ماذا تقدم نبتة" },
      navigation: { en: "About", ar: "عن نبتة" },
      body: { en: "Start with the right problem. Build something useful. Give it room to grow.", ar: "نبدأ بالمشكلة الصح. نبني حل مفيد. ونديله مساحة يكبر." },
    },
    work: {
      title: { en: "Selected work", ar: "أعمال مختارة" },
      navigation: { en: "Work", ar: "أعمالنا" },
      body: { en: "A selection of engineering projects and prototypes, from language and automation to risk analysis.", ar: "مجموعة من المشاريع والنماذج الأولية، من اللغة والأتمتة لتحليل المخاطر." },
    },
    tutoring: {
      title: { en: "Tutoring", ar: "دروس خصوصية" },
      navigation: { en: "Tutoring", ar: "التدريس" },
      body: { en: "Make sense of the subject. Then make something with it.", ar: "افهم المادة، وجرّب اللي اتعلمته بإيدك." },
    },
    contact: {
      title: { en: "Services & contact", ar: "الخدمات والتواصل" },
      navigation: { en: "Contact", ar: "تواصل" },
      body: { en: "AI consultancy and software development for businesses, with private tutoring for the next generation of builders. Based in Cairo, Egypt.", ar: "استشارات ذكاء اصطناعي وتطوير برمجيات للشركات، ودروس خصوصية للجيل الجاي من المبرمجين. من القاهرة، مصر." },
    },
  },
  about: {
    steps: [
      { title: { en: "Find the opportunity", ar: "نحدد الفرصة" }, body: { en: "We look at how your business works and identify where AI can make the biggest practical difference.", ar: "بنفهم شغلك ماشي إزاي، ونحدد فين الذكاء الاصطناعي ممكن يعمل أكبر فرق عملي." } },
      { title: { en: "Build the solution", ar: "نبني الحل" }, body: { en: "We scope and build a focused solution around that need, with clear deliverables and a paid build.", ar: "بنحدد نطاق الشغل ونبني حل مركز على احتياجك، بمخرجات واضحة وتكلفة تنفيذ متفق عليها." } },
      { title: { en: "Grow it into a product", ar: "نطوّره لمنتج" }, body: { en: "Where a solution can help more businesses, we turn its reusable pieces into products.", ar: "ولما الحل يقدر يفيد شركات تانية، بنحوّل الأجزاء القابلة لإعادة الاستخدام لمنتجات." } },
    ],
    offer: { en: "For our first three clients: a free AI opportunity audit. The build is scoped and priced separately.", ar: "لأول ٣ عملاء: مراجعة مجانية لفرص استخدام الذكاء الاصطناعي. نطاق التنفيذ وتكلفته بيتحددوا بشكل منفصل." },
    cta: { en: "Start with an audit", ar: "ابدأ بمراجعة لشغلك" },
  },
  work: {
    view: { en: "View project", ar: "شوف المشروع" },
    pending: { en: "Project link coming soon", ar: "رابط المشروع قريبًا" },
    projects: [
      { id: "blastradius", title: { en: "BlastRadius", ar: "BlastRadius" }, category: { en: "Security", ar: "الأمن السيبراني" }, summary: { en: "Prioritizes Python dependency vulnerabilities using dependency graphs and learned exploitability signals.", ar: "بيرتّب ثغرات مكتبات بايثون حسب شبكة الاعتماد بينها ومؤشرات احتمالية استغلالها." }, url: null },
      { id: "transguard", title: { en: "TransGuard", ar: "TransGuard" }, category: { en: "Language", ar: "معالجة اللغة" }, summary: { en: "Combines translation quality signals to flag sentences that need a human review.", ar: "بيجمع مؤشرات جودة الترجمة عشان يحدد الجمل اللي محتاجة مراجعة بشرية." }, url: null },
      { id: "filingflags", title: { en: "FilingFlags", ar: "FilingFlags" }, category: { en: "Financial analysis", ar: "التحليل المالي" }, summary: { en: "Combines accounting ratios and annual-report text into an explainable fraud-risk report.", ar: "بيجمع النسب المحاسبية ونصوص التقارير السنوية في تقرير قابل للتفسير عن مؤشرات مخاطر الاحتيال." }, url: null },
      { id: "candidatesignal", title: { en: "CandidateSignal", ar: "CandidateSignal" }, category: { en: "Recruiter support", ar: "دعم مسؤولي التوظيف" }, summary: { en: "Surfaces résumé inconsistencies and supporting evidence for a recruiter's closer review.", ar: "بيبرز التناقضات المحتملة في السيرة الذاتية مع الأدلة عشان مسؤول التوظيف يراجعها بنفسه." }, url: null },
      { id: "clearingwatch", title: { en: "ClearingWatch", ar: "ClearingWatch" }, category: { en: "Earth observation", ar: "رصد الأرض" }, summary: { en: "Turns satellite-image change detection into plain-language reports of forest loss.", ar: "بيحوّل التغيرات المرصودة في صور الأقمار الصناعية لتقارير واضحة عن فقدان الغابات." }, url: null },
      { id: "legato", title: { en: "Legato", ar: "Legato" }, category: { en: "Legal AI", ar: "الذكاء الاصطناعي القانوني" }, summary: { en: "An AI assistant focused on Egyptian labour law.", ar: "مساعد ذكاء اصطناعي متخصص في قانون العمل المصري." }, url: null },
      { id: "cod-agent", title: { en: "COD agent", ar: "وكيل تأكيد الطلبات" }, category: { en: "Commerce automation", ar: "أتمتة التجارة" }, summary: { en: "An Egyptian-Arabic WhatsApp prototype for confirming cash-on-delivery orders and tracking replies.", ar: "نموذج أولي على واتساب باللهجة المصرية لتأكيد طلبات الدفع عند الاستلام ومتابعة الردود." }, url: null },
    ],
  },
  tutoring: {
    subject: { en: "Programming & AI", ar: "البرمجة والذكاء الاصطناعي" },
    details: [
      { en: "Private tutoring for Egyptian secondary-school students taking Programming & AI.", ar: "دروس خصوصية لطلاب المرحلة الثانوية في مصر في مادة البرمجة والذكاء الاصطناعي." },
      { en: "Clear explanations, guided practice, and time to ask the questions you couldn't ask in class.", ar: "شرح واضح، وتطبيق خطوة بخطوة، ووقت تسأل فيه عن كل حاجة مافهمتهاش في الفصل." },
    ],
    cta: { en: "Book a session", ar: "احجز حصة" },
    note: { en: "Booking opens soon. Contact details will be added below.", ar: "الحجز هيفتح قريبًا. بيانات التواصل هتتضاف تحت." },
    bookingUrl: null,
  },
  contact: {
    services: [
      { title: { en: "AI opportunity audits", ar: "مراجعة فرص الذكاء الاصطناعي" }, body: { en: "A practical look at where AI fits your business.", ar: "نظرة عملية على أنسب استخدامات الذكاء الاصطناعي لشغلك." } },
      { title: { en: "Custom AI & automation", ar: "حلول ذكاء اصطناعي وأتمتة" }, body: { en: "Focused software, assistants and workflows built around your needs.", ar: "برمجيات ومساعدين ومسارات عمل مبنية على احتياجاتك." } },
      { title: { en: "Private tutoring", ar: "دروس خصوصية" }, body: { en: "Programming & AI support for secondary-school students.", ar: "مساعدة لطلاب الثانوية في البرمجة والذكاء الاصطناعي." } },
    ],
    invitation: { en: "What could we grow together?", ar: "إيه اللي ممكن نكبره سوا؟" },
    emailLabel: { en: "Email", ar: "البريد الإلكتروني" },
    whatsappLabel: { en: "WhatsApp", ar: "واتساب" },
    email: { en: "hello@nabta.example", ar: "hello@nabta.example" },
    whatsapp: { en: "+20 1XX XXX XXXX", ar: "+20 1XX XXX XXXX" },
    emailUrl: null,
    whatsappUrl: null,
    placeholderNote: { en: "Contact details are placeholders for this preview. Email and WhatsApp are not connected yet.", ar: "بيانات التواصل مؤقتة للمعاينة. البريد الإلكتروني وواتساب لسه مش متوصلين." },
  },
  footer: {
    copyright: { en: "© 2026 Nabta", ar: "© ٢٠٢٦ نبتة" },
    backToTop: { en: "Back to top", ar: "العودة للأعلى" },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
