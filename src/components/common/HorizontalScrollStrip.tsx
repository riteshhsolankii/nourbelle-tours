"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const SCROLL_STEP_PX = 180;

function ScrollArrow({
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

type Props = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  scrollClassName?: string;
  prevLabel?: string;
  nextLabel?: string;
};

export function HorizontalScrollStrip({
  children,
  ariaLabel,
  className,
  scrollClassName,
  prevLabel = "Scroll left",
  nextLabel = "Scroll right",
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const overflow = scrollWidth > clientWidth + 2;
    setIsScrollable(overflow);
    setCanPrev(overflow && scrollLeft > 2);
    setCanNext(overflow && scrollLeft + clientWidth < scrollWidth - 2);
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
  }, [syncNav]);

  const scroll = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * SCROLL_STEP_PX, behavior: "smooth" });
  };

  return (
    <div className={["flex items-center gap-0.5 sm:gap-1", className].filter(Boolean).join(" ")}>
      {isScrollable && canPrev ?
        <ScrollArrow direction="prev" disabled={false} onClick={() => scroll(-1)} label={prevLabel} />
      : null}
      <div
        ref={scrollerRef}
        role="region"
        aria-label={ariaLabel}
        className={[
          "min-w-0 flex-1 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          scrollClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
      {isScrollable && canNext ?
        <ScrollArrow direction="next" disabled={false} onClick={() => scroll(1)} label={nextLabel} />
      : null}
    </div>
  );
}
