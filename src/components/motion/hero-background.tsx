"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";
import Image from "next/image";
import type { MotionValue } from "motion/react";

const Shader = lazy(() => import("./hero-shader").catch(() => ({ default: () => <></> })));

export function HeroBackground({ enabled, active, progress, rtl }: { enabled: boolean; active: boolean; progress: MotionValue<number>; rtl: boolean }) {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [ready, setReady] = useState(false);
  const [lost, setLost] = useState(false);
  useEffect(() => {
    if (!enabled || !desktop || !active) return;
    if (typeof window.requestIdleCallback === "function") {
      const idle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(idle);
    }
    const timer = window.setTimeout(() => setReady(true), 1000);
    return () => window.clearTimeout(timer);
  }, [enabled, desktop, active]);
  return <>
    <div className="hero-glow" />
    <Image className="hero-leaf-fallback" src="/images/sculpted-leaf.svg" alt="" width={400} height={600} loading="eager" />
    {enabled && desktop && ready && !lost && <div className="hero-shader"><Suspense fallback={null}>
      <Shader active={active} onLost={() => setLost(true)} progress={progress} rtl={rtl} />
    </Suspense></div>}
  </>;
}
