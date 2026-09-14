"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useAnimate } from "motion/react-mini";
import { spring } from "motion";
import { useEffect } from "react";
import { content, type Locale } from "@/content";
import { Mascot } from "@/components/mascot";
import { useMotionEnabled } from "@/components/motion/use-media-query";

export function Hero({ locale }: { locale: Locale }) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const enabled = useMotionEnabled();
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
    <section ref={scope} className="hero page-gutter" aria-labelledby="hero-title">
      <m.div className="hero-atmosphere" data-motion="parallax" aria-hidden="true" style={{ y: enabled ? backgroundY : 0 }}>
        <div className="hero-glow" />
      </m.div>
      <div className="hero-intro">
        <span className="hero-descriptor">{content.brand.descriptor[locale]}</span>
        <span className="hero-location">{content.brand.location[locale]}</span>
      </div>
      <m.div className="hero-body" data-motion="hero" style={{ scale: enabled ? scale : 1, opacity: enabled ? opacity : 1 }}>
        <h1 id="hero-title" className="hero-wordmark" data-motion="entrance">{content.hero.title[locale]}</h1>
        <div className="hero-support">
          <p className="hero-tagline">{content.hero.body[locale]}</p>
          <div className="mascot-slot" data-motion="entrance"><Mascot /></div>
        </div>
      </m.div>
      <div className="hero-bottom">
        <span className="hero-rule" aria-hidden="true" />
        <a href="#about" className="explore-link">
          {content.hero.explore[locale]} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
