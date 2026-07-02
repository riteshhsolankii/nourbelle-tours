"use client";

import { useState } from "react";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { CustomizeTourDatePicker } from "@/components/tour-detail/CustomizeTourDatePicker";
import { PillSelect } from "@/components/common/PillSelect";
import { formatUsd } from "@/components/tour-detail/helpers";

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
  const [travelers, setTravelers] = useState("1");

  return (
    <div className="rounded-[10px] sm:rounded-[20px] border border-[#0A090926] bg-white">
      <div className="rounded-t-[10px] sm:rounded-t-[20px] bg-[#0A3B37] px-5 py-4 text-white">
        <span className="text-xs font-medium text-white/70">From</span>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">{formatUsd(detail.sidebar.price)}</span>
          <span className="text-xs text-white/70">per person</span>
        </div>
      </div>

      <div className="p-5">
        <label className="block text-xs font-medium text-[#0A0909]">Select Travel Date</label>
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

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#B98B3E] px-3 font-heading text-xs font-semibold text-white transition hover:bg-[#a67a34]"
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
