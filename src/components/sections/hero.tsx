"use client";

import { m, useInView, useScroll, useTransform } from "motion/react";
import { useAnimate } from "motion/react-mini";
import { spring } from "motion";
import { useEffect, useState } from "react";
import { HeroBackground } from "@/components/motion/hero-background";
import { content, type Locale } from "@/content";
import { Mascot } from "@/components/mascot";
import { useMotionEnabled } from "@/components/motion/use-media-query";

export function Hero({ locale }: { locale: Locale }) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const prefersMotion = useMotionEnabled();
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const inView = useInView(scope);
  const enabled = prefersMotion && !paused;
  const active = enabled && inView && visible;
  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);
  const { scrollYProgress } = useScroll({ target: scope, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.91]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  useEffect(() => {
    if (!enabled) return;
    const entrance = animate(".hero-wordmark, .mascot-slot", { transform: ["translateY(26px)", "translateY(0px)"] }, {
      type: spring, stiffness: 65, damping: 22, mass: 1.1,
    });
    return () => entrance.stop();
  }, [enabled, animate]);

  return (
    <section ref={scope} className="hero page-gutter" aria-labelledby="hero-title" data-hero-active={active}>
      <m.div className="hero-atmosphere" data-motion="parallax" aria-hidden="true" style={{ y: enabled ? backgroundY : 0 }}>
        <HeroBackground enabled={prefersMotion} active={active} progress={scrollYProgress} rtl={locale === "ar"} />
      </m.div>
      <div className="hero-intro">
        <span className="hero-descriptor">{content.brand.descriptor[locale]}</span>
        <span className="hero-location">{content.brand.location[locale]}</span>
      </div>
      <m.div className="hero-body" data-motion="hero" style={{ scale: enabled ? scale : 1, opacity: enabled ? opacity : 1 }}>
        <h1 id="hero-title" className="hero-wordmark" data-motion="entrance">{content.hero.title[locale]}</h1>
        <div className="hero-support">
          <p className="hero-tagline">{content.hero.body[locale]}</p>
          <div className="mascot-slot" data-motion="entrance"><Mascot active={active} /></div>
        </div>
      </m.div>
      <div className="hero-bottom">
        {prefersMotion && <button className="animation-control" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
          {paused ? content.hero.resume[locale] : content.hero.pause[locale]}
        </button>}
        <span className="hero-rule" aria-hidden="true" />
        <a href="#about" className="explore-link">
          {content.hero.explore[locale]} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
