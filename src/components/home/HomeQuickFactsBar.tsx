"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeQuickFactField } from "@/lib/home-banner";
import { IconChevronDown, IconSearch } from "@/components/layout/icons";

function QuickFactCell({
  field,
  open,
  onToggle,
  value,
  onSelect,
  isLast,
}: {
  field: HomeQuickFactField;
  open: boolean;
  onToggle: () => void;
  value: string;
  onSelect: (v: string) => void;
  isLast: boolean;
}) {
  const selected = field.options.find((o) => o.value === value);

  return (
    <div className={["relative flex-1", isLast ? "" : "sm:border-r sm:border-[#0A09091A]"].join(" ")}>
      <input type="hidden" name={field.htmlName} value={value} />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left transition hover:bg-zinc-50/70 sm:py-2"
      >
        <span className="flex w-full items-center justify-between gap-2">
          <span className="text-xs font-medium text-[#0A0909]/55">{field.label}</span>
          <IconChevronDown className={["size-2.5 shrink-0 text-[#0A0909]/40 transition-transform", open ? "rotate-180" : ""].join(" ")} />
        </span>
        <span className={["text-base font-semibold sm:text-lg", selected ? "text-[#0A0909]" : "text-[#0A0909]/70"].join(" ")}>
          {selected ? selected.label : field.hint}
        </span>
      </button>

      {open ?
        <ul
          role="listbox"
          className="absolute left-2 right-2 top-full z-50 mt-1.5 max-h-[250px] overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
        >
          {field.options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => onSelect(opt.value)}
                  className={[
                    "flex w-full px-3 py-2.5 text-left text-sm transition outline-none",
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
  fields: readonly HomeQuickFactField[];
  buttonLabel: string;
  actionHref: string;
};

export function HomeQuickFactsBar({ fields, buttonLabel, actionHref }: Props) {
  const [openField, setOpenField] = useState<string | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
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
    <div ref={rootRef} className="w-full">
      <form action={actionHref} method="get" className="flex w-full flex-col rounded-[100px] bg-white shadow-lg sm:flex-row sm:items-center p-4">
        <div className="flex w-full flex-col divide-y divide-[#0A09091A] sm:flex-1 sm:flex-row sm:divide-y-0">
          {fields.map((field, i) => (
            <QuickFactCell
              key={field.htmlName}
              field={field}
              open={openField === field.htmlName}
              onToggle={() => setOpenField((prev) => (prev === field.htmlName ? null : field.htmlName))}
              value={values[field.htmlName] ?? ""}
              onSelect={(v) => {
                setValues((prev) => ({ ...prev, [field.htmlName]: v }));
                setOpenField(null);
              }}
              isLast={i === fields.length - 1}
            />
          ))}
        </div>
        <div className="p-2 sm:p-2.5">
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#0A3B37] px-6 font-heading text-sm font-semibold text-white transition hover:bg-[#0A3B37]/90 sm:w-auto"
          >
            <IconSearch className="size-4 text-white" />
            {buttonLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
