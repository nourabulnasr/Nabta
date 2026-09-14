# Phase 3 — motion and performance

## Implementation

1. Add a live media-query hook with a static server snapshot. Motion remains a progressive enhancement; no storage.
2. Add client hero spring entrance, scroll scale/fade, one parallax background layer and a slow CSS radial-gradient drift. Preserve all bilingual content and the empty mascot slot.
3. Add staged section reveals, a thin scroll progress accent, a fine-pointer-only cursor accent and a magnetic tutoring link. Use spring physics and CSS underline expansion.
4. Replace the work grid with a progressively enhanced horizontal journey. Measure actual row overflow, pin only when the viewport is tall enough, support both text directions, and retain native swipe/keyboard scrolling on short screens. Reduced motion and no JavaScript retain a static grid.
5. Verify real scroll movement, endpoints, keyboard navigation, live media changes, mobile/desktop overflow and no-JavaScript content. Run production Lighthouse mobile for both locales and record results, including preview SEO limitations.
6. Update progress and memory, commit Phase 3 and stop. No Phase 4+ work or publishing.

## Files

- `src/components/motion/*`: media hook, reveal group, magnetic link and page accents.
- `src/components/sections/hero.tsx`: existing hero with scoped motion.
- `src/components/sections/selected-work.tsx`: server content passed into client horizontal-work wrapper.
- `src/components/motion/horizontal-work.tsx`: measured track and progressive layout.
- `src/app/globals.css`: enhanced layout, motion surfaces, reduced-motion overrides.
- `scripts/verify-motion.cjs`: browser verification function used with the connected Playwright tool.

## Acceptance

- At 1440×900, scrolling through Work changes its horizontal transform and reaches the last project in EN and AR.
- At 390×844, the pinned layout fits without horizontal document overflow; at 844×390 the row is native-scrollable.
- Reduced motion disables CSS, spring, pointer, parallax, reveals and pinning, including when toggled live.
- Keyboard focus reveals a linked project in the row when real links are supplied; the row itself supports keyboard traversal while links are pending.
- Seven projects remain readable with JavaScript disabled.
- Production build, lint and type check succeed. Lighthouse reports are saved locally with measured scores, never estimated.
