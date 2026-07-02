"use client";

import Link from "next/link";
import { useState } from "react";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { CustomizeTourDatePicker } from "@/components/tour-detail/CustomizeTourDatePicker";
import { PillSelect } from "@/components/common/PillSelect";
import { formatUsd, formatUsdFull, discountPct } from "@/components/tour-detail/helpers";

const TRAVELER_OPTIONS = [
  { value: "1", label: "1 Adult" },
  { value: "2", label: "2 Adults" },
  { value: "3", label: "3 Adults" },
  { value: "4+", label: "4+ Adults" },
];

type Props = {
  detail: TourPackagePageDetail;
  travelDate: string;
  onTravelDateChange: (value: string) => void;
  minTravelDate: string;
};

export function BookingSidebar({ detail, travelDate, onTravelDateChange, minTravelDate }: Props) {
  const pct = discountPct(detail.sidebar);
  const [travelers, setTravelers] = useState("1");

  return (
    <div className="rounded-[10px] sm:rounded-[20px] border border-[#0A090926] bg-white">
      <div className="rounded-t-[10px] sm:rounded-t-[20px] bg-[#0A3B37] px-5 py-4 text-white">
        {detail.sidebar.priceWas != null && detail.sidebar.priceWas > detail.sidebar.price ?
          <span className="text-xs font-medium text-white/60 line-through">From {formatUsdFull(detail.sidebar.priceWas)}</span>
        : <span className="text-xs font-medium text-white/70">From</span>}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">{formatUsd(detail.sidebar.price)}</span>
          <span className="text-xs text-white/70">per person</span>
          {pct != null && pct > 0 ?
            <span className="whitespace-nowrap rounded-full bg-[#FFE1E1] px-2.5 py-1 text-xs font-semibold leading-none text-[#E32C2C]">-{pct}%</span>
          : null}
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-3 gap-2 text-[10px] text-[#0A0909]/70 sm:text-xs border border-[#0A09091A] rounded-lg py-2 px-4">
          <div>
            <p className="text-[#0A090999]">Duration</p>
            <p className="mt-0.5 text-sm font-semibold text-[#0A0909]">{detail.sidebar.durationInfo}</p>
          </div>
          <div>
            <p className="text-[#0A090999]">Destination</p>
            <p className="mt-0.5 text-sm font-semibold text-[#0A0909]">{detail.sidebar.destination}</p>
          </div>
          <div>
            <p className="text-[#0A090999]">Tour Type</p>
            <p className="mt-0.5 text-sm font-semibold text-[#0A0909]">{detail.sidebar.tourType}</p>
          </div>
        </div>

        <label className="mt-4 block text-xs font-medium text-[#0A0909]">Select Travel Date</label>
        <div className="mt-1.5">
          <CustomizeTourDatePicker
            name="sidebarTravelDate"
            value={travelDate}
            onChange={onTravelDateChange}
            placeholder="Select date"
            minDate={minTravelDate}
          />
        </div>

        <div className="mt-3">
          <PillSelect
            label="Travelers"
            value={travelers}
            onChange={setTravelers}
            options={TRAVELER_OPTIONS}
            ariaLabel="Travelers"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href="/customize-your-tour"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#0A090926] bg-white px-3 text-center font-heading text-xs font-semibold text-[#0A0909] transition hover:bg-zinc-50"
          >
            Ask Questions
          </Link>
          <button
            type="button"
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#41736D] px-3 font-heading text-xs font-semibold text-white transition hover:bg-[#365e59]"
          >
            Check Availability
          </button>
        </div>

        <div className="mt-4 space-y-2 border-t border-[#0A09091A] pt-4">
          <span className="flex items-center gap-2 text-xs text-[#0A0909]/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#41736D]" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Free Cancellation
          </span>
          <span className="flex items-center gap-2 text-xs text-[#0A0909]/70">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#41736D]" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Best Price Guarantee
          </span>
        </div>
      </div>
    </div>
  );
}
