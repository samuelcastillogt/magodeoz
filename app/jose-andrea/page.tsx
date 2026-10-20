import type { Metadata } from "next";
import { ArtistPage } from "@/components/ArtistPage";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tablaturas y acordes de José Andrea",
  description:
    "Canciones de José Andrea con tablatura y acordes para guitarra: Aquí estoy, El precio, Frío, Tus lágrimas no besan y más.",
  alternates: { canonical: absoluteUrl("/jose-andrea") },
};

export default function JoseAndreaPage() {
  return <ArtistPage artistSlug="jose-andrea" />;
}
