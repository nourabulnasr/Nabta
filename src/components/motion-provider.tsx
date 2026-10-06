"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((module) => module.default);
const MotionReady = createContext(false);
export function useMotionReady() { return useContext(MotionReady); }

export function MotionProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let frame = 0;
    let idle = 0;
    let timer = 0;
    // Let the server-rendered page paint before starting decorative effects.
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (typeof window.requestIdleCallback === "function") {
          idle = window.requestIdleCallback(() => setReady(true), { timeout: 1200 });
        } else {
          timer = window.setTimeout(() => setReady(true), 0);
        }
      });
    });
    return () => {
      cancelAnimationFrame(frame);
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, []);
  return (
    <MotionReady.Provider value={ready}>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={loadFeatures} strict>
          {children}
        </LazyMotion>
      </MotionConfig>
    </MotionReady.Provider>
  );
}
