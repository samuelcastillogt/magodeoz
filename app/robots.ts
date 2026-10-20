import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/mago-de-oz", "/jose-andrea", "/canciones/", "/blog"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
