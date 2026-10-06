import {readFileSync,appendFileSync} from "node:fs";
for(const locale of ["en","ar"]){
 const r=JSON.parse(readFileSync("artifacts/ci-live/lighthouse-"+locale+".json","utf8"));
 const text=JSON.stringify({locale,scores:Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(["first-contentful-paint","largest-contentful-paint","total-blocking-time","cumulative-layout-shift"].map(k=>[k,r.audits[k].displayValue]))});
 console.log("::notice title=Nabta live "+locale+"::"+text);
 if(process.env.GITHUB_STEP_SUMMARY)appendFileSync(process.env.GITHUB_STEP_SUMMARY,text+"\n");
}

