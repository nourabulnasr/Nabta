import criticalCss from "../app/brand-intro.css?raw";

type RewriterElement = {
  getAttribute(name: string): string | null;
  setAttribute(name: string, value: string): unknown;
  removeAttribute(name: string): unknown;
  remove(): unknown;
  prepend(content: string, options: { html: boolean }): unknown;
  after(content: string, options: { html: boolean }): unknown;
  onEndTag(handler: (tag: { before(content: string, options: { html: boolean }): unknown }) => void): void;
};
type Rewriter = {
  on(selector: string, handler: { element(element: RewriterElement): void }): Rewriter;
  transform(response: Response): Response;
};

// First paint uses the same CSS source as the full stylesheet. Hydration starts
// after that paint; this changes scheduling, not the server-rendered page content.
const bootstrap = `let openingTimer;Promise.race([
  Promise.resolve().then(()=>document.querySelector('.intro-robot img')?.decode?.()).catch(()=>{}),
  new Promise(resolve=>{openingTimer=setTimeout(resolve,1500)})
]).finally(()=>clearTimeout(openingTimer)).then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
  const styles=Array.from(document.querySelectorAll('link[data-opening-style]'));
  Promise.all(styles.map(link=>new Promise(resolve=>{
    let timer;
    const done=()=>{clearTimeout(timer);resolve()};
    link.addEventListener('load',done,{once:true});
    link.addEventListener('error',done,{once:true});
    timer=setTimeout(done,5000);
    link.media='all';
    if(link.sheet)done();
  }))).then(()=>document.querySelectorAll('script[data-opening-module]').forEach(old=>{
    const script=document.createElement('script');
    for(const attribute of old.attributes)
      if(!['type','data-opening-module'].includes(attribute.name))script.setAttribute(attribute.name,attribute.value);
    script.type='module';script.src=old.getAttribute('data-opening-module');script.nonce=old.nonce;
    document.head.append(script);old.remove();
  }));
})))`;

export function openingFrameResponse(request: Request, response: Response): Response {
  if (request.method !== "GET" || !/^\/(en|ar)\/?$/.test(new URL(request.url).pathname) ||
      response.status !== 200 || !response.headers.get("Content-Type")?.startsWith("text/html") ||
      response.headers.has("Content-Encoding")) return response;
  const nonce = response.headers.get("Content-Security-Policy")?.match(/'nonce-([A-Za-z0-9+/=_-]+)'/)?.[1];
  const HTMLRewriter = (globalThis as typeof globalThis & { HTMLRewriter?: new () => Rewriter }).HTMLRewriter;
  // Preserve the ordinary application response outside Workers or without CSP.
  if (!nonce || !HTMLRewriter) return response;
  return new HTMLRewriter()
    .on("head", { element(element) {
      element.prepend(`<style nonce="${nonce}">${criticalCss}</style>`, { html: true });
    } })
    .on('link[rel="modulepreload"]', { element(element) { element.remove(); } })
    .on('link[rel="stylesheet"]', { element(element) {
      const href = element.getAttribute("href");
      if (!href || !/^\/_next\/static\/[A-Za-z0-9_./-]+\.css$/.test(href)) return;
      // Reduced-motion and no-JS visitors get the full stylesheet immediately.
      element.setAttribute("media", "(prefers-reduced-motion: reduce)");
      element.setAttribute("data-opening-style", "");
      element.after(`<noscript><link rel="stylesheet" href="${href}"></noscript>`, { html: true });
    } })
    .on('script[type="module"][src]', { element(element) {
      const src = element.getAttribute("src");
      if (!src?.startsWith("/_next/static/")) return;
      element.setAttribute("type", "application/x-opening-module");
      element.setAttribute("data-opening-module", src);
      element.removeAttribute("src");
    } })
    .on("body", { element(element) {
      element.onEndTag(tag => { tag.before(`<script nonce="${nonce}">${bootstrap}</script>`, { html: true }); });
    } })
    .transform(response);
}
