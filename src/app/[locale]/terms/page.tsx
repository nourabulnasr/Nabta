import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {isLocale} from "@/content";
import {InformationPage} from "@/components/information-page";

import {informationMetadata} from "@/lib/information-metadata";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params; if(!isLocale(locale))return {};
 return informationMetadata("terms",locale);
}
export default async function Page({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <InformationPage kind="terms" locale={locale}/>;}
