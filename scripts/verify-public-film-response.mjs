import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { publicFilmResponse, parseFilmRange } from "../src/lib/public-film-response.ts";
import { visualWork } from "../src/lib/visual-work.ts";
const sizes = JSON.parse(await readFile("src/lib/public-film-sizes.json", "utf8"));
assert.deepEqual(Object.keys(sizes).sort(), visualWork.map(film => `/media/visuals/${film.id}.mp4`).sort());
for (const [path, size] of Object.entries(sizes)) assert.equal((await stat(`public${path}`)).size, size, `Regenerate the film manifest: ${path}`);
const bytes = Uint8Array.from({ length: 20 }, (_, i) => i);
let cancelled = false, lastRequest;
const assets = { async fetch(request) {
  lastRequest = request; let position = 0;
  if (request.headers.get("if-none-match") === '"film-v1"') return new Response(null, { status: 304 });
  if (request.headers.get("if-match") === '"old-film"') return new Response(null, { status: 412 });
  return new Response(request.method === "HEAD" ? null : new ReadableStream({
    pull(controller) { if (position >= bytes.length) { controller.close(); return; } controller.enqueue(bytes.slice(position, position + 3)); position += 3; },
    cancel() { cancelled = true; },
  }), { headers: { "Content-Length": "20", "Content-Type": "video/mp4", ETag: '"film-v1"' } });
} };
const request = (range, extra = {}) => new Request("https://nabta.test/media/visuals/film.mp4", { headers: { ...(range ? { Range: range } : {}), ...extra } });
for (const [range, start, end] of [["bytes=0-1", 0, 1], ["bytes=4-10", 4, 10], ["bytes=16-", 16, 19], ["bytes=-4", 16, 19], ["bytes=18-100", 18, 19]]) {
  const response = await publicFilmResponse(request(range), assets);
  assert.equal(response.status, 206);
  assert.equal(response.headers.get("content-range"), `bytes ${start}-${end}/20`);
  assert.equal(response.headers.get("content-length"), String(end - start + 1));
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes.slice(start, end + 1));
  assert.equal(lastRequest.headers.has("range"), false);
}
assert.equal(cancelled, true);
for (const range of ["bytes=20-", "bytes=-0"]) {
  const response = await publicFilmResponse(request(range), assets);
  assert.equal(response.status, 416); assert.equal(response.headers.get("content-range"), "bytes */20"); assert.equal(await response.text(), "");
}
for (const range of ["bytes=10-2", "bytes=0-1,5-6", "bytes=", "bytes=9007199254740999-", "items=1-3"]) assert.equal(parseFilmRange(range, 20), null);
for (const validator of ['"old-film"', 'W/"film-v1"', "Wed, 21 Oct 2015 07:28:00 GMT"]) {
  const response = await publicFilmResponse(request("bytes=0-1", { "If-Range": validator }), assets);
  assert.equal(response.status, 200); assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes);
}
assert.equal((await publicFilmResponse(request("bytes=0-1", { "If-Range": '"film-v1"' }), assets)).status, 206);
assert.equal((await publicFilmResponse(request("bytes=0-1", { "If-None-Match": '"film-v1"' }), assets)).status, 304);
assert.equal((await publicFilmResponse(request("bytes=0-1", { "If-Match": '"old-film"' }), assets)).status, 412);
assert.equal((await publicFilmResponse(new Request("https://nabta.test/film", { method: "POST" }), assets)).status, 405);
const head = await publicFilmResponse(new Request("https://nabta.test/film", { method: "HEAD", headers: { Range: "bytes=0-1" } }), assets);
assert.equal(head.status, 200); assert.equal(await head.text(), "");
const withoutLength = { async fetch(request) { const response = await assets.fetch(request); response.headers.delete("content-length"); return response; } };
const manifestRange = await publicFilmResponse(request("bytes=0-1"), withoutLength, 20);
assert.equal(manifestRange.status, 206); assert.deepEqual(new Uint8Array(await manifestRange.arrayBuffer()), bytes.slice(0, 2));
console.log("Film byte ranges, suffix/open ranges, exact bytes, cancellation, validators, invalid ranges and methods verified.");
