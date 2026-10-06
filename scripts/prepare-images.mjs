import sharp from "sharp";
import {mkdir} from "node:fs/promises";
await mkdir("public/images/responsive",{recursive:true});
const images=[
 ["mascot","public/images/2026-09-14/nabta-mascot.webp",[240,400,800]],
 ["portrait-1","public/images/founder/portrait-1.webp",[400,640,960]],
 ...["elserafy","royal-falcon","sea-moss","palermo","mas-heavy-equipment","el-amal"].map(id=>[id,"public/images/websites/"+id+".jpg",[480,960,1440]])
];
for(const [id,path,widths] of images)for(const width of widths)await sharp(path).resize({width,withoutEnlargement:true}).webp({quality:80}).toFile("public/images/responsive/"+id+"-"+width+".webp");
console.log("Responsive versions generated for 8 existing images.");

