import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/site-config";

export function proxy(request: NextRequest) {
  const { origin, indexable } = getSiteConfig();
  // Redirect only on the actual hosting platform, never during local fixture tests.
  if (process.env.VERCEL === "1" && indexable && origin && request.nextUrl.host !== new URL(origin).host) {
    return NextResponse.redirect(new URL(request.nextUrl.pathname + request.nextUrl.search, origin), 301);
  }
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const development = process.env.NODE_ENV === "development";
  const policy = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${development ? " 'unsafe-eval'" : ""}`,
    // Motion/Three use dynamic style attributes. Script execution remains nonce-only.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:", "font-src 'self'", "connect-src 'self'",
    "object-src 'none'", "base-uri 'none'", "form-action 'self'", "frame-ancestors 'none'",
    ...(process.env.VERCEL === "1" ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("Content-Security-Policy", policy);
  // Route unsupported one-segment locales through the global 404. A top-level
  // dynamic root layout otherwise returns Next's empty error document on SSR.
  const path = request.nextUrl.pathname.replace(/\/$/, "");
  const knownRootPaths = ["/en", "/ar", "/robots.txt", "/sitemap.xml", "/manifest.webmanifest"];
  const invalidLocale = /^\/[^/]+$/.test(path) && !knownRootPaths.includes(path);
  const response = invalidLocale
    ? NextResponse.rewrite(new URL(`/__missing_locale__${path}`, request.url), { request: { headers } })
    : NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", policy);
  // Nonce-bearing HTML must never be replayed from a shared cache.
  response.headers.set("Cache-Control", "private, no-store, max-age=0");
  if (!indexable) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = { matcher: ["/((?!_next/static|_next/image|images/|icon.svg|apple-touch-icon.png).*)"] };
