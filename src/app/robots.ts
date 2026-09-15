import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const { origin, indexable } = getSiteConfig();
  return indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${origin}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
