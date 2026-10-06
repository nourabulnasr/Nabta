import { headers } from "next/headers";
import { getSiteConfig } from "@/lib/site-config";
import type { Locale } from "@/content";
export async function PageSchema({ title, locale, path }: { title: string; locale: Locale; path: string }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { origin } = getSiteConfig();
  const schema = { "@context": "https://schema.org", "@type": "WebPage", name: title, inLanguage: locale, ...(origin ? { url: `${origin}/${locale}/${path}`, isPartOf: { "@id": origin + "/#website" } } : {}) };
  return <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}

