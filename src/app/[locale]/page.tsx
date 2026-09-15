import type { Metadata } from "next";
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import { notFound } from "next/navigation";
import { content, isLocale } from "@/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { WhatNabtaDoes } from "@/components/sections/what-nabta-does";
import { SelectedWork } from "@/components/sections/selected-work";
import { Tutoring } from "@/components/sections/tutoring";
import { ServicesContact } from "@/components/sections/services-contact";
import { RevealGroup } from "@/components/motion/reveal-group";
import { BrandIntro } from "@/components/motion/brand-intro";
import { PageAccents } from "@/components/motion/page-accents";
import { getSiteConfig, languageUrls } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const title = content.metadata.title[locale];
  const description = content.metadata.description[locale];
  const { origin, indexable } = getSiteConfig();
  const image = origin ? `${origin}/images/2026-09-14/nabta-mascot.png` : undefined;

  return {
    title,
    description,
    icons: { icon: "/icon.svg" },
    metadataBase: origin ? new URL(origin) : undefined,
    robots: { index: indexable, follow: indexable },
    alternates: origin ? { canonical: `${origin}/${locale}`, languages: languageUrls(origin) } : undefined,
    openGraph: {
      title, description, type: "website", siteName: content.brand.name[locale],
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      url: origin ? `${origin}/${locale}` : undefined,
      images: image ? [{ url: image, width: 1254, height: 1254, alt: content.brand.name[locale] }] : undefined,
    },
    twitter: { card: "summary", title, description, images: image ? [image] : undefined },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { origin } = getSiteConfig();
  const { props: introImage } = getImageProps({
    src: "/images/2026-09-14/nabta-mascot.png", alt: "", width: 1254, height: 1254,
    sizes: "(max-width: 767px) 220px, 360px",
  });
  preload(introImage.src, { as: "image", imageSrcSet: introImage.srcSet, imageSizes: introImage.sizes,
    fetchPriority: "high", media: "(prefers-reduced-motion: no-preference)" });
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", name: content.brand.name[locale],
        description: content.metadata.description[locale],
        ...(origin ? { "@id": `${origin}/#organization`, url: origin } : {}),
      },
      { "@type": "WebSite", name: content.brand.name[locale], inLanguage: ["en", "ar"],
        ...(origin ? { "@id": `${origin}/#website`, url: origin, publisher: { "@id": `${origin}/#organization` } } : {}),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <BrandIntro locale={locale} />
      <PageAccents />
      <SiteHeader locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <Hero locale={locale} />
        <RevealGroup><WhatNabtaDoes locale={locale} /></RevealGroup>
        <SelectedWork locale={locale} />
        <RevealGroup><Tutoring locale={locale} /></RevealGroup>
        <RevealGroup><ServicesContact locale={locale} /></RevealGroup>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
