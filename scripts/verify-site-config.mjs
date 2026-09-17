import assert from "node:assert/strict";
import { getSiteConfig, languageUrls } from "../src/lib/site-config.ts";

assert.deepEqual(getSiteConfig({}), { origin: undefined, indexable: false });
for (const SITE_URL of ["", "nabta", "http://example.com", "https://example.com/path", "https://example.com/?a=b", "https://user:pass@example.com", "https://127.0.0.1", "https://localhost"]) {
  assert.equal(getSiteConfig({ SITE_URL, SITE_INDEXABLE: "true" }).indexable, false, SITE_URL);
}
assert.deepEqual(getSiteConfig({ SITE_URL: "https://example.com/" }), { origin: "https://example.com", indexable: false });
assert.equal(getSiteConfig({ SITE_URL: "https://example.com", SITE_INDEXABLE: "true" }).indexable, true);
assert.equal(getSiteConfig({ SITE_URL: "https://example.com", SITE_INDEXABLE: "false" }).indexable, false);
assert.equal(getSiteConfig({ SITE_URL: "https://example.com", SITE_INDEXABLE: "true", VERCEL_ENV: "preview" }).indexable, false);
assert.equal(getSiteConfig({ SITE_URL: "https://example.com", SITE_INDEXABLE: "true", VERCEL_ENV: "production" }).indexable, true);
for (const NETLIFY_CONTEXT of ["deploy-preview", "branch-deploy", "dev"]) {
  assert.equal(getSiteConfig({ SITE_URL: "https://example.com", SITE_INDEXABLE: "true", NETLIFY_CONTEXT }).indexable, false);
}
assert.equal(getSiteConfig({ SITE_URL: "https://example.com", SITE_INDEXABLE: "true", NETLIFY_CONTEXT: "production" }).indexable, true);
assert.deepEqual(languageUrls("https://example.com"), {
  en: "https://example.com/en", ar: "https://example.com/ar", "x-default": "https://example.com/en",
});
console.log("Site configuration: defaults, malformed origins, explicit indexing and bilingual URLs verified.");
