# Netlify production deployment — 19 September 2026

- Team: nourabulnasr, existing Free Legacy plan; no payment method added and no upgrade.
- Project: nabta-ai-nour, ID fb999639-8a28-454b-a502-97e2ed0d2869.
- Production address: https://nabta-ai-nour.netlify.app (English /en, Arabic /ar).
- Repository: nourabulnasr/Nabta, production branch main.
- Repository access: dedicated read-only Netlify deployment key, GitHub key163767816. Netlify cannot write to the repository with this key.
- GitHub push webhook681700111 configured using Netlify's generated deployment hook. Hook URL and authentication remain outside Git.
- Canonical production SITE_URL and indexing are configured in netlify.toml; preview contexts remain noindex.
- Official Next.js adapter5.15.13 explicitly pinned and registered. API-created project's first cloud build omitted automatic adapter execution, producing404s; do not publish plain .next output.

## Verification

Fresh local production build, lint/types and EN/AR responsive menu checks passed before deployment. Secret scan:87 trackedfiles,191 historicalblobs,49 browserassets, no configured secret patterns or public source maps.

Local network times out connecting to Netlify CDN/edge-runtime endpoints. Local CLI packaging was stopped and cloud builds used instead. Netlify API/dashboard remain reachable. Cloud verification workflow .github/workflows/verify-production.yml runs live security, SEO and browser checks from GitHub Actions. The first run correctly detected missing-adapter 404s.

Published deployment: 6aadfeb846245400080e1f28, application commit d1c109ad58f36d37808ffedcef8ea784ad1c52a8. English and Arabic serve HTTP 200. Earlier live checks confirmed responsive layouts at 320/390/768/1440, keyboard menu handling, no-JavaScript navigation, mobile portfolio and SEO metadata/indexing.

Netlify's optional public branding script initially violated the existing strict CSP. Disabled the separate Powered by Netlify badge under General settings (not just the developer collaboration HUD); UI confirmed the badge is not shown. No CSP exceptions or security test exclusions were added. Final verification run: https://github.com/nourabulnasr/Nabta/actions/runs/35432595233. All final workflow steps succeeded: live security, SEO and responsive browser verification for both languages.

No final production Lighthouse score or field Core Web Vitals has been established. Performance follow-up remains open; historical preview scores are not production evidence.

## Updating and recovery

Push reviewed changes to main; Netlify's repository webhook starts a cloud build. Watch the project Deploys page, then run Verify published website from GitHub Actions. Keep the same public address. Use a previously verified deployment's publish action for rollback; do not treat a ready status alone as proof that pages work.

No booking service, student accounts, online payments, paid recording access or database are operating yet. The public page directs customers to email/WhatsApp. Remaining owner inputs and implementation are in completion-checklist-2026-09-18.md.


## Access incident — 19 September 2026

Owner confirmed the public URL fails on both Wi-Fi and mobile data. Local HTTPS connections time out while DNS resolves to 35.157.26.135 and 63.176.8.218; Netlify main website/dashboard and GitHub remain reachable. Netlify API still reports published deploy ready with no error. External workflow success is not proof of Egyptian visitor reachability.

Reports with matching symptoms across Egyptian providers continue through September 12: https://answers.netlify.com/t/netlify-sites-unreachable-from-egypt-without-vpn/164174 . This supports a regional routing/connectivity diagnosis, but does not independently establish the precise ISP failure for Nabta. Do not describe the site as launch-ready for Egypt. No code rollback or DNS change made: neither is supported by present evidence. Evaluate a free alternative host, first testing reachability from the owner's networks and Next.js runtime/free-tier compatibility. Cloudflare is a candidate, not yet provisioned or verified; owner account access needed before permanent deployment. Do not require visitors to use a VPN.
