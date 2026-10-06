import { readFileSync, appendFileSync, readdirSync } from "node:fs";
const directory = "artifacts/ci-live";
const metricNames = ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift"];
const measurements = report => ({
  scores: Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)])),
  metrics: Object.fromEntries(metricNames.map(key => [key, report.audits[key].displayValue])),
});
const notice = (title, value) => console.log("::notice title=" + title + "::" + JSON.stringify(value).replaceAll("%", "%25"));
for (const locale of ["en", "ar"]) {
  const report = JSON.parse(readFileSync(`${directory}/lighthouse-${locale}.json`, "utf8"));
  const runs = readdirSync(directory).filter(name => name.startsWith(`lighthouse-${locale}-run-`) && name.endsWith(".json")).sort().map(name => measurements(JSON.parse(readFileSync(`${directory}/${name}`, "utf8"))));
  const summary = { locale, selection: runs.length ? "Median performance score from fresh-browser runs" : "Single fresh-browser run", ...measurements(report), ...(runs.length ? { runs } : {}) };
  notice("Nabta live " + locale, summary);
  // Keep notices below GitHub's 4 KB annotation truncation boundary.
  const items = key => report.audits[key]?.details?.items ?? [];
  const diagnostics = {
    document: report.audits["document-latency-insight"]?.details?.items,
    lcp: items("lcp-breakdown-insight")[0]?.items,
    bootup: items("bootup-time").slice(0, 3),
    longTasks: items("long-tasks").slice(0, 3),
  };
  notice("Nabta diagnostics " + locale, diagnostics);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, JSON.stringify(summary) + "\n");
}
