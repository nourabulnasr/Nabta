# Phase7 — sculpted leaf

Nour selected the sculpted-leaf direction. Focal element: the supplied robot, supported by a dimensional leaf. Lighting: glossy midnight navy, cyan and lime edges. Framing: asymmetric behind the mascot, mirrored for Arabic, gently cropped by the hero. Feeling: deliberate growth and quiet technical confidence.

## Implementation

`sculpted-leaf.tsx` builds a curved leaf from a40×12 grid, three lightweight tubes and physical materials. Two directional lights reveal its ridge and rim. The existing hero MotionValue drives yaw and tilt; exponential convergence smooths changes without perpetual object rotation. The existing canvas supplies30fps demand scheduling, DPR1, pause/offscreen/hidden-tab controls. No second canvas, external model or new runtime package. Added `@types/three` matching installed Three0.184.

`sculpted-leaf.svg` supplies a static next/image fallback for mobile, reduced motion, noJS and renderer unavailability. The fallback hides when a canvas is present. The supplied mascot and intro remain intact. Initial desktop review led to a smaller leaf; the outer tip remains intentionally near the hero boundary.

## Evidence

- Production webpack build, ESLint and TypeScript succeeded.
- `node scripts/verify-leaf.mjs` succeeded for English and Arabic:1440px desktop canvas, scroll views, pause stops GPU draw calls, live reduced motion removes canvas and shows the loaded fallback,390px mobile has no canvas and no overflow. No application page errors.
- The first screenshot-buffer assertion exhausted the test process's memory while reporting a mismatch. Compact hashes showed that screenshots included changing foreground content. The final pause test instruments actual WebGL draw calls in the isolated test browser and verifies drawing stops; it does not add instrumentation to the application.
- `node scripts/verify-intro.mjs` succeeded: loading/gust/landing, ongoing mascot animation, Escape/Skip, mobile controls, live reduced-motion unlock and seven projects readable without JavaScript.
- Screenshots: `artifacts/2026-09-15/phase-7/{en,ar}-{desktop,scroll,mobile}.png`. Manual observations: navy leaf with cyan/lime outlines, supplied mascot remains the focal figure, mirrored Arabic composition. Nour's visual approval remains pending.
- Latest mobile Lighthouse EN90/AR90, accessibility100/best-practices100, SEO63 under local preview restrictions. EN LCP3.5s, AR3.4s; TBT110ms both; CLS0 both. No warnings. LCP is still above2.5s. Mobile results measure the static fallback and do not establish desktop GPU or field performance.
- Reports: `artifacts/2026-09-15/phase-7/lighthouse/`.

No deployment or remote push. Real launch destinations remain pending. Phase8 is not included in this checkpoint.
