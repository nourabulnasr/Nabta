"use client";

import { useInView } from "motion/react";
import { useAnimate } from "motion/react-mini";
import { spring, stagger } from "motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useMotionEnabled } from "./use-media-query";

export function RevealGroup({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const enabled = useMotionEnabled();
  const inView = useInView(scope, { once: true, margin: "0px 0px -12% 0px" });
  const played = useRef(false);

  useEffect(() => {
    if (!enabled || !inView || played.current) return;
    played.current = true;
    const elements = scope.current.querySelectorAll("[data-reveal]");
    const animation = animate(elements, { opacity: [0.35, 1], transform: ["translateY(28px)", "translateY(0px)"] }, {
      type: spring, stiffness: 85, damping: 24, mass: 0.9, delay: stagger(0.1),
    });
    return () => {
      animation.stop();
      elements.forEach((element) => {
        (element as HTMLElement).style.removeProperty("transform");
        (element as HTMLElement).style.removeProperty("opacity");
      });
    };
  }, [enabled, inView, animate, scope]);

  return <div ref={scope}>{children}</div>;
}
