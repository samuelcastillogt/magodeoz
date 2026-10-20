import Image from "next/image";
import Link from "next/link";
import { BookOpenText, WandSparkles, Waypoints } from "lucide-react";

import { chordWeaverHref } from "@/lib/chordweaver";
import { SITE_NAME } from "@/lib/seo";

type SiteHeaderProps = {
  /** "compact" drops the hero so pages with their own h1 start with the content. */
  variant?: "hero" | "compact";
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function SiteHeader({
  variant = "hero",
  eyebrow = "Tablaturas de guitarra",
  title = "Tablaturas de Mägo de Oz y José Andrea",
  description =
    "Riffs, solos y canciones completas en tablatura, más letras con acordes. Lee cada pentagrama con su leyenda, toca un acorde para ver el diagrama y transpórtalo a tu tono.",
}: SiteHeaderProps = {}) {
  const nav = (
    <nav className="topbar" aria-label="Principal">
      <Link className="brand" href="/">
        <WandSparkles aria-hidden="true" />
        <span>{SITE_NAME}</span>
      </Link>
      <div className="nav-links">
        <Link href="/mago-de-oz">Mägo de Oz</Link>
        <Link href="/jose-andrea">José Andrea</Link>
        <Link href="/?tipo=tablatura">Solo tablaturas</Link>
        <Link href="/blog">
          <BookOpenText aria-hidden="true" />
          Blog
        </Link>
        <a className="nav-chordweaver" href={chordWeaverHref({ placement: "nav" })}>
          <Waypoints aria-hidden="true" />
          ChordWeaver
        </a>
      </div>
    </nav>
  );

  if (variant === "compact") {
    return <header className="site-header compact">{nav}</header>;
  }

  return (
    <header className="site-header">
      <Image
        src="/hero-oz.svg"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="header-image"
      />
      <div className="header-overlay" />
      {nav}
      <div className="hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="ornament" aria-hidden="true">
          <span />
          <svg viewBox="0 0 48 48">
            <path d="M24 6c6 7 6 15 0 22-6-7-6-15 0-22Zm-12.5 29c2-9 9-13.5 18-13-2 9-9 13.5-18 13Zm25 0c-9 .5-16-4-18-13 9-.5 16 4 18 13Z" />
            <circle cx="24" cy="26" r="9" />
          </svg>
          <span />
        </div>
        <p>{description}</p>
      </div>
    </header>
  );
}
