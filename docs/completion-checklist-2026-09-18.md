# Completion checklist — 18 September 2026

Deployment is deliberately excluded from this checkpoint. The public marketing website and the future booking/student systems have different completion requirements.

## Nour supplies or decides

- Founder headshot (original image); confirm the supplied biography's degree/certification wording is ready for publication.
- Calendar service account connected to your Google Calendar and Meet, and its booking link. Saved rules: free, 30 minutes, every day 17:00–00:00 Cairo, 24 hours notice, last start 23:30. Intake: business name, idea, desired outcome, current gaps, contact details.
- Public InstaPay payment destination and account-holder/display name. Never send login credentials or card details.
- What EGP250 buys: live lesson, recording, or both; lesson duration; how long recordings remain accessible; cancellation/rescheduling and missed-session rules.
- First lesson titles, descriptions, scheduled dates and teaching recordings/materials.
- Owned authentication/database and video-delivery accounts or a decision to use a restricted Google-account pilot. Free services have limits; no screen-recording prevention guarantee exists.
- COD agent repository link if it should have a public destination; all other supplied portfolio links are saved.
- Final visual, factual-copy and purchase-policy review.

## Codex implements

- Founder narrative and Arabic translation, responsive menu, mobile portfolio refinement, performance investigation and verification: in progress in this checkpoint.
- Add supplied portrait to founder and booking areas with responsive image sizing and accessible description.
- Calendar integration and tests for time zone, notice, last slot, conflicts, intake, Google Meet and email notifications once the calendar connection is available.
- Student registration/sign-in, session catalogue, per-account library, manual-payment request/status flow, and authenticated owner approval/revocation. Requires agreed lesson/access rules and connected database/auth service.
- Server-enforced recording authorization and expiring delivery links where supported, no public source links, unauthorized-access and account-isolation tests. Provider choice remains unresolved; browser playback cannot prevent screen recording.
- Final bilingual privacy, purchase/access, support and cancellation policies once actual providers, data retention and sales terms are known. Preserve applicable mandatory rights.
- FAQs matching the final operational flows; mobile/desktop, Arabic RTL, keyboard, reduced-motion, no-JavaScript marketing-page and end-to-end booking/payment-access regression tests.
- Save and push checkpoints. Do not label unconnected calendar, payments, student accounts or recording delivery as working.

## Draft operational policy decisions (not published terms)

Support: email nourabulnasr@gmail.com or WhatsApp +201069046666. Do not promise an unconfirmed response time.
Consultations: free; implementation separately scoped and quoted. Rescheduling/cancellation process must match the connected calendar.
Teaching: EGP250 per session. List exactly what is included, lesson date/duration, access period and payment recipient before accepting payment.
Manual payment: owner verifies receipt independently before granting the buyer's account access. A screenshot alone is not proof of settlement. Never collect card information.
Refund preference: Nour requested no refunds. Final wording must account for non-delivery, duplicate/incorrect payment and applicable mandatory consumer rights; no blanket waiver is published.
Privacy: document actual account, booking, payment-evidence and access-log data, providers, purpose, retention, deletion/contact route and handling of school-age students before these systems launch. Do not claim a consent/retention process that is not implemented.
Recordings: personal account access, no redistribution; downloading restrictions are deterrents, not a guarantee against capture. Do not promise DRM until a supporting provider is selected and tested.

## Verification checkpoint — 18 September 2026

Implemented: bilingual founder narrative with existing reduced-motion-aware spring reveal; compact mobile navigation with Escape/focus handling and readable no-JavaScript links; swipeable mobile portfolio instead of scroll pinning; eager loading for above-fold leaf; page-generation concurrency limited to two workers.

Evidence: initial lint/types succeeded; production build succeeded with two workers. Local browser tests passed EN/AR at 320/390/768/1440, no overflow, founder content, keyboard menu, desktop resize and no-JavaScript navigation. Existing intro tests passed full gust/landing, continuing mascot motion, Escape/Skip, reduced-motion cleanup and all 11 projects. Screenshots and JSON are in artifacts/2026-09-18/completion/.

Audit found mobile header hydration caused CLS0.277 (EN performance66, LCP3.8s, TBT320ms, accessibility100, best-practices100; preview SEO63). Corrected CSS so the collapsed mobile layout exists in server-rendered HTML, with a noscript navigation fallback. Those scores describe the version BEFORE this correction and are not final scores.

Final changed-source ESLint run succeeded with node --jitless. Final rebuild/audit remains unverified: Windows reported FreeVirtualMemory449672KB despite roughly4GB free physical RAM; repeated Node workers failed allocating memory. No personal applications were terminated or system settings changed. Rebuild, rerun scripts/verify-completion.mjs and verify-intro.mjs, and audit both locales when virtual memory is available. Performance is still open. The final CSS correction has not received browser or visual approval.

Headshot, calendar, payments, student login/library/admin, recording delivery and final policies remain incomplete as listed above. No deployment attempted.
