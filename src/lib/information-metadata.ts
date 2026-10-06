import type { Metadata } from "next";
import type { Locale } from "@/content";
import { information } from "./site-information";
import { getSiteConfig } from "./site-config";
export function informationMetadata(kind: "privacy" | "terms", locale: Locale): Metadata {
 const { origin, indexable } = getSiteConfig();
 const title = information[kind].title[locale] + " | Nabta";
 const description = information[kind].sections[0].body[locale];
 const url = origin ? `${origin}/${locale}/${kind}` : undefined;
 const images = origin ? [origin + "/images/2026-09-14/nabta-mascot.png"] : undefined;
 return { title, description, robots: { index: indexable, follow: indexable }, alternates: origin ? { canonical: url, languages: { en: `${origin}/en/${kind}`, ar: `${origin}/ar/${kind}`, "x-default": `${origin}/en/${kind}` } } : undefined,
 openGraph: { title, description, url, type: "website", siteName: "Nabta", locale: locale === "ar" ? "ar_EG" : "en_US", images }, twitter: { card: "summary", title, description, images } };
}

