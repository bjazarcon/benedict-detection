/**
 * Digital Image Processing Utilities
 * Real Canvas-based Computer Vision Algorithms
 */

export interface HistogramData {
  r: number[];
  g: number[];
  b: number[];
  maxCount: number;
}

export function processImageGrayscale(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    // Luminosity method: 0.299*R + 0.587*G + 0.114*B
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    data[i] = gray;
    data[i + 1] = gray;
    data[i + 2] = gray;
  }
  ctx.putImageData(imageData, 0, 0);
}

export function processImageSobelEdges(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
): void {
  const src = ctx.getImageData(0, 0, width, height);
  const dst = ctx.createImageData(width, height);
  const sData = src.data;
  const dData = dst.data;

  // Convert to grayscale buffer first
  const gray = new Uint8ClampedArray(width * height);
  for (let i = 0; i < gray.length; i++) {
    const idx = i * 4;
    gray[i] = 0.299 * sData[idx] + 0.587 * sData[idx + 1] + 0.114 * sData[idx + 2];
  }

  // Sobel kernels
  // Gx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]
  // Gy = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx00 = (y - 1) * width + (x - 1);
      const idx01 = (y - 1) * width + x;
      const idx02 = (y - 1) * width + (x + 1);

      const idx10 = y * width + (x - 1);
      const idx12 = y * width + (x + 1);

      const idx20 = (y + 1) * width + (x - 1);
      const idx21 = (y + 1) * width + x;
      const idx22 = (y + 1) * width + (x + 1);

      const gx =
        -gray[idx00] +
        gray[idx02] -
        2 * gray[idx10] +
        2 * gray[idx12] -
        gray[idx20] +
        gray[idx22];

      const gy =
        -gray[idx00] -
        2 * gray[idx01] -
        gray[idx02] +
        gray[idx20] +
        2 * gray[idx21] +
        gray[idx22];

      const mag = Math.min(255, Math.sqrt(gx * gx + gy * gy));
      const pIdx = (y * width + x) * 4;

      // Render edge in glowing high-tech cyan/green or white
      dData[pIdx] = mag > 45 ? Math.min(255, mag * 1.4) : 0;
      dData[pIdx + 1] = mag > 45 ? Math.min(255, mag * 1.8) : 0;
      dData[pIdx + 2] = mag > 45 ? 255 : 0;
      dData[pIdx + 3] = 255;
    }
  }

  ctx.putImageData(dst, 0, 0);
}

export function processImageThreshold(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  threshold: number = 128
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const val = gray >= threshold ? 255 : 0;
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
  }
  ctx.putImageData(imageData, 0, 0);
}

export function computeHistogram(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  bins: number = 32
): HistogramData {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const r = new Array(bins).fill(0);
  const g = new Array(bins).fill(0);
  const b = new Array(bins).fill(0);

  const binSize = 256 / bins;

  for (let i = 0; i < data.length; i += 4) {
    const rBin = Math.min(bins - 1, Math.floor(data[i] / binSize));
    const gBin = Math.min(bins - 1, Math.floor(data[i + 1] / binSize));
    const bBin = Math.min(bins - 1, Math.floor(data[i + 2] / binSize));

    r[rBin]++;
    g[gBin]++;
    b[bBin]++;
  }

  let maxCount = 0;
  for (let i = 0; i < bins; i++) {
    if (r[i] > maxCount) maxCount = r[i];
    if (g[i] > maxCount) maxCount = g[i];
    if (b[i] > maxCount) maxCount = b[i];
  }

  return { r, g, b, maxCount: maxCount || 1 };
}
