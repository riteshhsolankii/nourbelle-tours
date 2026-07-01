import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/env";

export function buildRootMetadata(): Metadata {
  const base = getSiteUrl();
  return {
    metadataBase: new URL(base),
    title: {
      default: "Nourbelle Tours — Egypt tours & Nile cruises",
      template: "%s | Nourbelle Tours",
    },
    description:
      "Curated multi-day Egypt tour packages, Nile cruises, and day trips — personalised itineraries from Nourbelle Tours.",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: base,
      siteName: "Nourbelle Tours",
    },
    twitter: {
      card: "summary_large_image",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
