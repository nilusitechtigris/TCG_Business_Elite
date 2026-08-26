const ANALYSIS_WIDTH = 320;

/** Median of a numeric array. */
function median(values) {
  const sorted = Float64Array.from(values).sort();
  const middle = sorted.length >> 1;
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

/** Opponent-space coordinates used to separate card pixels from table pixels. */
function opponent(r, g, b) {
  return { l: (r + g + b) / 3, a: r - g, y: (r + g) / 2 - b };
}

/**
 * Locate the card (including any grading slab) in a photograph shot on the
 * wooden table. Returns a normalized box, or null when nothing separable is found.
 */
export async function findCardBox(pipelineFactory) {
  const { data, info } = await pipelineFactory()
    .resize({ width: ANALYSIS_WIDTH })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const at = (x, y) => {
    const i = (y * width + x) * channels;
    return opponent(data[i], data[i + 1], data[i + 2]);
  };

  // Table colour = median of the outer ring, so a dark object touching one
  // edge cannot drag the estimate away from the wood.
  const ringX = Math.max(2, Math.round(width * 0.06));
  const ringY = Math.max(2, Math.round(height * 0.06));
  const ringL = [], ringA = [], ringY2 = [];
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const onRing = x < ringX || x >= width - ringX || y < ringY || y >= height - ringY;
      if (!onRing) continue;
      const p = at(x, y);
      ringL.push(p.l); ringA.push(p.a); ringY2.push(p.y);
    }
  }
  const table = { l: median(ringL), a: median(ringA), y: median(ringY2) };

  // Foreground = far enough from the table colour in lightness or chroma.
  const raw = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const p = at(x, y);
      const dl = (p.l - table.l) / 42;
      const da = (p.a - table.a) / 22;
      const dy = (p.y - table.y) / 26;
      raw[y * width + x] = Math.hypot(dl, da, dy) > 1 ? 1 : 0;
    }
  }

  // 3x3 majority filter twice: drops wood-grain speckle, closes card texture.
  let mask = raw;
  for (let pass = 0; pass < 2; pass += 1) {
    const next = new Uint8Array(width * height);
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        let on = 0, total = 0;
        for (let dy = -1; dy <= 1; dy += 1) {
          for (let dx = -1; dx <= 1; dx += 1) {
            const nx = x + dx, ny = y + dy;
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
            total += 1;
            on += mask[ny * width + nx];
          }
        }
        next[y * width + x] = on * 2 > total ? 1 : 0;
      }
    }
    mask = next;
  }

  // Largest connected component wins: the card is far bigger than the clamp
  // at the edge of frame or any stray highlight.
  const labels = new Int32Array(width * height).fill(-1);
  const stack = [];
  let best = null;
  for (let start = 0; start < mask.length; start += 1) {
    if (!mask[start] || labels[start] !== -1) continue;
    labels[start] = start;
    stack.length = 0;
    stack.push(start);
    let area = 0, minX = width, minY = height, maxX = -1, maxY = -1;
    while (stack.length) {
      const index = stack.pop();
      const x = index % width, y = (index - x) / width;
      area += 1;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      for (let dy = -1; dy <= 1; dy += 1) {
        for (let dx = -1; dx <= 1; dx += 1) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const n = ny * width + nx;
          if (!mask[n] || labels[n] !== -1) continue;
          labels[n] = start;
          stack.push(n);
        }
      }
    }
    if (!best || area > best.area) best = { area, minX, minY, maxX, maxY, label: start };
  }

  if (!best || best.area < width * height * 0.04) return null;

  // The card is a solid rectangle, so its rows and columns are almost fully
  // covered. Trimming the sparse ends drops anything thin that leaked into the
  // component -- the clamp at the edge of frame, a cast shadow, a highlight.
  const columns = new Int32Array(best.maxX - best.minX + 1);
  const rows = new Int32Array(best.maxY - best.minY + 1);
  for (let y = best.minY; y <= best.maxY; y += 1) {
    for (let x = best.minX; x <= best.maxX; x += 1) {
      if (labels[y * width + x] !== best.label) continue;
      columns[x - best.minX] += 1;
      rows[y - best.minY] += 1;
    }
  }
  const span = densestRun(columns);
  const rowSpan = densestRun(rows);

  const left = best.minX + span.start;
  const top = best.minY + rowSpan.start;
  const boxWidth = span.end - span.start + 1;
  const boxHeight = rowSpan.end - rowSpan.start + 1;

  return {
    left: left / width,
    top: top / height,
    width: boxWidth / width,
    height: boxHeight / height,
  };
}

/** Longest contiguous run of a profile that stays above 45% of its peak. */
function densestRun(profile) {
  let peak = 0;
  for (const value of profile) if (value > peak) peak = value;
  const floor = peak * 0.45;
  let best = { start: 0, end: profile.length - 1, length: 0 };
  let start = -1;
  for (let i = 0; i <= profile.length; i += 1) {
    const inside = i < profile.length && profile[i] >= floor;
    if (inside && start === -1) start = i;
    if (!inside && start !== -1) {
      const length = i - start;
      if (length > best.length) best = { start, end: i - 1, length };
      start = -1;
    }
  }
  return best;
}

/** Normalized box -> integer extract region on a full-resolution image. */
export function toExtract(box, width, height, margin = 0.005) {
  const padX = box.width * width * margin;
  const padY = box.height * height * margin;
  const left = Math.max(0, Math.round(box.left * width - padX));
  const top = Math.max(0, Math.round(box.top * height - padY));
  const right = Math.min(width, Math.round((box.left + box.width) * width + padX));
  const bottom = Math.min(height, Math.round((box.top + box.height) * height + padY));
  return { left, top, width: Math.max(1, right - left), height: Math.max(1, bottom - top) };
}
