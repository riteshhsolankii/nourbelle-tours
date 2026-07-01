import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/env";
import { collectSitemapEntries } from "@/lib/sitemap-wp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl().replace(/\/+$/, "");
  const fromWp = await collectSitemapEntries();
  const home: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
  return [...home, ...fromWp];
}
