# Nabta progress — 19 October 2026

Current handover: START-HERE-HANDOVER.md.
Latest portfolio release: docs/media-release-2026-10-19.md.
Platform and performance baseline: docs/release-2026-10-06.md.
Older history: docs/progress-history-through-2026-09-28.md.

## Live release

Cloudflare Worker nabta: https://nabta.nourabulnasr.workers.dev/en and /ar.
Active version: 78a767b9-c2de-4d69-b8a5-472118ed60b9.
Source branch: codex/nabta-phase-1. Main is historical.
The 19 October release adds eleven supplied films to AI Visuals, replaces the single founder/consultation portrait, and adds Nightjar after Vesper. The ten websites retain Royal Falcon, Power of Sea Moss and Elserafy last. A narrowly scoped public-video streaming handler supports byte ranges without buffering entire films.

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
