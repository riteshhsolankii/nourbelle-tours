"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { topBar } from "@/data/site-static";
import type { NavItem } from "@/types/site";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { TopBarCurrency } from "@/components/layout/TopBarCurrency";
import { IconEnvelope, IconPhone } from "@/components/layout/icons";
import { IconClose, IconMenu } from "@/components/layout/icons";

function MenuChevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={["text-zinc-500 transition-transform", open ? "rotate-180" : ""].join(" ")}
    >
      <path
        d="M5.25 6.75L9 10.5L12.75 6.75"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileMenu({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState("");
  const [menuTop, setMenuTop] = useState(73);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const updateTop = () => {
      const headerEl = buttonRef.current?.closest("header");
      const rect = headerEl?.getBoundingClientRect();
      if (!rect) return;
      setMenuTop(Math.round(rect.bottom));
    };
    updateTop();
    window.addEventListener("resize", updateTop);
    window.addEventListener("scroll", updateTop, true);
    return () => {
      window.removeEventListener("resize", updateTop);
      window.removeEventListener("scroll", updateTop, true);
    };
  }, [open]);

  return (
    <div className="xl:hidden flex items-center justify-center">
      <button
        ref={buttonRef}
        type="button"
        className="rounded-lg p-1.5 pr-0 sm:p-2 sm:pr-0 text-zinc-800 hover:bg-zinc-100"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
      </button>
      {open ?
        <div className="fixed inset-x-0 bottom-0 z-30 flex flex-col  bg-white" style={{ top: `${menuTop}px` }}>
          <nav id="mobile-nav" className="flex-1 overflow-y-auto px-4 py-4 pb-40">
            <ul className="divide-y divide-zinc-200 ">
              {items.map((item) => (
                <li key={item.label} className="py-3">
                  {!item.children?.length && item.href ?
                    <Link
                      href={item.href || "#"}
                      className="block py-1 text-base font-medium leading-tight text-zinc-800"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  : null}
                  {item.children?.length ?
                    <div>
                      <button
                        type="button"
                        className="flex w-full list-none items-center justify-between gap-2 py-1 text-left"
                        onClick={() => setOpenSection((prev) => (prev === item.label ? "" : item.label))}
                        aria-expanded={openSection === item.label}
                      >
                        <span className="text-base font-medium leading-tight text-[#0A0909]">
                          {item.label}
                        </span>
                        <MenuChevron open={openSection === item.label} />
                      </button>
                      {openSection === item.label ?
                        <ul className="mt-2 space-y-0.5 pl-3">
                          {item.children.map((child) => (
                            <li key={`${item.label}-${child.label}`}>
                              <Link
                                href={child.href || "#"}
                                className="block py-2 text-sm font-medium leading-tight text-[#0A0909]"
                                onClick={() => setOpen(false)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      : null}
                    </div>
                  : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="sticky bottom-0 border-t border-zinc-200 bg-[#fafafa] px-4 py-4">
            <div className="">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Quick Info
              </p>
              <div className="mt-3 flex w-full flex-nowrap items-center justify-between gap-2.5">
                <div className="rounded-full border border-[#0A090926] px-0.5">
                  <LanguageSwitcher menuPlacement="up" menuAlign="left" />
                </div>
                <TopBarCurrency menuPlacement="up" />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={topBar.phoneHref}
                  className="inline-flex items-center gap-2 text-[11px] sm:text-sm text-[#0A0909] transition-colors hover:text-[#41736D]"
                >
                  <IconPhone className="size-3 sm:size-4 shrink-0" />
                  <span>{topBar.phone}</span>
                </a>
                <a
                  href={topBar.emailHref}
                  className="inline-flex items-center gap-2 text-[11px] sm:text-sm text-[#0A0909] transition-colors hover:text-[#41736D]"
                >
                  <IconEnvelope className="size-3 sm:size-4 shrink-0" />
                  <span>{topBar.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      : null}
    </div>
  );
}
