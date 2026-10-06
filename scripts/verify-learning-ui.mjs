// UI fixture test only: no provider calls, real payments or real email.
import puppeteer from "puppeteer-core";
import assert from "node:assert/strict";
const base=process.env.VERIFY_BASE_URL??"http://127.0.0.1:3002";
assert.ok(new URL(base).hostname==="127.0.0.1","Fixtures must never target production");
const b=await puppeteer.launch({executablePath:process.env.CHROME_PATH??"C:/Program Files/Google/Chrome/Application/chrome.exe",headless:true});
try{for(const locale of ["en","ar"]){
 const p=await b.newPage();await p.setViewport({width:390,height:900});
 const errors=[];p.on("pageerror",e=>errors.push(e.message));
 await p.evaluateOnNewDocument(()=>{window.turnstile={render:(el,o)=>{o.callback("fixture-captcha-token");return"widget";},remove:()=>{}};});
 let signed=false,owner=false,mfa=false;
 const lesson={id:"10000000-0000-4000-8000-000000000001",position:1,title_en:"Fixture lesson",title_ar:"درس للاختبار",duration_minutes:90};
 let orders=[];
 await p.setRequestInterception(true);
 p.on("request",async req=>{
  const url=new URL(req.url());if(!url.pathname.startsWith("/api/learning/"))return req.continue();
  const action=url.pathname.split("/").pop();let body={};let status=200;
  if(action==="session"){body=signed?{email:"fixture@example.invalid",admin:owner,mfa}:{error:"Sign in"};if(!signed)status=401;}
  else if(action==="library")body={lessons:[lesson],access:orders.some(o=>o.status==="approved")?[lesson.id]:[]};
  else if(action==="orders"||action==="admin")body={orders,more:false};
  else if(action==="login")body={sent:true};
  else if(action==="verify"){signed=true;body={signedIn:true};}
  else if(action==="order"){const data=JSON.parse(req.postData());assert.equal(data.lesson,lesson.id);orders=[{id:"10000000-0000-4000-8000-000000000002",lesson_id:lesson.id,amount_egp:250,reference:data.reference,status:"pending",user_id:"fixture-student"}];body={id:orders[0].id};}
  else if(action==="mfa-setup")body={factorId:"10000000-0000-4000-8000-000000000003",secret:"LOCAL TEST FIXTURE"};
  else if(action==="mfa-verify"){mfa=true;body={verified:true};}
  else if(action==="review"){orders[0].status="approved";body={saved:true};}
  else if(action==="logout"){signed=false;body={signedOut:true};}
  else throw new Error("Unexpected fixture route "+action);
  await req.respond({status,contentType:"application/json",body:JSON.stringify(body)});
 });
 await p.goto(base+"/"+locale+"/learn",{waitUntil:"networkidle0"});
 await p.waitForSelector('input[type=email]');await p.type('input[type=email]',"fixture@example.invalid");await p.click('form button[type=submit], form button:not([type])');
 await p.waitForSelector('input[name=code]');await p.type('input[name=code]',"123456");await p.click('form button:not([type])');
 await p.waitForSelector(".lesson-list button");await p.click(".lesson-list button");
 await p.type('input[name=reference]',"FIXTURE-123456");await p.click('input[type=checkbox]');await p.click(".portal-notice form button:not([type])");
 await p.waitForFunction(()=>[...document.querySelectorAll("p")].some(e=>e.textContent==="FIXTURE-123456"));
 assert.equal(await p.$eval("html",el=>el.scrollWidth<=innerWidth),true);
 assert.equal(await p.$eval(".lesson-list button",el=>el.disabled),true);
 await p.screenshot({path:"artifacts/2026-10-06/student-fixture-"+locale+".png",fullPage:true});
 owner=true;await p.reload({waitUntil:"networkidle0"});await p.click(".owner-panel button");
 await p.waitForSelector(".owner-panel input");await p.type(".owner-panel input","123456");await p.click(".owner-panel form button");
 await p.waitForSelector(".portal-actions button");p.on("dialog",d=>d.accept());await p.click(".portal-actions button");
 await p.waitForFunction(()=>!document.querySelector(".portal-actions button")?.textContent.match(/Approve|موافقة/));
 assert.equal(await p.$eval("html",el=>el.scrollWidth<=innerWidth),true);
 await p.screenshot({path:"artifacts/2026-10-06/owner-fixture-"+locale+".png",fullPage:true});
 assert.deepEqual(errors,[]);await p.close();
 }console.log("Bilingual sign-in, purchase request, owner MFA and review UI exercised with local fixtures; provider integration remains untested.");
}finally{await b.close();}

