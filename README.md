# Nabta
Bilingual AI consultancy, software/web portfolio and programming/AI tutoring site.

Live: https://nabta.nourabulnasr.workers.dev/en and /ar.
Source: https://github.com/nourabulnasr/Nabta, branch `codex/nabta-phase-1`.
Read **START-HERE-HANDOVER.md** for current status; older dated documents are history.

## Develop and verify
Node 22, npm. Install with `npm ci`; preview with `npm run dev` at localhost:3000/en.
`npm run check` runs lint and types.
Cloudflare uses vinext: `npm run build:vinext`, then `npm run start:vinext -- --port 3001`.
Public build variables: SITE_URL, SITE_INDEXABLE, NABTA_CLOUDFLARE=true and CONTEXT=production.
Keep preview indexing false. Copy .env.example for local setup; never commit credentials.

Run `node scripts/audit-dependencies.mjs`, `node scripts/verify-learning-db.mjs`,
`node scripts/verify-learning-validation.mjs`, and `npm run security:scan -- --require-build`.
See docs/release-runbook.md for browser checks and deployment.

## Edit the website
- src/content.ts: bilingual business copy, AI/software projects, contact details.
- src/content.ts plus src/components/sections/selected-work.tsx: website entries/previews.
- src/lib/visual-work.ts: supplied AI images/videos. Empty until real work is supplied.
- src/lib/introduction-video.ts: homepage founder introduction film; null keeps it hidden.
- src/lib/site-information.ts: privacy and service terms.
- public/images/founder/portrait-1.webp: the single approved black-and-white portrait.
- scripts/prepare-images.mjs: regenerate responsive image assets after changing sources.
- src/components/responsive-image.tsx: next/image plus static picture sources for adapter compatibility.
- src/components/motion/: supplied mascot animation, intro, reduced-motion support and desktop 3D.

## Student library
Prepared at /en/learn and /ar/learn. It deliberately stays closed until the owned services and recordings are ready.
Supabase email-code auth, owner MFA, PostgreSQL permissions, manual InstaPay requests and private recording delivery.
Optional R2 storage supports larger recordings. No card processor, public media links or fake lesson sales.
Read docs/learning-activation.md before enabling it.

## Deploy
`npm run deploy:vinext` builds and deploys using an authenticated Wrangler session.
GitHub pushes back up code; they do not automatically deploy the current Cloudflare worker.
The manual GitHub deployment workflow needs a scoped CLOUDFLARE_API_TOKEN.
Never copy a broad local OAuth credential into GitHub.

## Current limitations
Owner media/accounts are pending. Connected learning flows have not yet been verified against real provider accounts.
One unpatched build-tool advisory is narrowly documented in docs/security-exception-2026-10-06.md.
Performance measurements and the exact deployed checkpoint are in docs/release-2026-10-06.md.
No browser implementation can guarantee prevention of screen recording.

