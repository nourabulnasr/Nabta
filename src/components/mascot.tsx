"use client";

import { useEffect, useId } from "react";
import { useAnimate } from "motion/react-mini";
import { spring } from "motion";
import { useMotionEnabled } from "./motion/use-media-query";

// Decorative brand character: the adjacent wordmark supplies its meaning.
export function Mascot() {
  const id = useId();
  const [scope, animate] = useAnimate<SVGSVGElement>();
  const enabled = useMotionEnabled();

  useEffect(() => {
    if (!enabled) return;
    const leaves = scope.current.querySelector(".mascot-crown") as SVGGElement;
    const entrance = animate(leaves, {
      transform: ["rotate(-12deg) scale(0.82)", "rotate(0deg) scale(1)"],
    }, { type: spring, stiffness: 75, damping: 23, mass: 0.8 });
    return () => {
      entrance.stop();
      leaves.style.removeProperty("transform");
    };
  }, [enabled, animate, scope]);

  return (
    <svg ref={scope} className="nabta-mascot" viewBox="0 0 200 240" width="200" height="240"
      aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-seed`} x1="0.15" y1="0.1" x2="0.9" y2="1">
          <stop stopColor="var(--sprout)" />
          <stop offset="1" stopColor="var(--mascot-shadow)" />
        </linearGradient>
        <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--ink)" />
          <stop offset="0.45" stopColor="var(--sprout)" />
          <stop offset="1" stopColor="var(--mascot-shadow)" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="223" rx="47" ry="4" fill="var(--sprout)" opacity="0.1" />
      <g className="mascot-crown" data-motion="mascot">
        <path d="M101 125C102 102 111 80 128 58" fill="none" stroke="var(--sprout)" strokeWidth="5" strokeLinecap="round" />
        <path d="M107 101C66 106 41 79 39 48C72 45 105 61 107 101Z" fill={`url(#${id}-leaf)`} />
        <path d="M109 91C106 53 129 25 167 20C174 58 151 90 109 91Z" fill={`url(#${id}-leaf)`} />
        <path d="M54 61C74 73 91 88 104 100M153 36C133 57 120 73 111 89" fill="none" stroke="var(--ground)" strokeWidth="1.5" opacity="0.25" />
      </g>
      <path d="M101 110C133 103 158 131 155 165C152 198 127 217 99 216C67 215 47 195 47 168C47 141 69 117 101 110Z" fill={`url(#${id}-seed)`} />
      <path d="M66 143C73 129 85 122 98 119" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <g fill="var(--ground)">
        <ellipse cx="87" cy="162" rx="3" ry="5" />
        <ellipse cx="116" cy="159" rx="3" ry="5" />
      </g>
      <path d="M96 179Q103 183 109 177" fill="none" stroke="var(--ground)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
