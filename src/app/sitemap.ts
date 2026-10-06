import type {MetadataRoute} from "next";
import {getSiteConfig,languageUrls} from "@/lib/site-config";
import {locales} from "@/content";
export default function sitemap():MetadataRoute.Sitemap{
 const {origin,indexable}=getSiteConfig();if(!origin||!indexable)return [];
 return ["","/privacy","/terms"].flatMap(path=>locales.map(locale=>({url:origin+"/"+locale+path,alternates:{languages:path?{en:origin+"/en"+path,ar:origin+"/ar"+path}:languageUrls(origin)}})));
}

