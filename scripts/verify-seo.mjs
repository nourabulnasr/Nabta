import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";

const base = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3000";
const origin = process.env.VERIFY_SITE_URL;
const published = process.env.VERIFY_INDEXABLE === "true";
const robots = await (await fetch(`${base}/robots.txt`)).text();
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
assert.equal(robots.includes("Disallow: /"), !published);
assert.equal(sitemap.includes("<loc>"), published);
if (published) {
  assert.ok(robots.includes(`${origin}/sitemap.xml`));
  for (const locale of ["en", "ar"]) assert.ok(sitemap.includes(`${origin}/${locale}`));
  assert.ok(sitemap.includes('hreflang="x-default"'));
}
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
try {
  for (const locale of ["en", "ar"]) {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.goto(`${base}/${locale}`, { waitUntil: "domcontentloaded" });
    const data = await page.evaluate(() => ({
      robots: document.querySelector('meta[name="robots"]')?.content,
      canonical: document.querySelector('link[rel="canonical"]')?.href,
      languages: [...document.querySelectorAll('link[hreflang]')].map(el => [el.hreflang, el.href]),
      schema: JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent),
      image: document.querySelector('meta[property="og:image"]')?.content,
      twitter: document.querySelector('meta[name="twitter:image"]')?.content,
    }));
    assert.equal(data.robots, published ? "index, follow" : "noindex, nofollow");
    assert.equal(data.canonical, origin ? `${origin}/${locale}` : undefined);
    assert.equal(data.schema["@graph"][0]["@type"], "Organization");
    assert.equal(data.schema["@graph"][1]["@type"], "WebSite");
    assert.ok(!JSON.stringify(data.schema).includes("hello@nabta.example"));
    if (origin) {
      assert.deepEqual(data.languages, [["en", `${origin}/en`], ["ar", `${origin}/ar`], ["x-default", `${origin}/en`]]);
      assert.equal(data.image, `${origin}/images/2026-09-14/nabta-mascot.png`);
      assert.equal(data.twitter, data.image);
    }
    await page.close();
  }
  console.log(`SEO verified: ${published ? "publication fixture" : "local preview"}, EN/AR, metadata, JSON-LD, robots and sitemap.`);
} finally { await browser.close(); }
