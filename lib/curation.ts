// Editorial layer over the captured snapshot: fixes titles, groups alternative
// transcriptions of the same song and hides entries that do not belong.

export type SongCuration = {
  /** Corrected display title. */
  title?: string;
  /** Slug of the song this transcription belongs to (defaults to its own slug). */
  work?: string;
  /** Short label shown when a song has several transcriptions. */
  version?: string;
  /** Sort position inside the work; the lowest one is the main version. */
  order?: number;
  /** Excluded from the catalog (wrong artist, broken capture, exact duplicate). */
  hidden?: boolean;
};

type Key = `${string}/${string}`;

export const SONG_CURATION: Record<Key, SongCuration> = {
  // Mägo de Oz
  "mago-de-oz/ancha-es-castilla": { title: "Ancha es Castilla" },
  // Tierra Santa song mislabeled in the source catalog.
  "mago-de-oz/caballo-de-troya": { hidden: true },
  "mago-de-oz/deja-de-llorar-y-vuelvete-a-levantar": {
    title: "Deja de llorar (y vuélvete a levantar)",
  },
  // José Andrea song; the José Andrea entry holds the same transcription.
  "mago-de-oz/donde-el-corazon-te-lleve": { hidden: true },
  "mago-de-oz/dime-con-quien-andas": { title: "Dime con quién andas" },
  "mago-de-oz/el-arbol-de-la-noche-triste": { title: "El árbol de la noche triste" },
  "mago-de-oz/el-atrapasuenos": { title: "El atrapasueños" },
  "mago-de-oz/el-callejon-del-infierno": { title: "El callejón del infierno" },
  "mago-de-oz/el-fin-del-camino": { title: "El fin del camino" },
  "mago-de-oz/el-flautista": { title: "El flautista" },
  "mago-de-oz/el-lago": { title: "El lago" },
  "mago-de-oz/el-lider": { title: "El líder" },
  "mago-de-oz/el-pacto": { title: "El pacto" },
  "mago-de-oz/el-principe-de-la-dulce-pena": { title: "El príncipe de la dulce pena" },
  "mago-de-oz/el-santo-grial": { title: "El santo grial" },
  "mago-de-oz/estrella-fugaz": { title: "Estrella fugaz" },
  "mago-de-oz/fiesta-pagana": { title: "Fiesta pagana" },
  "mago-de-oz/gimme-some-lovin": { title: "Gimme Some Lovin'" },
  "mago-de-oz/girls-just-want-to-have-fun": { title: "Girls Just Want to Have Fun" },
  "mago-de-oz/hechizos-posimas-y-brujerias": { title: "Hechizos, pócimas y brujerías" },
  "mago-de-oz/in-memorian": { title: "In memoriam" },
  "mago-de-oz/incubus-y-sucubus": { title: "Íncubus y súcubus" },
  "mago-de-oz/jiga-irlandesa": { title: "Jiga irlandesa" },
  "mago-de-oz/la-cancion-de-pedro": { title: "La canción de Pedro" },
  "mago-de-oz/la-cantata-del-diablo-missit-me-dominus": {
    title: "La cantata del diablo (Missit me Dominus)",
  },
  "mago-de-oz/la-ciudad-de-los-arboles": { title: "La ciudad de los árboles" },
  "mago-de-oz/la-fina": { title: "La fina" },
  "mago-de-oz/la-insulina-de-la-barataria": { title: "La ínsula de Barataria" },
  "mago-de-oz/la-leyenda-de-la-llorona": { title: "La leyenda de la Llorona" },
  "mago-de-oz/la-leyenda-de-la-mancha": { title: "La leyenda de La Mancha" },
  "mago-de-oz/la-ultima-cena": { title: "La última cena" },
  "mago-de-oz/mago-de-oz": { title: "Mägo de Oz" },
  "mago-de-oz/man-on-the-silver-mountain": { title: "Man on the Silver Mountain" },
  "mago-de-oz/mis-demonios": { title: "Mis demonios" },
  "mago-de-oz/molinos-de-viento": { title: "Molinos de viento" },
  "mago-de-oz/mujer-amante": { title: "Mujer amante" },
  "mago-de-oz/para-ella": { title: "Para ella" },
  "mago-de-oz/prologo": { title: "Prólogo" },
  "mago-de-oz/requiem": { title: "Réquiem" },
  "mago-de-oz/sacale-brillo-a-una-pena": { title: "Sácale brillo a una pena" },
  "mago-de-oz/santa-campana": {
    title: "La Santa Compaña",
    work: "la-santa-compana",
    version: "Acordes",
    order: 0,
  },
  "mago-de-oz/la-santa-compana": { title: "La Santa Compaña", version: "Solo", order: 1 },
  "mago-de-oz/se-acabo": { title: "Se acabó" },
  "mago-de-oz/si-supieras": { title: "Si supieras" },
  // Exact duplicate of "Siempre (Adiós Dulcinea - parte II)" with a truncated title.
  "mago-de-oz/siempre-adios-dulcinea": { hidden: true },
  "mago-de-oz/siempre-adios-dulcinea-parte-ii": { title: "Siempre (Adiós Dulcinea, parte II)" },
  "mago-de-oz/sin-ti-seria-silencio": { title: "Sin ti, sería silencio" },
  "mago-de-oz/somewhere-over-the-rainbow": { title: "Somewhere Over the Rainbow" },
  "mago-de-oz/suenos-diabolicos": { title: "Sueños diabólicos" },
  "mago-de-oz/suenos-dormidos": { title: "Sueños dormidos" },
  "mago-de-oz/take-on-me": { title: "Take On Me" },
  "mago-de-oz/toda-la-noche": { title: "Toda la noche" },
  "mago-de-oz/tres-tristes-tigres": { title: "Tres tristes tigres" },
  "mago-de-oz/tu-funeral": { title: "Tu funeral" },
  "mago-de-oz/tu-me-haces-ser-salvaje": { title: "Tú me haces ser salvaje" },
  "mago-de-oz/vuela-alto": { title: "Vuela alto" },
  "mago-de-oz/whole-lotta-love": { title: "Whole Lotta Love" },

  // José Andrea
  "jose-andrea/el-precio": { title: "El precio" },
  "jose-andrea/preguntale-a-dios": { title: "Pregúntale a Dios" },
};

/** Old URLs that now live elsewhere (identical duplicates). */
export const SONG_REDIRECTS: Array<{ source: string; destination: string }> = [
  {
    source: "/canciones/mago-de-oz/siempre-adios-dulcinea",
    destination: "/canciones/mago-de-oz/siempre-adios-dulcinea-parte-ii",
  },
  {
    source: "/canciones/mago-de-oz/donde-el-corazon-te-lleve",
    destination: "/canciones/jose-andrea/donde-el-corazon-te-lleve",
  },
];

export function getCuration(artistSlug: string, songSlug: string): SongCuration {
  return SONG_CURATION[`${artistSlug}/${songSlug}`] ?? {};
}
