#!/usr/bin/env node
// Turns screenshots of a project into the images its slide deck shows, and
// records where each one came from in src/data/screens.json.
//
//   node scripts/import-screens.mjs <deck> <source dir> "<where it came from>" <file[:top:height]>...
//
//   <deck>    the slide deck the images belong to (public/work/<deck>/)
//   <source>  the folder holding the PNG screenshots
//   <from>    one line saying what produced them, e.g.
//             "mau-heritage-hub@73bd7c7, its e2e walkthrough on the local demo stack"
//   file      a screenshot's name without .png; ":top:height" keeps only that
//             band of a tall page (pixels from the top)
//
// Each image is written as WebP at most 1440 px wide. screens.json gets its
// size (the deck reserves space with it, so nothing jumps while loading), its
// origin and the date it was taken. Re-running with new screenshots replaces
// them; src/data/slides.test.ts fails while a slide points at an image this
// script never produced.
import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const [deck, sourceDir, from, ...files] = process.argv.slice(2);
if (!deck || !sourceDir || !from || files.length === 0) {
  console.error(
    'usage: import-screens.mjs <deck> <source dir> "<from>" <file[:top:height]>...',
  );
  process.exit(1);
}

const outDir = join("public", "work", deck);
const ledgerPath = join("src", "data", "screens.json");
mkdirSync(outDir, { recursive: true });
const ledger = existsSync(ledgerPath)
  ? JSON.parse(readFileSync(ledgerPath, "utf8"))
  : {};

for (const spec of files) {
  const [name, top, height] = spec.split(":");
  const input = join(sourceDir, `${name}.png`);
  let image = sharp(input);
  if (top !== undefined) {
    const { width, height: full } = await image.metadata();
    const band = Math.min(Number(height), full - Number(top));
    image = image.extract({ left: 0, top: Number(top), width, height: band });
  }
  const buffer = await image.toBuffer();
  const out = await sharp(buffer)
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(join(outDir, `${name}.webp`));
  ledger[`${deck}/${name}`] = {
    width: out.width,
    height: out.height,
    from,
    taken: statSync(input).mtime.toISOString().slice(0, 10),
  };
  console.log(
    `${deck}/${name}.webp ${out.width}x${out.height} ${Math.round(out.size / 1024)} KB`,
  );
}

const sorted = Object.fromEntries(
  Object.entries(ledger).sort(([a], [b]) => a.localeCompare(b)),
);
writeFileSync(ledgerPath, `${JSON.stringify(sorted, null, 2)}\n`);
