"use client";

import { getImageProps } from "next/image";
import { preload } from "react-dom";

/** Keep the image helper within the client boundary supported by both runtimes. */
export function MascotPreload() {
  const { props } = getImageProps({
    src: "/images/2026-09-14/nabta-mascot.webp", alt: "", width: 1254, height: 1254,
    sizes: "(max-width: 767px) 220px, 360px",
  });
  preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: props.sizes,
    fetchPriority: "high", media: "(prefers-reduced-motion: no-preference)" });
  return null;
}
