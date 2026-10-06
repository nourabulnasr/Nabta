import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {for(const locale of ['en','ar']) for(const width of [390,1440]) {
const page=await browser.newPage(); await page.setViewport({width,height:1000});await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.goto((process.env.VERIFY_BASE_URL ?? 'http://127.0.0.1:3001')+'/'+locale,{waitUntil:'domcontentloaded',timeout:60000});
await page.waitForNetworkIdle({idleTime:500,timeout:20000});
assert.equal(await page.$eval('html',el=>el.scrollWidth<=innerWidth),true);
if(width<768)await page.click('.menu-toggle');await page.click('.work-navigation summary');assert.equal(await page.$eval('.work-navigation',el=>el.open),true);assert.equal(await page.$$('.work-dropdown a').then(a=>a.length),3);await page.click('.work-dropdown a[href="#websites"]');assert.equal(await page.$eval('.work-navigation',el=>el.open),false);
assert.equal(await page.$$eval("#founder img",els=>els.length),1);assert.ok(await page.$eval("#founder img",el=>el.getAttribute("src").includes("portrait-1")));assert.equal(await page.$(".portrait-controls"),null);
assert.equal(await page.$$('.website-preview img').then(a=>a.length),6);assert.equal(await page.$$('.project-entry').then(a=>a.length),7);
for (const url of ['https://mas-heavy-equipment.nourabulnasr.workers.dev', 'https://el-amal-sigma.vercel.app/en/products']) {
 const preview = await page.$('.website-preview[href="' + url + '"]');
 assert.ok(preview, 'Missing portfolio destination: ' + url);
 await preview.scrollIntoView();
 await page.waitForFunction((href) => {
  const img = [...document.querySelectorAll('.website-preview')].find(a => a.getAttribute("href") === href)?.querySelector('img');
  return img?.complete && img.naturalWidth > 0;
 }, {timeout:15000}, url);
}
await page.screenshot({path:'artifacts/founder-'+locale+'-'+width+'.png'});await page.close(); console.log(locale+' '+width+': navigation, single founder portrait, categorization verified');
}}finally{await browser.close();}




