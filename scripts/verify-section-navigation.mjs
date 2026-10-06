import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH??'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {for(const locale of ['en','ar'])for(const width of [390,1440]){
 const page=await browser.newPage();await page.setViewport({width,height:900});await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 for(const id of ['about','founder','work','websites','ai-visuals','tutoring','contact']){
  await page.goto((process.env.VERIFY_BASE_URL??'http://127.0.0.1:3001')+'/'+locale+'#'+id,{waitUntil:'networkidle0'});
  await page.waitForFunction((id)=>{const e=document.getElementById(id);const r=e.getBoundingClientRect();return r.bottom>100&&r.top<innerHeight&&r.width>100;},{timeout:10000},id);
 }
 await page.focus('.website-entry:last-child .website-preview');
 assert.equal(await page.$eval('.website-entry:last-child .website-preview',e=>{const r=e.getBoundingClientRect();return e===document.activeElement&&r.bottom>0&&r.top<innerHeight;}),true);
 await page.setJavaScriptEnabled(false);await page.goto((process.env.VERIFY_BASE_URL??'http://127.0.0.1:3001')+'/'+locale+'#contact',{waitUntil:'networkidle0'});
 assert.equal(await page.$eval('#contact',e=>{const r=e.getBoundingClientRect();return r.bottom>0&&r.top<innerHeight;}),true);
 await page.close();console.log(locale,width,'direct section links, off-screen keyboard focus and no-JS contact verified');
}}finally{await browser.close();}
