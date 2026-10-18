import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { visualWork } from "../src/lib/visual-work.ts";

const base = process.env.VERIFY_BASE_URL ?? "http://127.0.0.1:3009";
const output = process.env.VERIFY_OUTPUT ?? "artifacts/2026-10-19";
const results = [];
for (const film of visualWork) {
  const path = `/media/visuals/${film.id}.mp4`;
  const bytes = await readFile(`public${path}`);
  const response = await fetch(base + path, { headers: { Range: "bytes=0-1023" } });
  assert.equal(response.status, 206, path);
  assert.equal(response.headers.get("content-type"), "video/mp4");
  assert.equal(response.headers.get("content-length"), "1024");
  assert.equal(response.headers.get("content-range"), `bytes 0-1023/${bytes.length}`);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes.subarray(0, 1024));
  const suffix = await fetch(base + path, { headers: { Range: "bytes=-16" } });
  assert.equal(suffix.status, 206);
  assert.deepEqual(Buffer.from(await suffix.arrayBuffer()), bytes.subarray(-16));
  const invalid = await fetch(base + path, { headers: { Range: `bytes=${bytes.length}-` } });
  assert.equal(invalid.status, 416);
  assert.equal(invalid.headers.get("content-range"), `bytes */${bytes.length}`);
  await invalid.arrayBuffer();
  results.push({ film: film.id, bytes: bytes.length, prefix: true, suffix: true, unsatisfiable: true });
}
for (const path of ["/images/responsive/portrait-20261019-960.webp", "/images/responsive/nightjar-passage-960.webp"]) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`public${path}`));
}
await mkdir(output, { recursive: true });
await writeFile(`${output}/film-delivery.json`, JSON.stringify({ base, results }, null, 2));
console.log("11 films: exact prefix/suffix streams, Content-Length, invalid ranges; portrait and Nightjar bytes verified.");
