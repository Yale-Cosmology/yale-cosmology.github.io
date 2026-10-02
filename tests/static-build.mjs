import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
const base = (process.env.BASE_PATH || "").replace(/\/$/, "");
const pages = ["index.html", "schedule/index.html", "speakers/index.html"];
for (const page of pages) {
  const html = readFileSync(resolve("dist", page), "utf8");
  assert.doesNotMatch(html, /<script\b/i, `${page}: unexpected browser script`);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /id="main"/);
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1];
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    assert.ok(url.startsWith(`${base}/`), `${page}: wrong base path in ${url}`);
    const path = url.slice(base.length + 1).split("#")[0];
    assert.ok(
      existsSync(
        resolve(
          "dist",
          path.endsWith("/") || path === "" ? `${path}index.html` : path,
        ),
      ),
      `${page}: missing target ${url}`,
    );
  }
}
const htmlFiles = readdirSync("dist", { recursive: true })
  .filter((p) => p.endsWith(".html"))
  .sort();
assert.deepEqual(htmlFiles, [...pages].sort());
console.log(
  "Static build passed: exactly three pages, local links/assets valid, no browser scripts.",
);
