"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { headerSearch } from "@/data/site-static";
import { IconClose, IconSearch } from "@/components/layout/icons";

export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (!mq.matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  return (
    <div ref={wrapRef} className="relative flex shrink-0 items-center justify-end">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={[
          "relative z-[60] inline-flex shrink-0 rounded-full p-1 sm:p-2 transition-colors",
          open ? "bg-[#0A09091A] text-[#0A0909]" : "text-zinc-800 hover:bg-zinc-100",
        ].join(" ")}
        aria-label={open ? "Close search" : "Open search"}
        aria-expanded={open}
        aria-controls="header-search-panel"
      >
        {open ?
          <IconClose className="size-4 sm:size-5" />
        : <IconSearch className="size-4 sm:size-5" />}
      </button>

      {open ?
        <button
          type="button"
          tabIndex={-1}
          className="fixed inset-0 z-40 cursor-default bg-[#0A0909]/20 md:hidden"
          aria-label="Close search"
          onClick={() => setOpen(false)}
        />
      : null}

      <div
        id="header-search-panel"
        role="search"
        aria-hidden={!open}
        className={[
          "z-50 border-[#0A090926] bg-white transition-all duration-200 ease-out",
          "fixed inset-x-0 top-[52px] w-full max-w-none border-b px-4 py-4 shadow-[0_12px_40px_rgba(10,9,9,0.12)]",
          "sm:top-[68px]",
          "md:absolute md:inset-x-auto md:right-0 md:top-full md:mt-2 md:w-[min(20rem,calc(100vw-2.5rem))] md:origin-top-right md:rounded-[16px] md:border md:p-5 md:shadow-[0_12px_40px_rgba(10,9,9,0.12)]",
          open ?
            "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none invisible translate-y-1 opacity-0 md:scale-[0.98]",
        ].join(" ")}
      >
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-[1390px] flex-col gap-3 md:max-w-none md:gap-2">
          <label className="sr-only" htmlFor="header-search-input">
            {headerSearch.placeholder}
          </label>
          <div className="flex w-full items-center rounded-full border border-[#0A090926] bg-white p-1 pr-1 md:overflow-hidden md:rounded-full md:p-0">
            <input
              ref={inputRef}
              id="header-search-input"
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={headerSearch.placeholder}
              tabIndex={open ? 0 : -1}
              className="h-10 min-w-0 flex-1 rounded-full border-0 bg-transparent px-3 text-sm text-[#0A0909] outline-none placeholder:text-zinc-400 md:h-10 md:rounded-none md:px-4 md:text-xs"
            />
            <button
              type="submit"
              tabIndex={open ? 0 : -1}
              className="inline-flex h-10 w-11 shrink-0 items-center justify-center rounded-full bg-[#41736D] font-heading text-sm font-semibold text-white transition hover:bg-[#365e59] sm:w-12 md:h-10 md:w-auto md:rounded-none md:px-5"
              aria-label={headerSearch.buttonLabel}
            >
              <IconSearch className="size-4 text-white" aria-hidden />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
