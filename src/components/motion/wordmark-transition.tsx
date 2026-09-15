"use client";

import { useEffect, useRef } from "react";
import { content, type Locale } from "@/content";
import { useMotionEnabled } from "./use-media-query";

/** A decorative copy bridges the two real, accessible wordmarks. */
export function WordmarkTransition({ locale }: { locale: Locale }) {
  const enabled = useMotionEnabled();
  const copy = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!enabled || !copy.current) return;
    const element = copy.current;
    const root = document.documentElement;
    const title = document.querySelector<HTMLElement>(".hero-wordmark");
    const destination = document.querySelector<HTMLElement>(".brand-wordmark");
    const hero = document.querySelector<HTMLElement>(".hero");
    if (!title || !destination || !hero) return;
    let frame = 0;
    let disposed = false;
    const update = () => {
      frame = 0;
      const distance = Math.max(240, hero.offsetHeight * 0.55);
      const progress = Math.max(0, Math.min(1, window.scrollY / distance));
      const moving = progress > 0 && progress < 1 && !root.dataset.brandIntro;
      root.dataset.wordmark = progress === 0 || root.dataset.brandIntro ? "home" : moving ? "moving" : "docked";
      destination.style.opacity = moving ? String(Math.max(0, Math.min(1, (progress - 0.45) / 0.35))) : "1";
      element.style.visibility = moving ? "visible" : "hidden";
      if (!moving) return;
      const from = title.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      const style = getComputedStyle(title);
      element.style.fontSize = style.fontSize;
      element.style.lineHeight = style.lineHeight;
      element.style.letterSpacing = style.letterSpacing;
      const width = element.offsetWidth;
      const eased = progress * progress * (3 - 2 * progress);
      const scale = (from.width + (to.width - from.width) * eased) / width;
      element.style.transform = `translate(${from.left + (to.left - from.left) * eased}px, ${from.top + (to.top - from.top) * eased}px) scale(${scale})`;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(title);
    resize.observe(destination);
    const intro = new MutationObserver(schedule);
    intro.observe(root, { attributes: true, attributeFilter: ["data-brand-intro"] });
    void document.fonts.ready.then(() => { if (!disposed) schedule(); });
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      intro.disconnect();
      delete root.dataset.wordmark;
      destination.style.removeProperty("opacity");
    };
  }, [enabled, locale]);
  return enabled ? <span ref={copy} className="travelling-wordmark" aria-hidden="true">{content.hero.title[locale]}</span> : null;
}
