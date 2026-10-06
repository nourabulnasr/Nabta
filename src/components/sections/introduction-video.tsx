import type {Locale} from "@/content";
import {introductionVideo as video} from "@/lib/introduction-video";
export function IntroductionVideo({locale}:{locale:Locale}){
 if(!video)return null;
 return <section className="intro-film page-gutter" aria-labelledby="film-title"><h2 id="film-title">{locale==="ar"?"اتعرّف على نبتة":"Meet Nabta"}</h2><video controls playsInline preload="none" poster={video.poster}><source src={video.src} type="video/mp4"/><track default kind="captions" src={video.captions} srcLang={video.language} label={video.language==="ar"?"العربية":"English"}/></video></section>;
}
