# Nabta release and recovery
Current host: Cloudflare Worker nabta. Origin: https://nabta.nourabulnasr.workers.dev.
Active source: codex/nabta-phase-1. Main and Netlify are historical; do not deploy the old main branch over this website.
No paid hosting/storage changes or new domains without Nour's authorization.

## Release
1. Review git status and current handover. Install the lockfile with npm ci.
2. Run npm run check, node scripts/audit-dependencies.mjs, node scripts/verify-learning-db.mjs, node scripts/verify-learning-validation.mjs.
3. Set SITE_URL to the production origin, SITE_INDEXABLE=true, NABTA_CLOUDFLARE=true, CONTEXT=production.
4. Build with npm run build:vinext. On this low-memory Windows host use RAYON_NUM_THREADS=1, GOMAXPROCS=1 and NODE_OPTIONS=--max-old-space-size=512.
5. Serve dist/server/wrangler.json locally on port3001. Local preview must not redirect to production or upgrade local image requests to HTTPS.
6. With VERIFY_BASE_URL=http://127.0.0.1:3001, VERIFY_SITE_URL set to production and VERIFY_INDEXABLE=true run verify-deployment.mjs, verify-seo.mjs, verify-completion.mjs, verify-work-founder.mjs, verify-section-navigation.mjs, verify-intro.mjs and verify-learning-pages.mjs.
7. Run npm run security:scan -- --require-build. Review the exact advisory exception; never claim zero audit findings if it is used.
8. Before uploading a checked build, run a Wrangler deploy dry-run and confirm its module table includes the generated ssr/_next/static modules (including the React chunk imported by ssr/index.js). Local preview alone does not establish that the upload package is complete. On 10 October, a direct upload omitted 49 SSR chunks; staging a byte-identical build outside OneDrive and verifying all 129 modules before upload resolved the packaging failure. Do not activate a package with missing modules.
9. Deploy with npm run deploy:vinext (builds again) or upload an already checked build using node node_modules/wrangler/bin/wrangler.js deploy --config dist/server/wrangler.json --keep-vars. Retain existing Worker secrets.
10. Repeat HTTPS header/SEO/browser checks against the real URL. Run mobile Lighthouse with npm run audit:mobile and save both reports. Confirm real reachability from Nour's network.
11. Record the Worker version, measured limitations and source commit. Update handover and memory, commit and push codex/nabta-phase-1, verify origin history.

## GitHub workflows
Validate release runs on pushes/PRs and builds Cloudflare output.
Verify published website is a manual workflow.
Deploy Cloudflare is manual and expects a bucket-independent, scoped Workers deployment token in the production environment.
The credential has not been provisioned by this code change. Source pushes do not automatically deploy.
Do not export a broad personal OAuth token or reuse unrelated account credentials.

## Recovery
Use wrangler deployments list --name nabta to identify the last known good Worker version. Roll back that specific version after reviewing its settings, then recheck both locales, security headers, assets and metadata.
Do not roll back database migrations blindly. Disable LEARNING_ENABLED if account/media authorization is uncertain; the marketing site and consultancy link continue to operate.
Rotate exposed credentials at their provider before removing them from files. Keep personal/payment information out of logs.

## Learning operations and backups
Read learning-activation.md. Accounts, real media and connected end-to-end tests are required before taking recording payments.
Export database roles/schema/data using provider-supported tools and store encrypted owner-controlled copies outside this public repository. Preserve original videos separately.
Before activation, prove a restore into an isolated database and verify purchases and entitlements.
Handle data access/deletion requests through the published support email after verifying identity and preserving required financial records.

## Maintenance
The current build-tool advisory exception expires20 October2026. Patch or reassess it before the next release.
Check dependency/security notifications, Worker errors and free usage allowances.
No external analytics, uptime provider or billing service was silently enrolled. Configure any optional external monitoring with owner-controlled accounts.
Search Console/Bing ownership and real-user Web Vitals require the owner's accounts/traffic; lab scores do not establish field INP.

