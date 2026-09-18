import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:3002';
const output = 'artifacts/2026-09-18/completion';
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const results = [];
try {
  for (const locale of ['en', 'ar']) {
    for (const width of [320, 390, 768, 1440]) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.setViewport({ width, height: 900 });
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle0' });
      assert.equal(await page.$$eval('#founder .founder-story p', items => items.length), 3);
      assert.equal(await page.$eval('html', el => el.scrollWidth <= innerWidth), true);
      if (width < 768) {
        assert.equal(await page.$eval('.menu-toggle', el => el.getAttribute('aria-expanded')), 'false');
        await page.click('.menu-toggle');
        await page.focus('.main-nav a');
        await page.keyboard.press('Escape');
        assert.equal(await page.$eval('.menu-toggle', el => el === document.activeElement && el.getAttribute('aria-expanded') === 'false'), true);
        await page.click('.menu-toggle');
        await page.click('.main-nav a[href="#founder"]');
        assert.equal(await page.$eval('#founder', el => el === document.activeElement), true);
        assert.equal(await page.$eval('.menu-toggle', el => el.getAttribute('aria-expanded')), 'false');
        await page.setViewport({ width: 1000, height: 900 });
        assert.equal(await page.$eval('.main-nav', el => getComputedStyle(el).display), 'flex');
        await page.setViewport({ width, height: 900 });
      }
      await page.$eval('#founder', el => el.scrollIntoView());
      await page.screenshot({ path: `${output}/founder-${locale}-${width}.png` });
      assert.deepEqual(errors, []);
      results.push({ locale, width, layout: true, founder: true, menu: true, errors });
      await page.close();
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 900 });
    await page.goto(`${base}/${locale}`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.brand-intro', { hidden: true, timeout: 8000 });
    assert.equal(await page.$eval('.work-journey', el => el.dataset.pinned), 'false');
    await page.setJavaScriptEnabled(false);
    await page.reload({ waitUntil: 'networkidle0' });
    assert.equal(await page.$eval('.main-nav', el => getComputedStyle(el).display), 'flex');
    assert.equal(await page.$$eval('.main-nav a', items => items.length), 5);
    await page.close();
  }
  await writeFile(`${output}/browser-results.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ passed: results.length, noJavaScript: ['en', 'ar'], mobilePortfolioUnpinned: true }));
} finally { await browser.close(); }
