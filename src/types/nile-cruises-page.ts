import type { TourCard } from "@/types/site";

export type NileCruiseTier = "luxury" | "dahabiya" | "standard";

/** Primary port / route focus for Nile listing filters. */
export type NileCruisePort = "luxor" | "aswan" | "luxor-aswan";

/** One cruise for Nile listing grids (filters + cards). */
export type NileCruiseListingItem = {
  tour: TourCard;
  tier: NileCruiseTier;
  /** Pill on image, e.g. "7–10 Nights" */
  nightsBadge: string;
  /** Night count for duration filter buckets */
  nights: number;
  summary: string;
  /** Filter key for “Port” dropdown */
  port: NileCruisePort;
};

export type NileCruiseTierSection = {
  title: string;
  viewMoreLabel: string;
  viewMoreHref: string;
  items: readonly NileCruiseListingItem[];
};
