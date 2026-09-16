# Checklist verification — 16 September 2026

## Verified locally

- Production webpack build completed; lint and TypeScript checks completed. Removed one unused lint suppression discovered during the final review; the subsequent lint run had no warnings.
- npm audit reported zero known vulnerabilities. Redacted scan covered 80 working-tree files, 134 unique historical blobs and 49 browser assets, finding none of the configured secret patterns and no public source maps. This is a baseline pattern scan, not proof that no conceivable secret exists.
- Configuration tests verified safe defaults, malformed origins, explicit production indexing and forced preview/development noindex.
- `verify-deployment.mjs` verified EN/AR HTTP 200, fresh nonces, rejection of a spoofed request nonce, required headers, server-rendered content, legitimate hydration, an inline event-handler injection blocked by CSP, one H1 and no horizontal mobile overflow. Chrome DevTools script evaluation bypasses CSP, so the injection probe uses a real browser click on an injected inline handler.
- Six missing URLs returned real HTTP 404 and both language recovery links, including unsupported locales and sensitive-looking paths. Unsupported single-segment locales are internally rewritten to the global error route because the top-level dynamic layout otherwise produced an empty SSR error document. The visible URL is preserved.
- Manifest and Apple icon returned successfully; arbitrary remote image optimization was rejected.
- `verify-seo.mjs` verified local preview robots/sitemap, bilingual metadata, JSON-LD Organization/WebSite/three Services, and no-JavaScript metadata. Actual production host redirects, HSTS, publication metadata and account settings remain deployment checks.
- `verify-intro.mjs` verified desktop English and mobile Arabic full gust/landing, ongoing mascot animation, Escape/Skip, live reduced-motion unlock and no-JavaScript content. Reduced mode had no intro, canvas or active animations. Both tested layouts had no overflow and restored scroll/focus interaction.
- `verify-leaf.mjs` verified desktop canvas, pause, reduced-motion fallback and mobile layout in both languages. `verify-wordmark.mjs` verified both languages at 390/1440px: transfer, docking, navigation clearance, return and reduced motion.

Screenshots and machine-readable security/intro results are in `artifacts/2026-09-16/checklist/`. Leaf/wordmark scripts retain their original artifact locations. English final hero screenshot was visually inspected: mascot, wordmark and navigation remain visible without overlap in that capture. Visual approval remains Nour's.

## Unresolved measurement

Fresh mobile Lighthouse was attempted twice and exited without reports. Windows subsequently reported System.OutOfMemoryException while inspecting the test environment. No orphan test browser was identified for safe cleanup; the user's ordinary browser was left untouched. **No new performance score or LCP improvement is claimed.** Re-run `npm run audit:mobile -- artifacts/2026-09-16/checklist` when memory is available, then address any measured regressions. Earlier Phase 8 LCP results were above 2.5 seconds and do not certify this changed build.

Production field INP/LCP/CLS need deployed traffic. GitHub CI, preview authentication, monitoring, live headers, sitemap submission and restore-from-remote remain unverified because no remote/deployment account is connected.
