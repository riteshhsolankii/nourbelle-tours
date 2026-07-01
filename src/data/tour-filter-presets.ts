import type { TourPackagesFilterPreset } from "@/types/tour-packages-filters";

/** Static duration buckets for multi-day + Nile cruise listing filters. */
export const MULTI_DAY_DURATION_FILTER_OPTIONS = [
  "all",
  "5 Days",
  "6 Days",
  "7 Days",
  "8 Days",
  "9 Days",
  "10 to 15",
] as const;

export const DAY_TOUR_DURATION_FILTER_OPTIONS = ["all", "Half day", "Full day"] as const;

export const TRAVEL_STYLE_FILTER_OPTIONS = [
  "all",
  "Tour Package",
  "Nile Cruise",
  "Day Tour",
] as const;

/** Static price buckets for the "Price Range" listing filter. */
export const PRICE_RANGE_FILTER_OPTIONS = [
  "all",
  "Under $500",
  "$500 - $1,000",
  "$1,000+",
] as const;

export const SORT_FILTER_OPTIONS = ["recommended", "price-low", "price-high", "discount"] as const;

export type TourFilterPresetConfig = {
  /** Which filter keys appear, left to right (sort is rendered separately, not part of this row) */
  fieldOrder: readonly ("duration" | "travelStyle" | "destination" | "priceRange" | "moreFilters")[];
  /** Label for each field's "clear this filter" menu item */
  emptyLabels: Record<"duration" | "travelStyle" | "destination" | "priceRange" | "moreFilters", string>;
};

export const TOUR_PACKAGES_FILTER_PRESETS: Record<
  TourPackagesFilterPreset,
  TourFilterPresetConfig
> = {
  multiDay: {
    fieldOrder: ["duration", "destination", "travelStyle", "priceRange", "moreFilters"],
    emptyLabels: {
      duration: "All Durations",
      travelStyle: "All Travel Styles",
      destination: "All Destinations",
      priceRange: "All Prices",
      moreFilters: "All Tours",
    },
  },
  dayTour: {
    fieldOrder: ["destination", "duration"],
    emptyLabels: {
      duration: "All Durations",
      travelStyle: "All Travel Styles",
      destination: "All Destinations",
      priceRange: "All Prices",
      moreFilters: "All Tours",
    },
  },
  nileCruise: {
    fieldOrder: ["duration", "destination"],
    emptyLabels: {
      duration: "All Durations",
      travelStyle: "All Travel Styles",
      destination: "All Destinations",
      priceRange: "All Prices",
      moreFilters: "All Tours",
    },
  },
};
