# Phase 6 — playful mascot introduction and particles

Nour selected the playful reveal: a full-screen introduction, the supplied mascot swooping and sending a gust through large Nabta lettering, followed by a flight into its hero position. This expands Phase 6 and brings forward a mascot landing transition. The future hero-to-navbar wordmark morph and Phase 7 model remain deferred.

## Design and behavior

The supplied robot is the focal subject, with glossy cyan/lime light against midnight navy, oversized editorial lettering and asymmetric framing. Mobile places the mascot above the lettering. The intent is an inviting, confident brand entrance. The raster identity is unchanged; movement and a particle gust communicate the action rather than adding a different face or invented character.

`BrandIntro` waits for font and mascot-image readiness with a 2.5-second bound and a brief minimum introduction. It then performs a spring lean, a 24-element particle gust and lettering exit, followed by a spring flight to the measured hero mascot rectangle. A 6.5-second overall failsafe prevents indefinite blocking. It does not show invented percentage progress.

Skip intro and Escape dismiss the overlay. Underlying header/main/footer are inert during the sequence, focus stays on Skip, scrolling is locked and restored on every exit, and resize ends the sequence to avoid outdated flight coordinates. Reduced motion and no JavaScript bypass the overlay. No browser storage: it appears on a fresh page load, with component state preventing replay after completion during that mounted page's lifetime.

The hero's existing desktop shader also gains 28 sparse procedural motes inside the same canvas and render budget. Phones retain the CSS background; the transient intro gust is lightweight DOM animation. Existing hero pause/resume applies after landing.

## Verification

- Final production webpack build exited0. Lint and TypeScript checks succeeded. A transient OneDrive build-output EPERM cleared on an unchanged retry; no destructive cleanup used.
- `node scripts/verify-intro.mjs` ran the complete gust and landing in English1440px and Arabic390px. After completion, scrolling and focus access were restored, the mascot was visible and its continuous floating animation remained active. No document overflow or application page errors in those checks.
- Escape skip verified in both languages. Clickable Skip verified at320px. Changing reduced motion during the intro removed it and unlocked the page. Fresh reduced-motion loads had no intro, no canvas and zero animations. A JavaScript-disabled load displayed seven projects without an overlay.
- Captured and inspected loading/gust frames. Refined a lettering position jump and changed the gust to travel from the robot through the lettering. Reserved stable scrollbar space to reduce layout movement when the overlay restores page scrolling.
- Saved screenshots: `artifacts/2026-09-15/intro-{en,ar}-{loading,gust,complete}.png`. Machine-readable browser results: `artifacts/2026-09-15/intro-verification.json`.

Agent visual observations are not Nour's approval. Actual on-device graphics performance and image/lighting preference remain for review. The intro deliberately adds an opening moment; its cost is included in the Lighthouse results rather than bypassed for auditing.

## Performance

The first mobile measurement was EN91/AR87, accessibility100 and best-practices100, LCP3.2s/3.4s, CLS0.058. Final measurement: performance EN92/AR90, accessibility100/best-practices100 in both, LCP3.1s/3.4s, TBT110ms/150ms, CLS0.058. No audit warnings. The scrollbar change did not eliminate measured CLS; it remains within0.1. LCP remains above2.5s. SEO50 remains caused by local preview indexing/production SEO limitations. No claim of field Core Web Vitals or production deployment.

Audit reports are local under `artifacts/2026-09-15/phase-6-final/`. Future phases remain untouched. No remote exists for GitHub push.
