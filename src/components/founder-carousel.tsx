"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { m } from "motion/react";
import { useMotionEnabled } from "./motion/use-media-query";
import type { Locale } from "@/content";

export function FounderCarousel({ locale }: { locale: Locale }) {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const animated = useMotionEnabled();
  const ar = locale === "ar";
  const move = (step: number) => setIndex(value => (value + step + 4) % 4);
  return <div className="founder-carousel" role="region" aria-roledescription={ar ? "معرض صور" : "carousel"} aria-label={ar ? "صور نورالدين" : "Portraits of Noureldin"}>
    <div className="portrait-stage" onTouchStart={event => { start.current = event.touches[0].clientX; }} onTouchEnd={event => {
      if (start.current === null) return;
      const distance = event.changedTouches[0].clientX - start.current;
      if (Math.abs(distance) > 50) move(distance < 0 ? 1 : -1);
      start.current = null;
    }}>
      {[1, 2, 3, 4].map((number, slide) => <m.div key={number} className="portrait-slide" aria-hidden={slide !== index}
        initial={false} animate={{ opacity: slide === index ? 1 : 0, scale: slide === index ? 1 : 1.025 }}
        transition={animated ? { type: "spring", stiffness: 100, damping: 25 } : { duration: 0 }}>
        <Image src={`/images/founder/portrait-${number}.webp`} alt={ar ? `نورالدين أبو النصر — صورة ${number}` : `Noureldin Abulnasr — portrait ${number}`} fill sizes="(min-width: 768px) 42vw, 90vw" loading="lazy" />
      </m.div>)}
    </div>
    <noscript><style>{`.portrait-controls{display:none}`}</style></noscript>
    <div className="portrait-controls" dir="ltr">
      <button type="button" onClick={() => move(-1)} aria-label={ar ? "الصورة السابقة" : "Previous portrait"}>←</button>
      <span aria-live="polite" aria-atomic="true">{index + 1} / 4</span>
      <button type="button" onClick={() => move(1)} aria-label={ar ? "الصورة التالية" : "Next portrait"}>→</button>
    </div>
  </div>;
}
