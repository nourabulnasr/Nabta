import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import puppeteer from "puppeteer-core";

const base = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3009";
const output = process.env.VERIFY_OUTPUT ?? "artifacts/2026-10-19";
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
try {
  for (const locale of ["en", "ar"]) for (const width of [390, 1440]) {
    const page = await browser.newPage();
    const errors = [], mediaRequests = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("request", request => { if (request.url().includes("/media/visuals/")) mediaRequests.push(request.url()); });
    await page.setViewport({ width, height: 1000 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto(`${base}/${locale}#ai-visuals`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.waitForSelector(".visual-film-choice");
    await page.$eval("#ai-visuals", element => element.scrollIntoView());
    assert.equal(await page.$$eval(".visual-film-choice", elements => elements.length), 11);
    assert.equal(await page.$$eval("#ai-visuals video", elements => elements.length), 1);
    assert.deepEqual(mediaRequests, [], "Video bytes must wait for a play gesture");
    assert.equal(await page.$eval("html", element => element.scrollWidth <= innerWidth), true);
    assert.equal(await page.$eval("#ai-visuals video", video => video.controls && video.playsInline && !video.autoplay && video.preload === "none" && video.paused), true);
    await page.$eval(".visual-film-choice:nth-child(2)", button => button.focus());
    await page.keyboard.press("Enter");
    await page.waitForFunction(() => document.querySelector("#ai-visuals video").src.includes("city-under-watch"));
    assert.equal(await page.$eval(".visual-film-choice:nth-child(2)", button => button.getAttribute("aria-pressed")), "true");
    assert.deepEqual(mediaRequests, [], "Changing selection must not fetch a video");
    // Start actual playback, then ensure replacing the player stops the detached element.
    const oldVideo = await page.$("#ai-visuals video");
    await oldVideo.evaluate(video => { video.muted = true; return video.play(); });
    await page.waitForFunction(() => document.querySelector("#ai-visuals video").currentTime > 0);
    await page.$eval(".visual-film-choice:last-child", button => button.click());
    assert.equal(await oldVideo.evaluate(video => video.paused && !video.isConnected), true);
    assert.equal(await page.$$eval("#ai-visuals video", elements => elements.length), 1);
    assert.equal(await page.$eval("#ai-visuals video", video => video.paused && getComputedStyle(video).objectFit === "contain" && video.height > video.width), true);
    assert.equal(await page.$eval(".visual-film", element => getComputedStyle(element).transform === "none"), true);
    for (const selector of ["#founder img", ".consultation-profile img"]) {
      assert.ok(await page.$eval(selector, image => image.src.includes("portrait-20261019")));
    }
    // Every film has valid metadata and a playable stream; run this once per release.
    if (locale === "en" && width === 1440) {
      const count = await page.$$eval(".visual-film-choice", buttons => buttons.length);
      for (let index = 0; index < count; index++) {
        await page.$$eval(".visual-film-choice", (buttons, i) => buttons[i].click(), index);
        await page.$eval("#ai-visuals video", video => new Promise((resolve, reject) => {
          const timer = setTimeout(() => reject(new Error("Film did not load: " + video.src)), 25000);
          video.onloadeddata = () => { clearTimeout(timer); resolve(); };
          video.onerror = () => { clearTimeout(timer); reject(new Error("Invalid film: " + video.src)); };
          video.preload = "auto"; video.load();
        }));
        assert.equal(await page.$eval("#ai-visuals video", video => Number.isFinite(video.duration) && video.videoWidth > 0), true);
      }
    }
    await page.$eval(".visual-film-choice:first-child", button => button.click());
    await page.$eval("#ai-visuals", element => element.scrollIntoView());
    await page.screenshot({ path: `${output}/visuals-${locale}-${width}.png` });
    assert.deepEqual(errors, []);
    console.log(`${locale} ${width}: 11 films, on-demand playback, switching, keyboard, portrait and layout verified`);
    await page.close();
  }
} finally { await browser.close(); }
