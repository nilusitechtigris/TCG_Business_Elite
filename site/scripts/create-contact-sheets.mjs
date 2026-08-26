import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDir = path.resolve('../Szobo');
const outDir = path.resolve('../review-sheets');
const files = (await fs.readdir(sourceDir)).filter((file) => file.endsWith('.jpg')).sort();
await fs.mkdir(outDir, { recursive: true });

const columns = 4;
const rows = 3;
const cellWidth = 450;
const cellHeight = 360;
const imageHeight = 320;

for (let page = 0; page < Math.ceil(files.length / (columns * rows)); page += 1) {
  const pageFiles = files.slice(page * columns * rows, (page + 1) * columns * rows);
  const composites = [];
  for (let index = 0; index < pageFiles.length; index += 1) {
    const file = pageFiles[index];
    const thumb = await sharp(path.join(sourceDir, file))
      .rotate()
      .resize(cellWidth, imageHeight, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 78 })
      .toBuffer();
    const label = Buffer.from(
      `<svg width="${cellWidth}" height="40"><rect width="100%" height="100%" fill="#111214"/><text x="14" y="25" font-size="16" fill="#e8dfca" font-family="Arial">${String(page * 12 + index + 1).padStart(2, '0')} · ${file}</text></svg>`,
    );
    const x = (index % columns) * cellWidth;
    const y = Math.floor(index / columns) * cellHeight;
    composites.push({ input: thumb, left: x, top: y });
    composites.push({ input: label, left: x, top: y + imageHeight });
  }

  await sharp({
    create: {
      width: columns * cellWidth,
      height: rows * cellHeight,
      channels: 3,
      background: '#090a0b',
    },
  })
    .composite(composites)
    .jpeg({ quality: 86 })
    .toFile(path.join(outDir, `sheet-${page + 1}.jpg`));
}

console.log(`Created ${Math.ceil(files.length / 12)} review sheets for ${files.length} photographs in ${outDir}`);
