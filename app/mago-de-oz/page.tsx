import type { Metadata } from "next";
import { ArtistPage } from "@/components/ArtistPage";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tablaturas de Mägo de Oz: riffs, solos y acordes",
  description:
    "Tablaturas y acordes de Mägo de Oz para guitarra: Fiesta pagana, La costa del silencio, Molinos de viento, Hasta que el cuerpo aguante, Finisterra y más.",
  alternates: { canonical: absoluteUrl("/mago-de-oz") },
};

export default function MagoDeOzPage() {
  return <ArtistPage artistSlug="mago-de-oz" />;
}
