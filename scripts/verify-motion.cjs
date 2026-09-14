/* eslint-disable @typescript-eslint/no-unused-expressions -- The Playwright tool evaluates this file as a function expression. */
async (page) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://127.0.0.1:3000/en');
  await page.waitForSelector('.work-journey[data-pinned="true"]', { timeout: 5000 });
  const track = page.locator('.work-track');
  const bounds = await page.locator('#work').evaluate((element) => ({
    top: element.getBoundingClientRect().top + scrollY,
    travel: element.offsetHeight - innerHeight,
  }));
  await page.evaluate((top) => scrollTo(0, top), bounds.top);
  const start = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.evaluate((top) => scrollTo(0, top), bounds.top + bounds.travel * 0.5);
  await page.waitForFunction(() => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(document.querySelector('.work-track')).transform);
    return Math.abs(matrix.m41) > 100;
  });
  const middle = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForSelector('.work-journey[data-pinned="false"]');
  const reduced = await page.evaluate(() => ({
    transform: getComputedStyle(document.querySelector('.work-track')).transform,
    animations: document.getAnimations().length,
    projects: document.querySelectorAll('.project-entry').length,
  }));
  if (reduced.transform !== 'none' || reduced.animations !== 0 || reduced.projects !== 7) {
    throw new Error(JSON.stringify(reduced));
  }
  return { start, middle, reduced };
}
