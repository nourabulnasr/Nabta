# Nabta progress — 19 November 2026

Current handover: START-HERE-HANDOVER.md.
Latest published checkpoint: docs/website-checkpoint-2026-11-19.md. Cloudflare sign-in and publication are complete.
Platform and performance baseline: docs/release-2026-10-06.md.
Older history: docs/progress-history-through-2026-09-28.md.

## Live release

Cloudflare Worker nabta: https://nabta.nourabulnasr.workers.dev/en and /ar.
Active version: f13adf58-e776-45eb-bca5-15ab280a5914, checked source402af12.
Source branch: codex/nabta-phase-1. Main is historical.
The 19November release includes bilingual studio landing pages, Strata first among eleven websites, patched dependencies, and the completed first-paint optimization. Six live mobile Lighthouse runs met LCP≤2.5s: EN1.54–1.91s and AR1.53–2.07s. Performance99–100; accessibility/best-practices/SEO100. Mascot gust/flight/landing/float, skip, reduced-motion and no-JS checks succeeded. Field INP remains unmeasured. Later sections retain historical measurements; this paragraph supersedes their current-status implications.

## Completed

Bilingual public site, supplied animated mascot/intro, responsive Work dropdown, ten website previews and eleven AI Visuals films, verified GitHub destinations, the new supplied founder portrait plus the same consultation thumbnail, Cal.com and InstaPay links, FAQ/privacy/terms, student-library preparation state, responsive images, metadata and security headers.

Student platform code and database are prepared: email OTP/Turnstile, owner MFA, row-level permissions, manual InstaPay approval/revocation, private Supabase/R2 video streaming, lesson publishing and paginated orders. It stays disabled until services and real media are connected.

Lint/types/build, 27 PostgreSQL permission/payment assertions, input validation, browser security/SEO, responsive EN/AR, deep links, keyboard/no-JS access, mascot/3D fallback and known-pattern secret scans completed. Real provider email/payment/video acceptance tests remain dependent on accounts and media.

## Performance and security limits

19 October fresh single-run mobile checks: EN 65 / AR 66, LCP 5.8 / 5.9 seconds, CLS 0, TBT 170 / 90 ms. Accessibility, best practices and SEO scored 100 in both. These are single samples, not a three-run median; the speed target is not met. The previous 7 October three-run medians were EN 78 / AR 75. Field INP is unmeasured. The fresh reports flag uncompressed document delivery in Chrome, while direct Node requests negotiated Brotli/Zstandard; investigate that discrepancy before changing compression behavior.

One unpatched upstream braces build-tool advisory remains under an exact exception expiring 20 October 2026. No zero-vulnerability or perfect screen-recording-protection claim.

## Agreed rules and next actions

Live and recorded tutoring are separate EGP 250 purchases. The recorded course has 20 planned lessons, 1–2 hours each, lifetime access and an EGP 4,500 bundle. No recording purchase before publication.

Consultancy stays free: 30 minutes, daily 17:00–00:00 Cairo, 24-hour notice, Google Meet via Cal.com.

Owner actions and dependent follow-through are listed in START-HERE-HANDOVER.md. No paid services, billing changes, real test booking or unsolicited email was activated. Further speed improvement remains a technical opportunity.

## 19 November prepared checkpoint
Studio landing pages and Strata portfolio integration are implemented and checked locally. Dependencies were patched and npm audit reports zero known vulnerabilities. Cloudflare authentication is required to publish. Local mobile samples86/84, LCP3.8/4.2seconds, target still pending. Read docs/website-checkpoint-2026-11-19.md for exact verification limits and owner/technical follow-through. Google Ads and outreach are deferred.


## Published verification — 19 November 2026
Published checked source a8dbd11 to Cloudflare Worker version 2e976338-5ea4-4e04-ba87-661e4daed3a2 after successful OAuth login. Both studio routes are live. Live EN/AR phone/desktop studio checks, axe, keyboard details, no-JS content, security headers/nonces/hydration/404, SEO/sitemap and all eleven film byte-range checks succeeded.

Fresh single-run live mobile results were EN60/LCP5.9s/TBT440ms and AR58/LCP6.2s/TBT500ms. Both had CLS0 and accessibility/best-practices/SEO100. These measured results supersede any expectation based on the faster local samples. The public site is deployed, while mobile performance remains unfinished. Field INP is unmeasured. Rendering/CSS duplication is a diagnostic hypothesis requiring a measured implementation before claiming improvement.

Cloudflare sign-in is resolved. Owner content/account requirements listed above still apply. Ads and outreach remain deferred.
