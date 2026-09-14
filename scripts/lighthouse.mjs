import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo" }).format(new Date());
const output = resolve(process.argv[2] ?? `artifacts/${date}`);
await mkdir(output, { recursive: true });
const chrome = await launch({ chromeFlags: ["--headless=new"], chromePath: process.env.CHROME_PATH });

try {
  for (const locale of ["en", "ar"]) {
    const result = await lighthouse(`http://127.0.0.1:3000/${locale}`, {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    });
    if (!result || result.lhr.runtimeError) throw new Error(JSON.stringify(result?.lhr.runtimeError ?? "No Lighthouse result"));
    await writeFile(resolve(output, `lighthouse-${locale}.json`), result.report[0]);
    await writeFile(resolve(output, `lighthouse-${locale}.html`), result.report[1]);
    console.log(JSON.stringify({
      locale,
      scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([name, category]) => [name, Math.round(category.score * 100)])),
      metrics: Object.fromEntries(["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index"].map((name) => [name, result.lhr.audits[name].displayValue])),
      warnings: result.lhr.runWarnings,
    }));
  }
} finally {
  await chrome.kill();
}
