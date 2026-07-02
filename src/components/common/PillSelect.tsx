"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@/components/layout/icons";

type Option = { value: string; label: string };

type Props = {
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
  label?: string;
  ariaLabel?: string;
  className?: string;
  /** When set, renders a hidden input so the value participates in form submission. */
  name?: string;
};

/** Branded pill-style dropdown (matches the filter bar / home quick-facts pattern) for single-select fields. */
export function PillSelect({ value, options, onChange, label, ariaLabel, className, name }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={["relative", className ?? ""].join(" ")}>
      {label ? <label className="mb-1.5 block text-xs font-medium text-[#0A0909]">{label}</label> : null}
      {name ? <input type="hidden" name={name} value={value} readOnly /> : null}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel ?? label}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-full border border-[#0A0909]/15 bg-white px-4 text-xs font-medium text-[#0A0909] outline-none transition hover:border-[#41736D] sm:text-sm"
      >
        <span className="truncate">{selected?.label ?? value}</span>
        <IconChevronDown className={["size-2.5 shrink-0 text-[#0A0909]/50 transition-transform", open ? "rotate-180" : ""].join(" ")} />
      </button>

      {open ?
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-[999] mt-1.5 max-h-[250px] overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <li key={opt.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={[
                    "flex w-full px-4 py-2.5 text-left text-xs sm:text-sm transition outline-none",
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
