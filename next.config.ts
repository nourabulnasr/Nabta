import type { NextConfig } from "next";

const hosted = process.env.VERCEL === "1" || process.env.NETLIFY === "true";
const nextConfig: NextConfig = {
  // Only public deployment settings are inlined. Never add credentials here.
  // Netlify build-context variables are not automatically available at runtime.
  env: {
    SITE_URL: process.env.SITE_URL ?? (process.env.NETLIFY === "true" ? process.env.URL : "") ?? "",
    SITE_INDEXABLE: process.env.SITE_INDEXABLE ?? "false",
    NABTA_DEPLOY_CONTEXT: process.env.CONTEXT ?? "",
    NABTA_HOSTED: hosted ? "true" : "false",
  },
  poweredByHeader: false,
  experimental: { inlineCss: true, globalNotFound: true },
  productionBrowserSourceMaps: false,
  images: { remotePatterns: [], localPatterns: [{ pathname: "/images/**", search: "" }], maximumRedirects: 0 },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      ...(hosted ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
    ] }];
  },
  turbopack: { root: process.cwd() },
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
