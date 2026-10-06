# Nabta — current handover
Updated 6 October 2026. This replaces contradictory status statements in older dated documents.

## Where everything is
Laptop folder: C:\Users\noura\OneDrive\Documents\ChatGPT\Nabta
GitHub: https://github.com/nourabulnasr/Nabta
Active branch: codex/nabta-phase-1. Do not overwrite it with the historical main branch.
Website: https://nabta.nourabulnasr.workers.dev/en and /ar.
Read docs/release-2026-10-06.md for the exact deployed version, checks and performance.

After changing ChatGPT accounts, open this folder in Codex and say:
> Read START-HERE-HANDOVER.md, AGENTS.md, PROGRESS.md and docs/release-2026-10-06.md. Continue the saved Nabta project; preserve the approved design and zero-budget constraint. Do not restart it.

Source, images, scripts, documentation and Git history live here.
Ignored artifacts/ contains local screenshots/reports. reference-inputs-local/ contains available original references. Copy the whole folder for a laptop migration; GitHub does not back up ignored files or browser sign-ins.
The original August28 cover image was unavailable at the supplied path during the earlier backup. Existing website assets remain included.
Credentials, provider logins and the original chat transcript are not included. Reauthenticate as needed; never commit secrets.
Node22 and npm ci restore dependencies. Use OneDrive's Always keep on this device for offline access if desired.

## Completed public website
English/Arabic, responsive menu with Work → AI & Software / Websites / AI Visuals.
Animated supplied mascot, opening gust/flight/landing, continuing float, desktop shader/leaf and reduced-motion/no-JS fallbacks.
Only the first black-and-white founder portrait remains; the same portrait also appears beside the consultation link.
Six website previews, including MAS Heavy Equipment and El Amal, plus seven software entries. Six supplied GitHub destinations have verified canonical names; COD has no supplied URL.
Free consultancy Cal.com link, InstaPay link for confirmed purchases, contact links and Powered by Nour Abulnasr.
New FAQ, privacy and terms, student library preparation page, responsive media, security headers and bilingual search metadata.
The intro-film component is ready directly below the hero and stays hidden until the real video is supplied.
The AI Visuals gallery accepts images/videos; it stays empty until real brand work is provided.

## Agreed business rules
Noureldin / Nour Abulnasr, Cairo. Email nourabulnasr@gmail.com; WhatsApp +201069046666.
Free consultancy:30-minute Google Meet, daily17:00–00:00 Cairo, last start23:30,24-hour notice.
Cal.com https://cal.com/nour-abulnasr-wmhcrh/30min is consultancy only. Google Calendar conflicts and required business intake were configured September25. Real invitation/Meet/conflict test still needs an authorized appointment.
Implementation work is quoted after consultation; an AI consultant is a possible later business idea, not this launch.
Live tutoring and recordings are SEPARATE purchases, explicitly confirmed October6.
Each costs EGP250 per session. Recorded course:20 planned lessons,1–2hours each, lifetime personal access, EGP4,500 bundle (EGP500 saving).
No recording payment before publication. Manual InstaPay verification precedes access.
InstaPay https://ipn.eg/S/noureldin1207/instapay/73kNu0
No-change-of-mind refund intent after access, preserving mandatory legal rights and non-delivery/duplicate-payment remedies.
No promise of perfect download or screen-recording prevention.

## Prepared student platform — not activated
Supabase email-code sign-in, Turnstile hook, owner authenticator MFA.
Real PostgreSQL schema, row-level access policies, per-account orders and entitlements.
Manual InstaPay review, approve/reject/revoke, duplicate-reference protection, fixed server prices.
Personal library, private video/captions through an authenticated streaming API, and owner lesson publication.
Supabase small-file storage and optional R2 long-video adapter. No public storage URLs.
It stays disabled without owner services. Local database authorization tests are complete; real email/payment/video end-to-end tests await those services.
Activation steps: docs/learning-activation.md. No paid product was activated.

## What Nour still supplies or does
- Sign into/create the owned Supabase project and allow account setup; connect a usable authentication email sender and Turnstile. Keep credentials in provider settings, not chat.
- Choose/activate private video capacity after file sizes are known. Supabase's free file/storage limits are unsuitable for typical long videos; R2 may require a billing/account step and is not unlimited free storage.
- Provide the homepage introduction film, AI Visuals images/videos with brand/title details, and real lesson recordings/titles/durations/captions. Use docs/course-content-template.csv.
- Confirm live teaching format/place, duration, and cancellation/rescheduling rules before taking those bookings.
- Confirm InstaPay recipient display name, biography/degree/certification facts and published policy wording.
- Make or authorize one clearly labelled Cal.com test booking to verify actual email, Meet and occupied-slot behavior. No appointment/email was silently sent.
- Optional: COD repository URL, additional deployed website links, Search Console/Bing ownership and a scoped GitHub deployment token.

## Codex follow-through after those inputs
Connect owned services and apply the migration/settings, configure owner enrollment/MFA, run real two-account email/payment/playback/revocation and backup-restore tests, publish supplied media and update factual copy.
These are dependent implementation/verification steps, not work already completed. No need to redesign the website.
Current performance and the remaining upstream build-tool advisory are recorded in the release report; neither should be disguised as an owner content task.

## Technical guardrails
Cloudflare Worker nabta, account b7ec0633605b5b1dfd7448ac452c457d.
Current stack Next16.3.8/React19.2.8 with vinext deployment, Motion12, optional desktop R3F.
npm run deploy:vinext builds/deploys; source pushes alone do not deploy Cloudflare.
Netlify is historical (regional reachability issue); Vercel Hobby was not chosen for this commercial site.
No domain purchase, paid plan or billing change is authorized.
Read docs/release-runbook.md and .env.example. Older phase notes are historical evidence, not the current to-do list.

