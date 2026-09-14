last completed: Phase 2

# Nabta build progress

## Checkpoints

- [x] DONE — Phase 1: Foundation + bilingual content system.
- [x] DONE — Phase 2: Populate Hero, What Nabta Does, Selected Work, Tutoring, Services + Contact.
- [ ] TODO — Phase 3: Motion and Capitolium feel with Motion/CSS; mobile Lighthouse report. Site complete and shippable after this phase.

## Future phases — pick one at a time

- [ ] TODO — Phase 4: Animated SVG mascot (2D Motion, not 3D).
- [ ] TODO — Phase 5: Liquid-glass / shader gradient hero background (React Three Fiber).
- [ ] TODO — Phase 6: WebGL particle system accent.
- [ ] TODO — Phase 7: R3F 3D hero object and scroll-driven 3D.
- [ ] TODO — Phase 8: Hero-to-navbar logo morph / shared-element transitions.

Do not start another phase without Nour's explicit go-ahead. Future phases are individually selected, one per session. At each completed phase, update this file, run `git add -A`, commit `Phase N: <what>`, report the checkpoint, and stop. No attribution trailers in commits or project files.

## Active scope

Phase 2 is complete. Local preview only; no deployment. Phase 3 motion and all later work remain deferred until the next explicit go-ahead.

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

Read this file first, then `docs/build-brief.md`. Inspect git status and the last commit before changing anything. Phase 2 is complete. Wait for Nour's next go-ahead before beginning Phase 3. Do not restart the scaffold. Run `npm start` if the local preview is no longer running; use `npm run dev` when editing (stop the production preview first if it occupies port 3000).

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
