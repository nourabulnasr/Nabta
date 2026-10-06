export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function sameOrigin(request: Request) {
  return request.headers.get("origin") === new URL(request.url).origin;
}
export function validPaymentReference(value: unknown): value is string {
  return typeof value === "string" && /^[a-zA-Z0-9 _/-]{6,100}$/.test(value.trim());
}
export function validMediaPath(value: unknown, extension: "mp4" | "vtt"): value is string {
  return typeof value === "string" && value.length <= 240 && !value.includes("..") && new RegExp("^[a-zA-Z0-9_/-]+[.]" + extension + "$").test(value);
}
export function validRange(value: string | null) {
  return value === null || /^bytes=(?:\d+-\d*|-\d+)$/.test(value);
}


export async function readSmallJson(request: Request): Promise<Record<string, unknown>> {
  if (Number(request.headers.get("content-length") ?? 0) > 4096) throw new Error("Too large");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Body required");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 4096) { await reader.cancel(); throw new Error("Too large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  const result = JSON.parse(new TextDecoder().decode(bytes));
  if (!result || typeof result !== "object" || Array.isArray(result)) throw new Error("Object required");
  return result;
}

