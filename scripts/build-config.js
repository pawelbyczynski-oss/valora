const { writeFileSync } = require("node:fs");

const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
};

writeFileSync(
  "config.js",
  `window.PROPERTY_PANEL_CONFIG = ${JSON.stringify(config, null, 2)};\n`,
);

console.log("Generated config.js");
