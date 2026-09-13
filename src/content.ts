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

type Content = {
  brand: { name: LocalizedText; descriptor: LocalizedText; location: LocalizedText };
  metadata: { title: LocalizedText; description: LocalizedText };
  accessibility: { skipToContent: LocalizedText; mainNavigation: LocalizedText; home: LocalizedText };
  language: { label: LocalizedText; switchLabel: LocalizedText };
  hero: { title: LocalizedText; body: LocalizedText; explore: LocalizedText };
  sections: Record<SectionId, SectionContent>;
  footer: { copyright: LocalizedText; backToTop: LocalizedText };
};

// Edit site copy here. Empty bodies are the deliberate Phase 1 content boundary.
export const content: Content = {
  brand: {
    name: { en: "Nabta", ar: "نبتة" },
    descriptor: { en: "AI consultancy", ar: "استشارات الذكاء الاصطناعي" },
    location: { en: "Rooted in Cairo, Egypt", ar: "جذورنا في القاهرة، مصر" },
  },
  metadata: {
    title: { en: "Nabta — AI consultancy", ar: "نبتة — استشارات الذكاء الاصطناعي" },
    description: {
      en: "Nabta is an AI consultancy based in Egypt.",
      ar: "نبتة للاستشارات في مجال الذكاء الاصطناعي، من مصر.",
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
    body: { en: "", ar: "" },
    explore: { en: "Explore Nabta", ar: "اكتشف نبتة" },
  },
  sections: {
    about: {
      title: { en: "What Nabta does", ar: "ماذا تقدم نبتة" },
      navigation: { en: "About", ar: "عن نبتة" },
      body: { en: "", ar: "" },
    },
    work: {
      title: { en: "Selected work", ar: "أعمال مختارة" },
      navigation: { en: "Work", ar: "أعمالنا" },
      body: { en: "", ar: "" },
    },
    tutoring: {
      title: { en: "Tutoring", ar: "دروس خصوصية" },
      navigation: { en: "Tutoring", ar: "التدريس" },
      body: { en: "", ar: "" },
    },
    contact: {
      title: { en: "Services & contact", ar: "الخدمات والتواصل" },
      navigation: { en: "Contact", ar: "تواصل" },
      body: { en: "", ar: "" },
    },
  },
  footer: {
    copyright: { en: "© 2026 Nabta", ar: "© ٢٠٢٦ نبتة" },
    backToTop: { en: "Back to top", ar: "العودة للأعلى" },
  },
};

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}
