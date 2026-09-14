"use client";

import { m, useMotionValue, useScroll, useSpring } from "motion/react";
import { useEffect } from "react";
import { useMediaQuery, useMotionEnabled } from "./use-media-query";

export function PageAccents() {
  const enabled = useMotionEnabled();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { scrollYProgress } = useScroll();
  const x = useSpring(-100, { stiffness: 160, damping: 30 });
  const y = useSpring(-100, { stiffness: 160, damping: 30 });
  const visible = useMotionValue(0);

  useEffect(() => {
    if (!enabled || !finePointer) return;
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      visible.set(1);
    };
    const hide = () => visible.set(0);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", hide);
      visible.set(0);
    };
  }, [enabled, finePointer, x, y, visible]);

  return <>
    {enabled && <m.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />}
    {enabled && finePointer && <m.div className="cursor-accent" style={{ x, y, opacity: visible }} aria-hidden="true" />}
  </>;
}
