/**
 * Generates the default Open Graph share card at public/og-image.webp (1200x630).
 *
 * PageMeta.jsx falls back to /og-image.webp for every page that doesn't supply
 * its own image, so this file must exist or shared links render without a preview.
 *
 * Run: node scripts/generate-og-image.mjs
 */
import sharp from "sharp";
import { statSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;
const MARK_SIZE = 210;
const MARK_X = 96;

// Matches src/constants/themeTokens.js ("Deep-Space Holographic")
const BG = "#060810";
const CYAN = "#22d3ee";
const VIOLET = "#8b5cf6";
const TEXT = "#e7ecf5";
const MUTED = "#94a3b8";

const FONT = "Segoe UI, Inter, Helvetica Neue, Arial, sans-serif";

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${CYAN}"/>
      <stop offset="55%" stop-color="${VIOLET}"/>
      <stop offset="100%" stop-color="#f65fb5"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.18" cy="0.5" r="0.62">
      <stop offset="0%" stop-color="${CYAN}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${CYAN}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 L0 0 0 48" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${BG}"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#glow)"/>
  <rect width="${WIDTH}" height="8" fill="url(#accent)"/>

  <text x="${MARK_X + MARK_SIZE + 56}" y="272"
        font-family="${FONT}" font-size="66" font-weight="700" fill="${TEXT}"
        letter-spacing="-1.5">QuantumSync<tspan fill="${CYAN}">Labs</tspan></text>

  <text x="${MARK_X + MARK_SIZE + 58}" y="330"
        font-family="${FONT}" font-size="30" font-weight="400" fill="${MUTED}">
    Software, cloud and AI engineering
  </text>

  <text x="${MARK_X + MARK_SIZE + 58}" y="398"
        font-family="${FONT}" font-size="21" font-weight="600" fill="${CYAN}"
        letter-spacing="3.5">SECURE &#183; SCALABLE &#183; SHIPPED</text>

  <rect x="${MARK_X + MARK_SIZE + 58}" y="424" width="86" height="3" fill="url(#accent)"/>
</svg>
`);

// The source logo sits on its own opaque square; rounding it reads as a
// deliberate badge against the dark card instead of a pasted rectangle.
const roundedMask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${MARK_SIZE}" height="${MARK_SIZE}">
     <rect width="${MARK_SIZE}" height="${MARK_SIZE}" rx="34" ry="34" fill="#fff"/>
   </svg>`
);

const mark = await sharp(join(root, "public/assets/images/og-logo.webp"))
  .resize(MARK_SIZE, MARK_SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .composite([{ input: roundedMask, blend: "dest-in" }])
  .png()
  .toBuffer();

const out = join(root, "public/og-image.webp");

await sharp(background)
  .composite([{ input: mark, left: MARK_X, top: Math.round((HEIGHT - MARK_SIZE) / 2) }])
  .webp({ quality: 88 })
  .toFile(out);

const { size } = statSync(out);
console.log(`Wrote public/og-image.webp (${WIDTH}x${HEIGHT}, ${Math.round(size / 1024)} KB)`);
