# Phase8 — hero-to-navbar wordmark

Nour authorized the next phase after Phase7. The large hero wordmark travels toward the persistent navbar as the visitor scrolls, then hands off to its compact counterpart. Scrolling back or using the home link restores the full hero title. The existing mascot intro and leaf remain intact.

## Implementation

The real heading and home link remain in the document. A decorative aria-hidden copy interpolates between their measured rectangles, with eased scroll progress and matching font metrics. A sticky header keeps navigation available; the moving wordmark passes beneath its opaque surface while the compact name fades in. This refinement prevents the mobile copy crossing navigation links. The existing scroll-progress line stays above the header.

Only one animation-frame update is requested per batch of scroll/resize events. ResizeObserver, font readiness and the intro's state changes refresh measurements. Listeners, observers, queued frames and temporary styles clean up on unmount or reduced-motion changes. Reduced motion and noJS retain ordinary wordmarks and sticky navigation. No dependency, storage or WebGL changes.

## Verification

- Production webpack build, lint and TypeScript succeeded. Two transient OneDrive cleanup failures occurred; inspection and an unchanged retry succeeded without removing files or changing build configuration.
- `node scripts/verify-wordmark.mjs`: English/Arabic at390px and1440px. Verified moving/docked/home states, compact name visible after arrival, sticky header at viewport top, anchor destination clearance, return-to-top restoration, reduced-motion removal and no horizontal overflow. No application page errors. The test waits for the live preference change before asserting cleanup.
- `node scripts/verify-intro.mjs`: complete mascot intro and landing, ongoing float, Skip/Escape, live reduced motion and noJS content succeeded.
- Screenshots under `artifacts/2026-09-15/phase-8/`: `{en,ar}-{390,1440}-{moving,docked}.png`. Manual observation: final compact wordmark aligns with the home icon, both language directions remain legible, navigation stays unobscured during the transfer. Visual approval remains Nour's.

Final mobile Lighthouse: English92, Arabic89; accessibility100/best-practices100/SEO63 both, CLS0 both. LCP3.3s/3.5s, TBT60ms/150ms. Reports: `artifacts/2026-09-15/phase-8/final/`. No warnings. LCP remains above2.5s and Arabic performance below90. Mobile audits measure the lightweight fallback, not desktop GPU performance. No field Core Web Vitals claim.

All eight planned visual phases are now implemented. Launch still needs real contact/booking/project destinations, a domain, GitHub destination, final content/visual review and further loading optimization. No deployment or remote push.
