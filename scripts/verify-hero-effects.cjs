/* eslint-disable @typescript-eslint/no-unused-expressions -- Evaluated as a function by the connected Playwright runner. */
async (page) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("http://127.0.0.1:3000/en");
  await page.waitForSelector(".hero-shader canvas");
  const mascot = page.locator(".nabta-mascot");
  const loop = await mascot.evaluate(e => e.getAnimations().some(a => a.effect.getTiming().iterations === Infinity));
  if (!loop) throw new Error("Mascot loop not running");
  await page.getByRole("button", { name: "Pause animation" }).click();
  await page.waitForFunction(() => document.querySelector(".nabta-mascot").getAnimations().length === 0);
  if (await page.locator("canvas").count() !== 1) throw new Error("Pause disposed shader");
  await page.getByRole("button", { name: "Resume animation" }).click();
  await page.waitForFunction(() => document.querySelector(".nabta-mascot").getAnimations().length > 0);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.waitForFunction(() => document.querySelector(".hero").dataset.heroActive === "false");
  if (await mascot.evaluate(e => e.getAnimations().length)) throw new Error("Offscreen mascot still running");
  await page.evaluate(() => scrollTo(0, 0));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForFunction(() => document.getAnimations().length === 0);
  if (await page.locator("canvas").count()) throw new Error("Reduced motion retained WebGL");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.waitForSelector(".hero-shader canvas");
  await page.locator("canvas").evaluate(canvas => canvas.getContext("webgl2").getExtension("WEBGL_lose_context").loseContext());
  await page.waitForFunction(() => !document.querySelector("canvas"));
  return { loop, pauseResume: true, offscreenStopped: true, reducedMotion: true, contextLossFallback: true };
}
