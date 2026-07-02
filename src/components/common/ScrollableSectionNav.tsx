"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type SectionNavItem = {
  domId: string;
  label: string;
};

type Props = {
  items: readonly SectionNavItem[];
  activeSection: string;
  onNavigate: (domId: string) => void;
  ariaLabel: string;
  className?: string;
  /** "pill" (default): rounded active background, matches existing scroll-spy nav. "underline": plain text tabs with a bottom-border baseline and gold active underline. */
  variant?: "pill" | "underline";
};

const SCROLL_STEP_PX = 180;

function NavArrow({
  direction,
  disabled,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "flex size-8 shrink-0 items-center justify-center rounded-full text-[#0A0909] transition-colors sm:size-9",
        disabled ? "cursor-not-allowed opacity-35" : "hover:bg-[#0A09090D] hover:text-[#41736D]",
      ].join(" ")}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        {direction === "prev" ?
          <path d="M14 7L9 12L14 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        : <path d="M10 7L15 12L10 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        }
      </svg>
    </button>
  );
}

export function ScrollableSectionNav({ items, activeSection, onNavigate, ariaLabel, className, variant = "pill" }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    syncNav();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncNav, { passive: true });
    const ro = new ResizeObserver(() => syncNav());
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncNav);
      ro.disconnect();
    };
  }, [syncNav, items]);

  const scrollTabs = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * SCROLL_STEP_PX, behavior: "smooth" });
  };

  if (variant === "underline") {
    return (
      <div
        className={[
          "sticky top-[61px] sm:top-[77px] md:top-[85px] lg:top-[89px] z-20 border-b border-[#0A09091A] bg-white/95 backdrop-blur-sm",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex items-center gap-1">
          <NavArrow direction="prev" disabled={!canPrev} onClick={() => scrollTabs(-1)} label="Scroll section tabs left" />
          <nav
            ref={scrollerRef}
            aria-label={ariaLabel}
            className="flex min-w-0 flex-1 gap-3 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
          >
            {items.map(({ domId, label }) => (
              <a
                key={domId}
                href={`#${domId}`}
                data-section-id={domId}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(domId);
                }}
                className={[
                  "shrink-0 whitespace-nowrap border-b-2 py-3 text-xs font-medium transition sm:text-sm",
                  activeSection === domId ?
                    "border-[#B98B3E] text-[#0A0909]"
                  : "border-transparent text-[#0A0909]/55 hover:text-[#0A0909]",
                ].join(" ")}
              >
                {label}
              </a>
            ))}
          </nav>
          <NavArrow direction="next" disabled={!canNext} onClick={() => scrollTabs(1)} label="Scroll section tabs right" />
        </div>
      </div>
    );
  }

  return (
    <div className={["mt-6 md:mt-8", className].filter(Boolean).join(" ")}>
      <div className="sticky top-[61px] sm:top-[77px] md:top-[85px] lg:top-[89px] z-20">
        <div className="flex items-center gap-0.5 rounded-full border border-[#0A09091A] bg-white p-1 backdrop-blur-sm sm:gap-1 sm:p-2">
          <NavArrow
            direction="prev"
            disabled={!canPrev}
            onClick={() => scrollTabs(-1)}
            label="Scroll section tabs left"
          />
          <nav
            ref={scrollerRef}
            aria-label={ariaLabel}
            className="flex min-w-0 flex-1 gap-1 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map(({ domId, label }) => (
              <a
                key={domId}
                href={`#${domId}`}
                data-section-id={domId}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(domId);
                }}
                className={[
                  "shrink-0 rounded-full px-3 py-2.5 font-heading text-xs font-semibold transition sm:px-4 sm:text-sm",
                  activeSection === domId ?
                    "bg-[#0A09090D] text-[#0A0909]"
                  : "text-[#0A0909] hover:bg-[#0A09090D]",
                ].join(" ")}
              >
                {label}
              </a>
            ))}
          </nav>
          <NavArrow
            direction="next"
            disabled={!canNext}
            onClick={() => scrollTabs(1)}
            label="Scroll section tabs right"
          />
        </div>
      </div>
    </div>
  );
}
