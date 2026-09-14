"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";

const Shader = lazy(() => import("./hero-shader").catch(() => ({ default: () => <></> })));

export function HeroBackground({ enabled, active }: { enabled: boolean; active: boolean }) {
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
    {enabled && desktop && ready && !lost && <div className="hero-shader"><Suspense fallback={null}>
      <Shader active={active} onLost={() => setLost(true)} />
    </Suspense></div>}
  </>;
}
