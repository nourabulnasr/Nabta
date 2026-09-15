# Launch preparation — 2026-09-15

Nour authorized launch essentials after the Phase6 checkpoint. This work does not start Phase7 or Phase8 and does not publish the site.

## Implemented

- Build-time `SITE_URL` and `SITE_INDEXABLE` configuration, documented in `.env.example`. Missing/invalid origin or an unset indexing flag retains noindex/nofollow, a blocking robots policy and an empty sitemap.
- Configured origins supply locale-specific canonical URLs, reciprocal English/Arabic/x-default links, Open Graph URLs and mascot images, and Twitter summary images.
- Organization and WebSite JSON-LD on both pages, derived from existing bilingual content. No placeholder contact data or unverified business claims are included.
- Production sitemap includes both language routes with alternate links. No artificial last-modified dates.
- Mascot landing now uses transforms throughout instead of changing its layout coordinates and width. Its image receives high fetch priority and a server-rendered responsive preload for visitors who allow motion. No new image, animation dependency or design direction.
- Next.js generated its standard AGENTS.md and CLAUDE.md guidance during the isolated development verification; these are retained for future sessions.

## Verification and findings

- Production webpack build, ESLint, TypeScript and diff whitespace checks succeeded.
- Configuration tests covered absent/invalid origins, explicit indexing opt-in and language URL generation.
- Rendered local production pages verified with JavaScript disabled: both locales noindex, valid JSON-LD, no fabricated canonical domain, blocking robots and empty sitemap.
- An isolated local development server used the reserved `https://example.com` fixture to verify index/follow, absolute canonical/hreflang/social metadata, and populated sitemap. The fixture was passed only in that process's environment; it was not saved as Nabta's domain. This is development-mode verification of the publication branch, not a deployed production test.
- Final Chrome intro verification covered English desktop and Arabic mobile, complete gust/landing, continuing mascot float, Escape/Skip, live reduced-motion cleanup, unlocked content, no overflow and no-JavaScript readability. No application page errors.
- Final mobile Lighthouse: English performance90, Arabic88; accessibility100 and best-practices100 both; SEO63 under intentional preview restrictions. English LCP3.5s/TBT130ms, Arabic LCP3.7s/TBT120ms. CLS0 in both. No audit warnings. Reports: `artifacts/2026-09-15/launch-final/`.
- The previous Phase6 reports measured CLS0.058. Keeping the landing layout fixed removed that measured shift. Early image discovery did **not** demonstrate faster LCP in the final run; do not claim a loading-speed improvement. LCP remains over2.5s and Arabic performance remains below90. These are local lab measurements, not field Core Web Vitals.
- Current screenshots: `artifacts/2026-09-15/intro-{en,ar}-{loading,gust,complete}.png`. Manual observation: supplied mascot and established palette retained. Visual approval remains Nour's.

## Still needed before launch

Real email, WhatsApp number, booking URL, seven project destinations, confirmed production domain and GitHub repository. These were requested and remain pending. Contact placeholders are still visibly marked and non-clickable. Public content/visual review, further loading optimization and a deployment check against the real domain remain outstanding. No remote exists for pushing and no deployment was performed.

Metadata implementation follows the [Next.js sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) and [robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) conventions. Rebuild when publication variables change.
