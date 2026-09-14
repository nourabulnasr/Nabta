"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useAnimate } from "motion/react-mini";
import { spring } from "motion";
import { useMotionEnabled } from "./motion/use-media-query";

export function Mascot() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const enabled = useMotionEnabled();
  useEffect(() => {
    if (!enabled) return;
    const character = scope.current;
    const entrance = animate(character, {
      transform: ["translateY(14px) rotate(-4deg)", "translateY(0px) rotate(0deg)"],
    }, { type: spring, stiffness: 55, damping: 18, mass: 1 });
    return () => {
      entrance.stop();
      character.style.removeProperty("transform");
    };
  }, [enabled, animate, scope]);
  return (
    <div ref={scope} className="nabta-mascot" data-motion="mascot" aria-hidden="true">
      <Image src="/images/2026-09-14/nabta-mascot.png" alt="" width={1254} height={1254}
        sizes="(min-width: 1200px) 240px, (min-width: 768px) 18vw, 104px" preload />
    </div>
  );
}
