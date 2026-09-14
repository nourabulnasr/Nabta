# Phase 2 content and verification

## Scope

Populate the existing Editorial sprout foundation. Keep the URL language system and single content configuration. Add the requested hero tagline and a null-rendering Mascot component, three-step consultancy explanation, seven project entries, tutoring offer with a placeholder booking destination, and business identity/services/contact information. No new animation or deployment.

## Content sources

Project descriptions were checked against the local README introductions:

- `C:/Users/noura/projects/godmode-builds/blastradius/README.md`: dependency-graph and exploitability-based vulnerability prioritization.
- `C:/Users/noura/projects/godmode-builds/transguard/README.md`: translation signals for human review.
- `C:/Users/noura/projects/godmode-builds/filingflags/README.md`: accounting ratios and annual-report text for fraud-risk analysis.
- `C:/Users/noura/projects/godmode-builds/candidatesignal/README.md`: evidence-supported résumé triage. The site does not claim to establish fraud or automatically make hiring decisions.
- `C:/Users/noura/projects/godmode-builds/clearingwatch/README.md`: satellite-image forest-loss reporting.
- `C:/Users/noura/projects/cod-agent/README.md`: Egyptian-Arabic order confirmation prototype. Live seller verification is not claimed.
- Legato's short description uses the Egyptian labour-law scope provided in Nour's operating instructions. No performance, legal-accuracy or deployment claim is made.

Only high-level summaries were carried into the site. Private source files and evaluation data were not copied. Project destinations remain null as permitted by the brief.

## Link and contact behavior

- Project URLs are editable in `content.work.projects`. Null URLs show plain text announcing a forthcoming link, not a dead clickable control.
- `content.tutoring.bookingUrl` is null. The booking CTA goes to the contact section and is accompanied by a booking-soon note. No appointment is made and no payment is taken.
- Email uses the reserved `.example` domain; WhatsApp uses a visibly incomplete Egyptian number. Neither is clickable while its URL is null.
- The contact note identifies these as preview placeholders. This phase is not a claim that Meta verification can be completed with placeholder business contact data.
- All displayed strings remain bilingual in `src/content.ts`.

## Verification

Completed across 2026-09-13–14:

- `npm run check`: ESLint and TypeScript exit 0.
- `npm run build`: webpack production build exit 0, static English and Arabic routes generated. A transient OneDrive EPERM during a rebuild cleared on unchanged retry, matching Phase 1's environment finding.
- `git diff --check`: no whitespace errors.
- Chromium at 320, 390, 768 and 1440 px for each language: HTTP 200, correct language/direction, seven project entries, exact requested tagline, no horizontal overflow and no broken anchor targets.
- Empty mascot slot has zero element children; no mascot graphic has been added.
- Booking and audit CTAs in both languages reach `#contact`. Back-to-top navigation works.
- All seven missing project URLs render pending text. Placeholder email and WhatsApp have no clickable links.
- Booking note measured at 13px after correcting the introductory paragraph selector, which originally also enlarged the note.
- Language switch returned to English and updated its title. All seven projects render with JavaScript disabled.
- Reduced-motion checks report zero animations. Browser storage remains empty. Source scan found no browser-storage or WebGL code.
- No page errors occurred during final behavior verification.

## Manual design observations

The accepted design system was retained. The oversized wordmark now has a readable supporting tagline. Sequential audit steps use ordered numbering; projects use clear headings and quiet categories. The first project spans the desktop grid, tutoring reverses the desktop columns, and Nabta's identity anchors the contact section. Mobile content reads in a single column; Arabic uses RTL and isolated Latin project/contact text. The booking-note hierarchy was corrected after screenshot inspection.

These are observations, not Nour's visual approval. Phase 3 motion and Lighthouse remain unimplemented as required.

Screenshots: `artifacts/2026-09-13/phase-2-{en,ar}-{390,1440}.png` show the initial populated layout. Final tutoring/contact captures are `phase-2-{en,ar}-{tutoring,contact}.png` in the same directory and reflect the booking-note correction. Files are local and gitignored.
