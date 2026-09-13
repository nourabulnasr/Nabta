import type { Locale } from "@/content";
import { SectionShell } from "./section-shell";

export function ServicesContact({ locale }: { locale: Locale }) {
  return <SectionShell id="contact" locale={locale} />;
}
