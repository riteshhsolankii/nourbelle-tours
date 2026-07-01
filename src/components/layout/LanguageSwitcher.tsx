"use client";

import { useEffect, useRef, useState } from "react";
import {
  defaultLocale,
  localeOptions,
  type SiteLocale,
} from "@/lib/locale";
import { IconChevronDown } from "@/components/layout/icons";

type Props = {
  /** When WPML is ready, pass active locale from the server (middleware / segment). */
  currentLocale?: string;
  menuPlacement?: "down" | "up";
  menuAlign?: "left" | "right";
};

function LocaleFlag({
  code,
  flag,
  size = "md",
}: {
  code: string;
  flag: string;
  size?: "sm" | "md";
}) {
  const imgClass =
    size === "sm" ? "size-4 rounded-full object-cover" : "size-5 rounded-full object-cover";

  if (code === "en") {
    return (
      <img
        src="/usa-flag.svg"
        alt=""
        width={15}
        height={15}
        className={`shrink-0 ${imgClass}`}
      />
    );
  }
  if (flag) {
    return (
      <span
        className="flex shrink-0 items-center justify-center text-base leading-none"
        aria-hidden
      >
        {flag}
      </span>
    );
  }
  return (
    <span
      className={`shrink-0 rounded-full bg-zinc-200 ${size === "sm" ? "size-4" : "size-5"}`}
      aria-hidden
    />
  );
}

export function LanguageSwitcher({
  currentLocale = defaultLocale,
  menuPlacement = "down",
  menuAlign = "right",
}: Props) {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<SiteLocale>(currentLocale);
  const rootRef = useRef<HTMLDivElement>(null);

  const current =
    localeOptions.find((o) => o.code === locale) ?? localeOptions[0];
  const multi = localeOptions.length > 1;

  useEffect(() => {
    setLocale(currentLocale);
  }, [currentLocale]);

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
      if (detail?.source !== "language") setOpen(false);
    };
    window.addEventListener("quick-info-dropdown-open", onPeerOpen as EventListener);
    return () => {
      window.removeEventListener("quick-info-dropdown-open", onPeerOpen as EventListener);
    };
  }, []);

  function select(code: SiteLocale) {
    setLocale(code);
    setOpen(false);
  }

  return (
    <div className="relative" ref={rootRef} dir="ltr">
      <button
        type="button"
        className={[
          "inline-flex items-center justify-start gap-1.5 rounded-full p-1.5 text-left border border-[#0A090926] text-[#0A0909] transition",
          multi ? "cursor-pointer hover:bg-zinc-50" : "cursor-default opacity-90",
          "bg-transparent outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0",
        ].join(" ")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        disabled={!multi}
        onClick={() => {
          if (!multi) return;
          setOpen((v) => {
            const next = !v;
            if (next) {
              window.dispatchEvent(
                new CustomEvent("quick-info-dropdown-open", {
                  detail: { source: "language" },
                }),
              );
            }
            return next;
          });
        }}
        title={
          !multi ?
            "Additional languages will appear here after WPML + GraphQL are connected."
          : "Choose language"
        }
      >
        <LocaleFlag code={current.code} flag={current.flag} />
        <span className="text-sm font-medium uppercase">
          {String(current.code)}
        </span>
        <IconChevronDown
          className={[
            "size-2 shrink-0 text-zinc-600 transition-transform",
            open ? "rotate-180" : "",
            !multi ? "opacity-40" : "",
          ].join(" ")}
        />
      </button>

      {open && multi ?
        <ul
          role="listbox"
          className={[
            "absolute z-50 min-w-[11.5rem] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ring-1 ring-black/5",
            menuPlacement === "up" ? "bottom-[calc(100%+6px)]" : "top-[calc(100%+6px)]",
            menuAlign === "left" ? "left-0" : "right-0",
          ].join(" ")}
        >
          {localeOptions.map((opt) => {
            const selected = opt.code === locale;
            return (
              <li key={String(opt.code)} role="presentation">
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
                  onClick={() => select(opt.code)}
                >
                  <LocaleFlag code={opt.code} flag={opt.flag} size="sm" />
                  <span>{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      : null}
    </div>
  );
}
