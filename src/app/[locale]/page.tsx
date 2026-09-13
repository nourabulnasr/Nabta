import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { content, isLocale } from "@/content";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { WhatNabtaDoes } from "@/components/sections/what-nabta-does";
import { SelectedWork } from "@/components/sections/selected-work";
import { Tutoring } from "@/components/sections/tutoring";
import { ServicesContact } from "@/components/sections/services-contact";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const title = content.metadata.title[locale];
  const description = content.metadata.description[locale];

  return {
    title,
    description,
    icons: { icon: "/icon.svg" },
    robots: { index: false, follow: false },
    alternates: { languages: { en: "/en", ar: "/ar" } },
    openGraph: { title, description, type: "website", locale: locale === "ar" ? "ar_EG" : "en_US" },
    twitter: { card: "summary", title, description },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <SiteHeader locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <Hero locale={locale} />
        <WhatNabtaDoes locale={locale} />
        <SelectedWork locale={locale} />
        <Tutoring locale={locale} />
        <ServicesContact locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
