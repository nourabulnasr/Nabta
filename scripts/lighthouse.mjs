import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date());
const output = resolve(process.argv[2] ?? `artifacts/${date}`);
const base = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3000";
const runs = Number(process.env.LIGHTHOUSE_RUNS ?? 1);
if (!Number.isInteger(runs) || runs < 1 || runs > 3) throw new Error("LIGHTHOUSE_RUNS must be 1–3");
await mkdir(output, { recursive: true });

for (const locale of ["en", "ar"]) {
  const reports = [];
  for (let run = 1; run <= runs; run++) {
    // Each measurement starts in a fresh browser, including a fresh JS code cache.
    const chrome = await launch({ chromeFlags: ["--headless=new"], chromePath: process.env.CHROME_PATH });
    try {
      const result = await lighthouse(`${base}/${locale}`, {
        port: chrome.port,
        output: ["json", "html"],
        logLevel: "error",
        onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      });
      if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError ?? "No Lighthouse result"));
      reports.push(result);
      const suffix = runs > 1 ? `-run-${run}` : "";
      await writeFile(resolve(output, `lighthouse-${locale}${suffix}.json`), result.report[0]);
      await writeFile(resolve(output, `lighthouse-${locale}${suffix}.html`), result.report[1]);
      console.log(JSON.stringify({
        locale, run,
        scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([name, category]) => [name, Math.round(category.score * 100)])),
        metrics: Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"].map(name => [name, result.lhr.audits[name].displayValue])),
        warnings: result.lhr.runWarnings,
      }));
    } finally {
      try { await chrome.kill(); } catch (error) {
        if (error?.code !== "EBUSY" && error?.code !== "EPERM") throw error;
        console.warn("Chrome temporary-profile cleanup was locked; saved reports remain valid.");
      }
    }
  }
  if (runs > 1) {
    const median = [...reports].sort((a, b) => a.lhr.categories.performance.score - b.lhr.categories.performance.score)[Math.floor(runs / 2)];
    await writeFile(resolve(output, `lighthouse-${locale}.json`), median.report[0]);
    await writeFile(resolve(output, `lighthouse-${locale}.html`), median.report[1]);
  }
}
