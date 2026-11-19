import { readFile } from 'node:fs/promises';
const directory=process.argv[2];
if(!directory) throw new Error('Provide the Lighthouse report directory');
const failures=[];
for(const locale of ['en','ar']) for(let run=1;run<=3;run++) {
  const report=JSON.parse(await readFile(`${directory}/lighthouse-${locale}-run-${run}.json`,'utf8'));
  const lcp=report.audits['largest-contentful-paint'].numericValue;
  const cls=report.audits['cumulative-layout-shift'].numericValue;
  const performance=report.categories.performance.score;
  console.log(JSON.stringify({locale,run,lcp,cls,performance}));
  if(!Number.isFinite(lcp)||lcp>2500||!Number.isFinite(cls)||cls>=0.1||performance<0.9)
    failures.push(`${locale} run${run}: LCP=${lcp}ms CLS=${cls} performance=${performance}`);
}
if(failures.length) throw new Error(`Performance budget unmet:\n${failures.join('\n')}`);
