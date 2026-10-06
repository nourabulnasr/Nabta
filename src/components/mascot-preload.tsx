"use client";
import { preload } from "react-dom";
import imageLoader, { responsiveSource } from "@/lib/image-loader";
export function MascotPreload() {
 const src = "/images/2026-09-14/nabta-mascot.webp";
 const widths = responsiveSource(src)!.sizes;
 preload(imageLoader({src,width:800}), { as:"image", imageSrcSet:widths.map(width=>imageLoader({src,width})+" "+width+"w").join(", "), imageSizes:"(max-width: 767px) 220px, 360px", fetchPriority:"high", media:"(prefers-reduced-motion: no-preference)" });
 return null;
}

