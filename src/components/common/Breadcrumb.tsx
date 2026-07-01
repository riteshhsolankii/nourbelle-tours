import Link from "next/link";
import type { BreadcrumbItem } from "@/types/site";

type Props = {
  items: readonly BreadcrumbItem[];
  className?: string;
  /** `banner`: light text on dark hero. `inline`: dark text on light pages (e.g. Nile cruises). */
  variant?: "banner" | "inline";
};

export function Breadcrumb({ items, className, variant = "banner" }: Props) {
  const isInline = variant === "inline";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={
          isInline ?
            "flex max-w-full flex-nowrap items-center gap-x-2 overflow-hidden text-xs text-zinc-600"
          : "flex max-w-full flex-nowrap items-center gap-2 overflow-hidden text-xs text-white"
        }
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className={[
                "flex items-center gap-2",
                isLast ? "min-w-0 flex-1 overflow-hidden" : "shrink-0",
              ].join(" ")}
            >
              {index > 0 ?
                isInline ?
                  <span aria-hidden className="select-none text-zinc-400">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25 7.5L7.75 4C6.58333 2.83333 4.25 0.5 4.25 0.5" stroke="currentcolor" strokeLinecap="round" />
                  </svg>
                  </span>
                : <span aria-hidden><svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.25 7.5L7.75 4C6.58333 2.83333 4.25 0.5 4.25 0.5" stroke="currentcolor" strokeLinecap="round" />
                  </svg></span>
              : null}
              {item.href && !isLast ?
                <Link
                  href={item.href}
                  className={
                    isInline ?
                      "truncate transition-colors hover:text-[#41736D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#41736D]/30 rounded-sm"
                    : "truncate transition-colors hover:text-white/80"
                  }
                >
                  {item.label}
                </Link>
              : (
                <span
                  className={[
                    "truncate",
                    isLast ?
                      isInline ?
                        "font-medium text-zinc-800"
                      : "text-white"
                    : isInline ?
                      "text-zinc-600"
                    : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
