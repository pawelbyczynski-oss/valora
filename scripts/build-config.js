const { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "dist");

const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY || "",
};

writeFileSync(
  path.join(root, "config.js"),
  `window.PROPERTY_PANEL_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
);

console.log("Generated config.js");

// Only these files are published. Everything else in the repository
// (Supabase functions, migrations, docs, env examples) stays private.
const required = [
  "index.html",
  "privacy.html",
  "terms.html",
  "app.js",
  "config.js",
  "styles.css",
  "service-worker.js",
  "manifest.webmanifest",
  "property-panel-logo.svg",
  "icons",
];
const optional = ["robots.txt", "sitemap.xml"];

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir);

for (const entry of [...required, ...optional]) {
  const source = path.join(root, entry);
  if (!existsSync(source)) {
    if (required.includes(entry)) throw new Error(`Missing required site file: ${entry}`);
    continue;
  }
  cpSync(source, path.join(outDir, entry), { recursive: true });
}

console.log(`Copied site files to ${path.relative(root, outDir)}/`);
