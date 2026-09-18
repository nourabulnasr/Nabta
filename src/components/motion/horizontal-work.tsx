"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useMediaQuery, useMotionEnabled } from "./use-media-query";

type Props = { children: ReactNode; heading: ReactNode; hint: string; label: string; rtl: boolean };

export function HorizontalWork({ children, heading, hint, label, rtl }: Props) {
  const enabled = useMotionEnabled();
  const tallEnough = useMediaQuery("(min-width: 768px) and (min-height: 700px)");
  const pinned = enabled && tallEnough;
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, (rtl ? 1 : -1) * distance]);

  useEffect(() => {
    if (!enabled || !viewport.current || !track.current) return;
    const measure = () => setDistance(Math.max(0, track.current!.scrollWidth - viewport.current!.clientWidth));
    const observer = new ResizeObserver(measure);
    observer.observe(viewport.current);
    observer.observe(track.current);
    measure();
    return () => observer.disconnect();
  }, [enabled, pinned]);

  function showCard(index: number) {
    const card = track.current?.children[index] as HTMLElement | undefined;
    if (!card || !viewport.current || !section.current) return;
    const step = Math.abs(card.offsetLeft - (track.current!.children[0] as HTMLElement).offsetLeft);
    const travel = Math.min(distance, step);
    if (pinned) {
      window.scrollTo({ top: section.current.getBoundingClientRect().top + window.scrollY + travel, behavior: "instant" });
    } else {
      viewport.current.scrollTo({ left: (rtl ? -1 : 1) * travel, behavior: "instant" });
    }
  }

  return (
    <section id="work" ref={section} className="work-journey section-work" data-enhanced={enabled} data-pinned={pinned}
      aria-labelledby="work-title" style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}>
      <div className="work-sticky page-gutter">
        {heading}
        <div ref={viewport} className="work-viewport" role={enabled ? "region" : undefined} aria-label={enabled ? label : undefined}
          tabIndex={enabled ? 0 : undefined}
          onFocusCapture={(event) => {
            if (!enabled || event.target === event.currentTarget) return;
            const card = (event.target as HTMLElement).closest(".project-entry");
            if (card && track.current) showCard([...track.current.children].indexOf(card));
          }}
          onKeyDown={(event) => {
            if (!enabled || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
            if (event.target !== event.currentTarget) return;
            event.preventDefault();
            const count = track.current?.children.length ?? 1;
            const currentTravel = pinned ? scrollYProgress.get() * distance : Math.abs(viewport.current?.scrollLeft ?? 0);
            const first = track.current?.children[0] as HTMLElement | undefined;
            const second = track.current?.children[1] as HTMLElement | undefined;
            const step = first && second ? Math.abs(second.offsetLeft - first.offsetLeft) : 1;
            const current = Math.round(currentTravel / step);
            const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : current + ((event.key === "ArrowRight") !== rtl ? 1 : -1);
            showCard(Math.max(0, Math.min(count - 1, next)));
          }}>
          <m.div ref={track} className="project-grid work-track" data-motion="work" style={pinned ? { x } : { x: 0 }}>
            {children}
          </m.div>
        </div>
        {enabled && <div className="work-scroll-caption"><span>{hint}</span><span aria-hidden="true">{pinned ? "↓" : "↔"}</span></div>}
      </div>
    </section>
  );
}
