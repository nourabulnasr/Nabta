import type { MetadataRoute } from "next";
import { getSiteConfig, languageUrls } from "@/lib/site-config";
import { locales } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const { origin, indexable } = getSiteConfig();
  if (!origin || !indexable) return [];
  return locales.map(locale => ({
    url: `${origin}/${locale}`,
    alternates: { languages: languageUrls(origin) },
  }));
}
