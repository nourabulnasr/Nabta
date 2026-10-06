"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";
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
    <svg className="hero-leaf-fallback" width="400" height="600" viewBox="0 0 400 600" aria-hidden="true" focusable="false">
      <defs><linearGradient id="hero-leaf-body" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#15334c"/><stop offset=".5" stopColor="#071424"/><stop offset="1" stopColor="#214b56"/></linearGradient><linearGradient id="hero-leaf-rim"><stop stopColor="#36bacc"/><stop offset="1" stopColor="#a8d747"/></linearGradient></defs>
      <path d="M200 560C35 410 65 160 270 35C330 230 325 445 200 560Z" fill="url(#hero-leaf-body)" stroke="url(#hero-leaf-rim)" strokeWidth="2"/>
      <path d="M200 560Q170 310 270 35" fill="none" stroke="#3496a6" strokeWidth="1.5"/>
    </svg>
    {enabled && desktop && ready && !lost && <div className="hero-shader"><Suspense fallback={null}>
      <Shader active={active} onLost={() => setLost(true)} progress={progress} rtl={rtl} />
    </Suspense></div>}
  </>;
}
