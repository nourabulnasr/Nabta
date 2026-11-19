import assert from 'node:assert/strict';
import puppeteer from 'puppeteer-core';
const base=process.env.VERIFY_BASE_URL??'http://127.0.0.1:3016';
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH??'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
  for(const locale of ['en','ar']) {
    const page=await browser.newPage();
    await page.setViewport({width:390,height:844});
    await page.setRequestInterception(true);
    page.on('request',request=>{
      if(request.resourceType()==='stylesheet')setTimeout(()=>request.continue().catch(()=>{}),2000);
      else request.continue().catch(()=>{});
    });
    await page.goto(`${base}/${locale}`,{waitUntil:'domcontentloaded'});
    const early=await page.evaluate(()=>({stage:document.querySelector('.brand-intro')?.dataset.stage,pending:document.querySelectorAll('script[data-opening-module]').length}));
    assert.equal(early.stage,'loading');
    assert.ok(early.pending>0,'Hydration must wait for delayed full styles');
    await page.waitForFunction(()=>document.querySelector('.brand-intro')?.dataset.stage==='gust');
    await page.waitForSelector('.brand-intro',{hidden:true,timeout:10000});
    assert.equal(await page.evaluate(()=>document.querySelector('main').inert),false);
    await page.setJavaScriptEnabled(false);
    await page.reload({waitUntil:'networkidle0'});
    const noJs=await page.evaluate(()=>({intro:getComputedStyle(document.querySelector('.brand-intro')).display,content:getComputedStyle(document.querySelector('main')).contentVisibility}));
    assert.equal(noJs.intro,'none');assert.equal(noJs.content,'visible');
    console.log(JSON.stringify({locale,delayedStyles:early,noJs}));
    await page.close();
  }
} finally {await browser.close()}
