import { spawn } from "node:child_process";
import { setTimeout } from "node:timers/promises";

const base = "http://127.0.0.1:3001";
const origin = "https://example.com"; // Reserved test fixture; never written to site configuration.
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--webpack", "--hostname", "127.0.0.1", "--port", "3001"], {
  env: { ...process.env, SITE_URL: origin, SITE_INDEXABLE: "true" }, stdio: "inherit", windowsHide: true,
});
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(`${base}/robots.txt`)).ok) { ready = true; break; } } catch {}
    await setTimeout(500);
  }
  if (!ready) throw new Error("Publication test server did not start");
  process.env.VERIFY_BASE_URL = base;
  process.env.VERIFY_SITE_URL = origin;
  process.env.VERIFY_INDEXABLE = "true";
  await import("./verify-seo.mjs");
} finally { server.kill(); }
