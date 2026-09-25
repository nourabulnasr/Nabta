# Nabta — account migration handover

Newest deployed update: `docs/work-founder-2026-09-25.md`. Nour approved the design and it is live on Cloudflare (version ade415a9-ad65-47b0-98d1-2c1be11b11f4). Founder headshots are implemented as a four-image carousel, black-and-white first. Work dropdown splits software, websites with captured homepages, and AI Visuals awaiting actual media. Public Cal.com inspection found Cal Video and weekday 9am–5pm slots, not the agreed settings; Cal.com login is needed to correct them.

Latest state: Nabta is deployed at https://nabta.nourabulnasr.workers.dev/en and /ar. Read `docs/business-update-2026-09-25.md` for the deployment and business update; this supersedes older Cloudflare authorization blockers below. Cal.com and InstaPay are linked. Recorded-course pricing is EGP250 per lesson / EGP4,500 for 20; recordings remain upcoming. Deploy updates with `npm run deploy:vinext`; GitHub pushes alone do not deploy Cloudflare.

Saved 24 September 2026; resumed 25 September at Nour's request to complete work not requiring owner actions. See `docs/cloudflare-checkpoint-2026-09-25.md` for the latest build and verification state; older unverified-build statements below describe the previous checkpoint.

## Open this project on the same laptop

`C:\Users\noura\OneDrive\Documents\ChatGPT\Nabta`

Open this folder as a project in Codex after signing into the new account. The source files are on this laptop, not stored exclusively in the chat. Account switching does not transfer the old conversation automatically. This document and the project records are the continuation context; they are not a verbatim chat export.

Suggested first message in the new account:

> Open the Nabta project. Read START-HERE-HANDOVER.md, AGENTS.md, PROGRESS.md and the referenced completion/deployment records. Summarize the saved state and outstanding work before making changes. Do not restart the design or treat the Cloudflare migration as complete.

## What's in this folder

- `src/`: bilingual website, content, components, animation and security logic.
- `public/`: website images, supplied-mascot-derived asset and icons.
- `docs/`: original build brief, phased plans, verification, business decisions, launch checklist and deployment incident history.
- `scripts/` and `.github/workflows/`: local and hosted verification and security checks.
- `artifacts/`: local screenshots, browser results and performance reports; ignored by Git but retained on this laptop.
- `reference-inputs-local/`: available original supplied reference files copied for continuity; kept out of the public repository.

Reference-copy check: the original mascot sheet, Facebook profile image, deployment checklist PDF and initial pasted build request were saved. The original `ChatGPT Image Aug 28, 2026, 02_32_48 PM.png` cover was missing from its supplied Downloads path on 24 September; do not claim that original is included. Website assets already under `public/` remain intact.
- `.git/`: local history. Repository: https://github.com/nourabulnasr/Nabta . Local branch `codex/nabta-phase-1`; production remote branch `main`.
- `package.json`, lockfile and hosting configuration: exact dependency and build checkpoint, including unfinished Cloudflare preparation.

The original full conversation, ChatGPT account history, browser sign-ins, global CLI credentials and other account settings are not part of the project folder. Reauthenticate with GitHub/hosting providers if needed. Never put tokens or passwords in this handover or public GitHub repository. `node_modules` and build caches are reproducible with Node 22 and `npm ci`.

## Implemented website

English/Arabic marketing website; navy/cyan/lime identity based on Nour's actual spherical leaf robot mascot. Animated mascot and cinematic loading entrance with gust/flight/landing; continuing float; desktop shader/particles; reduced-motion, mobile and no-JavaScript fallbacks. Responsive navigation, portfolio, founder narrative, contact links, bilingual SEO metadata, structured data, sitemap/robots, strict nonce CSP and security checks are implemented. Detailed phase history is in PROGRESS.md and docs/phase-*.

Founder headshot has NOT been provided. Existing biography is user-supplied; degree/certification wording still needs factual confirmation. Final visual approval and final production performance measurements remain open.

## Hosting: critical current state

Netlify published app at https://nabta-ai-nour.netlify.app/en and /ar, site ID fb999639-8a28-454b-a502-97e2ed0d2869. Existing Free Legacy plan, no paid upgrade. GitHub main push webhook and read-only deploy key connected. App deploy 6aadfeb846245400080e1f28 / commit d1c109a. Final remote verification run 35432595233 succeeded on 19 September (security, SEO, responsive EN/AR).

**Nevertheless Netlify is not usable for this user's launch:** Nour reported timeouts on Wi-Fi AND mobile data in Egypt. DNS resolves, but HTTPS times out locally; matching regional Netlify incidents are documented in docs/netlify-deployment-2026-09-19.md. Never equate external CI success with Egyptian reachability.

Vercel Hobby was not chosen because this commercial site needs a paid eligible plan under Vercel's published usage rules. Nour has zero hosting budget. Do not upgrade, add payment methods or buy a domain without authorization.

Nour signed into Cloudflare. Account ID b7ec0633605b5b1dfd7448ac452c457d, account subdomain nourabulnasr.workers.dev. Created only a test Worker `nabta-connectivity-check`, returning Hello World at https://nabta-connectivity-check.nourabulnasr.workers.dev . Initial TLS failure cleared after hostname activation; local HTTPS 200 verified on 20 September. Initial external workflow 35530451458 failed before activation; no later external success is recorded. Asked Nour to check mobile data; no answer recorded. This is a connectivity test, NOT the Nabta website.

### Unfinished Cloudflare code checkpoint

Official vinext compatibility checker was run. Most reported failures came from generated `.netlify/` files, not application source. Real issues needing verification include fonts (CDN behavior versus self-hosted CSP), image optimization, global 404 behavior, nonce propagation and Workers free-tier size/CPU limits.

The initializer first failed because latest react-server-dom-webpack19.3 conflicted with React19.2.8 / Fiber9.7.0. Dependencies are now pinned to vinext1.0.0-beta.10, @vinext/cloudflare1.0.0-beta.8 and react-server-dom-webpack19.2.8. `package.json` now has type=module plus parallel `*:vinext` scripts; `vite.config.ts` and `wrangler.jsonc` were generated. Existing Next.js scripts remain. **These changes are an unverified work-in-progress snapshot: no successful Nabta Cloudflare build, runtime regression check or real app deployment is recorded.** Do not force peer dependency resolution, weaken CSP or enable paid image/storage services to make the build pass.

When explicitly resumed: inspect dependency installation/config, verify cloud test on owner's networks, build/test parallel Cloudflare output, fix compatibility without changing approved design, verify size/free-plan limits, authenticate deployment tools if required, deploy and test EN/AR/mascot/SEO/security on the actual URL. Configure final canonical origin/indexing and CI only after a real successful deployment. Keep Netlify deployment as existing reference until replacement is verified.

## Business requirements already decided

- Name: Nabta / Nabta AI; founder Noureldin (Nour Abulnasr). Include Powered by Nour Abulnasr.
- Contact: nourabulnasr@gmail.com; WhatsApp +201069046666.
- Consultancy: free 30-minute Google Meet, daily 17:00–00:00 Cairo, last start23:30, minimum24-hour notice. Intake: business name, idea, desired outcome and current gaps. Booked slots must become unavailable and owner must receive email. Implementation work quoted separately after consultancy. Human consultation first; AI-assisted consultant is a possible later phase, not currently built.
- Course: programming and AI for Secondary2 Baccalaureate; EGP250 per session. Exact live/recorded inclusion, duration, access expiry and scheduling remain undecided.
- Initial payment preference: manual InstaPay followed by verified per-account access, not card checkout. Recipient details still missing.
- Personal student access and protected recordings wanted. No browser solution guarantees prevention of screen recording. Do not promise otherwise.
- Refund preference is no refunds; final terms must preserve applicable mandatory rights and handle non-delivery/incorrect payments. Email/WhatsApp support.
- Supplied portfolio sites: elserafy.com, royalfalconom.com, powerofseamoss.com, palermoeg.com. Existing project cards/content contain saved GitHub links; optional COD agent repository URL remains missing.

## Still needed from Nour

Headshot; biography/certification confirmation; connected calendar/Meet account or booking link; InstaPay destination/display name; exact lesson/access/rescheduling rules; lesson titles/dates/materials/recordings; provider accounts/choice for authentication, database and video; optional missing portfolio link; final visual/content/policy review. No need to send passwords in chat.

## Still needed from the implementer

Finish usable free hosting and production performance measurements; add headshot; integrate real conflict-safe booking/intake/notifications; student registration/login, catalogue/library, payment request/status and owner approval/revocation; server-enforced content authorization; provider-appropriate expiring delivery; final operational policies/FAQs; security and complete booking/payment/access tests. These systems are NOT connected today. Public marketing page currently uses email/WhatsApp contact.

## Read next

1. This handover (latest status overrides older completion claims).
2. docs/completion-checklist-2026-09-18.md — detailed responsibilities and policies.
3. docs/launch-decisions-2026-09-17.md — saved owner decisions.
4. docs/netlify-deployment-2026-09-19.md — deployment evidence and access incident.
5. docs/build-brief.md and PROGRESS.md — design scope and phased history.

GitHub is a code backup, not a backup of ignored screenshots, original references, credentials or the entire conversation. Keep the full local project folder for those local files. Since this folder is under OneDrive, use Windows Explorer's “Always keep on this device” if offline availability is needed; OneDrive sync/offline status has not been certified here.

Cal.com update: configured and publicly verified consultancy Google Meet, daily evening slots17:00–23:30 Cairo,24-hour notice and required bilingual business intake. Read docs/calcom-setup-2026-09-25.md. Login/configuration blocker is resolved; real booking/email/Meet delivery remains untested.
