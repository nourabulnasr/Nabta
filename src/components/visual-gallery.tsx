"use client";

import { useEffect, useRef, useState } from "react";
import * as m from "motion/react-m";
import type { Locale } from "@/content";
import Image from "@/components/responsive-image";
import { useMotionEnabled } from "@/components/motion/use-media-query";
import { visualWork, type VisualWork } from "@/lib/visual-work";

function Film({ item, locale }: { item: VisualWork; locale: Locale }) {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const motionEnabled = useMotionEnabled();

  useEffect(() => {
    const player = video.current;
    const pauseWhenHidden = () => { if (document.hidden) player?.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      player?.pause();
    };
  }, []);

  return <m.figure className="visual-film" initial={motionEnabled ? { opacity: 0, y: 8 } : false}
    animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 180, damping: 26 }}>
    <div className="visual-player-frame">
      <video ref={video} controls playsInline preload="none" poster={`/images/visuals/${item.id}.webp`}
        width={item.width} height={item.height} src={`/media/visuals/${item.id}.mp4`}
        aria-label={item.title[locale]} aria-describedby="visual-film-description" onError={() => setFailed(true)} />
    </div>
    <figcaption>
      <div className="visual-film-meta"><span>{item.category[locale]}</span><span dir="ltr">{item.duration}</span></div>
      <h3>{item.title[locale]}</h3>
      <p id="visual-film-description">{item.description[locale]}</p>
      {failed && <p role="status">{locale === "ar" ? "تعذّر تشغيل الفيلم هنا." : "The film could not play here."} <a className="text-link" href={`/media/visuals/${item.id}.mp4`}>{locale === "ar" ? "افتح الفيلم مباشرة" : "Open the film directly"} ↗</a></p>}
    </figcaption>
  </m.figure>;
}

export function VisualGallery({ locale }: { locale: Locale }) {
  const [activeId, setActiveId] = useState(visualWork[0].id);
  const active = visualWork.find(item => item.id === activeId)!;

  return <div className="visual-screening-room">
    <div className="visual-player" id="visual-player"><Film key={active.id} item={active} locale={locale} /></div>
    <div className="visual-index">
      <div className="visual-index-heading"><h3>{locale === "ar" ? "مجموعة الأفلام" : "The film collection"}</h3><span>{String(visualWork.length).padStart(2, "0")}</span></div>
      <div className="visual-film-list" role="group" aria-label={locale === "ar" ? "اختر فيلمًا" : "Choose a film"}>
        {visualWork.map((item, index) => <button key={item.id} className="visual-film-choice" type="button"
          aria-pressed={activeId === item.id} aria-controls="visual-player" onClick={() => setActiveId(item.id)}>
          <span className="visual-film-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className="visual-thumbnail"><Image src={`/images/visuals/${item.id}-thumb.webp`} alt="" width={240} height={135} unoptimized /></span>
          <span className="visual-choice-text"><span className="visual-choice-title">{item.title[locale]}</span><span className="visual-choice-category">{item.category[locale]}</span></span>
          <span className="visual-choice-duration" dir="ltr">{item.duration}</span>
        </button>)}
      </div>
      <noscript><p>{locale === "ar" ? "افتح أحد الأفلام للمشاهدة:" : "Open a film to watch:"}</p><ul>{visualWork.map(item => <li key={item.id}><a href={`/media/visuals/${item.id}.mp4`}>{item.title[locale]}</a></li>)}</ul></noscript>
    </div>
  </div>;
}
