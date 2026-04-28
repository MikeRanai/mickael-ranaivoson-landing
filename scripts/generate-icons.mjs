import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const svg = readFileSync(join(root, "app", "icon.svg"));

const targets = [
  { out: "app/icon.png", size: 512 },
  { out: "app/apple-icon.png", size: 180 },
];

for (const { out, size } of targets) {
  await sharp(svg, { density: 96, limitInputPixels: false })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(join(root, out));
  console.log(`generated ${out} (${size}x${size})`);
}
