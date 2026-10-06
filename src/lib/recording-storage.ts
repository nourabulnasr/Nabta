import { AwsClient } from "aws4fetch";
import { storageClient } from "./learning";
import { validMediaPath } from "./learning-validation";

export function recordingStorage(): "supabase" | "r2" {
  const provider = process.env.RECORDING_STORAGE ?? "supabase";
  if (provider !== "supabase" && provider !== "r2") throw new Error("Unknown recording storage");
  return provider;
}
function r2Settings() {
  const account = process.env.R2_ACCOUNT_ID ?? "";
  const bucket = process.env.R2_BUCKET ?? "";
  const accessKeyId = process.env.R2_ACCESS_KEY_ID ?? "";
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY ?? "";
  if (!/^[a-f0-9]{32}$/.test(account) || !/^[a-z0-9][a-z0-9-]{1,61}[a-z0-9]$/.test(bucket) || !accessKeyId || !secretAccessKey) throw new Error("Private storage is not configured");
  return { base: `https://${account}.r2.cloudflarestorage.com/${bucket}`, accessKeyId, secretAccessKey };
}
/** Server-only delivery; credentials and upstream URLs never reach the browser. */
export async function privateRecording(path: string, provider: string, options: { method?: "GET" | "HEAD"; range?: string | null } = {}) {
  if (!validMediaPath(path, "mp4") && !validMediaPath(path, "vtt")) throw new Error("Invalid media path");
  const headers = new Headers(); if (options.range) headers.set("Range", options.range);
  if (provider === "r2") {
    const { base, ...credentials } = r2Settings();
    const signer = new AwsClient({ ...credentials, service: "s3", region: "auto", retries: 1 });
    return signer.fetch(base + "/" + path.split("/").map(encodeURIComponent).join("/"), { method: options.method ?? "GET", headers, redirect: "error" });
  }
  if (provider !== "supabase") throw new Error("Unknown media provider");
  const { data, error } = await storageClient().storage.from("nabta-recordings").createSignedUrl(path, 60);
  if (error || !data) throw new Error("Recording unavailable");
  return fetch(data.signedUrl, { method: options.method ?? "GET", headers, redirect: "error" });
}


