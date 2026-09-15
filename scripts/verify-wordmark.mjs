import puppeteer from "puppeteer-core";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { setTimeout } from "node:timers/promises";
const output = "artifacts/2026-09-15/phase-8";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
try {
  for (const locale of ["en", "ar"]) for (const width of [390, 1440]) {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewport({ width, height: 900 });
    await page.goto(`http://127.0.0.1:3000/${locale}`);
    await setTimeout(7000);
    const distance = await page.$eval(".hero", el => Math.max(240, el.offsetHeight * 0.55));
    await page.evaluate(y => scrollTo(0, y), distance * 0.5);
    await setTimeout(350);
    assert.equal(await page.evaluate(() => document.documentElement.dataset.wordmark), "moving");
    assert.equal(await page.$eval(".travelling-wordmark", el => getComputedStyle(el).visibility), "visible");
    assert.ok(await page.evaluate(() => Number(getComputedStyle(document.querySelector(".travelling-wordmark")).zIndex) < Number(getComputedStyle(document.querySelector(".site-header")).zIndex)));
    await page.screenshot({ path: `${output}/${locale}-${width}-moving.png` });
    await page.evaluate(y => scrollTo(0, y), distance + 80);
    await setTimeout(350);
    assert.equal(await page.evaluate(() => document.documentElement.dataset.wordmark), "docked");
    assert.equal(await page.$eval(".brand-wordmark", el => getComputedStyle(el).opacity), "1");
    assert.equal(await page.$eval(".site-header", el => Math.round(el.getBoundingClientRect().top)), 0);
    await page.screenshot({ path: `${output}/${locale}-${width}-docked.png` });
    await page.click('.main-nav a[href="#contact"]');
    await setTimeout(250);
    assert.ok(await page.evaluate(() => document.querySelector("#contact").getBoundingClientRect().top >= document.querySelector(".site-header").getBoundingClientRect().bottom - 2));
    await page.click(".brand-link");
    await setTimeout(300);
    assert.equal(await page.evaluate(() => document.documentElement.dataset.wordmark), "home");
    assert.equal(await page.$eval(".hero-wordmark", el => getComputedStyle(el).opacity), "1");
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.waitForSelector(".travelling-wordmark", { hidden: true });
    assert.equal(await page.$(".travelling-wordmark"), null);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    assert.deepEqual(errors, []);
    console.log(`${locale}/${width}: morph, dock, navigation clearance, return home and reduced motion verified`);
    await page.close();
  }
} finally { await browser.close(); }
