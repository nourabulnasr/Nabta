import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// A redacted baseline scan, not a guarantee that every possible secret format is detected.
const patterns = [
  /AKIA[0-9A-Z]{16}/,
  /(?:ghp_|github_pat_|sk_live_|sk_test_)[A-Za-z0-9_]{20,}/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:api[_-]?key|secret|password|access[_-]?token)\s*[:=]\s*["'][A-Za-z0-9_\/+=-]{24,}["']/i,
];
const findings = new Set();
const git = args => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
function inspect(buffer, label) {
  if (buffer.includes(0)) return;
  const text = buffer.toString("utf8");
  if (patterns.some(pattern => pattern.test(text))) findings.add(label);
}
const tracked = git(["ls-files", "--cached", "--others", "--exclude-standard", "-z"]).split("\0").filter(Boolean);
for (const path of tracked) {
  if (/(^|\/)\.env(?:\.|$)/.test(path) && !path.endsWith(".example")) findings.add(`Tracked environment file: ${path}`);
  if (existsSync(path)) inspect(readFileSync(path), `Working tree: ${path}`);
}
// Inspect unique blobs across every locally available branch/tag, without printing their content.
const objects = git(["rev-list", "--objects", "--all"]).trim().split("\n");
const objectTypes = execFileSync("git", ["cat-file", "--batch-check=%(objectname) %(objecttype)"], {
  input: objects.map(line => line.split(" ")[0]).join("\n") + "\n", encoding: "utf8", maxBuffer: 64 * 1024 * 1024,
}).trim().split("\n");
let blobs = 0;
objectTypes.forEach((line, i) => {
  const [sha, type] = line.split(" ");
  if (type !== "blob") return;
  blobs++;
  inspect(execFileSync("git", ["cat-file", "blob", sha], { maxBuffer: 64 * 1024 * 1024 }), `History ${sha.slice(0, 12)}: ${objects[i].slice(41)}`);
});
let assets = 0;
function scanDirectory(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) scanDirectory(path);
    else {
      assets++;
      if (entry.name.endsWith(".map")) findings.add(`Public source map: ${path}`);
      inspect(readFileSync(path), `Browser bundle: ${path}`);
    }
  }
}
if (existsSync(".next/static")) scanDirectory(".next/static");
else if (process.argv.includes("--require-build")) throw new Error("Build before running the release scan");
if (findings.size) {
  console.error("Security review required (values redacted):\n" + [...findings].join("\n"));
  process.exitCode = 1;
} else console.log(`No configured secret patterns found: ${tracked.length} tracked files, ${blobs} historical blobs, ${assets} browser assets. No public source maps.`);
