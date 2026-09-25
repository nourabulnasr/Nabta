import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Public production settings are baked into the build; credentials stay in Wrangler.
const result = spawnSync(process.execPath, [
  fileURLToPath(new URL("../node_modules/@vinext/cloudflare/dist/cli.js", import.meta.url)),
  "deploy", "--config", "dist/server/wrangler.json",
], {
  stdio: "inherit",
  env: {
    ...process.env,
    SITE_URL: "https://nabta.nourabulnasr.workers.dev",
    SITE_INDEXABLE: "true",
    NABTA_CLOUDFLARE: "true",
    CONTEXT: "production",
  },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
