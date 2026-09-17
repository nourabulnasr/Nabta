# Launch decisions — 17 September 2026

These replace the unanswered questions in the September 16 scope. They are confirmed business requirements, not claims that the corresponding software is implemented.

## Hosting and budget

- Repository: https://github.com/nourabulnasr/Nabta (confirmed empty public repository, default branch main).
- User authorized deployment and a generated hosting domain; no purchased domain needed.
- Budget is zero recurring service costs at this stage. Do not upgrade plans, start paid subscriptions or add payment methods.
- Vercel CLI is signed in as nourabulnasr, team nour-abulnasrs-projects. Retried the original read-only plan check after the approval service recovered: plan **hobby**, status **active**. Vercel Hobby terms restrict it to personal/noncommercial use; no commercial deployment attempted.
- User explicitly approved **Netlify Free if needed** after this restriction was explained. Netlify allows commercial projects within its Free limits. The user is accessing the chat remotely and asked to skip sign-in; the Netlify tab was closed. Deployment remains pending authenticated Netlify access and repository connection. Do not ask for passwords or invent an authenticated account.
- An escalated read-only Vercel plan check was rejected by automatic approval review because its service hit a usage limit. No deployment or paid upgrade occurred. Do not bypass that rejection through another route to the same action.

## Consultancy

- Consultation itself is free; there is no three-client limit. Building the selected solution is scoped and quoted separately after the consultation.
- 30-minute calls, every day, **17:00–00:00 Africa/Cairo**, minimum **24 hours** advance notice. Last start is 23:30. Cairo daylight-saving changes must follow the named timezone.
- Google Meet. Required intake: contact details, business name, business idea, desired outcome, current gaps/problems.
- Calendar bookings must reserve the slot, reject double bookings, and notify Nour. Keep calendar-provider private events private; display availability only.
- Recommended first implementation: Cal.com free Individual account with Google Calendar/Meet. Configure minimum notice, availability, booking questions and conflict checks; connect a real booking link before advertising automatic booking. User must sign in/authorize their own Google account.
- Begin with Nour consulting personally. An AI-assisted intake/suggestion draft can follow real customer experience; human-reviewed recommendations and quotes. Do not start fine-tuning without suitable examples/evaluation or a demonstrated need.

## Teaching, payment and recording access

- Programming and AI for **Secondary 2, Egyptian Baccalaureate**, **EGP 250 per session**.
- Initial preference: students transfer through InstaPay; Nour verifies the actual received transaction and manually grants that account access. A screenshot alone must not automatically grant access.
- Payment destination has not been provided. Session duration, recording-access duration, and whether live attendance and recording access are included in the same EGP 250 purchase still need definition before checkout/access rules are implemented.
- Future website system: authenticated student accounts, private orders/entitlements, admin approve/revoke access, private playback. Supabase Free is a candidate for accounts/database, not assumed adequate storage/bandwidth for a video library.
- Zero-cost manual pilot option: restricted Google Drive videos shared only with each paid student's Google account, download/copy/print controls disabled. This uses Google accounts rather than a completed Nabta student portal and is not DRM. User has not accepted this compromise yet.
- No platform can guarantee prevention of screen recording or a camera filming the screen. Private authorization stops an unapproved account opening a shared link; watermarks/account limits discourage misuse but cannot prevent every copy. Do not promise otherwise.
- Card payments later require a payment provider such as Paymob and merchant approval; hosted checkout handles card data. Do not collect card numbers directly in Nabta. Actual onboarding documents/fees must be confirmed with the provider.
- User preference: no refunds, support by text/email for questions. A public policy must preserve mandatory consumer rights; do not describe a blanket rule as legally guaranteed. Formal terms and privacy disclosures still need completion before a paid portal opens.

## Founder biography supplied by Nour (verbatim)

I'm Noureldin — an AI engineer who builds real systems, not demos. I hold Anthropic's Claude Certified Architect – Professional certification and a Computer Science degree specializing in AI, and I've shipped everything from a fully local legal-AI platform to autonomous agents and production ML tools.

Through Nabta, I help businesses find the highest-leverage place AI can actually move their numbers — then I build it: custom AI systems, agents, automations, web and mobile apps. And because I believe the best way to understand technology is to teach it, I also tutor students in programming and AI, including Egypt's new secondary-school curriculum.

Whether you're a business looking to grow with AI or a student trying to master it, the goal is the same: something real, built well, that works.

Headshot remains pending. These credentials are user-provided; no independent verification or certification URL supplied. Founder/booking portrait section is not built yet.

## Portfolio destinations

User supplied Elserafy (https://www.elserafy.com/), Royal Falcon (https://www.royalfalconom.com/), Power of Sea Moss (https://powerofseamoss.com/) and Palermo (https://palermoeg.com/). Added truthful short site descriptions, without invented outcomes or testimonials. First three were readable through browsing; Palermo could not be fetched by the research browser, so full external-link verification is pending.

Actual GitHub username verified as nourabulnasr; the trailing 't' in the message was a typo. Public repository names verified through the authenticated connector: Blastradius, Transguard, Filingflags, Candidatesignal, clearingwatch, GP-Legal-AI- (Legato). These six links are added. No matching COD agent repository found; its link remains pending.

## Implementation and research references

Verification: local build/lint/types/config/browser-security/SEO checks completed. Commit `54b5747` pushed to repository main. Fresh mobile Lighthouse EN69/AR74 performance, LCP4.1s both, CLS0.003 both, accessibility/best-practices100. Reports in `artifacts/2026-09-17/launch/`; performance tuning remains open. Production deployment remains blocked on Netlify account authentication.

- Updated current bilingual consultancy/tutoring copy and portfolio links; automatic booking, payments, accounts and recording delivery remain unbuilt.
- Prepared Netlify build configuration, preview noindex guards and hosted security behavior. Public build settings are explicitly inlined because Netlify build-only environment variables are not automatically available to runtime functions. No secret belongs in next.config env.
- https://vercel.com/legal/terms
- https://www.netlify.com/blog/introducing-netlify-free-plan/
- https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- https://docs.netlify.com/build/functions/environment-variables/
- https://cal.com/pricing
- https://cal.com/help/event-types/min-notice
- https://supabase.com/pricing
- https://support.google.com/a/users/answer/13004062?hl=en
- https://support.google.com/drive/answer/9312312?hl=en
- https://wizard.paymob.com/
