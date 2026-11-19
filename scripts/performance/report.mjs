import { readdir, readFile } from 'node:fs/promises';
for (const variant of ['baseline','experiment']) {
  const directory=`artifacts/performance/${variant}`;
  for (const file of await readdir(directory).catch(()=>[])) {
    if(!/^lighthouse-(en|ar)-run-\d\.json$/.test(file)) continue;
    const report=JSON.parse(await readFile(`${directory}/${file}`,'utf8'));
    console.log(JSON.stringify({variant,file,lcp:report.audits['largest-contentful-paint'].numericValue,cls:report.audits['cumulative-layout-shift'].numericValue,performance:report.categories.performance.score}));
  }
}
