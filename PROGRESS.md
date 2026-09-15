last completed: Phase 7

# Nabta build progress

## Checkpoints

- [x] DONE — Phase 1: Foundation + bilingual content system.
- [x] DONE — Phase 2: Populate Hero, What Nabta Does, Selected Work, Tutoring, Services + Contact.
- [x] DONE — Phase 3: Motion and Capitolium feel with Motion/CSS; mobile Lighthouse report. Requested site implementation complete; publication prerequisites remain below.

## Future phases — pick one at a time

- [x] DONE — Phase 4: Animated SVG mascot (2D Motion, not 3D).
- [x] DONE — Phase 5: Liquid-glass / shader gradient hero background (React Three Fiber).
- [x] DONE — Phase 6: WebGL particle accent plus the selected playful mascot introduction and landing.
- [x] DONE — Phase 7: R3F sculpted leaf and scroll-driven 3D.
- [ ] TODO — Phase 8: Hero-to-navbar logo morph / shared-element transitions.

Do not start another phase without Nour's explicit go-ahead. Future phases are individually selected, one per session. At each completed phase, update this file, run `git add -A`, commit `Phase N: <what>`, report the checkpoint, and stop. No attribution trailers in commits or project files.

## Active scope

Phase7 is complete: Nour selected the sculpted leaf behind the supplied mascot. Desktop scroll-driven 3D shares the existing canvas; mobile/reduced motion use a static illustration. Phase8 remains deferred. Launch configuration is prepared, but real contact/booking/project links, domain and GitHub destination remain pending. Local preview only. Latest verification: `docs/phase-7-verification.md`.

## Decisions — 2026-09-13

- Nour selected Editorial sprout and authorized manual design checks instead of missing Impeccable and custom agent files.
- Visual focus: oversized serif wordmark. Light: near-black, warm off-white, restrained sprout green, faint cyan. Framing: asymmetric, generous spacing. Feeling: quiet confidence.
- Next.js App Router, TypeScript, Tailwind v4, Motion v12 (`motion/react`).
- English and Arabic routes, one editable `src/content.ts`, no browser storage.
- Global `.codex/memory/general.md` was absent at startup. Existing memory was read from `.claude/memory/general.md`; a Nabta milestone note has now been saved to `.codex/memory/general.md`. This file is the project recovery record.
- Repository is scoped to this folder, initially empty, with no remote configured. Do not invent a GitHub destination.

## Phase 1 implementation checklist

- [x] Scaffold and locked dependencies.
- [x] Typed bilingual config, static locale routes, metadata, language navigation.
- [x] Design tokens, fonts, accessible responsive shell, empty section components.
- [x] Global Motion and CSS reduced-motion policy.
- [x] Production build, lint, type check, route and browser verification.
- [x] README and verification record; saved in the Phase 1 checkpoint commit.

## Phase 1 result

- Branch: `codex/nabta-phase-1`.
- Commit message: `Phase 1: Foundation and bilingual content system`.
- Local preview: `http://127.0.0.1:3000/en` and `/ar`; production preview was left running at handoff.
- `npm run build` completed successfully. Webpack is explicit in build/dev scripts after Turbopack terminated on this Windows host. One rebuild briefly hit OneDrive EPERM during cleanup; directory inspection and an unchanged retry succeeded. No destructive cleanup or framework patch was needed.
- `npm run check` completed successfully (zero lint warnings; TypeScript succeeded).
- Live browser checks covered both locales at 320, 390, 768 and 1440 px; no horizontal overflow, correct document language/direction, all anchor targets present.
- Root redirect, invalid-route 404s, language links, skip link, metadata titles, favicon, no-JavaScript navigation and reduced-motion checks succeeded. No application page errors.
- Browser storage was empty. Source scan found no storage API or WebGL usage.
- Screenshots: `artifacts/2026-09-13/{en,ar}-{390,1440}.png` (local, ignored by git). Manual observations and exact verification are in `docs/phase-1-verification.md`.
- All section bodies remain intentionally empty. Visual appearance awaits Nour's review. No Phase 2+ implementation has begun.
- GitHub push is unavailable because no remote is configured. No deployment performed.

## Resume

Read this file first, then `docs/build-brief.md` and the latest verification record. Inspect git status and the last commit before changing anything. Phases1–7 and the independent launch-preparation checkpoint are implemented. Connect real launch details when Nour supplies them; indexing defaults off. Phase8 requires the next explicit go-ahead. Do not restart the scaffold. Run `npm start` if the local preview is no longer running; use `npm run dev` when editing (stop the production preview first if it occupies port3000).

## Phase7 result — 2026-09-15

- Nour selected option1: sculpted glossy navy leaf, cyan/lime edges, behind the existing mascot. Added custom curved geometry, central vein and rim tubes, lit in the existing R3F canvas. Scroll controls its turn, with smooth convergence and mirrored Arabic placement.
- Reuses desktop render budget, pause and visibility controls. Static SVG fallback for phones/reduced motion/noJS or unavailable WebGL, through next/image. No new runtime dependency; added matching Three.js TypeScript definitions.
- Build, lint and TypeScript succeeded. Both language desktop/mobile screenshots reviewed; GPU draw instrumentation verified pause, reduced motion removed canvas, mobile had no canvas or horizontal overflow. Existing intro verification succeeded, including live reduced motion and noJS content.
- Mobile Lighthouse EN90/AR90, accessibility100/best-practices100, SEO63, CLS0, LCP3.5s/3.4s. LCP remains above target. Mobile scores cover the static fallback, not desktop GPU performance.
- Verification: `docs/phase-7-verification.md`; artifacts: `artifacts/2026-09-15/phase-7/`. Visual approval remains Nour's. No remote/push or deployment; Phase8 not started.

## Launch preparation result — 2026-09-15

- Added validated build-time origin/indexing settings, canonical/hreflang/social metadata, Organization/WebSite JSON-LD, robots and bilingual sitemap. Local preview stays non-indexable; no real domain supplied.
- Removed layout changes during mascot flight, added early responsive image loading. Final intro browser checks and both SEO modes verified; production build/lint/TypeScript succeeded.
- Final mobile Lighthouse EN90/AR88, accessibility100/best-practices100, SEO63. CLS0; LCP3.5s/3.7s remains above target. No claim of improved loading speed or launch readiness.
- Source, verification commands, remaining prerequisites and reports recorded in `docs/launch-preparation.md`. User visual review pending. No Phase7/8, remote/push or deployment.

## Phase 2 result — 2026-09-14

- Exact EN/AR hero taglines added, with a swappable `Mascot` component that returns null.
- Consultancy explanation covers opportunity diagnosis, paid builds, reusable products and a free audit for the first three clients.
- Seven projects populated from a bilingual data array. Six descriptions use local READMEs; Legato uses the supplied Egyptian labour-law scope. No invented performance claims or deployment claims.
- Selected Work uses an asymmetric two-column desktop grid and a single-column mobile list. Horizontal-scroll motion remains Phase 3 work.
- Tutoring identifies Egyptian secondary-school Programming & AI and includes a Book a session CTA with a booking-soon note.
- Services/contact prominently names Nabta and explains its services and Cairo location. Contact details are explicit, non-clickable placeholders. Booking and audit CTAs currently lead to this section.
- Build and `npm run check` succeeded. Both locales tested at 320, 390, 768 and 1440 px with no horizontal overflow, seven project entries and valid anchors. Final CTA, empty mascot, no-JavaScript, reduced-motion and storage checks succeeded. No browser page errors.
- A booking-note CSS specificity issue was corrected and verified at 13px. OneDrive caused another transient rebuild cleanup error; unchanged retry succeeded.
- Verification and source notes: `docs/phase-2-notes.md`. Screenshots in `artifacts/2026-09-13/phase-2-*` were captured during the session before the date changed; local artifacts remain ignored by git.
- Phase 2 commit message: `Phase 2: Populate bilingual content and sections`.
- Preview left running at `http://127.0.0.1:3000/en` and `/ar`. Visual appearance awaits Nour's review.
- Outstanding destinations: seven project links, booking URL, email, WhatsApp, GitHub remote and eventual production domain. These do not block the requested placeholder scope. No push or deployment performed.

## Phase 3 result — 2026-09-14

- Added spring hero entrance, scale/fade on scroll, CSS drifting radial gradients, one parallax layer, staggered section entrances and thin scroll progress.
- Selected Work now travels horizontally with vertical scroll, including reversed Arabic direction and keyboard traversal. Short viewports use native horizontal scrolling; reduced motion and no JavaScript retain a static grid.
- Added fine-pointer cursor accent, magnetic tutoring CTA and expanding link underlines. Live reduced-motion changes remove animations, transforms and pinning.
- Production build, lint and TypeScript checks succeeded. Verified both locales, mobile/desktop/short-screen layouts, no-JavaScript readability, keyboard endpoints and live reduced-motion cleanup. See verification record for evidence.
- Final mobile Lighthouse: English 94, Arabic 88; accessibility 100 and best practices 100 in both. LCP 2.9s/2.8s, CLS 0. Arabic performance remains below 90 and both LCP values exceed the 2.5s target. These are recorded limitations, not claimed resolved.
- Improved initial scores of 84/76 through inline CSS, a static Arabic font weight, native spring entrance animations and system-font decorative arrows. SEO 50 reflects the intentional local preview noindex and deferred production SEO setup.
- Reports and screenshots: `artifacts/2026-09-14/`; final reports in `final/`. Visual appearance awaits Nour's review.
- Commit message: `Phase 3: Add bilingual scroll choreography and motion`.
- Preview remains local at `http://127.0.0.1:3000/en` and `/ar`. No remote exists for pushing. Phase 4+ was not started.

## Phase 4 result — 2026-09-14

- Nour explicitly selected the animated SVG mascot. Replaced the null component with a decorative seed character, two asymmetric leaves, quiet expression and directional green shading.
- One native spring unfurl joins the existing hero entrance. No perpetual mascot animation, new package, remote asset or WebGL. Reduced motion and no JavaScript retain the complete static character.
- Mobile placement is beside the tagline; desktop placement uses the open space beside the wordmark. Corrected a desktop placement issue found in screenshot review.
- Production build, lint and TypeScript succeeded. Browser checks covered EN/AR at 320/390/768/1440px, no text overlap or page overflow, live motion cleanup, active leaf motion and no-JavaScript visibility.
- Fresh mobile Lighthouse EN94/AR92, accessibility100/best-practices100, CLS0. LCP2.9s/3.1s remains above2.5s; SEO50 remains preview-related. Lab variation means the Arabic score increase is not attributed to the mascot.
- Screenshots: `artifacts/2026-09-14/phase-4-{en,ar}-{390,1440}.png`. Reports: `artifacts/2026-09-14/phase-4/`. See `docs/phase-4-verification.md`.
- Visual review remains Nour's. Commit message: `Phase 4: Add animated SVG sprout mascot`. Local preview remains running. No remote for pushing; no deployment. Phase 5+ untouched.

## Phase 4 brand correction — 2026-09-14

- Nour supplied the actual robot mascot sheet, Facebook profile image and cover. The first image governs mascot identity; the other two are supporting brand references.
- Replaced the invented SVG sprout with an isolated raster asset based on the large upper-left robot from the first sheet. Preserves the navy sphere, cyan eyes, single leaf, luminous ear ring and orbit spheres. Asset saved under `public/images/2026-09-14/nabta-mascot.png`, rendered through next/image.
- Applied midnight navy, cool white, cyan and lime throughout shared tokens, hero atmosphere, browser theme and favicon. This explicit brand correction supersedes the earlier green-neutral palette.
- Mascot enters with a gentle spring float/tilt. Reduced motion and no-JavaScript versions remain static. No 3D or Phase 5 work.
- Build, lint and TypeScript succeeded. EN/AR at320/390/768/1440px verified without overlap or horizontal overflow; image loaded in every case. Verified active animation, live reduced cleanup and no-JavaScript image.
- Latest mobile Lighthouse EN92/AR81, accessibility100/best-practices100, CLS0. LCP3.1s/3.4s. Arabic remains below target; run-to-run variance is substantial. Do not reuse older scores as current results.
- Screenshots: `artifacts/2026-09-14/brand-{en,ar}-{390,1440}.png`. Reports in `artifacts/2026-09-14/brand/`. Prompt and verification: `docs/brand-revision.md`.
- Commit message: `Phase 4: Match supplied mascot and brand palette`. Visual identity/cutout approval remains Nour's. No remote configured, no deployment.

## Phase 5 result — 2026-09-14

- Nour explicitly selected Phase 5 and reiterated that the supplied mascot must animate. Added a slow navy/cyan glass-like shader ribbon on desktop and repeating gentle spring float/tilt for the mascot.
- Shader is one deferred React Three Fiber plane, pixel ratio1, at most30 render requests/second. Phones below768px retain CSS background. No particles or 3D mascot/model.
- Bilingual pause/resume freezes hero effects. Mascot and shader scheduling stop offscreen/hidden tab. Reduced motion disables all choreography and removes WebGL. CSS fallback remains for no-JS, load failure, unsupported WebGL and context loss.
- React/React DOM aligned to19.2.8 because Fiber9.7.0 declares peer React>=19<19.3; Next16.3.5 supports this. Installed Three0.184.0. No forced peer overrides; npm audit reported0 vulnerabilities at install.
- Build, lint and TypeScript succeeded. Verified canvas presence only on desktop, EN/AR320/390/768/1440 layout, repeating mascot, pause/resume, offscreen stop, live reduced motion, context loss and no-JS fallback. Fixed pause initially triggering false context-loss fallback.
- Final mobile Lighthouse EN95/AR95, accessibility100/best-practices100, CLS0. LCP2.9s both remains above2.5s; SEO50 is preview-related. Mobile results measure the lighter CSS fallback, not desktop WebGL performance.
- Local screenshots `artifacts/2026-09-14/phase-5-{en,ar}-{390,1440}.png`; reports in `artifacts/2026-09-14/phase-5/`. Detailed verification: `docs/phase-5-verification.md`.
- Commit message: `Phase 5: Add shader hero and continuous mascot motion`. Visual review remains Nour's. Preview left running. No remote for push, no deployment. Phase6+ untouched.

## Phase 6 result — 2026-09-15

- Nour selected the playful loading reveal: supplied mascot swoops, a cyan/lime gust clears oversized bilingual lettering, then it flies into its measured hero position and keeps floating. This explicitly extends Phase6 to include the intro/landing; remaining Phase7 and Phase8 wordmark work stays deferred.
- Added 28 sparse WebGL motes to the existing desktop shader/canvas. The brief intro uses24 lightweight particles on all viewport sizes. No extra rendering dependency or browser storage.
- Bounded font/image readiness, Skip/Escape, keyboard focus containment, inert background, scroll restoration, resize exit, live reduced-motion bypass and no-JavaScript readability implemented. Intro includes a6.5s failsafe rather than blocking indefinitely.
- Production build/lint/TypeScript succeeded. Puppeteer checks verified complete English desktop/Arabic mobile gust and landing, restored usable page, ongoing mascot float, mobile Skip, live reduced-motion cleanup and no-JavaScript content. Refined lettering continuity and gust direction after screenshot review.
- Latest mobile Lighthouse EN92/AR90, accessibility100/best-practices100, SEO50. LCP3.1s/3.4s remains above target; CLS0.058 remains within0.1. Reserving scrollbar space did not eliminate the measured shift, so do not claim zero CLS. No audit warnings.
- Screenshots and browser results in `artifacts/2026-09-15/`; final reports in `phase-6-final/`. Verification: `docs/phase-6-verification.md`.
- Commit message: `Phase 6: Add playful mascot intro and particle reveal`. Visual review remains Nour's. Local preview left running. No remote configured for pushing; no deployment.
