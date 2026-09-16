/** Build-time publication settings. Missing or malformed configuration stays non-indexable. */
export function getSiteConfig(env: { SITE_URL?: string; SITE_INDEXABLE?: string; VERCEL_ENV?: string } = {
  SITE_URL: process.env.SITE_URL, SITE_INDEXABLE: process.env.SITE_INDEXABLE,
  VERCEL_ENV: process.env.VERCEL_ENV,
}) {
  let origin: string | undefined;
  try {
    const url = new URL(env.SITE_URL?.trim() ?? "");
    if (url.protocol === "https:" && !url.username && !url.password &&
        url.pathname === "/" && !url.search && !url.hash && !url.port &&
        url.hostname.includes(".") && url.hostname !== "127.0.0.1" && !url.hostname.endsWith(".localhost")) {
      origin = url.origin;
    }
  } catch { /* An unset domain is expected during local preparation. */ }
  const preview = env.VERCEL_ENV === "preview" || env.VERCEL_ENV === "development";
  return { origin, indexable: Boolean(origin && env.SITE_INDEXABLE === "true" && !preview) };
}

export function languageUrls(origin: string) {
  return { en: `${origin}/en`, ar: `${origin}/ar`, "x-default": `${origin}/en` };
}
