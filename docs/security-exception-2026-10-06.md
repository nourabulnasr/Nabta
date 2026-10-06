# Dependency review — 6 October 2026
Next.js updated from 16.3.5 to compatible 16.3.8. Sharp0.35.5, source-map-js1.2.2, undici7.30.0 and brace-expansion1.1.21/5.0.12 remove the corresponding current advisories.

One root advisory remains: GHSA-vfj7-8cjw-p6xm in braces3.0.3, reported through nine dependency paths. Registry reports no patched braces release. It is used by fast-glob in ESLint and the vinext build tool; public application input is not sent to these tools. Build patterns are repository-controlled. Do not describe npm audit as zero findings.

The release gate permits only this exact advisory until20 October2026. New advisories and expiry fail the build. Do not run untrusted pattern generation in the build. Replace the exception with an upstream patch when available; do not force unrelated downgrades proposed by npm audit fix.

