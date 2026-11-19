# Nabta website checkpoint — 19 November 2026

## Current published result
The mobile homepage LCP task is complete against all six fresh-browser Lighthouse runs on the public EN/AR URLs. Worker f13adf58-e776-45eb-bca5-15ab280a5914 runs the exact CI-tested source402af12. The older preparation/blocker sections below are historical and superseded by this result.

| Locale | LCP run1 | LCP run2 | LCP run3 | Performance |
|---|---:|---:|---:|---:|
| English | 1762.624ms | 1905.186ms | 1543.404ms | 100 / 99 / 100 |
| Arabic | 1902.836ms | 2068.938ms | 1534.638ms | 99 / 99 / 100 |

All runs: accessibility/best-practices/SEO100, TBT30–40ms, CLS≤0.02422. The strict gate requires each LCP≤2500ms, CLS<0.1 and performance≥90. These are mobile laboratory measurements, not field INP or a guarantee across every device/network.

Live evidence: https://github.com/nourabulnasr/Nabta/actions/runs/44613054045/attempts/2 (job135882210288). Reports and screenshots are also saved in artifacts/2026-11-19/published-mobile-quality-final/ and its ZIP. Re-running the budget checker against the downloaded reports succeeded. The first live attempt failed two outliers and remains saved separately; the successful attempt followed a real decode-order/preload fix and a new deployment.

Implementation: shared critical opening CSS paints before the full stylesheet, explicit streaming gzip, bounded image-decode readiness, deferred module hydration after paint and stylesheet readiness, inline opening image and removal of obsolete high-priority WebP preloads. The original hero image quality is retained. Optional font-loading failure no longer cancels the intro. No-JS, reduced-motion, print and timeout fallbacks are retained.

Verification: source402af12 validation/build/security and six-run local production acceptance succeeded in CI44614390750. Published behavior/security/SEO and mascot gust/landing/continuing float/skip/reduced-motion/no-JS checks succeeded before the live mobile gate. No new paid services, real appointments, ads or outreach were activated. Owner-dependent content/service inputs remain listed in START-HERE-HANDOVER.md.

## Prepared changes
- Added /en/studios and /ar/studios for architecture and interiors studios. Existing Nabta palette/type, two project previews, native expandable approach details, mobile/RTL layouts, free review request through WhatsApp and email, and a homepage portfolio link.
- The review CTA asks Nour to agree a meeting time. The existing Cal.com event remains specifically for AI consultancy.
- Added Service structured data, per-language canonical/hreflang/Open Graph/Twitter metadata, and both studio routes to the sitemap.
- Completed the pending Strata Atelier portfolio entry with responsive homepage previews. It appears first, while Royal Falcon, Power of Sea Moss and Elserafy remain last.
- Updated Next16.4.6, React/RSC19.3.1, vinext1.4.6 and compatible Cloudflare/build peers to address fresh security advisories. Updated vulnerable transitive dependencies, including narrowly targeted fflate0.7.5 and undici7.30.1 overrides. npm audit reports zero known vulnerabilities on 19November. The expired audit exception was removed from the checker.
- Added negotiated streaming gzip for HTML responses in the Cloudflare Worker. It respects client encoding preferences and preserves security and cache headers. Public-video range delivery remains separate.

## Verification
Lint and TypeScript succeeded. Production build succeeded with a 320MB Node heap and one build thread after a 512MB attempt exhausted native allocator memory. Independent source review found no critical/high issues.
Local EN/AR studio tests at390/1440 verified keyboard details, no-JS content, correct WhatsApp requests, sitemap/canonical/schema and zero axe WCAG2A/AA/2.1AA violations. These automated checks do not establish complete accessibility conformance or visual approval.
Portfolio checks verified11websites and11software entries in both languages at390/1440. Existing deployment/CSP/nonce/hydration/404 and SEO checks succeeded. Gallery checks verified11films, on-demand playback, stopping on selection, native keyboard controls and mobile/RTL layouts. All11video prefix/suffix byte ranges and416 responses match original files.
PostgreSQL tests completed27permissions/payment assertions, plus input validation and public-video unit checks. Configured-pattern source/history/browser-build scan found no configured secret patterns or public source maps.
Actual local Worker HTML responses decode successfully with gzip and gzip;q=0.5. identity and gzip;q=0 stay uncompressed. Live compression requires publication and live verification.
A later optional repeat of the unchanged mascot-intro browser suite failed because the Chrome target closed under host memory pressure. The introduction source was preserved. Current startup tests/page checks and screenshots succeeded, but this repeat is not claimed successful.

## Performance measurements
Fresh pre-change production mobile samples: EN66/LCP5.9s/FCP4.4s, AR67/LCP6.3s/FCP3.9s. Local updated production-build mobile samples: EN86/LCP3.8s/FCP1.8s, AR84/LCP4.2s/FCP2.0s. Both updated samples have TBT0ms, CLS0 and accessibility/best-practices/SEO100. One run per language, different local/live transport conditions. This comparison is not a verified live improvement or a three-run median.
LCP remains above2.5seconds. The intro robot is already present in server HTML, eager and high priority, with approximately16ms discovery delay and19ms local transfer. The measured render delay is about1.2seconds. A performance trace is the next diagnostic step, focusing on style/layout and painting before the first mascot paint. Removing the requested intro or its loader hold is not supported by that evidence. Field INP is unmeasured.

## Publication and backup
Publication is blocked by missing current Cloudflare authentication. Wrangler deploy returned that a token/login is required. The checked build is staged outside OneDrive at the Windows temporary folder nabta-studio-release-2026-11-19. All149serverJSfiles match the build byte for byte and all148additionalmodules appear in the upload dry-run table. No new Worker version was activated.
Last verified live version remains78a767b9-c2de-4d69-b8a5-472118ed60b9, subject to a fresh provider check after sign-in.
After owner sign-in, upload the checked build with existing Worker settings retained, then repeat live header/SEO/studio/gallery/range checks and mobile measurements. If the staged copy is unavailable, rebuild with the current lockfile and production publication variables.
Local evidence is under artifacts/2026-11-19 and is ignored by Git.

## Remaining owner inputs and technical work
Owner: Cloudflare sign-in to publish this checkpoint, homepage introduction film, real course content, owned Supabase/authentication-email/Turnstile/private-video services, live-tutoring format/duration/place/change rules, InstaPay recipient display name and factual biography/policy confirmation, authorized real Cal.com acceptance appointment.
Technical: finish LCP trace-driven optimization and verify live performance, connect owner services, enroll adminMFA, run actual two-account sign-in/payment/private-playback/revocation and backup-restore acceptance tests. Student services stay disabled until connected tests are complete.
Google Ads and outreach were explicitly deferred by Nour until the website step is complete.


## Published verification — 19 November 2026
Published checked source a8dbd11 to Cloudflare Worker version 2e976338-5ea4-4e04-ba87-661e4daed3a2 after successful OAuth login. Both studio routes are live. Live EN/AR phone/desktop studio checks, axe, keyboard details, no-JS content, security headers/nonces/hydration/404, SEO/sitemap and all eleven film byte-range checks succeeded.

Fresh single-run live mobile results were EN60/LCP5.9s/TBT440ms and AR58/LCP6.2s/TBT500ms. Both had CLS0 and accessibility/best-practices/SEO100. These measured results supersede any expectation based on the faster local samples. The public site is deployed, while mobile performance remains unfinished. Field INP is unmeasured. Rendering/CSS duplication is a diagnostic hypothesis requiring a measured implementation before claiming improvement.

Cloudflare sign-in is resolved. Owner content/account requirements listed above still apply. Ads and outreach remain deferred.

## First-paint investigation continues
LCP remains unfinished. Local diagnostic changes inline the opening mascot, suppress redundant module preloading, and postpone covered-page layout, with no-JavaScript, print and seven-second timeout fallbacks. An unsuccessful server-delay experiment was removed; a display-none experiment introduced layout shift and was rejected. No new performance experiment has been published.

Windows virtual-memory exhaustion caused diagnostic process crashes, so `.github/workflows/performance-investigation.yml` builds the same source on a clean runner and compares three simulated-mobile runs per language against a loopback-only critical-CSS/deferred-hydration proxy. Reports are retained as CI artifacts. These are diagnostic comparisons, not production acceptance. Next: inspect clean-runner evidence, implement only verified improvements, review and test the complete mascot flow, then deploy and measure live EN/AR against LCP ≤2,500ms.
