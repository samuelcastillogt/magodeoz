// Line classification for song sheets, shared by the reader and the catalog.

import "server-only";

import type { InteractiveSheetLine } from "@/lib/chord-types";
import { tokenizeChordLine } from "@/lib/chords";
import { cleanChordToken, isChordSymbol, toAmericanSymbol } from "@/lib/notation";

export type SheetKind = "tab" | "tab-chords" | "chords";

const SECTION_RE =
  /^(intro(ducci[oó]n)?|estrofa|verso|coro|chorus|puente|bridge|solo|final|outro|interludio|riff|pre[- ]?coro)\b[\s\d]*[:.]?$/i;
const TAB_RE = /^\s*(\d\S?\s*)?([eEbBgGdDaA][|:])|[-0-9hbp~/\\|]{6,}/;
const INSTRUCTION_RE =
  /\b(afinaci[oó]n|capo|cejilla|tono|transportar|varias veces|arpegio|rasgueo|x\d+)\b/i;
/** A sheet with fewer staff lines than this only has a short riff. */
const MIN_TAB_LINES = 6;
const MIN_CHORD_LINES = 4;

export const SHEET_KIND_LABELS: Record<SheetKind, string> = {
  tab: "Tablatura",
  "tab-chords": "Tablatura y acordes",
  chords: "Acordes",
};

export function classifyLines(content: string): InteractiveSheetLine[] {
  return content.split("\n").map((line) => {
    if (!line.trim()) return { type: "blank", value: "" };
    const trimmed = line.trim();
    if (SECTION_RE.test(trimmed)) return { type: "section", value: line };
    if (TAB_RE.test(line)) return { type: "tab", value: line };
    if (isChordLine(line)) {
      return { type: "chord", value: line, segments: tokenizeChordLine(line) };
    }
    if (INSTRUCTION_RE.test(line)) return { type: "instruction", value: line };
    return { type: "lyric", value: line };
  });
}

export function sheetKind(lines: InteractiveSheetLine[]): SheetKind {
  const tabLines = lines.filter((line) => line.type === "tab").length;
  const chordLines = lines.filter((line) => line.type === "chord").length;
  if (tabLines < MIN_TAB_LINES) return "chords";
  return chordLines >= MIN_CHORD_LINES ? "tab-chords" : "tab";
}

/** Chord symbols in order of first appearance. */
export function uniqueChords(lines: InteractiveSheetLine[]): string[] {
  const seen = new Set<string>();
  for (const line of lines) {
    for (const segment of line.segments ?? []) {
      if (segment.type !== "chord") continue;
      const symbol = cleanChordToken(segment.value);
      if (symbol) seen.add(symbol);
    }
  }
  return [...seen];
}

/** Every chord in reading order (repeats included), in American spelling. */
export function chordSequence(lines: InteractiveSheetLine[]): string[] {
  return lines.flatMap((line) =>
    (line.segments ?? [])
      .filter((segment) => segment.type === "chord")
      .map((segment) => toAmericanSymbol(cleanChordToken(segment.value)))
      .filter((symbol): symbol is string => Boolean(symbol)),
  );
}

function isChordLine(line: string): boolean {
  const tokens = line
    .trim()
    .split(/[\s-]+/)
    .filter(Boolean);
  if (!tokens.length) return false;
  return tokens.filter(isChordSymbol).length / tokens.length >= 0.65;
}
