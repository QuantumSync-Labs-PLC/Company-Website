/**
 * Checks every foreground/background pairing the themes actually use against
 * WCAG 2.1 AA. Run after any palette change: node scripts/check-contrast.mjs
 *
 * Exits non-zero if a pairing regresses, so a future palette edit can't
 * silently reintroduce the failures this was written to fix.
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(root, "src/theme/tailwind.css"), "utf8");

/** Pull `--qs-foo: #hex;` values out of a named block. */
function tokens(blockSelector) {
  const start = css.indexOf(blockSelector);
  if (start === -1) throw new Error(`Block not found: ${blockSelector}`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("\n}", open);
  const block = css.slice(open, close);

  const map = {};
  const aliases = {};

  for (const [, name, value] of block.matchAll(/(--qs-[\w-]+):\s*([^;]+);/g)) {
    const raw = value.trim();
    const hex = raw.match(/^#[0-9a-fA-F]{6}$/);
    const alias = raw.match(/^var\((--qs-[\w-]+)\)$/);
    if (hex) map[name] = raw;
    else if (alias) aliases[name] = alias[1];
  }

  // Resolve one level of indirection (--qs-accent: var(--qs-violet))
  for (const [name, target] of Object.entries(aliases)) {
    if (map[target]) map[name] = map[target];
  }

  return map;
}

const srgb = (c) => {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

function luminance(hex) {
  const h = hex.replace("#", "");
  return (
    0.2126 * srgb(parseInt(h.slice(0, 2), 16)) +
    0.7152 * srgb(parseInt(h.slice(2, 4), 16)) +
    0.0722 * srgb(parseInt(h.slice(4, 6), 16))
  );
}

function ratio(a, b) {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const light = tokens(":root {");
const dark = tokens('[data-theme="dark"] {');

/** [label, foreground token, background token, minimum ratio] */
const PAIRS = [
  ["body text on page", "--qs-text", "--qs-bg", 4.5],
  ["section text on page", "--qs-text-section", "--qs-bg", 4.5],
  ["muted text on page", "--qs-text-muted", "--qs-bg", 4.5],
  ["body text on card", "--qs-text", "--qs-surface-solid", 4.5],
  ["muted text on card", "--qs-text-muted", "--qs-surface-solid", 4.5],
  ["primary as text", "--qs-primary", "--qs-bg", 4.5],
  ["primary as text on card", "--qs-primary", "--qs-surface-solid", 4.5],
  ["accent as text", "--qs-accent", "--qs-bg", 4.5],
  ["signal as text", "--qs-signal", "--qs-bg", 4.5],
  ["danger as text", "--qs-danger", "--qs-bg", 4.5],
  ["danger as text on card", "--qs-danger", "--qs-surface-solid", 4.5],
  ["success as text", "--qs-success", "--qs-bg", 4.5],
  ["warning as text", "--qs-warning", "--qs-bg", 4.5],
  ["primary button label", "--qs-on-primary", "--qs-primary", 4.5],
  ["signal button label", "--qs-on-signal", "--qs-signal", 4.5],
  ["accent button label", "--qs-on-accent", "--qs-accent", 4.5],
  ["input text on input fill", "--qs-text", "--qs-input-bg", 4.5],
  ["gradient start (large text)", "--qs-on-gradient", "--qs-gradient-start", 3],
  ["gradient mid (large text)", "--qs-on-gradient", "--qs-gradient-mid", 3],
  ["gradient end (large text)", "--qs-on-gradient", "--qs-gradient-end", 3],
];

let failed = 0;

for (const [themeName, theme] of [["LIGHT", light], ["DARK", dark]]) {
  console.log(`\n--- ${themeName} ---`);
  for (const [label, fgKey, bgKey, min] of PAIRS) {
    const fg = theme[fgKey];
    const bg = theme[bgKey];
    if (!fg || !bg) {
      console.log(`  ?  ${label.padEnd(30)} missing token (${!fg ? fgKey : bgKey})`);
      failed += 1;
      continue;
    }
    const r = ratio(fg, bg);
    const ok = r >= min;
    if (!ok) failed += 1;
    console.log(
      `  ${ok ? "OK  " : "FAIL"} ${label.padEnd(30)} ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${fg} on ${bg}`
    );
  }
}

console.log(
  failed ? `\n${failed} pairing(s) below target.` : "\nAll pairings meet WCAG AA."
);
process.exit(failed ? 1 : 0);
