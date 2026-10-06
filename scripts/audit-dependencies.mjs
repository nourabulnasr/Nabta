import {execFileSync} from "node:child_process";
let report;
try {report=execFileSync(process.platform==="win32"?"npm.cmd":"npm",["audit","--json"],{encoding:"utf8",shell:process.platform==="win32"});}
catch(e){report=e.stdout;if(!report)throw e;}
const audit=JSON.parse(report);
if(audit.error)throw new Error("Registry audit failed");
const allowed="https://github.com/advisories/GHSA-vfj7-8cjw-p6xm";
const unique=new Map();
for(const v of Object.values(audit.vulnerabilities??{}))for(const item of v.via)if(typeof item==="object")unique.set(item.url,item);
const failures=[...unique.values()].filter(v=>v.url!==allowed||Date.now()>Date.parse("2026-10-20T00:00:00Z"));
if(failures.length){console.error(failures.map(v=>v.url+" "+v.title).join("\n"));process.exitCode=1;}
else console.log(unique.size?"Only documented, time-limited build-tool braces advisory remains; see docs/security-exception-2026-10-06.md.":"No known advisories.");

