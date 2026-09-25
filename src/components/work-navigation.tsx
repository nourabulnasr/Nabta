"use client";

import { useRef } from "react";
import type { Locale } from "@/content";

export const workDestinations = [
  { id: "work", en: "AI & Software", ar: "الذكاء الاصطناعي والبرمجيات" },
  { id: "websites", en: "Websites", ar: "المواقع الإلكترونية" },
  { id: "ai-visuals", en: "AI Visuals", ar: "إبداع بصري بالذكاء الاصطناعي" },
] as const;

export function WorkNavigation({ locale }: { locale: Locale }) {
  const details = useRef<HTMLDetailsElement>(null);
  return <details className="work-navigation" ref={details} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
  }} onKeyDown={event => {
    if (event.key === "Escape" && details.current?.open) {
      event.stopPropagation();
      details.current.open = false;
      details.current.querySelector("summary")?.focus();
    }
  }}>
    <summary>{locale === "ar" ? "أعمالنا" : "Work"}<span aria-hidden="true"> +</span></summary>
    <div className="work-dropdown">{workDestinations.map(item => <a key={item.id} href={`#${item.id}`} onClick={() => { if (details.current) details.current.open = false; }}>{item[locale]}</a>)}</div>
  </details>;
}
