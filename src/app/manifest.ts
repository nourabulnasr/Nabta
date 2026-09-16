import type { MetadataRoute } from "next";
import { content } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: content.brand.name.en, short_name: content.brand.name.en, description: content.hero.body.en,
    start_url: "/en", display: "browser", background_color: "#050e1e", theme_color: "#050e1e",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  };
}
