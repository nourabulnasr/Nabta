# Phase 4 — SVG mascot

Implemented on 2026-09-14 after Nour explicitly selected Phase 4.

The existing Mascot component now renders a decorative inline SVG seed with two asymmetric leaves, green directional shading and a quiet expression. Unique React IDs isolate gradient references. Its crown unfurls once using the existing native Motion spring API. The completed SVG is present in server HTML, hidden from assistive technology, and is not focusable. No new dependencies, raster downloads or WebGL.

The four visual layers follow Editorial sprout: seed character as subject; soft upper-left light; small asymmetric framing beside the dominant wordmark; quiet growth and approachability. On phones it sits beside the tagline. Initial desktop screenshots revealed clipping below the fold, corrected by placing the slot alongside the wordmark at tablet widths and above.

## Verification

- `npm run check`: ESLint and TypeScript completed with exit 0.
- Final `npm run build`: both locales statically generated, exit 0.
- EN/AR at 320, 390, 768 and 1440px: no horizontal document overflow, no mascot/text overlap. At 900px viewport height the final mascot bottom was below 600px in every case.
- Active native leaf animation observed: transform matrix approximately `(0.827, -0.155, 0.155, 0.827, 0, 0)` during unfurl.
- Changing reduced motion live removed every active page animation and reset the crown transform to none.
- JavaScript-disabled Arabic context at 320px showed the SVG character. No application page errors during layout checks.
- Final desktop Arabic and mobile English screenshots visually inspected. Typography and green palette remain consistent; the revised desktop mascot is fully visible. Visual approval remains Nour's.

## Mobile Lighthouse

Production localhost, Lighthouse 13.4.1, default mobile simulation, fresh Chrome; no concurrent browser automation.

| Metric | English | Arabic |
| --- | ---: | ---: |
| Performance | 94 | 92 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 50 | 50 |
| FCP | 1.4s | 1.5s |
| LCP | 2.9s | 3.1s |
| TBT | 130ms | 150ms |
| CLS | 0 | 0 |

No audit warnings. LCP still exceeds 2.5 seconds; these lab scores do not establish deployed Core Web Vitals. Arabic performance varies between runs; its higher score is not evidence the mascot improved performance. SEO remains constrained by intentional preview noindex and deferred production setup.

Reports: `artifacts/2026-09-14/phase-4/lighthouse-{en,ar}.{json,html}`. Screenshots: `artifacts/2026-09-14/phase-4-{en,ar}-{390,1440}.png`. Artifacts stay local and ignored by git.

No Phase 5+ implementation, deployment or invented external destinations. GitHub push remains unavailable without a remote.
