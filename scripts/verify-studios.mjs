import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const base = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3009";
const origin = process.env.VERIFY_SITE_URL ?? "https://nabta.nourabulnasr.workers.dev";
const output = process.env.VERIFY_OUTPUT ?? "artifacts/2026-11-19";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const results = [];
try {
  for (const locale of ["en", "ar"]) for (const width of [390, 1440]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewport({ width, height: 1000 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    const response = await page.goto(`${base}/${locale}/studios`, { waitUntil: "networkidle0", timeout: 60000 });
    assert.equal(response.status(), 200);
    assert.equal(await page.$eval("html", element => element.scrollWidth <= innerWidth && element.dir === (element.lang === "ar" ? "rtl" : "ltr")), true);
    assert.equal(await page.$$eval("h1", elements => elements.length), 1);
    assert.equal(await page.$eval('link[rel="canonical"]', element => element.href), `${origin}/${locale}/studios`);
    assert.equal(await page.$$eval(".studio-project", elements => elements.length), 2);
    assert.equal(await page.$$eval('.studio-project details', elements => elements.length), 2);
    await page.focus(".studio-project summary");
    await page.keyboard.press("Enter");
    assert.equal(await page.$eval(".studio-project details", element => element.open), true);
    const request = new URL(await page.$eval(".studio-action", element => element.href));
    assert.equal(request.hostname, "wa.me");
    assert.equal(request.pathname, "/201069046666");
    assert.ok(request.searchParams.get("text").length > 20);
    const structured = await page.$eval('script[type="application/ld+json"]', element => JSON.parse(element.textContent));
    assert.equal(structured["@type"], "Service");
    // Inject the audit engine through DevTools; deployment checks separately
    // verify that the real CSP blocks unauthorised page scripts.
    await page.evaluate(await readFile("node_modules/axe-core/axe.min.js", "utf8"));
    const accessibility = await page.evaluate(async () => window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21aa"] }));
    assert.deepEqual(accessibility.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })), []);
    await page.screenshot({ path: `${output}/studios-${locale}-${width}.png`, fullPage: true });
    assert.deepEqual(errors, []);
    await page.setJavaScriptEnabled(false);
    await page.reload({ waitUntil: "networkidle0" });
    assert.equal(await page.$$eval(".studio-project details li", elements => elements.length), 6);
    results.push({ locale, width, accessibilityViolations: 0, keyboardDetails: true, noJavaScript: true });
    await page.close();
  }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const locale of ["en", "ar"]) assert.ok(sitemap.includes(`${origin}/${locale}/studios`));
  await writeFile(`${output}/studios-checks.json`, JSON.stringify(results, null, 2));
  console.log("Studios EN/AR phone/desktop, metadata, keyboard details, review links, axe and no-JS content verified.");
} finally { await browser.close(); }
