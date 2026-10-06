"use client";
import Image, { type ImageProps } from "next/image";
import { preload } from "react-dom";
import imageLoader, { responsiveSource } from "@/lib/image-loader";

/** The Cloudflare adapter ignores loaderFile. Native picture sources preserve
 * responsive files in both runtimes while next/image supplies sizing semantics. */
export default function ResponsiveImage(props: ImageProps) {
 const source = typeof props.src === "string" ? responsiveSource(props.src) : null;
 if (!source) return <Image {...props} alt={props.alt}/>;
 const srcSet = source.sizes.map(width => imageLoader({ src: props.src as string, width }) + " " + width + "w").join(", ");
 const src = imageLoader({ src: props.src as string, width: source.sizes[source.sizes.length - 1] });
 if (props.preload) preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: props.sizes, fetchPriority: "high" });
 return <picture style={{display:"contents"}}><source srcSet={srcSet} sizes={props.sizes}/><Image {...props} alt={props.alt} src={src} unoptimized preload={false} loading={props.preload ? "eager" : props.loading} fetchPriority={props.preload ? "high" : props.fetchPriority}/></picture>;
}

