"use client";

import { m, useSpring } from "motion/react";
import type { ReactNode } from "react";
import { useMediaQuery, useMotionEnabled } from "./use-media-query";

export function MagneticLink({ href, describedBy, children }: { href: string; describedBy?: string; children: ReactNode }) {
  const enabled = useMotionEnabled();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useSpring(0, { stiffness: 140, damping: 26 });
  const y = useSpring(0, { stiffness: 140, damping: 26 });
  const reset = () => { x.set(0); y.set(0); };
  return (
    <m.a href={href} className="primary-link" aria-describedby={describedBy} data-motion="magnetic"
      style={enabled && finePointer ? { x, y } : { x: 0, y: 0 }}
      onPointerMove={(event) => {
        if (!enabled || !finePointer || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set(Math.max(-5, Math.min(5, (event.clientX - bounds.left - bounds.width / 2) * 0.06)));
        y.set(Math.max(-3, Math.min(3, (event.clientY - bounds.top - bounds.height / 2) * 0.1)));
      }} onPointerLeave={reset} onBlur={reset} onFocus={reset}>
      {children}
    </m.a>
  );
}
