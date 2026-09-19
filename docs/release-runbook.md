# Nabta release and recovery runbook

Current hosting is Netlify Free, not Vercel. See `netlify-deployment-2026-09-19.md` for the production project, GitHub connection and live verification. Historical Vercel-specific instructions below must be adapted to Netlify; do not enable paid controls without authorization.

## Before publishing

- Connect an owner-controlled GitHub repository and Vercel project. Enable MFA and review collaborators/integrations. Push the recorded commit and confirm CI actually ran.
- Use separate Production and Preview environment scopes. Set SITE_URL to the real canonical HTTPS origin. Set SITE_INDEXABLE=true only in Production. Preview remains nonindexable regardless of this flag. Enable Vercel Authentication for previews; crawler directives are not privacy controls.
- Install from the lockfile (`npm ci`). Run `npm run check`, `npm audit --audit-level=low`, `npm run build`, then `npm run security:scan -- --require-build`. Review findings without printing secret values. CI scans available Git history; a shallow or incomplete remote checkout reduces coverage.
- Start the production build and run `node scripts/verify-deployment.mjs`, `node scripts/verify-seo.mjs`, and relevant animation verification scripts. Run mobile Lighthouse on both locales. Record the commit, environment, output and limitations.
- Inspect the actual deployed HTTPS redirects, security headers, public/private caching, both locale pages, manifest, images, real 404 responses and social previews. Check nonce freshness and legitimate scripts in browser devtools. Deployment-specific headers cannot be certified from localhost.
- Verify production canonical/hreflang/robots/sitemap URLs against the actual origin; confirm no preview host is indexed. Submit sitemap to Google Search Console and Bing. Generated vercel.app subdomains generally require URL-prefix rather than parent-domain DNS verification.

## Monitoring and maintenance

Configure an external uptime check on the production EN/AR URLs, hosting error notifications, and billing alerts. Establish a Lighthouse baseline and review changes to LCP, CLS and blocking work. Measure field p75 LCP/INP/CLS when sufficient traffic exists; no lab run proves INP compliance. Review search indexing weekly after launch. Choose analytics and consent handling before installing tracking.

Review Dependabot updates weekly and urgent advisories immediately. Use the latest patched hosting runtime in the supported major; test React/Three peer compatibility before upgrades. Keep production source maps private. No customer data should appear in logs.

## Incident response and rollback

1. Identify the affected route, service, release and time range. Preserve relevant logs with credentials/personal data redacted.
2. If credentials leak, revoke them at the provider immediately, replace scoped credentials in the correct environment, redeploy and verify the old credential is invalid. Removing a file or rewriting Git history does not revoke a secret. Check provider access logs and rotate dependent sessions where relevant.
3. For a bad deployment, promote the last verified Vercel deployment, or redeploy the previous Git commit after reviewing configuration changes. Verify headers, both locales and assets. Never blindly roll back a database migration.
4. Record impact, corrective change, verification and follow-up prevention in PROGRESS.md. Notify affected parties when actually required; do not send external messages during local testing.

## Backup and restore

Current persistent asset is source code: push to the owner's remote and retain original media. The origin remote is https://github.com/nourabulnasr/Nabta.git; pushed main commits are the off-device source backup. Test recovery by cloning the remote to a fresh directory, installing from the lockfile and building. Store credentials in the provider's secret store, not Git.

When a database and paid media exist, define retention and recovery objectives, enable provider backups/versioning, and perform a restore into an isolated environment before launch. Check bookings, orders, entitlements and media after restoration; protect backup access with least privilege.

## Mandatory gates for the deferred platform

Authentication must validate email, restrict redirects, expire reset links/sessions, protect against abuse and require admin MFA. Session identity must drive authorization; never trust a submitted user ID or editable profile role. Centralize server access checks and validate every endpoint's input. Deny anonymous requests and cross-account reads/writes with two real test accounts.

For PostgreSQL enable appropriate RLS with explicit read/insert/update/delete policies, ownership WITH CHECK, protected role/price columns, private schemas, invoker views and safe search_path for necessary definer functions. RLS enabled without an applicable policy denies access by default. Keep privileged service keys server-only.

Bookings need transactional uniqueness for time slots, race-condition tests, Cairo timezone rules and confirmed notice/end-hour rules. Paid access requires provider-signed webhooks, timestamp/replay checks, idempotent processing and server-derived price/entitlements. Deny unpaid access to recordings and test revocation/refunds.

Uploads need authenticated authorization, size/type/content checks, private storage and short-lived authorized delivery. Validate inputs, parameterize queries, prevent arbitrary redirects/proxy URLs, rate-limit costly operations and bound database queries. Add restrictive API CORS only if necessary, Secure/HttpOnly/SameSite cookies and CSRF protection for cookie-authenticated state changes. Configure transactional email with verified sender domain and SPF/DKIM/DMARC when that domain is available.
