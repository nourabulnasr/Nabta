# Nabta

Nabta (نبتة) is an AI consultancy and portfolio website based in Egypt.

**Read `PROGRESS.md` before continuing development.** This is a checkpointed build. Phases 1–6 provide the bilingual site, supplied mascot, desktop shader/particles and playful opening sequence. Later phases require explicit selection. Local preview only for now.

## Run locally

Requires Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000/en or http://localhost:3000/ar. The root URL redirects to English. The server binds to the local computer only.

```sh
npm run check
npm run build
npm start
```

`check` runs ESLint and TypeScript. `build` creates the production build. `start` serves that build; stop a running development server first or choose another port with `npm start -- --port 3001`.

Development and build scripts explicitly use webpack: the default Turbopack build terminated on this Windows host, while webpack completed successfully. This remains a standard Next.js project and needs no custom server.

## Editing content

All authored visitor-facing copy lives in **`src/content.ts`**, including English and Arabic strings, navigation, accessibility labels, metadata, hero copy, service descriptions and project summaries. Edit both `en` and `ar` values. The language is encoded in the URL, never browser storage.

`sectionIds` are stable anchor identifiers. Keep them stable when changing navigation labels. Independent section components live in `src/components/sections/`.

Project records live in `content.work.projects`. Supply each `url` to replace its pending-link text with an actual link. Set `content.tutoring.bookingUrl` when booking opens; until then its CTA leads to the contact section with an explanatory note. Update both displayed contact strings and `emailUrl` / `whatsappUrl` together. The current `.example` email and incomplete WhatsApp number are intentionally non-clickable placeholders. Replace the note after connecting both channels.

`src/components/mascot.tsx` displays the robot mascot supplied by Nour, isolated from the first reference sheet into `public/images/2026-09-14/nabta-mascot.png`. Next.js optimizes its responsive image sizes. A repeating spring float/tilt keeps it animated while the hero is visible; reduced motion and no JavaScript show the complete static character. It sits beside the tagline on mobile and beside the wordmark on desktop. Phase 5 adds a separate desktop WebGL background; the mascot remains a lightweight image. The second and third references inform the brand palette; they are not added as page content.

## Design foundation

- Midnight navy, cool off-white, lime and cyan matching the supplied brand artwork through OKLCH tokens in `src/app/globals.css`.
- Fraunces display and Manrope body, with Noto Sans Arabic for Arabic. Fonts are served by Next.js through `next/font`; a first build needs access to Google Fonts.
- Mobile-first spacing and logical CSS properties support both directions.
- Motion v12 uses `motion/react`, global `reducedMotion="user"` and LazyMotion. Future components should use `m` rather than `motion` inside the strict provider.
- A live media-query hook gates opacity, pointer and scroll-linked animation as well as transforms. Global CSS disables animations and transitions for reduced motion. The site remains readable without JavaScript.
- Hero and section entrances use native browser animations with spring curves through `motion/react-mini`. The hero has one parallax layer and a CSS radial-gradient drift.
- Selected Work maps vertical scrolling to horizontal travel, reversing direction in Arabic. Below 700px viewport height it uses native horizontal scrolling. Reduced motion retains the static project grid. Focus the row to navigate with arrow keys, Home and End.
- Phase 5 uses one deferred React Three Fiber shader plane on desktop, capped at 30 render requests per second and device pixel ratio 1. Mobile, reduced motion, load failures and unavailable WebGL retain the CSS gradient. Pause/resume controls the hero effects and mascot. Offscreen and hidden-tab animation work stops.
- React/React DOM use 19.2.8 for compatibility with React Three Fiber 9.7.0. Next.js supports this version. No forced peer overrides.
- No storage, trackers, forms or backend.

## Performance verification

With the production preview running, run `npm run audit:mobile`. Set `CHROME_PATH` to a Chrome installation if auto-detection is unavailable. The script saves both locale reports under the dated `artifacts/` directory (ignored by git). An optional output folder can be supplied after `--`.

`scripts/verify-motion.cjs` is a browser verification function for the connected Playwright runner. It verifies horizontal movement and live reduced-motion cleanup. Measured Lighthouse results, broader browser checks and limitations are recorded in `docs/phase-3-verification.md`.

## Publishing later

No deployment has been made. Before publishing, supply actual contact/project links and the production domain. Copy `.env.example` to `.env.local` for local configuration, or set the equivalent deployment variables. `SITE_URL` accepts the confirmed HTTPS origin only (no path, credentials, query or port). `SITE_INDEXABLE` defaults to false; set it to `true` only for the reviewed public deployment. **Rebuild after changing either variable:** the pages and metadata routes are generated at build time. Leave preview deployments non-indexable.

Canonical URLs, English/Arabic/x-default language links and mascot social images use the configured origin. Both pages include Organization and WebSite JSON-LD without placeholder contacts or invented business details. `/robots.txt` blocks crawling and `/sitemap.xml` contains no URLs until indexing is enabled with a valid origin. Production settings generate an English/Arabic sitemap and allow crawling. No production domain is assumed.

Run `node --experimental-strip-types scripts/verify-site-config.mjs` for configuration checks, and `node scripts/verify-seo.mjs` against the local production preview. `node scripts/verify-publication.mjs` starts an isolated dev server on port3001 using the reserved example.com domain solely as a test fixture, checks publication metadata and stops it. Do not run this while measuring Lighthouse because compilation can affect timings.

## Checkpoint protocol

After each phase, update `PROGRESS.md`, verify the work, run `git add -A`, and commit `Phase N: <what>`. Stop for Nour's go-ahead. Do not add attribution trailers. There is currently no GitHub remote configured; local commits cannot be pushed until a destination is supplied.


## Opening sequence

Phase 6 opens with the supplied mascot and oversized bilingual Nabta lettering. After key font/image readiness (with a bounded wait), a short particle gust clears the lettering and the mascot flies to its measured hero position. Skip intro and Escape reveal the page immediately. Reduced motion and no JavaScript bypass the overlay. A resize dismisses the flight to avoid stale landing coordinates. The introduction runs on a fresh page load; no browser storage is used.

The desktop shader contains 28 sparse motes in its existing canvas. The short intro gust uses 24 lightweight elements so phones do not need WebGL. Existing hero pause/reduced-motion behavior applies after landing. This brings the mascot landing transition forward; the future hero-to-navbar wordmark morph remains deferred.

Run `node scripts/verify-intro.mjs` with the production server running to verify the opening sequence in local Chrome. Set CHROME_PATH if necessary. See `docs/phase-6-verification.md` for measured results and limitations.
