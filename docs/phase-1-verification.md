# Phase 1 verification — 2026-09-13

## Scope

Foundation only: bilingual content configuration, static pages, design tokens, fonts, navigation, empty section bodies, and reduced-motion infrastructure. Visual findings below are observations for Nour to review, not visual approval.

## Build and source checks

- `npm run lint`: exit 0, no warnings after naming the PostCSS config export.
- `npm run typecheck`: route types generated, TypeScript exit 0.
- `npm run build`: exit 0 using webpack, static `/en` and `/ar` generated.
- `git diff --check`: no whitespace errors.
- `npm install`: 362 packages added, dependency audit reported zero vulnerabilities at installation. npm reports ESLint 9 is outside support; it remains compatible with this Next.js configuration. Reassess tooling during future dependency maintenance.
- Source scan for `localStorage`, `sessionStorage`, canvas, Three.js and scroll choreography: no matches.
- Copy review: all authored UI text, accessibility labels and page metadata are in `src/content.ts`; the default framework 404 is Next.js-owned.
- React review: sections are server components, client boundary limited to Motion provider and Next Link; feature bundle is loaded asynchronously; no client data fetching, effects, or application state.

## Build environment findings

The initial Turbopack worker reported an out-of-memory termination. An unrestricted retry also terminated without a useful diagnostic. Switching to Next.js's supported webpack build compiled successfully; both `dev` and `build` explicitly use webpack. This isolates the bundler failure but does not establish its underlying cause.

One subsequent rebuild hit `EPERM` while cleaning `.next/server/app` under OneDrive. The path showed OneDrive reparse attributes. A later Node directory/stat inspection reported a normal directory, and an unchanged retry completed. This was transient; no generated files were manually deleted and no dependency source was patched. If it recurs, stop preview processes, allow OneDrive to settle, and retry before changing source.

## Browser verification

Production preview at `http://127.0.0.1:3000`, tested with Chromium automation.

| Check | Observed result |
| --- | --- |
| `/` | 307 redirect to `/en` |
| `/en`, `/ar` | Rendered successfully with expected headings |
| `/fr`, `/en/missing` | HTTP 404 |
| `/icon.svg` | HTTP 200 |
| EN and AR at 320, 390, 768, 1440 px | Document content width stayed within viewport |
| EN document | `lang=en`, `dir=ltr` |
| AR document | `lang=ar`, `dir=rtl` |
| Language switching in both directions | URL, document direction and localized title updated |
| Anchor targets | All hash links resolve to existing IDs |
| Work navigation | Reached `#work`, target near viewport top |
| Keyboard Tab | Skip link first, visible at top 16px with solid focus outline |
| Skip-link activation | Focus moved to `main-content` |
| Reduced-motion preference | Matched; zero animations; all computed CSS animations/transitions disabled |
| Storage after navigation | Zero local-storage and session-storage entries |
| JavaScript disabled | English heading rendered; Arabic language link still navigated |
| Application page errors | Zero |

The contrast-measurement test created a temporary detached canvas and caused a browser performance advisory about `getImageData`. This was test instrumentation, not application code; no canvas is present in the website.

## Manual design checks

These replace the unavailable Impeccable suite with Nour's authorization.

- **Audit:** semantic landmarks, one H1, sequential H2 sections, working skip link, visible focus and correct RTL. Section bodies are empty per the phase scope.
- **Color:** browser conversion confirmed the ground is RGB `(10, 12, 11)`, exactly `#0A0C0B`. Text contrast against the ground: warm ink 15.91:1, muted 7.36:1, sprout 10.25:1, mist 7.76:1. Only sprout green is saturated.
- **Typeset:** Fraunces wordmark and headings, Manrope body, Noto Sans Arabic. Arabic uses natural letter spacing and increased line height. Screenshots showed no clipped headings at tested sizes.
- **Animate:** no choreography in this phase. Global CSS disables animation/transitions for reduced motion; MotionConfig and LazyMotion are ready. Phase 3 still must use `useReducedMotion` for effects MotionConfig does not disable, including opacity and pointer behavior.
- **Polish:** wordmark carries the visual weight, navigation remains restrained, work has a subtle surface change, tutoring is offset on desktop, lower content stays empty. No invented claims, project cards, contact details or decorative imagery.

## Saved visual evidence

- `artifacts/2026-09-13/en-390.png`
- `artifacts/2026-09-13/en-1440.png`
- `artifacts/2026-09-13/ar-390.png`
- `artifacts/2026-09-13/ar-1440.png`

These are local screenshot artifacts, ignored by git. Nour has not yet reviewed the rendered result. Lighthouse is explicitly scheduled for Phase 3; no Lighthouse score or real-device Core Web Vitals result is claimed here.
