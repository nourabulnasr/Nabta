import assert from "node:assert/strict";
import puppeteer from "puppeteer-core";
import {mkdir} from "node:fs/promises";
const base=process.env.VERIFY_BASE_URL??"http://127.0.0.1:3001";
await mkdir("artifacts/2026-10-06",{recursive:true});
for(const path of ["session","library","orders","admin","video"]){const r=await fetch(base+"/api/learning/"+path);assert.equal(r.status,503);assert.ok(r.headers.get("cache-control").includes("no-store"));}
assert.equal((await fetch(base+"/api/learning/order",{method:"POST",headers:{origin:"https://evil.example","content-type":"application/json"},body:"{}"})).status,403);
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH??"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
try{for(const locale of ["en","ar"])for(const width of [390,1440]){
 const page=await browser.newPage();await page.setViewport({width,height:900});
 const errors=[];page.on("pageerror",e=>errors.push(e.message));
 for(const route of ["learn","privacy","terms"]){
  const r=await page.goto(base+"/"+locale+"/"+route,{waitUntil:"networkidle0",timeout:30000});assert.equal(r.status(),200);
  assert.equal(await page.$eval("html",el=>el.scrollWidth<=innerWidth),true,route);
  assert.equal(await page.$eval("html",el=>el.dir),locale==="ar"?"rtl":"ltr");
  assert.equal(await page.$$("h1").then(a=>a.length),1);
  if(route==="learn"){
   assert.ok((await page.$eval('meta[name="robots"]',el=>el.content)).includes("noindex"));
   assert.equal(await page.$("input"),null,"Do not show an unconnected sign-in form");
  }
  await page.screenshot({path:"artifacts/2026-10-06/"+route+"-"+locale+"-"+width+".png"});
 }
 assert.deepEqual(errors,[]);await page.close();
}console.log("12 bilingual responsive policy/library routes and disabled API boundaries verified.");}finally{await browser.close();}

