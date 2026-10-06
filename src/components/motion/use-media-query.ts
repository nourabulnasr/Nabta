"use client";

import { useCallback, useSyncExternalStore } from "react";
import { useMotionReady } from "../motion-provider";

// Static HTML stays readable; enhancements begin only after the browser's preference is known.
export function useMediaQuery(query: string) {
  const subscribe = useCallback((onChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function useMotionEnabled() {
  const preferred = useMediaQuery("(prefers-reduced-motion: no-preference)");
  const ready = useMotionReady();
  return preferred && ready;
}
