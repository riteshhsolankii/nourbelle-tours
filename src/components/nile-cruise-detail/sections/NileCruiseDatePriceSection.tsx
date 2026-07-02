"use client";

import { CustomizeTourDatePicker } from "@/components/tour-detail/CustomizeTourDatePicker";
import { PillSelect } from "@/components/common/PillSelect";
import type { DatePriceSort } from "@/components/nile-cruise-detail/nile-detail-utils";
import { formatUsdFull } from "@/components/nile-cruise-detail/nile-detail-utils";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";

type Props = {
  detail: TourPackagePageDetail;
  sectionScrollClass: string;
  travelDateFilter: string;
  setTravelDateFilter: (v: string) => void;
  dateSort: DatePriceSort;
  setDateSort: (v: DatePriceSort) => void;
  visibleDateRows: { start: string; end: string; price: number }[];
  customizeMinFrom: string;
};

export function NileCruiseDatePriceSection({
  detail,
  sectionScrollClass,
  travelDateFilter,
  setTravelDateFilter,
  dateSort,
  setDateSort,
  visibleDateRows,
  customizeMinFrom,
}: Props) {
  return (
    <section id="nile-dates-availability" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10 md:mt-12`}>
      <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Dates &amp; availability</h2>
      <p className="mt-2 text-xs sm:text-sm text-[#0A0909]/75">{detail.dateAndPrice}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between md:mt-6">
        <div className="min-w-0 w-full sm:max-w-[200px]">
          <CustomizeTourDatePicker
            name="nileDatePriceTravelFilter"
            value={travelDateFilter}
            onChange={setTravelDateFilter}
            placeholder={detail.datePriceTravelLabel ?? "Travel dates"}
            minDate={customizeMinFrom}
          />
        </div>
        <PillSelect
          value={dateSort}
          onChange={(v) => setDateSort(v as DatePriceSort)}
          options={[
            { value: "startAsc", label: detail.datePriceSortLabel ?? "Start date (earliest)" },
            { value: "startDesc", label: "Start date (latest)" },
            { value: "priceAsc", label: "Price (low to high)" },
            { value: "priceDesc", label: "Price (high to low)" },
          ]}
          ariaLabel="Sort departures"
          className="w-full shrink-0 self-stretch sm:w-56 sm:self-auto"
        />
      </div>
      <div className="mt-6 overflow-hidden border-t border-[#0A09091A]">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_190px] items-center gap-4 border-b border-[#0A09091A] py-4 text-sm font-semibold text-[#0A0909]">
          <p>Starting</p>
          <p>Ending</p>
          <div className="text-right">
            <p>Price / person</p>
            <p className="mt-0.5 text-xs font-normal text-[#0A0909]/50">Subject to change</p>
          </div>
        </div>
        {visibleDateRows.map((row) => (
          <div key={`${row.start}-${row.end}-${row.price}`} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_190px] items-center gap-4 border-b border-[#0A09091A] py-4 last:border-b-0">
            <p className="text-xs sm:text-sm text-[#0A0909]">{row.start}</p>
            <p className="text-xs sm:text-sm text-[#0A0909]">{row.end}</p>
            <div className="flex items-center gap-2 justify-self-end">
              <p className="font-heading text-base sm:text-xl font-bold text-[#0A0909]">{formatUsdFull(row.price)}</p>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 9l6 6 6-6" stroke="#0A0909" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}
        {visibleDateRows.length === 0 ?
          <div className="py-6 text-center text-sm text-[#0A0909]/65">No departures match this filter.</div>
        : null}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          className="inline-flex h-9 sm:h-11 cursor-pointer items-center gap-2 rounded-full bg-[#35635E] px-5 font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#2c5450]"
        >
          View more dates
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
