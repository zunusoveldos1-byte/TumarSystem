import { cpSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Docker copies these assets in the image; local standalone starts need them too.
const root = new URL("../", import.meta.url);
const standalone = new URL(".next/standalone/", root);
mkdirSync(new URL(".next/", standalone), { recursive: true });
cpSync(fileURLToPath(new URL("public/", root)), fileURLToPath(new URL("public/", standalone)), { recursive: true });
cpSync(fileURLToPath(new URL(".next/static/", root)), fileURLToPath(new URL(".next/static/", standalone)), { recursive: true });
process.env.HOSTNAME = "0.0.0.0";
process.env.PORT ??= "3000";
await import(new URL("server.js", standalone).href);
