import { InteractiveSheet } from "@/components/InteractiveSheet";
import { buildChordBook } from "@/lib/chords";
import { classifyLines, sheetKind, uniqueChords } from "@/lib/sheet";

export { classifyLines, uniqueChords };

export function SheetReader({ content }: { content: string }) {
  const lines = classifyLines(content);
  const chords = uniqueChords(lines);
  const chordBook = buildChordBook(chords);

  return (
    <InteractiveSheet
      lines={lines}
      chords={chords}
      chordBook={chordBook}
      hasTab={sheetKind(lines) !== "chords"}
    />
  );
}
