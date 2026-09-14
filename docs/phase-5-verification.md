# Phase 5 — shader hero and mascot loop

Nour explicitly selected Phase 5 and requested continued mascot animation. The existing supplied robot asset stays intact. Its native spring animation now repeats with reverse playback (8px vertical travel and a restrained tilt), stops outside the hero/hidden tab, and respects reduced motion. The existing hero entrance remains.

The visual concept is a translucent-looking cyan ribbon with a restrained lime edge over navy. This is a procedural shader gradient, not physical refraction or a 3D model. It preserves readable contrast behind the wordmark. The subject remains the mascot; lighting is cyan against navy, framing is asymmetrical, and the intended feeling is calm technical confidence.

## Implementation

- `hero-background.tsx` lazily imports the renderer after browser idle, only on viewports768px and above with motion allowed and the hero visible. A timer fallback supports browsers without requestIdleCallback. Import failure leaves CSS intact.
- `hero-shader.tsx` renders a single plane at pixel ratio1 with antialiasing disabled and low-power preference. Demand rendering requests at most30fps while active. GPU time uniforms mutate without React rerenders.
- Bilingual pause/resume in content.ts freezes hero effects and stops mascot animation. Pausing retains the existing canvas. Reduced motion removes the renderer; no-JS/mobile use CSS. A boundary and Canvas fallback cover unavailable graphics. Context loss removes the canvas and leaves the underlying gradient.
- React and React DOM were aligned to19.2.8 after Fiber9.7.0 rejected React19.3. Next16.3.5 declares support for React19.2. No force/legacy-peer-deps overrides. Three0.184.0 installed; npm audit reported0 vulnerabilities at install.

Renderer choices follow the official [Canvas documentation](https://r3f.docs.pmnd.rs/api/canvas) and [demand-rendering guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance).

## Verification

- Final npm run check and production webpack build exited0. Lint rerun after adding the browser check also exited0.
- `scripts/verify-hero-effects.cjs` verified infinite mascot iterations, pause/resume, offscreen stopping, zero animations under reduced motion, WebGL removal/recreation on live preference changes, and simulated context-loss fallback.
- Fixed a pause/resume defect caught by the first browser test: normal canvas disposal was being classified as context loss. Pause now freezes the canvas and context listeners clean up when the renderer unmounts.
- Both languages tested at320/390/768/1440px with no document overflow, 44px pause controls, canvas on desktop and none on phones. Screenshots captured for390/1440.
- Active shader screenshots changed over time. A fixed unobstructed background region was byte-identical across paused screenshots after controls settled. An earlier whole-canvas screenshot comparison included other page layers and was not a valid shader-only check.
- JavaScript-disabled Arabic at390px displayed the mascot and seven projects with zero canvases.
- No application errors in final browser run. Expected context-loss warnings were produced during deliberate graphics-loss testing. Hidden-tab scheduling also has a visibilitychange listener with cleanup; no real-device battery or GPU benchmark claimed.
- Desktop English screenshot manually reviewed: subtle cyan ribbon, readable white display type, supplied mascot. Mobile layout retains the lightweight gradient and pause control. Visual approval remains Nour's.

## Lighthouse mobile

Production localhost, fresh Chrome, Lighthouse13.4.1 default mobile simulation. These measurements use the mobile CSS fallback, not desktop shader execution.

| Metric | English | Arabic |
| --- | ---: | ---: |
| Performance | 95 | 95 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 50 | 50 |
| FCP | 1.4s | 1.5s |
| LCP | 2.9s | 2.9s |
| TBT | 90ms | 60ms |
| CLS | 0 | 0 |

No audit warnings. LCP remains above2.5s; no claim of field Core Web Vitals. SEO remains intentionally limited by preview noindex and deferred production setup. Reports: `artifacts/2026-09-14/phase-5/lighthouse-{en,ar}.{json,html}`. Screenshots: `artifacts/2026-09-14/phase-5-{en,ar}-{390,1440}.png`.

No Phase6+ implementation, deployment or GitHub destination. Local preview only.
