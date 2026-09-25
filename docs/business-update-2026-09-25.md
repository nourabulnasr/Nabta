# Booking and tutoring clarification — 25 September 2026

This record supersedes older statements that the calendar and payment links are missing.

- Cal.com: https://cal.com/nour-abulnasr-wmhcrh/30min — linked from business consultancy CTAs only. Consultancy is free, 30 minutes. Calendar settings, Google Meet, minimum 24-hour notice, daily 17:00–00:00 Cairo availability and intake questions still need verification inside Cal.com.
- Live tutoring is arranged through WhatsApp/email, separately from consultancy.
- InstaPay: https://ipn.eg/S/noureldin1207/instapay/73kNu0 — public link for confirmed lessons only. Confirm lesson and amount before transfer. No automatic access is claimed.
- Recorded course: planned 20 lessons of 1–2 hours, EGP250 each; full package EGP4,500 rather than EGP5,000, lifetime access. Recordings are not ready and the site explicitly says the course is not available for purchase yet.
- Current wording treats live and recorded lessons as separate options at EGP250 per lesson. If a live purchase should include its recording, confirm that entitlement before implementing checkout/access rules.
- Cancellation/rescheduling concerns live appointments, not viewing recordings. No new cancellation policy has been invented.
- Headshot remains pending. Founder introduction/explainer video for below the hero and actual lesson recordings remain pending.

Implemented bilingual marketing copy and links. Student accounts, payment verification/admin approval, purchase entitlements, protected video storage/playback and a student library are not implemented. No website can guarantee prevention of all screen recording.

Verification: source lint/typecheck and Cloudflare production build succeeded; the existing deployment/security suite succeeded against the local Workers runtime. Built English HTML contains both exact links, package price and unavailable-for-purchase disclosure.

Cloudflare authorization subsequently succeeded through the owner browser flow. Nabta is now deployed at https://nabta.nourabulnasr.workers.dev/en and /ar. Production version: a29073ec-6234-456b-a0d5-edd526225e20. No paid plan was activated. Public origin/indexing settings are baked into the reproducible `npm run deploy:vinext` command via scripts/deploy-cloudflare.mjs. Stop local Wrangler dev before rebuilding: its open state directory can cause EBUSY on Windows.

Live production SEO and deployment/security suites succeeded, including canonical URLs, bilingual metadata/schema, robots/sitemap, nonce/hydration and malicious script checks. Responsive verification succeeded at eight locale/viewport combinations, with keyboard navigation, no-JavaScript fallback and mobile portfolio checks. The site also loaded in the in-app browser. The owner should still check their own phone/network. Performance targets and real-user metrics remain outstanding; the local performance findings in the Cloudflare checkpoint are not production measurements.

GitHub changes are on codex/nabta-phase-1. Publishing Cloudflare currently uses the local deployment command; GitHub auto-deployment is not configured. Old main/Netlify deployment is separate.

Live mascot verification also succeeded: intro landing restores scrolling, mascot continues animating, Escape/mobile Skip work, reduced-motion disables animation and unlocks the page, and no-JavaScript content remains accessible.
