import { ChordWeaverPromo } from "@/components/ChordWeaverPromo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SongList } from "@/components/SongList";
import { artistDisplayName, getArtistWorks } from "@/lib/catalog";

export async function ArtistPage({ artistSlug }: { artistSlug: string }) {
  const works = await getArtistWorks(artistSlug);
  const artistName = artistDisplayName(artistSlug);
  const tabCount = works.filter((work) => work.hasTab).length;

  return (
    <>
      <SiteHeader variant="compact" />
      <main className="workspace single-column">
        <section className="results-panel" aria-labelledby="artist-title">
          <p className="eyebrow">Artista</p>
          <h1 id="artist-title">Tablaturas de {artistName}</h1>
          <p className="section-copy">
            {works.length} canciones, {tabCount} con tablatura de riffs o solos y el resto con letra
            y acordes. Algunas tienen varias transcripciones.
          </p>
          <SongList works={works} showArtist={false} />
        </section>
        <ChordWeaverPromo placement={`artist:${artistSlug}`} />
      </main>
      <SiteFooter />
    </>
  );
}
