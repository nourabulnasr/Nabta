import puppeteer from "puppeteer-core";
import { mkdir, writeFile } from "node:fs/promises";

const output = "artifacts/2026-09-16/checklist";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const results = [];
try {
  for (const [locale, width] of [["en", 1440], ["ar", 390]]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto(`http://127.0.0.1:3000/${locale}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".brand-intro");
    await page.screenshot({ path: `${output}/intro-${locale}-loading.png` });
    await page.waitForFunction(() => document.querySelector(".brand-intro")?.dataset.stage === "gust");
    await page.screenshot({ path: `${output}/intro-${locale}-gust.png` });
    await page.waitForFunction(() => document.querySelector(".brand-intro")?.dataset.stage === "landing");
    await page.waitForSelector(".brand-intro", { hidden: true, timeout: 7000 });
    const restored = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      inert: document.querySelector("main").inert,
      locked: document.documentElement.style.overflow === "hidden",
      mascot: getComputedStyle(document.querySelector(".mascot-slot .nabta-mascot")).visibility,
      looping: document.querySelector(".nabta-mascot").getAnimations().length > 0,
    }));
    if (restored.overflow || restored.inert || restored.locked || restored.mascot !== "visible" || !restored.looping || errors.length) throw new Error(JSON.stringify({ restored, errors }));
    await page.screenshot({ path: `${output}/intro-${locale}-complete.png` });
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector(".intro-top button");
    await page.keyboard.press("Escape");
    await page.waitForSelector(".brand-intro", { hidden: true });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.reload();
    const reduced = await page.evaluate(() => ({ intro: !!document.querySelector(".brand-intro") && getComputedStyle(document.querySelector(".brand-intro")).display !== "none", canvas: !!document.querySelector("canvas"), animations: document.getAnimations().length }));
    if (reduced.intro || reduced.canvas || reduced.animations) throw new Error(JSON.stringify(reduced));
    results.push({ locale, width, restored, escapeSkip: true, reduced });
    await page.close();
  }
  const edge = await browser.newPage();
  await edge.setViewport({ width: 320, height: 700 });
  await edge.goto("http://127.0.0.1:3000/en", { waitUntil: "domcontentloaded" });
  await edge.waitForSelector(".intro-top button");
  await edge.click(".intro-top button");
  await edge.waitForSelector(".brand-intro", { hidden: true });
  await edge.reload({ waitUntil: "domcontentloaded" });
  await edge.waitForSelector(".brand-intro");
  await edge.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await edge.waitForSelector(".brand-intro", { hidden: true });
  const unlocked = await edge.evaluate(() => !document.querySelector("main").inert && document.documentElement.style.overflow !== "hidden");
  if (!unlocked) throw new Error("Live preference change left the page locked");
  await edge.setJavaScriptEnabled(false);
  await edge.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  await edge.reload();
  const noJs = await edge.evaluate(() => ({ intro: !!document.querySelector(".brand-intro") && getComputedStyle(document.querySelector(".brand-intro")).display !== "none", projects: document.querySelectorAll(".project-entry").length }));
  if (noJs.intro || noJs.projects !== 7) throw new Error(JSON.stringify(noJs));
  results.push({ mobileSkip: true, liveReducedUnlock: unlocked, noJs });
  console.log(JSON.stringify(results));
  await writeFile(`${output}/intro-verification.json`, JSON.stringify(results, null, 2));
} finally { await browser.close(); }
