"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAnimate } from "motion/react-mini";
import { spring } from "motion";
import { content, type Locale } from "@/content";
import { useMotionEnabled } from "./use-media-query";

export function BrandIntro({ locale }: { locale: Locale }) {
  const allowed = useMotionEnabled();
  const [finished, setFinished] = useState(false);
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const skip = useRef<HTMLButtonElement>(null);
  const show = allowed && !finished;

  useEffect(() => {
    if (!show || !scope.current) return;
    const container = scope.current;
    let cancelled = false;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const sections = [...document.querySelectorAll<HTMLElement>(".site-header, main, .site-footer")];
    const inertStates = sections.map(el => el.inert);
    sections.forEach(el => { el.inert = true; });
    root.dataset.brandIntro = "true";
    root.style.overflow = "hidden";
    skip.current?.focus({ preventScroll: true });
    const finish = () => setFinished(true);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
      if (event.key === "Tab") { event.preventDefault(); skip.current?.focus(); }
    };
    // A resized viewport invalidates the flight coordinates; reveal the usable page immediately.
    window.addEventListener("resize", finish);
    window.addEventListener("keydown", onKey);
    const failSafe = window.setTimeout(finish, 6500);
    const timers: number[] = [];
    const delay = (ms: number) => new Promise<void>(resolve => { timers.push(window.setTimeout(resolve, ms)); });
    const run = async () => {
      const robot = scope.current.querySelector<HTMLElement>(".intro-robot")!;
      const asset = robot.querySelector("img")!;
      await Promise.all([
        Promise.race([Promise.all([document.fonts.ready, asset.decode().catch(() => {})]), delay(2500)]),
        delay(700),
      ]);
      if (cancelled) return;
      scope.current.dataset.stage = "swoop";
      await animate(robot, { transform: ["translate(-50%, -50%) rotate(0deg)", "translate(-68%, -58%) rotate(-12deg)"] },
        { type: spring, stiffness: 120, damping: 22, mass: 0.7 });
      if (cancelled) return;
      scope.current.dataset.stage = "gust";
      const dots = [...scope.current.querySelectorAll<HTMLElement>(".intro-particle")];
      const gust = container.querySelector<HTMLElement>(".intro-gust")!;
      const pose = robot.getBoundingClientRect();
      gust.style.left = `${pose.left + pose.width * 0.4}px`;
      gust.style.top = `${pose.top + pose.height * 0.65}px`;
      dots.forEach((dot, index) => {
        const distance = 180 + (index % 6) * 95;
        const spread = (index / dots.length - 0.5) * 260;
        animate(dot, { opacity: [0, 1, 0], transform: ["translate(0, 0) scale(0.3)", `translate(${-distance}px, ${spread}px) scale(1)`] },
          { duration: 0.8, delay: (index % 5) * 0.025, ease: "easeOut" });
      });
      animate(".intro-wordmark", { opacity: [1, 0], transform: ["translateY(0)", "translateY(-22px)"] }, { duration: 0.65 });
      await delay(550);
      if (cancelled) return;
      scope.current.dataset.stage = "landing";
      const target = document.querySelector<HTMLElement>(".mascot-slot .nabta-mascot");
      if (!target) { finish(); return; }
      const to = target.getBoundingClientRect();
      // Keep the layout box fixed: fly entirely with transforms to avoid a layout shift.
      const startTransform = getComputedStyle(robot).transform;
      const destination = `translate(${to.left - robot.offsetLeft}px, ${to.top - robot.offsetTop}px) rotate(0deg) scale(${to.width / robot.offsetWidth})`;
      animate(".intro-curtain", { opacity: 0 }, { duration: 0.65 });
      animate(".intro-meta", { opacity: 0 }, { duration: 0.25 });
      await animate(robot, { transform: [startTransform, destination] },
        { type: spring, stiffness: 95, damping: 23, mass: 0.8 });
      if (!cancelled) finish();
    };
    void run().catch(() => { if (!cancelled) finish(); });
    return () => {
      cancelled = true;
      clearTimeout(failSafe);
      timers.forEach(clearTimeout);
      container.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
      delete root.dataset.brandIntro;
      root.style.overflow = previousOverflow;
      sections.forEach((el, i) => { el.inert = inertStates[i]; });
      window.removeEventListener("resize", finish);
      window.removeEventListener("keydown", onKey);
      if (previousFocus?.isConnected && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
      else document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true });
    };
  }, [show, animate, locale, scope]);

  if (finished) return null;
  return <><noscript><style>{`.brand-intro{display:none!important}`}</style></noscript><div ref={scope} className="brand-intro" role="dialog" aria-modal="true" aria-label={content.intro.label[locale]} data-stage="loading">
    <div className="intro-curtain" />
    <div className="intro-meta intro-top"><span>{content.brand.name[locale]} / {content.brand.descriptor[locale]}</span>
      <button ref={skip} type="button" onClick={() => setFinished(true)}>{content.intro.skip[locale]}</button></div>
    <div className="intro-wordmark" aria-hidden="true">{content.hero.title[locale]}<span>{content.intro.statement[locale]}</span></div>
    <div className="intro-robot" aria-hidden="true"><Image src="/images/2026-09-14/nabta-mascot.png" alt="" width={1254} height={1254} sizes="(max-width: 767px) 220px, 360px" loading="eager" fetchPriority="high" /></div>
    <div className="intro-gust" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <i className="intro-particle" key={i} />)}</div>
    <div className="intro-meta intro-bottom"><span>{content.intro.label[locale]}</span><span className="intro-loading-line" aria-hidden="true" /></div>
  </div></>;
}
