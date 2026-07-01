"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/types/site";
import { IconChevronDown } from "@/components/layout/icons";

function navLinkClass(active: boolean) {
  return [
    "rounded-full px-4 py-3 text-sm font-semibold transition-colors",
    active ?
      "bg-[#0A09091A]"
    : "text-[#0A0909] hover:bg-zinc-50",
  ].join(" ");
}

export function MainNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-0.5 xl:flex">
      {items.map((item) => {
        if (item.href) {
          const active = pathname === item.href;
          return (
            <li key={item.label}>
              <Link href={item.href} className={navLinkClass(active)}>
                {item.label}
              </Link>
            </li>
          );
        }
        if (!item.children?.length) return null;
        return (
          <li key={item.label} className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-full px-4 py-3 text-sm font-semibold text-[#0A0909] transition-colors hover:bg-[#0A09091A]"
              aria-expanded={false}
              aria-haspopup="true"
            >
              {item.label}
              <IconChevronDown className="size-2.5 opacity-50" />
            </button>
            <div className="pointer-events-none invisible absolute left-0 top-full z-50 pt-1 opacity-0 transition group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
              <ul className="min-w-[12rem] overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ring-1 ring-black/5">
                {item.children.map((c,i) => {
                  const childActive = pathname === c.href;
                  return (
                    <li key={i}>
                      <Link
                        href={c.href}
                        className={[
                          "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition outline-none ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0",
                          childActive ?
                            "bg-[#41736D]/10 font-medium text-[#41736D]"
                          : "text-zinc-800 hover:bg-zinc-50",
                        ].join(" ")}
                      >
                        {c.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
