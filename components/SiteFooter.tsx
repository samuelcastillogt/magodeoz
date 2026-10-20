import Link from "next/link";

import { chordWeaverHref } from "@/lib/chordweaver";
import { SITE_NAME } from "@/lib/seo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{SITE_NAME}</strong>
        <p>
          Tablaturas y transcripciones hechas por la comunidad de guitarristas.
          Los diagramas de acordes usan datos de chords-db (MIT).
        </p>
      </div>
      <nav aria-label="Pie de página">
        <Link href="/mago-de-oz">Mägo de Oz</Link>
        <Link href="/jose-andrea">José Andrea</Link>
        <Link href="/blog">Blog</Link>
        <a href={chordWeaverHref({ placement: "footer" })}>ChordWeaver</a>
      </nav>
    </footer>
  );
}
