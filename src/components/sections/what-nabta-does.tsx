import type { Locale } from "@/content";
import { SectionShell } from "./section-shell";

export function WhatNabtaDoes({ locale }: { locale: Locale }) {
  return <SectionShell id="about" locale={locale} />;
}
