# Portfolio media release — 19 October 2026

## Changes

- Added all eleven MP4 files supplied in `C:\Users\noura\OneDrive\Desktop\AI visuals` to the bilingual AI Visuals section.
- Created a screening-room layout with a large native player, a scrollable film index on desktop and a horizontal selector on phones. Only one player exists at a time; selecting another film pauses and removes the old player. Playback is user initiated, with `preload="none"`, native controls and full-frame portrait playback.
- Subtle spring transitions respect reduced-motion preferences. Keyboard selection, visible focus, error fallback and direct film links without JavaScript are included.
- Prepared WebP posters/thumbnails and lossless H.264/AAC stream-copy MP4 files with fast-start metadata. Total supplied media is about 29 MB; visitors do not download the collection on page load. No new media service or billable product was activated.
- Descriptive English/Arabic titles are editorial labels, not claims that a brand commissioned the work. Audio was preserved; spoken-content transcription/caption completeness has not been verified.
- Replaced the founder image and consultation thumbnail with the supplied 19 October portrait, using new filenames and 400/640/960-pixel WebP versions.
- Added Nightjar Passage immediately after Vesper Acoustics, with a real loaded homepage screenshot and 480/960/1440-pixel previews. It is described as a luxury sleeper-train concept. Royal Falcon, Power of Sea Moss and Elserafy remain the last three websites.

## Verification

Completed lint/TypeScript, Cloudflare production build and read-only independent code review. Browser checks at 390 and 1440 pixels in English and Arabic exercised all eleven films, keyboard selection, no eager video transfers, actual playback, stop-on-switch, full-frame portrait films, reduced motion, updated portraits and layout overflow. Additional checks verified normal-motion switching and access to all films with JavaScript disabled.

The existing portfolio, deployment/security-header and SEO checks completed locally. PostgreSQL permission/payment tests completed (27 assertions), as did input validation and the configured-pattern source/history/browser-build scan. No public source maps or configured secret patterns were found; this is not a guarantee that every secret format is detectable.

The release was staged outside OneDrive. All 133 server JavaScript files match the checked build byte for byte, and all 132 additional modules appear in Wrangler's dry-run upload table. All eleven films match the staged public assets.

Published Worker version: 78a767b9-c2de-4d69-b8a5-472118ed60b9. Live: https://nabta.nourabulnasr.workers.dev/en#ai-visuals and /ar#ai-visuals. This replaces the initial media release e571a0c9-d48c-4daa-909e-00f344f58534 with the streaming correction.

All eleven live films returned exact prefix/suffix byte ranges with correct lengths and rejected unsatisfiable ranges. The live portrait and Nightjar preview match local files byte for byte. The final live EN/AR gallery, security-header/hydration and SEO checks completed successfully. The final configured-pattern scan completed with a constrained Node heap after an initial Windows paging-file exhaustion; no OS memory settings were changed.

## Public video delivery

The first live release exposed a Cloudflare static-asset behavior: a Range request returned the entire film with HTTP 200. The correction uses an exact public-film allowlist in `worker.ts`, with selective `run_worker_first` routing. It streams the requested range without buffering the full file, preserves HTTP preconditions, cancels upstream reads when complete and uses `FixedLengthStream` for accurate response lengths. Paid lesson routes and permissions are separate.

The assets binding may omit Content-Length internally, so a generated manifest supplies checked byte sizes. Run `node scripts/prepare-film-manifest.mjs` after changing films. The validation workflow rejects stale sizes or catalogue differences. Local workerd tests verified prefix/suffix bytes, Content-Length and invalid ranges for all eleven films. Actual Safari-device playback has not been tested.

References: [Cloudflare asset routing](https://developers.cloudflare.com/workers/static-assets/binding/) and [response framing](https://developers.cloudflare.com/workers/runtime-apis/response/#set-the-content-length-header).

## Remaining work beyond lesson recordings

Owner inputs: homepage introduction film; owned Supabase/auth-email/Turnstile setup; private-video capacity/account decisions; live-tutoring format, duration, place and change rules; InstaPay recipient display name; factual biography/policy confirmation; and authorization for a real Cal.com test appointment. Optional: preferred film credits/titles and speech captions where needed, COD repository URL, search-console ownership and a scoped deployment token.

Dependent implementation: activate and configure those services; enroll owner MFA; verify real two-account sign-in, payment approval, private playback, revocation and backup restore; publish the introduction film when supplied. The student platform remains disabled until these are ready.

Independent technical work: improve and remeasure mobile performance; resolve the upstream build-tool advisory when an appropriate patch is available. On 19 October the npm registry still reports braces 3.0.3 as latest, with no patched release for the documented advisory. The exact exception expires 20 October 2026 and was not extended. 19 October fresh single-run mobile checks: EN 65 / AR 66, LCP 5.8 / 5.9 seconds, CLS 0, TBT 170 / 90 ms. Accessibility, best practices and SEO scored 100 in both. These are single samples, not a three-run median; the speed target is not met. The previous 7 October three-run medians were EN 78 / AR 75. Field INP is unmeasured. The fresh reports flag uncompressed document delivery in Chrome, while direct Node requests negotiated Brotli/Zstandard; investigate that discrepancy before changing compression behavior.

## Evidence and files

Current source: `codex/nabta-phase-1` in `C:\Users\noura\OneDrive\Documents\ChatGPT\Nabta`.
Local evidence: `artifacts/2026-10-19/` (ignored by Git).
Public portfolio assets: `public/media/visuals/`, `public/images/visuals/`, `public/images/founder/portrait-20261019.webp` and `public/images/websites/nightjar-passage.jpg`, plus responsive variants.
Original portrait: `reference-inputs-local/2026-10-19/founder-original.jpg` (ignored). Original film filenames, dimensions and durations are recorded in the local media inventory; source files remain in the supplied desktop folder.
