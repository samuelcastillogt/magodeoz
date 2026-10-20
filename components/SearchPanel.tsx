import Link from "next/link";
import { Search, X } from "lucide-react";

type ArtistFilter = {
  artistSlug: string;
  name: string;
  count: number;
  route: string;
};

export function SearchPanel({
  artists,
  query,
  activeArtist,
  tabsOnly = false,
}: {
  artists: ArtistFilter[];
  query: string;
  activeArtist: string;
  tabsOnly?: boolean;
}) {
  const tabHref = buildHref({ artist: activeArtist, q: query, tipo: tabsOnly ? "" : "tablatura" });

  return (
    <aside className="filters-panel" aria-labelledby="filters-title">
      <form className="search-form" role="search" action="/">
        <label htmlFor="song-search">Busca una canción</label>
        <div className="search-row">
          <Search aria-hidden="true" />
          <input
            id="song-search"
            name="q"
            type="search"
            placeholder="Ej.: fiesta pagana, molinos…"
            defaultValue={query}
            autoComplete="off"
          />
          {activeArtist ? <input type="hidden" name="artist" value={activeArtist} /> : null}
          {tabsOnly ? <input type="hidden" name="tipo" value="tablatura" /> : null}
          {query || activeArtist || tabsOnly ? (
            <Link className="icon-button" href="/" aria-label="Limpiar busqueda">
              <X aria-hidden="true" />
            </Link>
          ) : null}
          <button className="primary-button" type="submit">
            <Search aria-hidden="true" />
            <span>Buscar</span>
          </button>
        </div>
      </form>

      <Link
        className={tabsOnly ? "artist-tab tab-filter active" : "artist-tab tab-filter"}
        href={tabHref}
        aria-pressed={tabsOnly}
      >
        <span>Solo tablaturas</span>
      </Link>

      <div className="artist-tabs" aria-labelledby="filters-title">
        <h2 id="filters-title">Artistas</h2>
        <Link className={!activeArtist ? "artist-tab active" : "artist-tab"} href={buildHref({ q: query, tipo: tabsOnly ? "tablatura" : "" })}>
          <span>Todos</span>
        </Link>
        {artists.map((artist) => {
          const href =
            query || tabsOnly
              ? buildHref({ artist: artist.artistSlug, q: query, tipo: tabsOnly ? "tablatura" : "" })
              : artist.route;

          return (
            <Link
              className={activeArtist === artist.artistSlug ? "artist-tab active" : "artist-tab"}
              href={href}
              key={artist.artistSlug}
            >
              <span>{artist.name}</span>
              <strong>{artist.count}</strong>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

function buildHref(params: Record<string, string>): string {
  const search = new URLSearchParams(
    Object.entries(params).filter(([, value]) => Boolean(value)),
  ).toString();
  return search ? `/?${search}` : "/";
}
