"use client";

import { useMemo, useState } from "react";
import { TourPackagesFilterBar } from "@/components/common/TourPackagesFilterBar";
import { TourPackageCard } from "@/components/common/TourPackageCard";
import { IconGridView, IconListView } from "@/components/layout/icons";
import {
  DAY_TOUR_DURATION_FILTER_OPTIONS,
  MULTI_DAY_DURATION_FILTER_OPTIONS,
  PRICE_RANGE_FILTER_OPTIONS,
  SORT_FILTER_OPTIONS,
  TOUR_PACKAGES_FILTER_PRESETS,
  TRAVEL_STYLE_FILTER_OPTIONS,
} from "@/data/tour-filter-presets";
import {
  getDayTourDurationBucket,
  getDestinationLabel,
  getMultiDayDurationBucket,
  getPriceRangeBucket,
  getTravelStyleLabel,
  sortToursByKey,
} from "@/lib/tour-package-filter-utils";
import type { TourFilterBarField, TourPackagesFilterPreset } from "@/types/tour-packages-filters";
import type { TourCard } from "@/types/site";

type Props = {
  title: string;
  tours: readonly TourCard[];
  ctaText: string;
  ctaLink: string;
  /** Page-specific filter layout and behaviour */
  filterPreset: TourPackagesFilterPreset;
  maxItems?: number;
  /** When false, only the title and card grid are shown (recommended sort, no filter UI). */
  showFilters?: boolean;
};

export function PopularPackagesSection({
  title,
  tours,
  ctaText: _ctaText,
  ctaLink: _ctaLink,
  filterPreset,
  maxItems = 6,
  showFilters = true,
}: Props) {
  const presetConfig = TOUR_PACKAGES_FILTER_PRESETS[filterPreset];

  const [search, setSearch] = useState("");
  const [duration, setDuration] = useState("all");
  const [travelStyle, setTravelStyle] = useState("all");
  const [destination, setDestination] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [badge, setBadge] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const destinationOptions = useMemo(() => {
    const set = new Set<string>();
    tours.forEach((tour) => {
      set.add(getDestinationLabel(tour));
    });
    return ["all", ...Array.from(set)] as const;
  }, [tours]);

  const badgeOptions = useMemo(() => {
    const set = new Set<string>();
    tours.forEach((tour) => {
      if (tour.badgeLabel) set.add(tour.badgeLabel);
    });
    return ["all", ...Array.from(set)] as const;
  }, [tours]);

  const filteredTours = useMemo(() => {
    if (!showFilters) {
      return sortToursByKey([...tours], "recommended");
    }
    const query = search.trim().toLowerCase();
    const visible = tours.filter((tour) => {
      const bucket =
        filterPreset === "dayTour" ? getDayTourDurationBucket(tour) : getMultiDayDurationBucket(tour);
      const matchesDuration = duration === "all" || bucket === duration;
      const matchesStyle =
        filterPreset !== "multiDay" ||
        travelStyle === "all" ||
        getTravelStyleLabel(tour) === travelStyle;
      const matchesDestination =
        destination === "all" || getDestinationLabel(tour) === destination;
      const matchesPriceRange = priceRange === "all" || getPriceRangeBucket(tour) === priceRange;
      const matchesBadge = badge === "all" || tour.badgeLabel === badge;
      const matchesSearch =
        query === "" ||
        `${tour.title} ${tour.features.join(" ")} ${tour.destinationsLine ?? ""}`
          .toLowerCase()
          .includes(query);
      return (
        matchesDuration && matchesStyle && matchesDestination && matchesPriceRange && matchesBadge && matchesSearch
      );
    });
    return sortToursByKey(visible, sortBy);
  }, [badge, destination, duration, filterPreset, priceRange, search, showFilters, sortBy, tours, travelStyle]);

  const visibleTours = filteredTours.slice(0, maxItems);

  const clearAll = () => {
    setSearch("");
    setDuration("all");
    setTravelStyle("all");
    setDestination("all");
    setPriceRange("all");
    setBadge("all");
    setSortBy("recommended");
  };

  const durationStaticOptions =
    filterPreset === "dayTour"
      ? DAY_TOUR_DURATION_FILTER_OPTIONS
      : MULTI_DAY_DURATION_FILTER_OPTIONS;

  const durationSelectOptions = useMemo(
    () =>
      durationStaticOptions.map((v) => ({
        value: v,
        label: v === "all" ? presetConfig.emptyLabels.duration : v,
      })),
    [durationStaticOptions, presetConfig.emptyLabels.duration],
  );

  const travelStyleSelectOptions = useMemo(
    () =>
      TRAVEL_STYLE_FILTER_OPTIONS.map((v) => ({
        value: v,
        label: v === "all" ? presetConfig.emptyLabels.travelStyle : v,
      })),
    [presetConfig.emptyLabels.travelStyle],
  );

  const destinationSelectOptions = useMemo(
    () =>
      destinationOptions.map((v) => ({
        value: v,
        label: v === "all" ? presetConfig.emptyLabels.destination : v,
      })),
    [destinationOptions, presetConfig.emptyLabels.destination],
  );

  const priceRangeSelectOptions = useMemo(
    () =>
      PRICE_RANGE_FILTER_OPTIONS.map((v) => ({
        value: v,
        label: v === "all" ? presetConfig.emptyLabels.priceRange : v,
      })),
    [presetConfig.emptyLabels.priceRange],
  );

  const badgeSelectOptions = useMemo(
    () =>
      badgeOptions.map((v) => ({
        value: v,
        label: v === "all" ? presetConfig.emptyLabels.moreFilters : v,
      })),
    [badgeOptions, presetConfig.emptyLabels.moreFilters],
  );

  const sortSelectOptions = useMemo(
    () =>
      SORT_FILTER_OPTIONS.map((v) => ({
        value: v,
        label: formatSortLabel(v),
      })),
    [],
  );

  const sortField: TourFilterBarField = {
    id: "sort",
    value: sortBy,
    onChange: setSortBy,
    options: sortSelectOptions,
  };

  const fields: TourFilterBarField[] = useMemo(() => {
    const out: TourFilterBarField[] = [];
    for (const key of presetConfig.fieldOrder) {
      if (key === "duration") {
        out.push({
          id: "duration",
          value: duration,
          onChange: setDuration,
          options: durationSelectOptions,
        });
      } else if (key === "travelStyle") {
        out.push({
          id: "travelStyle",
          value: travelStyle,
          onChange: setTravelStyle,
          options: travelStyleSelectOptions,
        });
      } else if (key === "destination") {
        out.push({
          id: "destination",
          value: destination,
          onChange: setDestination,
          options: destinationSelectOptions,
        });
      } else if (key === "priceRange") {
        out.push({
          id: "priceRange",
          value: priceRange,
          onChange: setPriceRange,
          options: priceRangeSelectOptions,
        });
      } else if (key === "moreFilters") {
        out.push({
          id: "moreFilters",
          value: badge,
          onChange: setBadge,
          options: badgeSelectOptions,
        });
      }
    }
    return out;
  }, [
    badge,
    badgeSelectOptions,
    destination,
    destinationSelectOptions,
    duration,
    durationSelectOptions,
    presetConfig.fieldOrder,
    priceRange,
    priceRangeSelectOptions,
    travelStyle,
    travelStyleSelectOptions,
  ]);

  return (
    <section className="w-full mx-auto max-w-[1390px] px-4 sm:px-5 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="flex gap-3 sm:gap-6 flex-row items-center justify-between">
        <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>
      </div>

      {showFilters ? (
        <TourPackagesFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          sortField={sortField}
          fields={fields}
          onClearAll={clearAll}
        />
      ) : null}

      <div className="mt-4 md:mt-6 flex items-center justify-between gap-3 border-t border-[#0A09091A] pt-4">
        <p className="text-xs sm:text-sm font-bold text-[#0A0909]">
          Showing {visibleTours.length} tours
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            aria-pressed={viewMode === "grid"}
            aria-label="Grid view"
            className={[
              "flex size-8 items-center justify-center rounded-full border transition",
              viewMode === "grid" ?
                "border-[#41736D]/30 bg-[#41736D]/10 text-[#41736D]"
              : "border-transparent text-[#0A0909]/40",
            ].join(" ")}
          >
            <IconGridView className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            aria-pressed={viewMode === "list"}
            aria-label="List view"
            className={[
              "flex size-8 items-center justify-center rounded-full border transition",
              viewMode === "list" ?
                "border-[#41736D]/30 bg-[#41736D]/10 text-[#41736D]"
              : "border-transparent text-[#0A0909]/40",
            ].join(" ")}
          >
            <IconListView className="size-4" />
          </button>
        </div>
      </div>

      {viewMode === "grid" ?
        <ul className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 grid grid-cols-2 gap-[10px] sm:gap-4 md:grid-cols-3 md:gap-6">
          {visibleTours.map((tour) => (
            <li key={tour.id}>
              <TourPackageCard tour={tour} variant="listing" />
            </li>
          ))}
        </ul>
      : <ul className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 flex flex-col gap-4">
          {visibleTours.map((tour) => (
            <li key={tour.id}>
              <TourPackageCard tour={tour} variant="listing" layout="row" />
            </li>
          ))}
        </ul>
      }
    </section>
  );
}

function formatSortLabel(option: string) {
  if (option === "recommended") return "Recommended";
  if (option === "price-low") return "Price: Low to High";
  if (option === "price-high") return "Price: High to Low";
  if (option === "discount") return "Highest Discount";
  return option;
}
