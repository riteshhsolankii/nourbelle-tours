"use client";

import Link from "next/link";
import { useState } from "react";
import { TourPackageCard } from "@/components/common/TourPackageCard";
import type { HomeTabId, TourCard } from "@/types/site";

type Tab = { id: HomeTabId; label: string };

type Props = {
  title: string;
  exploreHref: string;
  exploreLabel: string;
  tabs: Tab[];
  toursByTab: Record<HomeTabId, TourCard[]>;
};


export function BestSellingSection({
  title,
  exploreHref,
  exploreLabel,
  tabs,
  toursByTab,
}: Props) {
  const [active, setActive] = useState<HomeTabId>(tabs[0]?.id ?? "packages");
  const tours = toursByTab[active] ?? [];

  return (
    <section className="w-full mx-auto max-w-[1390px] px-4 sm:px-5 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="flex gap-3 sm:gap-6 flex-row items-center justify-between">
        <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>
        <Link
          href={exploreHref}
          className="inline-flex w-fit items-center gap-2 rounded-full font-heading border border-[#0A090926] bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs md:text-sm lg:text-base font-semibold text-[#0A0909] transition hover:border-[#41736D] hover:text-[#41736D]"
        >
          {exploreLabel}
          <span aria-hidden className="hidden sm:block"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 7.09961H9.5" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg></span>
        </Link>
      </div>
      <div
        role="tablist"
        aria-label="Tour categories"
        className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 border-b border-zinc-200"
      >
        <div className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {tabs.map((tab) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={[
                  "-mb-px border-b md:border-b-[3px] pb-1 md:pb-3 font-heading text-xs md:text-base lg:text-xl transition cursor-pointer",
                  selected ?
                    "border-[#0A0909] font-semibold text-[#0A0909]"
                    : "border-transparent font-semibold text-[#0A0909] hover:text-[#41736D]",
                ].join(" ")}
                onClick={() => setActive(tab.id)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
      <ul className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 grid gap-[10px] sm:gap-4 md:gap-6 grid-cols-2 md:grid-cols-3">
        {tours.map((tour, index) => (
          <li
            key={tour.id}
            className={index > 1 ? "hidden md:block" : ""}>
            <TourPackageCard tour={tour} />
          </li>
        ))}
      </ul>
    </section>
  );
}
