import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { findCardBox, toExtract } from './card-crop.mjs';

const sourceDir = path.resolve('../Szobo');
const outDir = path.resolve('public/cards');
const files = (await fs.readdir(sourceDir)).filter((file) => file.endsWith('.jpg')).sort();
// Two backs are printed sideways relative to their front, so they need turning
// a quarter turn anticlockwise before the card reads the right way up.
const extraRotation = new Map([['20260826_102705.jpg', 270], ['20260826_103257.jpg', 270]]);
const sizes = [480, 960, 1920];

await fs.mkdir(outDir, { recursive: true });

let cropped = 0;

for (let index = 0; index < files.length; index += 1) {
  const file = files[index];
  const cardIndex = Math.floor(index / 2) + 1;
  const side = index % 2 === 0 ? 'front' : 'back';

  // Apply EXIF orientation once, then work from the upright pixels so the crop
  // box and the exported images agree.
  const upright = sharp(path.join(sourceDir, file)).rotate();
  const rotation = extraRotation.get(file);
  const oriented = await (rotation ? upright.rotate(rotation) : upright).toBuffer({ resolveWithObject: true });

  // Isolate the card (and its slab, when graded) from the table it was shot on.
  const box = await findCardBox(() => sharp(oriented.data));
  const region = box ? toExtract(box, oriented.info.width, oriented.info.height) : null;
  if (region) cropped += 1;
  else console.warn(`No card outline found in ${file}; exporting the full frame.`);

  for (const width of sizes) {
    let pipeline = sharp(oriented.data);
    if (region) pipeline = pipeline.extract(region);
    await pipeline
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: width === 480 ? 74 : 84, effort: 5 })
      .toFile(path.join(outDir, `${String(cardIndex).padStart(2, '0')}-${side}-${width}.webp`));
  }
}

console.log(`Created ${files.length * sizes.length} optimized card images from ${files.length} preserved originals (${cropped}/${files.length} cropped to the card).`);
