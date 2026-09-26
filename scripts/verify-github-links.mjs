import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const source=await readFile('src/content.ts','utf8');
const links=[...new Set([...source.matchAll(/https:\/\/github\.com\/[^"\s]+/g)].map(match=>match[0]))];
const results=[];
for(const url of links){
 const api=await fetch(url.replace('https://github.com/','https://api.github.com/repos/'),{headers:{'User-Agent':'Nabta-public-link-check'},signal:AbortSignal.timeout(20000)});
 assert.equal(api.status,200,url+' metadata');
 const repo=await api.json(); assert.equal(repo.private,false); assert.equal(url,repo.html_url,'Use exact canonical repository URL');
 const page=await fetch(repo.html_url,{signal:AbortSignal.timeout(20000)}); assert.equal(page.status,200,url);
 results.push({url:repo.html_url,name:repo.name,status:page.status,checkedAt:new Date().toISOString()});
 console.log(repo.name+': public HTTP '+page.status);
}
await mkdir('artifacts',{recursive:true});await writeFile('artifacts/github-link-check.json',JSON.stringify(results,null,2));
