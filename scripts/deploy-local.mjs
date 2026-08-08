import "dotenv/config";

import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const outputDir = process.env.OUTPUT_DIR;

if (!outputDir) {
  console.error("deploy:local requires OUTPUT_DIR in .env or the environment.");
  process.exit(1);
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = ["main.js", "manifest.json", "styles.css"];

await mkdir(outputDir, { recursive: true });

for (const file of files) {
  await copyFile(resolve(projectRoot, file), resolve(outputDir, file));
}

console.log(`Deployed ${files.join(", ")} to ${outputDir}`);
