"use client";

import { useEffect, useRef, useState } from "react";
import type { TourFilterBarField, TourFilterFieldId } from "@/types/tour-packages-filters";
import {
  IconBriefcase,
  IconChevronDown,
  IconClock,
  IconClose,
  IconMapPin,
  IconSearch,
  IconSliders,
  IconTag,
} from "@/components/layout/icons";

const FIELD_META: Record<TourFilterFieldId, { label: string; icon: (p: { className?: string }) => React.ReactElement }> = {
  duration: { label: "Duration", icon: IconClock },
  destination: { label: "Destination", icon: IconMapPin },
  travelStyle: { label: "Travel Style", icon: IconBriefcase },
  priceRange: { label: "Price Range", icon: IconTag },
  moreFilters: { label: "More Filters", icon: IconSliders },
  sort: { label: "Sort", icon: IconSliders },
};

function FilterDropdown({
  field,
  displayLabel,
  open,
  onToggle,
  onSelect,
}: {
  field: TourFilterBarField;
  displayLabel: string;
  open: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}) {
  const Icon = FIELD_META[field.id].icon;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#0A0909]/15 bg-white px-4 py-2.5 text-xs font-semibold text-[#0A0909] shadow-sm transition hover:border-[#41736D]/50 sm:text-sm"
      >
        <Icon className="size-4 text-[#0A0909]/60" />
        {displayLabel}
        <IconChevronDown className={["size-2.5 text-[#0A0909]/45 transition-transform", open ? "rotate-180" : ""].join(" ")} />
      </button>

      {open ?
        <ul
          role="listbox"
          className="absolute left-0 top-full z-50 mt-1.5 max-h-[280px] min-w-[11rem] overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
        >
          {field.options.map((opt) => {
            const isSelected = opt.value === field.value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(opt.value)}
                  className={[
                    "flex w-full whitespace-nowrap px-3 py-2.5 text-left text-sm transition outline-none",
                    isSelected ? "bg-[#41736D]/10 font-medium text-[#41736D]" : "text-[#0A0909] hover:bg-zinc-50",
                  ].join(" ")}
                >
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      : null}
    </div>
  );
}

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  sortField: TourFilterBarField;
  fields: readonly TourFilterBarField[];
  onClearAll: () => void;
};

export function TourPackagesFilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search tours by name, destination or experience...",
  sortField,
  fields,
  onClearAll,
}: Props) {
  const [openField, setOpenField] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!openField) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenField(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenField(null);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [openField]);

  const activeChips = fields
    .filter((field) => field.value !== "all")
    .map((field) => ({
      field,
      label: field.options.find((opt) => opt.value === field.value)?.label ?? field.value,
    }));

  const selectedSortLabel =
    sortField.options.find((opt) => opt.value === sortField.value)?.label ?? sortField.value;

  return (
    <div ref={rootRef} className="mt-4 md:mt-6 lg:mt-8 flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="relative flex-1">
          <IconSearch className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#0A0909]/35" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-[#0A0909]/15 bg-white py-3 pl-11 pr-4 text-sm text-[#0A0909] outline-none placeholder:text-[#0A0909]/40 focus:border-[#41736D]"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <span className="text-sm font-medium text-[#0A0909]/70">Sort by:</span>
          <FilterDropdown
            field={sortField}
            displayLabel={selectedSortLabel}
            open={openField === sortField.id}
            onToggle={() => setOpenField((prev) => (prev === sortField.id ? null : sortField.id))}
            onSelect={(v) => {
              sortField.onChange(v);
              setOpenField(null);
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        {fields.map((field) => (
          <FilterDropdown
            key={field.id}
            field={field}
            displayLabel={FIELD_META[field.id].label}
            open={openField === field.id}
            onToggle={() => setOpenField((prev) => (prev === field.id ? null : field.id))}
            onSelect={(v) => {
              field.onChange(v);
              setOpenField(null);
            }}
          />
        ))}
      </div>

      {activeChips.length > 0 ?
        <div className="flex flex-wrap items-center gap-2">
          {activeChips.map(({ field, label }) => (
            <span
              key={field.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0A3B37] py-2 pl-4 pr-2.5 text-xs font-semibold text-white sm:text-sm"
            >
              {label}
              <button
                type="button"
                onClick={() => field.onChange("all")}
                aria-label={`Remove ${label} filter`}
                className="rounded-full p-0.5 text-white/70 transition hover:bg-white/15 hover:text-white"
              >
                <IconClose className="size-3" />
              </button>
            </span>
          ))}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#0A0909]/30" aria-hidden>
            <path d="M2.5 6H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.5 2.5L9.5 6L6.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <button
            type="button"
            onClick={onClearAll}
            className="text-sm font-semibold text-[#41736D] transition hover:underline"
          >
            Clear all
          </button>
        </div>
      : null}
    </div>
  );
}
