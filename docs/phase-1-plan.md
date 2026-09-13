# Phase 1 implementation plan

## Scope and architecture

Implement the user-approved Editorial sprout foundation in this empty repository. Keep all user-facing copy in `src/content.ts`, represented by EN/AR values, and render static `/en` and `/ar` pages. `/` redirects to English. Locale layout owns document language, direction, fonts, and a small client Motion provider; sections remain server components. No data service or browser persistence.

## Files and responsibilities

- `src/content.ts`: typed copy, section identifiers, locale configuration and metadata.
- `src/app/[locale]/layout.tsx`: static locale document, optimized fonts, global motion policy.
- `src/app/[locale]/page.tsx`: assemble sections and localized metadata.
- `src/app/globals.css`: Tailwind v4 tokens and mobile-first editorial styling.
- `src/components/site-header.tsx`, `site-footer.tsx`: navigation and brand frame.
- `src/components/sections/*`: independent Hero, WhatNabtaDoes, SelectedWork, Tutoring and ServicesContact shells.
- `src/components/motion-provider.tsx`: reduced-motion policy with LazyMotion, prepared for Phase 3.
- `README.md`, `PROGRESS.md`, `docs/phase-1-verification.md`: operation, recovery and evidence.

## Execution

1. Install Next.js, React, Tailwind and Motion v12; retain npm lockfile.
2. Define locale types, shared section IDs and bilingual text. Use URL language links and correct `html lang`/`dir` with no persistence.
3. Build typography-led hero shell and four section shells with headings and empty bodies. Configure Fraunces, Manrope and an Arabic font through `next/font`.
4. Define near-black `#0A0C0B`, warm text, green accent and desaturated cyan using OKLCH tokens. Green is the sole saturated accent. Use responsive spacing and logical properties for RTL.
5. Respect reduced motion through MotionConfig and global CSS. Leave all choreography to Phase 3.
6. Run lint, TypeScript and production build. Verify `/`, `/en`, `/ar`, invalid locale status, links, document direction, mobile overflow, keyboard focus and reduced-motion behavior in the browser. Inspect desktop and phone screenshots of both languages. Record findings as observations, not visual approval.
7. Update README and progress. Commit all Phase 1 work once, using `Phase 1: Foundation and bilingual content system`, then stop.

## Boundaries

No Phase 2 descriptions, project cards, CTAs, contact details or mascot component. No Phase 3 entrances, parallax, horizontal scrolling, cursor effects or drifting gradients. No Phase 4+ work. No deployment. No fabricated contact or project facts. All copy editable in one place. No unrelated global changes.

## Design review

Wordmark is the focal element, with intentional empty space for future content. Four lower sections reserve semantic structure without fake filler. Header links remain useful by navigating to those sections. Colors and type follow the accepted direction; Arabic uses natural spacing, not Latin tracking. Local preview is kept out of search results until publication settings and a real origin are provided.
