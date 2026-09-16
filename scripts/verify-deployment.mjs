import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3000";
const results = [];
for (const locale of ["en", "ar"]) {
  const response = await fetch(`${base}/${locale}`, { headers: { "x-nonce": "untrusted-request-nonce" } });
  const html = await response.text();
  assert.equal(response.status, 200);
  const csp = response.headers.get("content-security-policy");
  assert.ok(csp.includes("frame-ancestors 'none'"));
  const scriptPolicy = csp.split(";").find(p => p.trim().startsWith("script-src"));
  assert.ok(!scriptPolicy.includes("unsafe-inline") && !scriptPolicy.includes("unsafe-eval"));
  const nonce = csp.match(/'nonce-([^']+)'/)[1];
  assert.notEqual(nonce, "untrusted-request-nonce");
  assert.ok(html.includes(`nonce="${nonce}"`));
  const second = await fetch(`${base}/${locale}`);
  assert.notEqual(second.headers.get("content-security-policy"), csp, "Nonces must be fresh");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.ok(response.headers.get("cache-control").includes("no-store"));
  assert.ok(response.headers.get("permissions-policy").includes("camera=()"));
  assert.ok(html.includes('type="application/ld+json"'));
  assert.ok(html.includes("nourabulnasr@gmail.com"));
  results.push({ locale, status: 200, nonceFresh: true, headers: true, serverContent: true });
}
for (const path of ["/missing-page", "/en/missing-page", "/fr", "/api/missing", "/.env", "/.git/config"]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 404, path);
  const text = await response.text();
  assert.ok(text.includes('href="/en"') && text.includes('href="/ar"'), path);
}
const manifest = await (await fetch(`${base}/manifest.webmanifest`)).json();
assert.equal(manifest.name, "Nabta");
assert.equal((await fetch(`${base}/apple-touch-icon.png`)).status, 200);
const remoteImage = await fetch(`${base}/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg&w=640&q=75`);
assert.equal(remoteImage.status, 400);

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
try {
  for (const locale of ["en", "ar"]) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844 });
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.evaluateOnNewDocument(() => {
      window.cspViolations = [];
      document.addEventListener("securitypolicyviolation", event => window.cspViolations.push(event.effectiveDirective));
    });
    await page.goto(`${base}/${locale}`);
    await page.waitForFunction(() => !document.querySelector(".brand-intro") || getComputedStyle(document.querySelector(".brand-intro")).display === "none", { timeout: 10000 });
    assert.deepEqual(errors, []);
    assert.deepEqual(await page.evaluate(() => window.cspViolations), [], "Legitimate scripts must not be blocked");
    assert.equal(await page.$$eval("h1", elements => elements.length), 1);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.evaluate(() => {
      window.cspProbe = 0;
      const button = document.createElement("button");
      button.id = "csp-probe";
      button.textContent = "CSP test";
      button.setAttribute("onclick", "window.cspProbe = 1");
      button.style.cssText = "position:fixed;top:0;left:0;z-index:9999";
      document.body.append(button);
    });
    // Dispatch through the browser: DevTools evaluate can bypass CSP for scripts.
    await page.click("#csp-probe");
    await page.waitForFunction(() => window.cspViolations.length > 0);
    assert.equal(await page.evaluate(() => window.cspProbe), 0, "Unnonced scripts must not execute");
    await page.close();
  }
} finally { await browser.close(); }
await mkdir("artifacts/2026-09-16/checklist", { recursive: true });
await writeFile("artifacts/2026-09-16/checklist/security-results.json", JSON.stringify(results, null, 2));
console.log("Deployment checks verified: nonce uniqueness/spoof rejection, script injection blocked, legitimate hydration, headers, six real404s, image allowlist, manifest/icons, EN/AR mobile and server HTML.");
