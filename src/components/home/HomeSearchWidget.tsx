"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import type { HomeSearchFilterField } from "@/lib/home-banner";
import { homeSearchFilters } from "@/data/site-static";
import { IconChevronDown, IconSearch } from "@/components/layout/icons";
import {
  IconCalendarFilter,
  IconCommandFilter,
  IconMapPinFilter,
} from "@/components/home/SearchFilterIcons";

type FilterFieldId = "type" | "duration" | "destination";

type Option = { value: string; label: string };

function FilterDropdownCell({
  fieldId,
  openField,
  setOpenField,
  name,
  options,
  value,
  onSelect,
  icon,
  title,
  hint,
}: {
  fieldId: FilterFieldId;
  openField: FilterFieldId | null;
  setOpenField: (id: FilterFieldId | null) => void;
  name: string;
  options: ReadonlyArray<Option>;
  value: string;
  onSelect: (v: string) => void;
  icon: ReactNode;
  title: string;
  hint: string;
}) {
  const open = openField === fieldId;
  const selected = options.find((o) => o.value === value);
  const hasValue = Boolean(value && selected);

  return (
    <div className="relative flex min-h-[4rem] flex-1 flex-col border-b border-[#0A090926] sm:min-h-0 sm:border-b-0 sm:border-r sm:last:border-r-0 last:border-b-0">
      <input type="hidden" name={name} value={value} />
      <button
        type="button"
        className={[
          "flex w-full flex-1 items-center gap-1.5 md:px-4 py-2 text-left outline-none transition sm:px-5 sm:py-0",
          "border-0 bg-transparent ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 cursor-pointer",
          open ? "sm:bg-zinc-50/80" : "hover:bg-zinc-50/50",
        ].join(" ")}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${title}: ${hasValue && selected ? selected.label : hint}`}
        onClick={() => setOpenField(open ? null : fieldId)}
      >
        <span className="shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 justify-between md:justify-start">
            <h5 className="text-[13px] font-semibold text-[#0A0909] sm:text-base">{title}</h5>
            <IconChevronDown
              className={[
                "size-2.5 shrink-0 text-[#0A0909] transition-transform",
                open ? "rotate-180" : "",
              ].join(" ")}
            />
          </div>
          <p
            className={[
              "mt-0.5 truncate",
              hasValue ?
                "text-[11px] font-medium text-[#0A0909] sm:text-sm"
              : "text-[11px] font-normal text-[#0A090980]",
            ].join(" ")}
          >
            {hasValue && selected ? selected.label : hint}
          </p>
        </div>
      </button>

      {open ?
        <ul
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mx-2 mb-1.5 max-h-[250px] overflow-y-auto overflow-x-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ring-1 ring-black/5 sm:left-2 sm:right-2"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value || "any"} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    "flex w-full px-3 py-2.5 text-left text-sm transition outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0",
                    isSelected ?
                      "bg-[#41736D]/10 font-medium text-[#41736D]"
                    : "text-[#0A0909] hover:bg-zinc-50",
                  ].join(" ")}
                  onClick={() => {
                    onSelect(opt.value);
                    setOpenField(null);
                  }}
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

type HomeSearchWidgetProps = {
  boxTitle: string;
  buttonText: string;
  filters: HomeSearchFilterField[];
};

export function HomeSearchWidget({ boxTitle, buttonText, filters }: HomeSearchWidgetProps) {
  const [fType, fDuration, fDestination] = filters;

  const typeOptions = [{ value: "", label: fType.emptyOptionLabel }, ...fType.options];
  const durationOptions = [
    { value: "", label: fDuration.emptyOptionLabel },
    ...fDuration.options,
  ];
  const destinationOptions = [
    { value: "", label: fDestination.emptyOptionLabel },
    ...fDestination.options,
  ];

  const [openField, setOpenField] = useState<FilterFieldId | null>(null);
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [destination, setDestination] = useState("");
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

  return (
    <div ref={rootRef} className="relative z-10 w-full max-w-[20rem] sm:max-w-5xl">
      <form
        className="flex flex-col rounded-[20px] border border-[#0A090926] bg-white px-5 py-4 md:p-2.5 shadow-lg lg:flex-row lg:items-stretch lg:rounded-full lg:p-3"
        action="/search"
        method="get"
      >
        <div className="hidden shrink-0 items-center px-5 py-4 lg:flex lg:py-0 lg:pl-4 lg:pr-5">
          <h3 className="text-xl font-bold text-[#0A0909]">{boxTitle}</h3>
        </div>

        <div className="relative flex flex-1 flex-col sm:py-2 sm:flex-row">
          <FilterDropdownCell
            fieldId="type"
            openField={openField}
            setOpenField={setOpenField}
            name="type"
            options={typeOptions}
            value={type}
            onSelect={setType}
            icon={
              <IconCommandFilter className="size-6 text-zinc-300 sm:size-9" />
            }
            title={fType.columnTitle}
            hint={fType.hint}
          />
          <FilterDropdownCell
            fieldId="duration"
            openField={openField}
            setOpenField={setOpenField}
            name="duration"
            options={durationOptions}
            value={duration}
            onSelect={setDuration}
            icon={
              <IconCalendarFilter className="size-6 text-zinc-300 sm:size-9" />
            }
            title={fDuration.columnTitle}
            hint={fDuration.hint}
          />
          <FilterDropdownCell
            fieldId="destination"
            openField={openField}
            setOpenField={setOpenField}
            name="destination"
            options={destinationOptions}
            value={destination}
            onSelect={setDestination}
            icon={<IconMapPinFilter className="size-6 text-zinc-300 sm:size-9" />}
            title={fDestination.columnTitle}
            hint={fDestination.hint}
          />
        </div>

        <div className="flex shrink-0 items-center pt-2 sm:px-0 md:px-0 sm:pt-0">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#41736D] px-6 py-2.5 font-heading text-sm font-semibold text-white shadow-sm transition hover:bg-[#365e59] md:text-lg lg:py-4 lg:w-auto lg:self-stretch lg:px-8"
          >
            {buttonText}
            <IconSearch className="size-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
}
