# Nabta

Nabta (نبتة) is an AI consultancy and portfolio website based in Egypt.

**Read `PROGRESS.md` before continuing development.** This is a checkpointed build. Phases 1–3 provide the populated bilingual site and Motion/CSS choreography. Later phases require explicit selection. Local preview only for now.

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

No deployment has been made. A Vercel project can use the standard Next.js build settings when publication is authorized. Before publishing, supply actual contact/project links and a production origin, remove the preview `noindex` metadata, and add canonical URLs, a sitemap, robots policy and organization schema using real business details. No production domain is assumed.

## Checkpoint protocol

After each phase, update `PROGRESS.md`, verify the work, run `git add -A`, and commit `Phase N: <what>`. Stop for Nour's go-ahead. Do not add attribution trailers. There is currently no GitHub remote configured; local commits cannot be pushed until a destination is supplied.

