import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {for(const locale of ['en','ar']) for(const width of [390,1440]) {
const page=await browser.newPage(); await page.setViewport({width,height:1000});await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.goto((process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:3001')+'/'+locale,{waitUntil:'domcontentloaded',timeout:60000});
await page.waitForNetworkIdle({idleTime:500,timeout:20000});
assert.equal(await page.$eval('html',el=>el.scrollWidth<=innerWidth),true);
if(width<768)await page.click('.menu-toggle');await page.click('.work-navigation summary');assert.equal(await page.$eval('.work-navigation',el=>el.open),true);assert.equal(await page.$$('.work-dropdown a').then(a=>a.length),3);await page.click('.work-dropdown a[href="#websites"]');assert.equal(await page.$eval('.work-navigation',el=>el.open),false);
await page.$eval('#founder',el=>el.scrollIntoView());assert.equal(await page.$eval('.portrait-controls span',el=>el.textContent),'1 / 4');await page.click('.portrait-controls button:last-child');assert.equal(await page.$eval('.portrait-controls span',el=>el.textContent),'2 / 4');await page.click('.portrait-controls button:first-child');assert.equal(await page.$eval('.portrait-controls span',el=>el.textContent),'1 / 4');
assert.equal(await page.$$('.website-preview img').then(a=>a.length),4);assert.equal(await page.$$('.project-entry').then(a=>a.length),7);
await page.screenshot({path:'artifacts/founder-'+locale+'-'+width+'.png'});await page.close(); console.log(locale+' '+width+': navigation, founder controls, categorization verified');
}}finally{await browser.close();}



