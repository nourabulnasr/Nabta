import { readdir, stat, writeFile } from "node:fs/promises";
const sizes = {};
for (const name of (await readdir("public/media/visuals")).sort()) {
  if (!/^[a-z0-9-]+\.mp4$/.test(name)) continue;
  sizes[`/media/visuals/${name}`] = (await stat(`public/media/visuals/${name}`)).size;
}
await writeFile("src/lib/public-film-sizes.json", JSON.stringify(sizes, null, 2) + "\n");
console.log(`Prepared exact byte sizes for ${Object.keys(sizes).length} public films.`);
