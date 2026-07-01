"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { TourPackageCard } from "@/components/common/TourPackageCard";
import { IconChevronDown } from "@/components/layout/icons";
import type { NileCruiseListingItem } from "@/types/nile-cruises-page";
import type { BreadcrumbItem } from "@/types/site";

const nilePageBreadcrumbs: readonly BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Nile River Cruises", href: "/nile-cruises" },
  { label: "Cruises" },
];

const NILE_LISTING_DESTINATION = "Luxor, Aswan";

const CRUISE_TYPES = [
  { value: "all", label: "Cruise Type" },
  { value: "luxury", label: "Luxury" },
  { value: "dahabiya", label: "Dahabiya" },
  { value: "standard", label: "Standard" },
] as const;

const DURATIONS = [
  { value: "all", label: "Duration" },
  { value: "3-5", label: "3–5 nights" },
  { value: "6-7", label: "6–7 nights" },
  { value: "8+", label: "8+ nights" },
] as const;

const PORTS = [
  { value: "all", label: "Port" },
  { value: "luxor", label: "Luxor" },
  { value: "aswan", label: "Aswan" },
  { value: "luxor-aswan", label: "Luxor & Aswan" },
] as const;

function NileFilterSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (next: string) => void;
  options: readonly { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div className="relative sm:min-w-[10.5rem] max-w-full md:min-w-[11rem]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="h-9 sm:h-11 w-full cursor-pointer appearance-none rounded-lg border border-[#E0E0E0] bg-white py-2 pl-3 pr-10 text-xs sm:text-sm font-medium text-black outline-none transition hover:border-[#D0D0D0] focus-visible:border-[#41736D] focus-visible:ring-2 focus-visible:ring-[#41736D]/25"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-black">
        <IconChevronDown className="size-2.5" />
      </span>
    </div>
  );
}

type Props = {
  introTitle: string;
  introDescription: string;
  catalog: readonly NileCruiseListingItem[];
  viewMore: { label: string; href: string };
};

function matchesFilters(
  entry: NileCruiseListingItem,
  cruiseType: string,
  duration: string,
  port: string,
): boolean {
  if (cruiseType !== "all" && entry.tier !== cruiseType) return false;

  if (duration !== "all") {
    const n = entry.nights;
    if (duration === "3-5" && (n < 3 || n > 5)) return false;
    if (duration === "6-7" && (n < 6 || n > 7)) return false;
    if (duration === "8+" && n < 8) return false;
  }

  if (port !== "all") {
    if (port === "luxor-aswan" && entry.port !== "luxor-aswan") return false;
    if (port === "luxor" && entry.port !== "luxor" && entry.port !== "luxor-aswan") return false;
    if (port === "aswan" && entry.port !== "aswan" && entry.port !== "luxor-aswan") return false;
  }

  return true;
}

export function NileCruisesFeaturedClient({ introTitle, introDescription, catalog, viewMore }: Props) {
  const [cruiseType, setCruiseType] = useState("all");
  const [duration, setDuration] = useState("all");
  const [port, setPort] = useState("all");

  const filtered = useMemo(
    () => catalog.filter((e) => matchesFilters(e, cruiseType, duration, port)).slice(0, 6),
    [catalog, cruiseType, duration, port],
  );

  const clearAll = useCallback(() => {
    setCruiseType("all");
    setDuration("all");
    setPort("all");
  }, []);

  return (
    <section className="w-full pb-8 sm:pb-10 md:pb-12 lg:pb-16 pt-4 sm:pt-6 md:pt-9 lg:pt-11">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <Breadcrumb items={nilePageBreadcrumbs} variant="inline" className="mb-2 md:mb-3" />
        <h1 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {introTitle}
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-[#0A0909]/80 sm:text-sm md:text-base">{introDescription}</p>

        <div className="mt-8 flex w-full flex-wrap gap-4 flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3">
            <span className="shrink-0 text-sm font-semibold text-black md:text-base">Filters:</span>
            <NileFilterSelect
              value={cruiseType}
              onChange={setCruiseType}
              options={CRUISE_TYPES}
              ariaLabel="Cruise type"
            />
            <NileFilterSelect
              value={duration}
              onChange={setDuration}
              options={DURATIONS}
              ariaLabel="Duration"
            />
            <NileFilterSelect value={port} onChange={setPort} options={PORTS} ariaLabel="Port" />
          </div>
          <button
            type="button"
            onClick={clearAll}
            className="shrink-0 self-start rounded-full bg-[#EEEEEE] px-5 py-2.5 text-xs sm:text-sm font-medium text-black transition hover:bg-[#E5E5E5] sm:self-center cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <ul className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 grid grid-cols-2 gap-[10px] sm:gap-4 md:grid-cols-3 md:gap-6">
          {filtered.length === 0 ?
            <li className="col-span-full py-10 text-center text-sm text-[#0A0909]/70">
              No cruises match these filters. Try different Cruise Type, Duration, or Port, or tap Clear All.
            </li>
          : filtered.map((item) => (
              <li key={item.tour.id}>
                <TourPackageCard
                  tour={item.tour}
                  variant="listing"
                  listingDurationLabel={item.nightsBadge}
                  listingDestinationLabel={NILE_LISTING_DESTINATION}
                  listingSummaryParagraph={item.summary}
                />
              </li>
            ))}
        </ul>

        <div className="mt-6 sm:mt-8 flex justify-center md:mt-10">
          <Link
            href={viewMore.href}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#41736D] px-6 py-2.5 sm:px-8 sm:py-3 font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#365e59] md:px-10 md:py-4 md:text-base"
          >
            {viewMore.label}
            <svg className="hidden sm:block" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
