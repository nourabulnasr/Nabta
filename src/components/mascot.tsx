"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useAnimate } from "motion/react-mini";
import { spring } from "motion";
import { useMotionEnabled } from "./motion/use-media-query";

export function Mascot({ active = true }: { active?: boolean }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const enabled = useMotionEnabled();
  useEffect(() => {
    if (!enabled || !active) return;
    const character = scope.current;
    const entrance = animate(character, {
      transform: ["translateY(0px) rotate(-1deg)", "translateY(-8px) rotate(2deg)"],
    }, { type: spring, stiffness: 12, damping: 8, mass: 1, repeat: Infinity, repeatType: "reverse" });
    return () => {
      entrance.stop();
      character.style.removeProperty("transform");
    };
  }, [enabled, active, animate, scope]);
  return (
    <div ref={scope} className="nabta-mascot" data-motion="mascot" aria-hidden="true">
      <Image src="/images/2026-09-14/nabta-mascot.webp" alt="" width={1254} height={1254}
        sizes="(min-width: 1200px) 240px, (min-width: 768px) 18vw, 104px" preload />
    </div>
  );
}
