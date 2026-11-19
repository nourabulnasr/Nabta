import puppeteer from 'puppeteer-core';
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH??'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try{
 const page=await browser.newPage();
 await page.setViewport({width:1440,height:900});
 await page.evaluateOnNewDocument(()=>window.addEventListener('resize',()=>console.error('INTRO RESIZE',innerWidth,innerHeight)));
 page.on('pageerror',error=>console.log('PAGE ERROR',error.message));
 page.on('console',message=>{if(message.type()==='error')console.log('CONSOLE ERROR',message.text())});
 page.on('requestfailed',request=>console.log('REQUEST FAILED',request.url(),request.failure()?.errorText));
 await page.goto(`${process.env.VERIFY_BASE_URL??'http://127.0.0.1:3016'}/en`,{waitUntil:'domcontentloaded'});
 for(let i=0;i<16;i++){
  console.log(JSON.stringify(await page.evaluate(()=>({time:performance.now(),stage:document.querySelector('.brand-intro')?.dataset.stage,modules:document.querySelectorAll('script[data-opening-module]').length,styles:[...document.querySelectorAll('link[rel=stylesheet]')].map(link=>({href:link.getAttribute('href'),media:link.media,loaded:!!link.sheet})),css:document.querySelector('main')&&getComputedStyle(document.querySelector('main')).contentVisibility}))));
  await new Promise(resolve=>setTimeout(resolve,500));
 }
}finally{await browser.close()}
