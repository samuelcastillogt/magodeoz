import type { Metadata, Viewport } from "next";
import { Alegreya_Sans, Cinzel, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const alegreya = Alegreya_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "700", "900"],
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Tablaturas y acordes para guitarra`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Tablaturas, riffs, solos y acordes de Mägo de Oz y José Andrea para guitarra, con lector de tablatura, transpositor y diagramas.",
  openGraph: {
    title: SITE_NAME,
    description:
      "Tablaturas y acordes de Mägo de Oz y José Andrea.",
    type: "website",
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0c09",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${alegreya.variable} ${cinzel.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
