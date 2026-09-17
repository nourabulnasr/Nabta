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
  notFound: { title: LocalizedText; body: LocalizedText; home: LocalizedText; navigation: string };
  intro: { label: LocalizedText; skip: LocalizedText; statement: LocalizedText };
  brand: { name: LocalizedText; descriptor: LocalizedText; location: LocalizedText };
  metadata: { title: LocalizedText; description: LocalizedText };
  accessibility: { skipToContent: LocalizedText; mainNavigation: LocalizedText; home: LocalizedText };
  language: { label: LocalizedText; switchLabel: LocalizedText };
  hero: { title: LocalizedText; body: LocalizedText; explore: LocalizedText; pause: LocalizedText; resume: LocalizedText };
  sections: Record<SectionId, SectionContent>;
  about: { steps: EditorialItem[]; offer: LocalizedText; cta: LocalizedText };
  work: { projects: Project[]; view: LocalizedText; pending: LocalizedText; scrollHint: LocalizedText; navigationLabel: LocalizedText };
  tutoring: { subject: LocalizedText; details: LocalizedText[]; cta: LocalizedText; note: LocalizedText; bookingUrl: string | null };
  contact: { services: EditorialItem[]; invitation: LocalizedText; emailLabel: LocalizedText; whatsappLabel: LocalizedText; email: LocalizedText; whatsapp: LocalizedText; emailUrl: string | null; whatsappUrl: string | null; placeholderNote: LocalizedText };
  footer: { copyright: LocalizedText; credit: LocalizedText; backToTop: LocalizedText };
};

// Edit both languages here. Null URLs render pending states until real destinations are supplied.
export const content: Content = {
  notFound: {
    title: { en: "Page not found", ar: "الصفحة غير موجودة" },
    body: { en: "This address does not lead to a page. Return to Nabta to explore our work or get in touch.", ar: "الصفحة دي مش موجودة. ارجع لنبتة عشان تشوف أعمالنا أو تتواصل معانا." },
    home: { en: "Nabta in English", ar: "نبتة بالعربية" },
    navigation: "Return to Nabta / العودة لنبتة",
  },
  intro: {
    label: { en: "Preparing something that grows", ar: "بنجهّز حاجة تكبر معاك" },
    skip: { en: "Skip intro", ar: "تخطّي المقدمة" },
    statement: { en: "Small beginnings. Real growth.", ar: "بداية صغيرة. نمو حقيقي." },
  },
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
    pause: { en: "Pause animation", ar: "إيقاف الحركة" },
    resume: { en: "Resume animation", ar: "تشغيل الحركة" },
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
    offer: { en: "AI consultancy is free. We discuss your business, identify useful opportunities, and quote any implementation separately.", ar: "استشارات الذكاء الاصطناعي مجانية. بنتكلم عن شغلك ونحدد الفرص المناسبة، وأي تنفيذ بيتحدد نطاقه وسعره بشكل منفصل." },
    cta: { en: "Arrange a free consultation", ar: "رتّب استشارة مجانية" },
  },
  work: {
    scrollHint: { en: "Keep exploring", ar: "كمّل واكتشف" },
    navigationLabel: { en: "Selected projects. Use arrow keys, Home or End to explore.", ar: "مشاريع مختارة. استخدم الأسهم أو Home وEnd للتنقل." },
    view: { en: "View project", ar: "شوف المشروع" },
    pending: { en: "Project link coming soon", ar: "رابط المشروع قريبًا" },
    projects: [
      { id: "blastradius", title: { en: "BlastRadius", ar: "BlastRadius" }, category: { en: "Security", ar: "الأمن السيبراني" }, summary: { en: "Prioritizes Python dependency vulnerabilities using dependency graphs and learned exploitability signals.", ar: "بيرتّب ثغرات مكتبات بايثون حسب شبكة الاعتماد بينها ومؤشرات احتمالية استغلالها." }, url: "https://github.com/nourabulnasr/Blastradius" },
      { id: "transguard", title: { en: "TransGuard", ar: "TransGuard" }, category: { en: "Language", ar: "معالجة اللغة" }, summary: { en: "Combines translation quality signals to flag sentences that need a human review.", ar: "بيجمع مؤشرات جودة الترجمة عشان يحدد الجمل اللي محتاجة مراجعة بشرية." }, url: "https://github.com/nourabulnasr/Transguard" },
      { id: "filingflags", title: { en: "FilingFlags", ar: "FilingFlags" }, category: { en: "Financial analysis", ar: "التحليل المالي" }, summary: { en: "Combines accounting ratios and annual-report text into an explainable fraud-risk report.", ar: "بيجمع النسب المحاسبية ونصوص التقارير السنوية في تقرير قابل للتفسير عن مؤشرات مخاطر الاحتيال." }, url: "https://github.com/nourabulnasr/Filingflags" },
      { id: "candidatesignal", title: { en: "CandidateSignal", ar: "CandidateSignal" }, category: { en: "Recruiter support", ar: "دعم مسؤولي التوظيف" }, summary: { en: "Surfaces résumé inconsistencies and supporting evidence for a recruiter's closer review.", ar: "بيبرز التناقضات المحتملة في السيرة الذاتية مع الأدلة عشان مسؤول التوظيف يراجعها بنفسه." }, url: "https://github.com/nourabulnasr/Candidatesignal" },
      { id: "clearingwatch", title: { en: "ClearingWatch", ar: "ClearingWatch" }, category: { en: "Earth observation", ar: "رصد الأرض" }, summary: { en: "Turns satellite-image change detection into plain-language reports of forest loss.", ar: "بيحوّل التغيرات المرصودة في صور الأقمار الصناعية لتقارير واضحة عن فقدان الغابات." }, url: "https://github.com/nourabulnasr/clearingwatch" },
      { id: "legato", title: { en: "Legato", ar: "Legato" }, category: { en: "Legal AI", ar: "الذكاء الاصطناعي القانوني" }, summary: { en: "An AI assistant focused on Egyptian labour law.", ar: "مساعد ذكاء اصطناعي متخصص في قانون العمل المصري." }, url: "https://github.com/nourabulnasr/GP-Legal-AI-" },
      { id: "cod-agent", title: { en: "COD agent", ar: "وكيل تأكيد الطلبات" }, category: { en: "Commerce automation", ar: "أتمتة التجارة" }, summary: { en: "An Egyptian-Arabic WhatsApp prototype for confirming cash-on-delivery orders and tracking replies.", ar: "نموذج أولي على واتساب باللهجة المصرية لتأكيد طلبات الدفع عند الاستلام ومتابعة الردود." }, url: null },
      { id: "elserafy", title: { en: "Elserafy Engineering", ar: "الصيرفي للهندسة" }, category: { en: "Website", ar: "موقع إلكتروني" }, summary: { en: "An engineering company website presenting its products and services.", ar: "موقع لشركة هندسية لعرض منتجاتها وخدماتها." }, url: "https://www.elserafy.com/" },
      { id: "royal-falcon", title: { en: "Royal Falcon Tours", ar: "رويال فالكون للسياحة" }, category: { en: "Website", ar: "موقع إلكتروني" }, summary: { en: "A website for a travel and tourism business.", ar: "موقع لشركة تعمل في السفر والسياحة." }, url: "https://www.royalfalconom.com/" },
      { id: "sea-moss", title: { en: "Power of Sea Moss", ar: "Power of Sea Moss" }, category: { en: "Online store", ar: "متجر إلكتروني" }, summary: { en: "An online storefront for Power of Sea Moss products.", ar: "متجر إلكتروني لمنتجات Power of Sea Moss." }, url: "https://powerofseamoss.com/" },
      { id: "palermo", title: { en: "Palermo", ar: "باليرمو" }, category: { en: "Online store", ar: "متجر إلكتروني" }, summary: { en: "An online storefront for the Palermo brand.", ar: "متجر إلكتروني لعلامة باليرمو." }, url: "https://palermoeg.com/" },
    ],
  },
  tutoring: {
    subject: { en: "Programming & AI", ar: "البرمجة والذكاء الاصطناعي" },
    details: [
      { en: "Programming & AI for Secondary 2 students in the Egyptian Baccalaureate. EGP 250 per session.", ar: "البرمجة والذكاء الاصطناعي لطلاب الصف الثاني الثانوي بنظام البكالوريا المصرية. سعر الحصة ٢٥٠ جنيه." },
      { en: "Clear explanations, guided practice, and time to ask the questions you couldn't ask in class.", ar: "شرح واضح، وتطبيق خطوة بخطوة، ووقت تسأل فيه عن كل حاجة مافهمتهاش في الفصل." },
    ],
    cta: { en: "Arrange a session", ar: "رتّب حصتك" },
    note: { en: "Contact us by WhatsApp or email to arrange your session. Online payment and recording access are not available yet.", ar: "تواصل معانا على واتساب أو البريد الإلكتروني لترتيب حصتك. الدفع الإلكتروني والدخول للتسجيلات لسه مش متاحين." },
    bookingUrl: null,
  },
  contact: {
    services: [
      { title: { en: "Free AI consultancy", ar: "استشارات ذكاء اصطناعي مجانية" }, body: { en: "A free 30-minute Google Meet consultation. Daily, 5pm–midnight Cairo time, arranged at least 24 hours ahead. Implementation is quoted separately.", ar: "استشارة مجانية لمدة ٣٠ دقيقة على Google Meet. يوميًا من ٥ مساءً لمنتصف الليل بتوقيت القاهرة، بترتيب قبلها بـ٢٤ ساعة على الأقل. التنفيذ بعرض سعر منفصل." } },
      { title: { en: "Custom AI & automation", ar: "حلول ذكاء اصطناعي وأتمتة" }, body: { en: "Focused software, assistants and workflows built around your needs.", ar: "برمجيات ومساعدين ومسارات عمل مبنية على احتياجاتك." } },
      { title: { en: "Private tutoring", ar: "دروس خصوصية" }, body: { en: "Programming & AI for Secondary 2 Baccalaureate students. EGP 250 per session.", ar: "البرمجة والذكاء الاصطناعي لطلاب تانية ثانوي بكالوريا. ٢٥٠ جنيه للحصة." } },
    ],
    invitation: { en: "What could we grow together?", ar: "إيه اللي ممكن نكبره سوا؟" },
    emailLabel: { en: "Email", ar: "البريد الإلكتروني" },
    whatsappLabel: { en: "WhatsApp", ar: "واتساب" },
    email: { en: "nourabulnasr@gmail.com", ar: "nourabulnasr@gmail.com" },
    whatsapp: { en: "+20 106 904 6666", ar: "+20 106 904 6666" },
    emailUrl: "mailto:nourabulnasr@gmail.com",
    whatsappUrl: "https://wa.me/201069046666",
    placeholderNote: { en: "Contact details are placeholders for this preview. Email and WhatsApp are not connected yet.", ar: "بيانات التواصل مؤقتة للمعاينة. البريد الإلكتروني وواتساب لسه مش متوصلين." },
  },
  footer: {
    copyright: { en: "© 2026 Nabta", ar: "© ٢٠٢٦ نبتة" },
    credit: { en: "Powered by Nour Abulnasr", ar: "Powered by Nour Abulnasr" },
    backToTop: { en: "Back to top", ar: "العودة للأعلى" },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
