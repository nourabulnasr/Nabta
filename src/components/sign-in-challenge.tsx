"use client";
import { useEffect, useRef } from "react";
type Turnstile = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void };
declare global { interface Window { turnstile?: Turnstile } }
export function SignInChallenge({ siteKey, onToken, locale }: { siteKey: string; onToken: (token:string)=>void; locale: "en" | "ar" }) {
 const container = useRef<HTMLDivElement>(null);
 useEffect(() => {
  let widget: string | undefined;
  const render = () => { if (container.current && window.turnstile) widget = window.turnstile.render(container.current, { sitekey:siteKey, theme:"dark", size:"compact", language:locale, callback:onToken, "expired-callback":()=>onToken(""), "error-callback":()=>onToken("") }); };
  if (window.turnstile) render();
  else {
   let script = document.querySelector<HTMLScriptElement>("script[data-nabta-challenge]");
   if (!script) {
    script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true; script.dataset.nabtaChallenge = "true";
    document.head.appendChild(script);
   }
   script.addEventListener("load", render, {once:true});
  }
  return () => {
   document.querySelector("script[data-nabta-challenge]")?.removeEventListener("load",render);
   if (widget && window.turnstile) window.turnstile.remove(widget);
  };
 }, [siteKey,onToken,locale]);
 return <div ref={container} className="sign-in-challenge" aria-label={locale==="ar"?"التحقق من الاستخدام البشري":"Human verification"}/>;
}

