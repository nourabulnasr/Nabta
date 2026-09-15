import puppeteer from "puppeteer-core";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";

const output = "artifacts/2026-09-15/phase-7";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
try {
  for (const locale of ["en", "ar"]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", e => errors.push(e.message));
    await page.evaluateOnNewDocument(() => {
      window.leafDrawCount = 0;
      for (const Context of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
        if (!Context) continue;
        for (const method of ["drawArrays", "drawElements"]) {
          const original = Context.prototype[method];
          Context.prototype[method] = function (...args) {
            window.leafDrawCount++;
            return original.apply(this, args);
          };
        }
      }
    });
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://127.0.0.1:3000/${locale}`);
    await page.waitForSelector(".brand-intro", { hidden: true, timeout: 10000 });
    await page.waitForSelector("canvas");
    await setTimeout(600);
    await page.screenshot({ path: `${output}/${locale}-desktop.png` });
    await page.evaluate(() => scrollTo(0, 350));
    await setTimeout(600);
    await page.screenshot({ path: `${output}/${locale}-scroll.png` });
    await page.evaluate(() => scrollTo(0, 0));
    await page.click(".animation-control");
    await setTimeout(1000);
    const before = await page.evaluate(() => window.leafDrawCount);
    assert.ok(before > 0, "WebGL must have drawn the scene");
    await setTimeout(350);
    assert.equal(await page.evaluate(() => window.leafDrawCount), before, "Pause must stop GPU drawing");
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.waitForSelector("canvas", { hidden: true });
    assert.ok(await page.$eval(".hero-leaf-fallback", image => image.complete && image.naturalWidth > 0));
    await page.setViewport({ width: 390, height: 844 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await page.reload();
    await page.waitForSelector(".brand-intro", { hidden: true, timeout: 10000 });
    assert.equal(await page.$("canvas"), null);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: `${output}/${locale}-mobile.png` });
    assert.deepEqual(errors, []);
    console.log(`${locale}: desktop canvas, scroll screenshots, exact pause, reduced-motion fallback and mobile layout verified`);
    await page.close();
  }
} finally { await browser.close(); }
