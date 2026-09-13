import type { Locale } from "@/content";
import { SectionShell } from "./section-shell";

export function SelectedWork({ locale }: { locale: Locale }) {
  return <SectionShell id="work" locale={locale} />;
}
