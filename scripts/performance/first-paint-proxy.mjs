import http from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFileSync } from 'node:fs';
const source=readFileSync('src/app/globals.css','utf8');
// Diagnostic only: compare first-paint architecture before any production rewrite.
const critical=source.slice(source.indexOf(':root {'),source.indexOf('.site-header {'))+source.slice(source.indexOf('.brand-intro { position'),source.indexOf('.hero-leaf-fallback'))+source.slice(source.indexOf('.brand-intro { display: none; }'),source.indexOf('/* Founder copy'));
http.createServer(async (req,res)=>{
  try {
    const upstream=await fetch('http://127.0.0.1:3016'+req.url,{headers:{'accept-encoding':'identity'}});
    const headers=Object.fromEntries(upstream.headers);
    delete headers['content-encoding']; delete headers['content-length'];
    let body=Buffer.from(await upstream.arrayBuffer());
    if(headers['content-type']?.startsWith('text/html')){
      let html=body.toString();
      const nonce=html.match(/nonce="([^"]+)"/)?.[1];
      const cssLinks=[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)];
      for(const [tag] of cssLinks){
        const href=tag.match(/href="([^"]+)"/)?.[1];
        if(href?.startsWith('/_next/static/')){
          html=html.replace(tag,`<style nonce="${nonce}">${critical}</style>`+tag.replace('/>',' media="(prefers-reduced-motion: reduce)" data-deferred-style="true"/>')+`<noscript>${tag}</noscript>`);
        }
      }
      html=html.replace(/<link\b[^>]*rel="modulepreload"[^>]*>/g,'');
      html=html.replace(/<script\b[^>]*>/g,tag=>tag.includes('type="module"')&&tag.includes('src="')?tag.replace('type="module"','type="application/x-deferred-module"').replace('src="','data-module-src="'):tag);
      const boot=`<script nonce="${nonce}">requestAnimationFrame(()=>requestAnimationFrame(()=>{document.querySelectorAll('[data-deferred-style]').forEach(s=>s.media='all');document.querySelectorAll('script[data-module-src]').forEach(old=>{const s=document.createElement('script');s.type='module';s.src=old.dataset.moduleSrc;s.nonce=old.nonce;document.head.append(s);old.remove()})}))</script>`;
      html=html.replace('</body>',boot+'</body>');
      body=Buffer.from(html);
    }
    if(/text\/|javascript|json/.test(headers['content-type']??'')) {body=gzipSync(body);headers['content-encoding']='gzip';}
    res.writeHead(upstream.status,headers);res.end(body);
  }catch(e){res.writeHead(500);res.end(String(e))}
}).listen(3017,'127.0.0.1');
