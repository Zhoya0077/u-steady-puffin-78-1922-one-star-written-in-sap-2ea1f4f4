import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// One Star, Written in Sap — a houseplant's one-star review of its human.
// The plant's grievance: watered like a forgotten subscription, then hauled
// around the room chasing "better light" and told that counts as love.
const ENTRY =
  "One star. My human waters me like a subscription he forgot to cancel, then drags me across the room chasing 'better light' and calls it love. I am a fern, not furniture.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const entryPath = join(outDir, "entry.txt");
writeFileSync(entryPath, ENTRY, "utf8");
console.log(ENTRY);

// Self-checking gate: the written file must match the entry exactly and
// satisfy the competition gate (UTF-8 text, 1..279 chars, single line).
// Revision: also verify byte length (not just char length) and that the line
// reads as a one-star review, so a silent encoding slip cannot pass.
const written = readFileSync(entryPath, "utf8");
const byteLen = new TextEncoder().encode(written).length;
if (written !== ENTRY) {
  console.error("GATE FAIL: entry.txt does not match the entry");
  process.exit(1);
}
if (byteLen < 1 || byteLen > 279) {
  console.error(`GATE FAIL: entry is ${byteLen} bytes, outside 1..279`);
  process.exit(1);
}
if (!written.startsWith("One star.")) {
  console.error("GATE FAIL: entry must open as a one-star review");
  process.exit(1);
}
if (written.includes("\n") || written.trim().length === 0) {
  console.error("GATE FAIL: entry must be a single non-blank line");
  process.exit(1);
}
console.log(`OK: entry.txt written (${written.length} chars)`);
