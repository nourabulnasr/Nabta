# Nabta

Nabta (نبتة) is an AI consultancy and portfolio website based in Egypt.

**Read `PROGRESS.md` before continuing development.** This is a checkpointed build. Phase 2 populates the bilingual site; motion is reserved for Phase 3. Later phases require explicit selection. Local preview only for now.

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

`src/components/mascot.tsx` currently returns null. Replace its implementation in the explicitly selected mascot phase; the hero already contains its swappable slot.

## Design foundation

- Near-black, warm off-white, sprout green and desaturated cyan through OKLCH tokens in `src/app/globals.css`.
- Fraunces display and Manrope body, with Noto Sans Arabic for Arabic. Fonts are served by Next.js through `next/font`; a first build needs access to Google Fonts.
- Mobile-first spacing and logical CSS properties support both directions.
- Motion v12 uses `motion/react`, global `reducedMotion="user"` and LazyMotion. Future components should use `m` rather than `motion` inside the strict provider.
- Phase 3 must additionally gate opacity, color, pointer and scroll-linked animation with `useReducedMotion()`: MotionConfig alone only suppresses transform/layout animation. Global CSS already disables CSS animations and transitions for reduced motion.
- No storage, trackers, forms, backend, WebGL or animation choreography in Phases 1–2.

## Publishing later

No deployment has been made. A Vercel project can use the standard Next.js build settings when publication is authorized. Before publishing, finish Phases 2 and 3, supply actual contact/project links and a production origin, remove the preview `noindex` metadata, and add canonical URLs, a sitemap, robots policy and organization schema using real business details. No production domain is assumed.

## Checkpoint protocol

After each phase, update `PROGRESS.md`, verify the work, run `git add -A`, and commit `Phase N: <what>`. Stop for Nour's go-ahead. Do not add attribution trailers. There is currently no GitHub remote configured; local commits cannot be pushed until a destination is supplied.
