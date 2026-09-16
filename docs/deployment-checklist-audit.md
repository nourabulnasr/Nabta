# Deployment checklist audit — 16 September 2026

Source: Nour's ten-page `deployment-checklist.pdf`. Scope is the existing bilingual Nabta marketing website. Booking, paid recordings, accounts and founder presentation remain saved in `next-scope-2026-09-16.md` for later implementation.

This is a local implementation and verification record, not a production security certification. No hosting account, Git remote or production URL is connected.

## Security coverage

| Checklist area | Current implementation or remaining requirement |
| --- | --- |
| Client secrets, environment separation, history and bundle review | No application credentials required. `.env*` ignored except the example; public configuration is validated. Added redacted known-pattern scanning of working files, all local Git history blobs and production browser assets. Pattern scanning cannot prove absence of every secret. Remote history is unavailable. |
| Secret rotation, temporary keys, incident response | Release runbook records revocation and rotation procedure. No application service keys to rotate now; account inventory requires the owner's connected services. |
| Authentication, email verification, breached passwords, CAPTCHA, reset expiry, redirects, session expiry, refresh reuse, admin MFA | Not applicable to the current public site. Mandatory acceptance gates for the deferred customer/admin platform; no pretend login or permissive placeholder endpoints added. |
| RLS, ownership, read/write policies, column protection, private schemas, views, definer functions, shared authorization layer, two-user denial tests | No database or application API exists. Deferred platform gates recorded in the runbook. Correction to the source: PostgreSQL with RLS enabled and no applicable policy defaults to **deny**, not public access. |
| Input schemas, HTML sanitation, SQL, redirects, proxy requests, uploads | No forms, database queries, user HTML or uploads. Remote image optimization disabled, local image paths restricted, redirects derive from validated server configuration. Apply full input/upload controls when those surfaces exist. |
| Webhook signatures, timestamp checks, idempotency, write rate limits, query timeouts | No webhook/payment/write endpoints. Required before paid learning or booking launch. |
| Generic errors and source maps | Recoverable bilingual 404 and no public production source maps. Server exception details are not intentionally exposed. Operational error logging remains hosting work. |
| HTTPS, HSTS, security headers | Added nosniff, frame denial, referrer and permissions policies. HSTS and upgrade-insecure-requests enabled on Vercel. Actual HTTP-to-HTTPS behavior and live headers must be verified after deployment. |
| CSP | Per-request cryptographic nonce, strict-dynamic, object/base/frame restrictions. Production script policy permits neither unsafe-inline nor unsafe-eval. Inline styles remain allowed because Motion/Three update style attributes. Nonces require dynamic HTML and no shared HTML caching. |
| CORS, cookies, CSRF | No cross-origin API grants, application cookies or state-changing forms. Secure/HttpOnly/SameSite cookies and CSRF protection are future backend gates. |
| Preview protection, production data isolation | Vercel preview/development cannot become indexable even if the index flag is set. No production data exists. **Noindex is not access protection:** enable Vercel Authentication for preview deployments in the hosting dashboard. |
| Account ownership, least privilege, OAuth, registrar MFA, DNS CAA, mail authentication, firewall, DB networking/pooling | Requires real accounts/infrastructure. Generated Vercel subdomains do not provide ownership of vercel.app DNS. Mail provider and database have not been selected. |
| Dependencies, runtime, lockfile, CI | Exact dependency versions and Node 22 major declared; lockfile retained. Added weekly Dependabot and SHA-pinned GitHub Actions for lint/types/build/audit/secret scan. These activate only after the repository is connected. Keep the existing compatible React/Fiber pair; do not force incompatible latest major releases. |
| Logs, alerts, backups, restore, rollback | Procedures in the release runbook. Hosting alerts and remote code backup still require setup. Database backup/restore applies when persistent data is introduced. |

## Search, performance and content coverage

| Checklist area | Current implementation or remaining requirement |
| --- | --- |
| Canonical hostname and duplicates | Validated SITE_URL; Vercel production alternate hosts redirect permanently to the configured host. Locale canonical URLs and reciprocal en/ar/x-default alternates. Verify real host aliases after deployment. |
| Indexing and preview safety | Default noindex; preview override; production indexability is explicit. Robots and sitemap share the same configuration. No private application routes exist. |
| Sitemap, crawlable routes, lastmod, robots | Only public locale URLs enter the production sitemap. No fabricated last-modified dates. Production robots permit assets and crawling; preview robots disallow. Sitemap submission requires the real URL. |
| URL quality, raw HTML, titles/descriptions, H1, language/direction | Existing EN/AR server-rendered content, localized metadata, one H1, clean locale paths and correct lang/dir retained. |
| Social metadata, icons, manifest, theme | Open Graph and Twitter metadata retained; added web manifest and Apple touch icon from the existing brand icon. Local social images remain used. |
| Structured data | Organization and WebSite retained; verified contact details, logo and visible Service entities included. Stable IDs use the configured origin. No fabricated sameAs profiles, reviews, breadcrumbs or SearchAction for nonexistent features. |
| LCP, CLS, INP, bundle cost | Intro image now present in initial HTML, with reduced-motion and no-JavaScript fallbacks. Existing responsive next/image, next/font, lazy desktop WebGL and light mobile fallback retained. Fresh lab results recorded separately. Field p75/INP and regression monitoring require production traffic; lab scores do not establish field compliance. |
| Static/ISR and caching | Nonce CSP requires dynamic HTML. Static assets remain cacheable; HTML is private/no-store. This is an explicit security/performance tradeoff, not an accidental loss of caching. |
| Content intent, internal anchors, alt text, mobile/accessibility | Existing bilingual services/work/contact and named links retained. Branded 404 provides both home links. No internal search, pagination or dated articles exist. Do not add fake controls or dates to satisfy generic checklist items. |
| Founder expertise, portfolio evidence, original material | Saved for the later founder checkpoint. Need Nour's headshot/bio and real public project/repository URLs. Do not invent testimonials, credentials, results or profile links. |
| AI discoverability and FAQ | Public text is server-rendered. Production robots currently allow crawlers; separate training-bot restrictions are an owner policy decision. Dedicated FAQ/new factual claims should follow confirmed booking/course offerings. No promise of inclusion in AI answers. |
| Search Console, Bing, analytics, consent, conversion events | Account setup pending. For a generated Vercel subdomain use URL-prefix verification where DNS ownership is unavailable. No tracking scripts or cookies introduced. Define and verify contact/booking/purchase events only with the selected analytics and implemented flows. |
| Weekly indexing review, uptime, crawl baseline, real-world alerts | Local checks added; remote monitoring and search-console reviews require deployment. See runbook. |

## Remaining release gates

1. Connect Nour's GitHub repository and Vercel project; configure ownership/MFA, preview access protection and environment scopes.
2. Set the actual HTTPS SITE_URL and enable SITE_INDEXABLE only for production; inspect the deployed redirects, headers, canonicals, sitemap and both languages.
3. Configure uptime/error monitoring and Search Console/Bing; decide analytics/consent and crawler policy.
4. Re-run mobile Lighthouse when local memory is available (this attempt could not finish), evaluate the target and collect real-user field metrics after launch. See `checklist-verification-2026-09-16.md` for exact evidence.
5. Return to saved booking/course/founder requirements. Those systems need their own security and end-to-end acceptance checks before launch.

Reference for the RLS correction: https://www.postgresql.org/docs/18/ddl-rowsecurity.html

Reference for nonce rendering tradeoff: https://nextjs.org/docs/app/guides/content-security-policy
