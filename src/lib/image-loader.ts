import type { ImageLoaderProps } from "next/image";
export function responsiveSource(src: string): { id: string; sizes: number[] } | null {
 if (src === "/images/2026-09-14/nabta-mascot.webp") return { id: "mascot", sizes: [240,400,800] };
 if (src === "/images/founder/portrait-1.webp") return { id: "portrait-1", sizes: [400,640,960] };
 const website = src.match(/^\/images\/websites\/(elserafy|royal-falcon|sea-moss|palermo|mas-heavy-equipment|el-amal-home|vesper-acoustics|ironman-3d|elgabaly-architects)[.]jpg$/);
 return website ? { id: website[1], sizes: [480,960,1440] } : null;
}
export default function imageLoader({src,width}: ImageLoaderProps) {
 const source = responsiveSource(src);
 return source ? "/images/responsive/" + source.id + "-" + (source.sizes.find(s=>s>=width) ?? source.sizes[source.sizes.length-1]) + ".webp" : src;
}

