const base=process.env.VERIFY_BASE_URL??"https://nabta.nourabulnasr.workers.dev";
const r=await fetch(base+"/en",{headers:{"Accept-Encoding":"gzip, br"}});
console.log("HTML",r.status,Object.fromEntries(r.headers));
const html=await r.text();
const match=html.match(/(?:src|href)="([^"]+framework[^"]+[.]js)"/);
if(match){const asset=await fetch(new URL(match[1],base));console.log("JS",asset.status,Object.fromEntries(asset.headers));}

