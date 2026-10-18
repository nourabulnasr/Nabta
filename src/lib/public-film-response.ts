export type AssetFetcher = { fetch(request: Request): Promise<Response> };

// Single byte ranges cover native video playback. Ignore malformed/multipart ranges.
export function parseFilmRange(value: string, size: number): [number, number] | "unsatisfiable" | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value);
  if (!match || (!match[1] && !match[2])) return null;
  const first = match[1] ? Number(match[1]) : null;
  const last = match[2] ? Number(match[2]) : null;
  if ((first !== null && !Number.isSafeInteger(first)) || (last !== null && !Number.isSafeInteger(last))) return null;
  if (first === null) return last === 0 || size === 0 ? "unsatisfiable" : [Math.max(0, size - last!), size - 1];
  if (last !== null && first > last) return null;
  if (first >= size) return "unsatisfiable";
  return [first, Math.min(last ?? size - 1, size - 1)];
}

function sliceStream(body: ReadableStream<Uint8Array>, start: number, end: number) {
  const reader = body.getReader();
  let offset = 0;
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) { controller.error(new Error("Incomplete film asset")); return; }
          const from = Math.max(0, start - offset);
          const to = Math.min(value.length, end + 1 - offset);
          offset += value.length;
          if (to > from) {
            controller.enqueue(value.subarray(from, to));
            if (offset > end) { controller.close(); await reader.cancel(); }
            return;
          }
        }
      } catch (error) { controller.error(error); }
    },
    cancel(reason) { return reader.cancel(reason); },
  });
}

/** Public portfolio assets only. Paid lesson delivery uses its separate authenticated API. */
export async function publicFilmResponse(request: Request, assets: AssetFetcher, expectedSize?: number) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response(null, { status: 405, headers: { Allow: "GET, HEAD" } });
  const range = request.method === "GET" ? request.headers.get("range") : null;
  // Let the asset service evaluate preconditions before applying a byte range.
  const assetHeaders = new Headers(request.headers);
  if (range) {
    assetHeaders.delete("Range");
    assetHeaders.delete("If-Range");
    assetHeaders.set("Accept-Encoding", "identity");
  }
  const original = await assets.fetch(new Request(request.url, { method: request.method, headers: assetHeaders }));
  if (original.status !== 200) return original;
  const headers = new Headers(original.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("X-Content-Type-Options", "nosniff");
  // ASSETS can omit Content-Length internally even when the browser receives it.
  // The checked build manifest supplies the exact size without buffering the file.
  const size = headers.has("content-length") ? Number(headers.get("content-length")) : expectedSize;
  const ifRange = request.headers.get("if-range");
  const validatorMatches = !ifRange || (!ifRange.startsWith("W/") && ifRange === headers.get("etag"));
  const selection = range && validatorMatches && size !== undefined && size >= 0 && Number.isSafeInteger(size) && !headers.has("content-encoding") ? parseFilmRange(range, size) : null;
  if (!selection || !original.body) return new Response(original.body, { status: 200, headers });
  if (selection === "unsatisfiable") {
    await original.body.cancel();
    headers.set("Content-Range", `bytes */${size}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }
  const [start, end] = selection;
  const length = end - start + 1;
  headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
  headers.set("Content-Length", String(length));
  const stream = sliceStream(original.body, start, end);
  // Workers derives Content-Length from FixedLengthStream, ignoring a header on
  // a generic stream. Node's test runtime uses the ordinary stream plus header.
  const FixedLength = (globalThis as typeof globalThis & {
    FixedLengthStream?: new (length: number) => { readable: ReadableStream<Uint8Array>; writable: WritableStream<Uint8Array> };
  }).FixedLengthStream;
  return new Response(FixedLength ? stream.pipeThrough(new FixedLength(length)) : stream, { status: 206, headers });
}
