"use client";

import { useEffect, useRef, useState } from "react";
import { IconChevronDown } from "@/components/layout/icons";

const CURRENCIES = ["USD", "EUR", "GBP", "EGP"] as const;
type Currency = (typeof CURRENCIES)[number];

function CurrencyFlag({
  currency,
  size = "md",
}: {
  currency: Currency;
  size?: "sm" | "md";
}) {
  const imgSm = "size-3 shrink-0 rounded-full object-cover";
  const imgMd = "size-4 shrink-0 rounded-full object-cover";

  if (currency === "USD") {
    return (
      <img
        src="/usa-flag.svg"
        alt=""
        width={15}
        height={15}
        className={size === "sm" ? imgSm : imgMd}
      />
    );
  }
  const emoji =
    currency === "EUR" ? "🇪🇺"
    : currency === "GBP" ? "🇬🇧"
    : "🇪🇬";
  return (
    <span
      className={`flex shrink-0 items-center justify-center leading-none ${size === "sm" ? "text-base" : "text-lg"}`}
      aria-hidden
    >
      {emoji}
    </span>
  );
}

export function TopBarCurrency({ menuPlacement = "down" }: { menuPlacement?: "down" | "up" }) {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>("USD");
  const rootRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const onPeerOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ source?: string }>).detail;
      if (detail?.source !== "currency") setOpen(false);
    };
    window.addEventListener("quick-info-dropdown-open", onPeerOpen as EventListener);
    return () => {
      window.removeEventListener("quick-info-dropdown-open", onPeerOpen as EventListener);
    };
  }, []);

  function select(c: Currency) {
    setCurrency(c);
    setOpen(false);
  }

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className={[
          "inline-flex items-center gap-1.5 p-1.5 text-left border border-[#0A090926] rounded-full text-[#0A0909] transition",
          "cursor-pointer hover:bg-zinc-50",
          "bg-transparent outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${currency}`}
        onClick={() =>
          setOpen((v) => {
            const next = !v;
            if (next) {
              window.dispatchEvent(
                new CustomEvent("quick-info-dropdown-open", {
                  detail: { source: "currency" },
                }),
              );
            }
            return next;
          })
        }
        title="Choose currency"
      >
        <CurrencyFlag currency={currency} />
        <span className="text-sm font-medium">{currency}</span>
        <IconChevronDown
          className={[
            "size-2 shrink-0 text-zinc-600 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        />
      </button>

      {open ?
        <ul
          role="listbox"
          className={[
            "absolute right-0 z-50 min-w-[11.5rem] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ring-1 ring-black/5",
            menuPlacement === "up" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]",
          ].join(" ")}
        >
          {CURRENCIES.map((c) => {
            const selected = c === currency;
            return (
              <li key={c} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={[
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 cursor-pointer",
                    selected ?
                      "bg-[#41736D]/10 font-medium text-[#41736D]"
                    : "text-zinc-800 hover:bg-zinc-50",
                  ].join(" ")}
                  onClick={() => select(c)}
                >
                  <CurrencyFlag currency={c} size="sm" />
                  <span>{c}</span>
                </button>
              </li>
            );
          })}
        </ul>
      : null}
    </div>
  );
}
