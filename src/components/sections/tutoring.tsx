import type { Locale } from "@/content";
import { SectionShell } from "./section-shell";

export function Tutoring({ locale }: { locale: Locale }) {
  return <SectionShell id="tutoring" locale={locale} />;
}
