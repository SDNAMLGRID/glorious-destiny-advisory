import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const iconsDir = path.join(publicDir, "icons");
const imagesDir = path.join(publicDir, "images", "gda");
const localSource = path.join(imagesDir, "logo-source.png");
const downloadedSource = "E:/Downloads/Generated Image April 20, 2026 - 2_46PM.png";

const gold = "#B58B48";
const ink = "#111111";
const ivory = "#FBF7EF";

await mkdir(iconsDir, { recursive: true });
await mkdir(imagesDir, { recursive: true });

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

const sourcePath = (await exists(downloadedSource)) ? downloadedSource : localSource;

async function removeCheckerboard(input, crop) {
  const image = crop ? sharp(input).extract(crop) : sharp(input);
  const { data, info } = await image.removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const output = Buffer.alloc(info.width * info.height * 4);

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const src = (y * info.width + x) * 3;
      const dest = (y * info.width + x) * 4;
      const r = data[src];
      const g = data[src + 1];
      const b = data[src + 2];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const neutralLight = max - min < 18 && min > 205;
      const alpha = neutralLight ? Math.max(0, Math.min(255, (216 - min) * 16)) : 255;

      output[dest] = r;
      output[dest + 1] = g;
      output[dest + 2] = b;
      output[dest + 3] = alpha;
    }
  }

  return sharp(output, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ background: { r: 255, g: 255, b: 255, alpha: 0 }, threshold: 8 })
    .png()
    .toBuffer();
}

async function flattenOn(input, background) {
  return sharp(input).flatten({ background }).png().toBuffer();
}

async function recolorDarkText(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const ivoryRgb = { r: 251, g: 247, b: 239 };

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);

    if (a > 0 && max < 172 && max - min < 38) {
      data[i] = ivoryRgb.r;
      data[i + 1] = ivoryRgb.g;
      data[i + 2] = ivoryRgb.b;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();
}

async function containOnCanvas(input, { width, height = width, background = ivory, padding = 0 }) {
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;
  const resized = await sharp(input)
    .resize(innerWidth, innerHeight, {
      fit: "contain",
      withoutEnlargement: false,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background,
    },
  })
    .composite([{ input: resized, gravity: "center" }])
    .png()
    .toBuffer();
}

async function writePng(buffer, outPath, options) {
  await sharp(await containOnCanvas(buffer, options)).png().toFile(outPath);
}

async function writeIco(mark) {
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map((size) => containOnCanvas(mark, { width: size, background: ivory, padding: Math.max(1, Math.round(size * 0.08)) })),
  );
  const header = Buffer.alloc(6 + sizes.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);

  let offset = header.length;
  images.forEach((image, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(sizes[index], entry);
    header.writeUInt8(sizes[index], entry + 1);
    header.writeUInt8(0, entry + 2);
    header.writeUInt8(0, entry + 3);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(image.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += image.length;
  });

  await writeFile(path.join(publicDir, "favicon.ico"), Buffer.concat([header, ...images]));
}

function socialBackgroundSvg({ width, height }) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <radialGradient id="glow" cx="50%" cy="43%" r="70%">
          <stop offset="0" stop-color="#29251C"/>
          <stop offset="0.58" stop-color="#131210"/>
          <stop offset="1" stop-color="#070707"/>
        </radialGradient>
        <linearGradient id="wave" x1="0" y1="${height}" x2="${width}" y2="0" gradientUnits="userSpaceOnUse">
          <stop stop-color="#5E4720" stop-opacity="0"/>
          <stop offset="0.42" stop-color="#F3E6C4" stop-opacity="0.72"/>
          <stop offset="0.69" stop-color="${gold}" stop-opacity="0.95"/>
          <stop offset="1" stop-color="#6D521F" stop-opacity="0.12"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#glow)"/>
      <path d="M-80 ${height - 68}C238 ${height - 208} 548 ${height - 8} ${width + 90} ${height - 232}" stroke="url(#wave)" stroke-width="16" fill="none" opacity="0.72"/>
      <path d="M-80 ${height - 38}C276 ${height - 162} 555 ${height - 16} ${width + 88} ${height - 182}" stroke="${gold}" stroke-width="2" fill="none" opacity="0.72"/>
    </svg>
  `;
}

async function writeSocial(fullLogo, { width, height, outPath }) {
  const logo = await sharp(fullLogo)
    .resize(Math.round(width * 0.68), Math.round(height * 0.34), {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .modulate({ brightness: 1.22, saturation: 0.96 })
    .png()
    .toBuffer();

  await sharp(Buffer.from(socialBackgroundSvg({ width, height })))
    .composite([{ input: logo, gravity: "center" }])
    .png()
    .toFile(outPath);
}

function pinnedTabSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path d="M72 326c92-55 238-24 362-111 12-9 25 10 12 20C319 329 169 294 80 350c-17 10-25-14-8-24z"/>
  <path d="M86 377c95-60 240-30 367-114 9-6 19 8 9 15C331 369 185 340 94 398c-15 9-23-12-8-21z"/>
  <path d="M161 137h78v31h-19c-16-20-36-30-61-30-27 0-49 9-66 27-18 18-26 41-26 68 0 28 9 51 27 69 18 17 41 26 70 26 15 0 28-3 40-9v-63h-49v-28h126v28h-28v83c-30 15-61 22-94 22-45 0-82-12-111-37-30-25-44-56-44-94 0-37 14-68 43-93 29-24 65-36 108-36 25 0 47 5 67 15l15-18h24v59z"/>
  <path d="M257 137h95c45 0 82 10 110 31 29 21 43 48 43 82 0 34-14 61-42 82-28 20-66 30-113 30h-93v-31h31V168h-31v-31zm80 31v163h14c32 0 56-7 72-21 17-14 25-34 25-60 0-27-9-47-26-61-17-14-42-21-74-21h-11z"/>
  <path d="M423 91l13 43 43 13-43 13-13 43-13-43-43-13 43-13 13-43z"/>
</svg>
`;
}

async function faviconSvg(mark) {
  const icon = await containOnCanvas(mark, { width: 512, background: ivory, padding: 55 });
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <image width="512" height="512" href="data:image/png;base64,${icon.toString("base64")}"/>
</svg>
`;
}

const fullLogo = await removeCheckerboard(sourcePath, { left: 235, top: 235, width: 1210, height: 190 });
const mark = await removeCheckerboard(sourcePath, { left: 240, top: 235, width: 310, height: 190 });
const socialLogo = await recolorDarkText(fullLogo);

await writeFile(localSource, await flattenOn(fullLogo, ivory));
await writeFile(path.join(publicDir, "favicon.svg"), await faviconSvg(mark));
await writeFile(path.join(publicDir, "safari-pinned-tab.svg"), pinnedTabSvg());

await writePng(mark, path.join(iconsDir, "favicon-16x16.png"), { width: 16, background: ivory, padding: 1 });
await writePng(mark, path.join(iconsDir, "favicon-32x32.png"), { width: 32, background: ivory, padding: 2 });
await writeIco(mark);

await writePng(mark, path.join(iconsDir, "apple-touch-icon.png"), { width: 180, background: ivory, padding: 18 });
await writePng(mark, path.join(iconsDir, "android-chrome-192x192.png"), { width: 192, background: ivory, padding: 20 });
await writePng(mark, path.join(iconsDir, "android-chrome-512x512.png"), { width: 512, background: ivory, padding: 55 });
await writePng(mark, path.join(iconsDir, "mstile-150x150.png"), { width: 150, background: gold, padding: 15 });

await writeSocial(socialLogo, { width: 1200, height: 630, outPath: path.join(publicDir, "og-image.png") });
await writeSocial(socialLogo, { width: 1200, height: 600, outPath: path.join(publicDir, "twitter-image.png") });

await writePng(mark, path.join(imagesDir, "logo-mark-dark.png"), { width: 900, background: ink, padding: 180 });
await writePng(mark, path.join(imagesDir, "logo-mark-light.png"), { width: 900, background: ivory, padding: 180 });
await writePng(fullLogo, path.join(imagesDir, "logo-horizontal-dark.png"), { width: 1400, height: 420, background: ivory, padding: 75 });
await writePng(fullLogo, path.join(imagesDir, "logo-stacked-dark.png"), { width: 900, height: 540, background: ivory, padding: 100 });

await writeFile(
  path.join(publicDir, "site.webmanifest"),
  `${JSON.stringify(
    {
      name: "Glorious Destiny Advisory",
      short_name: "GDA",
      start_url: "/",
      display: "standalone",
      background_color: ivory,
      theme_color: ink,
      icons: [
        { src: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  )}\n`,
);

console.log(`Generated brand assets from ${sourcePath}`);
