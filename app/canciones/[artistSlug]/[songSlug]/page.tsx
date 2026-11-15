import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChordWeaverPromo } from "@/components/ChordWeaverPromo";
import { HarmonyAnalysis } from "@/components/HarmonyAnalysis";
import { SheetReader, classifyLines, uniqueChords } from "@/components/SheetReader";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSong, getSongSheet, getSongVersions, getStaticSongParams } from "@/lib/catalog";
import { keyLabel, summarizeHarmony } from "@/lib/harmony";
import { toAmericanSymbol } from "@/lib/notation";
import { SITE_NAME, absoluteUrl, truncateDescription } from "@/lib/seo";
import { SHEET_KIND_LABELS, chordSequence } from "@/lib/sheet";

type PageProps = {
  params: Promise<{ artistSlug: string; songSlug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticSongParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { artistSlug, songSlug } = await params;
  const song = await getSong(artistSlug, songSlug);

  if (!song) {
    return {
      title: "Canción no encontrada",
      robots: { index: false, follow: false },
    };
  }

  const versionSuffix = song.versionOrder > 0 && song.versionLabel ? ` (${song.versionLabel})` : "";
  const isTab = song.kind !== "chords";
  const description = truncateDescription(
    isTab
      ? `Tablatura de ${song.title}${versionSuffix} de ${song.artistName} para guitarra: riffs, solos y punteos con leyenda de técnicas${song.kind === "tab-chords" ? " y acordes con diagrama" : ""}.`
      : `Acordes de ${song.title}${versionSuffix} de ${song.artistName}: letra con acordes y diagramas de guitarra. Transpórtala al tono que necesites.`,
  );

  return {
    title: `${song.title}${versionSuffix}: ${isTab ? "tablatura" : "acordes"} de ${song.artistName}`,
    description,
    alternates: {
      canonical: absoluteUrl(song.route),
    },
    openGraph: {
      title: `${song.title} – ${song.artistName} | ${isTab ? "Tablatura" : "Acordes"}`,
      description,
      type: "music.song",
      url: absoluteUrl(song.route),
    },
  };
}

export default async function SongPage({ params }: PageProps) {
  const { artistSlug, songSlug } = await params;
  const [song, sheet] = await Promise.all([
    getSong(artistSlug, songSlug),
    getSongSheet(artistSlug, songSlug),
  ]);

  if (!song || !sheet) notFound();

  const versions = await getSongVersions(song.artist_slug, song.workSlug);
  const lines = classifyLines(sheet);
  const harmony = summarizeHarmony(chordSequence(lines));
  const progression = uniqueChords(lines)
    .map((chord) => toAmericanSymbol(chord))
    .filter((chord): chord is string => Boolean(chord))
    .slice(0, 8);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "MusicComposition",
      name: song.title,
      url: absoluteUrl(song.route),
      inLanguage: "es",
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: absoluteUrl("/") },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Canciones", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: song.artistName,
          item: absoluteUrl(`/${song.artist_slug}`),
        },
        { "@type": "ListItem", position: 3, name: song.title, item: absoluteUrl(song.route) },
      ],
    },
  ];

  return (
    <>
      <SiteHeader variant="compact" />
      <main className="workspace single-column">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <article className="song-detail">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Canciones</Link>
            <span>/</span>
            <Link href={`/${song.artist_slug}`}>{song.artistName}</Link>
            <span>/</span>
            <span>{song.title}</span>
          </nav>

          <header className="detail-hero">
            <p className="eyebrow">
              {SHEET_KIND_LABELS[song.kind]} · {song.artistName}
            </p>
            <h1>{song.title}</h1>
            <p>
              {song.kind === "chords"
                ? "Toca cualquier acorde para ver cómo se pone en la guitarra. Si no te queda cómodo el tono, usa el transpositor."
                : "Cada pentagrama muestra las seis cuerdas con el traste a pisar. Abre la leyenda si necesitas repasar las técnicas, y desliza horizontalmente en el móvil."}
            </p>
            {harmony ? (
              <p className="harmony-teaser">
                En {keyLabel(harmony.key)}
                {harmony.loop ? `, sobre el ciclo ${harmony.loop.join(" – ")}` : ""}.{" "}
                <a href="#analisis">¿Por qué suena así?</a>
              </p>
            ) : null}
          </header>

          {versions.length > 1 ? (
            <nav className="version-tabs" aria-label="Versiones de esta canción">
              {versions.map((version) => (
                <Link
                  key={version.slug}
                  href={version.route}
                  className={version.slug === song.slug ? "version-tab active" : "version-tab"}
                  aria-current={version.slug === song.slug ? "page" : undefined}
                >
                  {version.versionLabel ?? version.title}
                </Link>
              ))}
            </nav>
          ) : null}

          <SheetReader content={sheet} />

          {harmony ? (
            <HarmonyAnalysis
              title={song.title}
              song={`${song.artist_slug}/${song.slug}`}
              summary={harmony}
            />
          ) : null}
        </article>

        {harmony ? null : (
          <ChordWeaverPromo
            placement="song"
            song={`${song.artist_slug}/${song.slug}`}
            chords={progression}
            title={`Explora la armonía de ${song.title}`}
            description="Lleva estos acordes a ChordWeaver: mira en el mapa armónico qué otros acordes conectan con ellos, escucha la progresión y arma tu propia versión."
          />
        )}
      </main>
      <SiteFooter />
    </>
  );
}
