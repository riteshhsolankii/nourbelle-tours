"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { TourReviewsContent } from "@/types/reviews";

type Props = {
  content: TourReviewsContent;
  /** Default: gray strip behind the section. Use `plain` for no outer background (e.g. destination pages). */
  variant?: "default" | "plain";
};

/** Matches `gap-4` on the track (1rem). */
const GAP_PX = 16;

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[#41736D]" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={["size-3 shrink-0 md:size-4", i < rating ? "fill-current" : "fill-zinc-200 text-zinc-200"].join(" ")}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.65925 0.23957C5.68697 0.168714 5.73417 0.108101 5.79484 0.06544C5.85552 0.0227793 5.92693 0 6 0C6.07306 0 6.14448 0.0227793 6.20515 0.06544C6.26583 0.108101 6.31303 0.168714 6.34074 0.23957L7.73321 3.74977C7.75927 3.81546 7.80212 3.87233 7.85704 3.91413C7.91195 3.95594 7.97681 3.98105 8.04447 3.98672L11.6603 4.29028C11.9873 4.31775 12.1196 4.74563 11.8706 4.96883L9.11584 7.44267C9.06438 7.48881 9.02602 7.54892 9.00499 7.61639C8.98395 7.68387 8.98104 7.75611 8.99658 7.82521L9.83862 11.5236C9.85554 11.5978 9.8511 11.6756 9.82587 11.7471C9.80064 11.8187 9.75573 11.8808 9.69684 11.9257C9.63794 11.9705 9.56769 11.996 9.49495 11.999C9.42222 12.002 9.35027 11.9824 9.28818 11.9425L6.19199 9.96114C6.13418 9.92412 6.06775 9.90453 6 9.90453C5.93225 9.90453 5.86581 9.92412 5.808 9.96114L2.71181 11.9432C2.64973 11.9831 2.57778 12.0027 2.50504 11.9997C2.43231 11.9967 2.36206 11.9712 2.30316 11.9263C2.24426 11.8815 2.19936 11.8194 2.17412 11.7478C2.14889 11.6763 2.14445 11.5985 2.16138 11.5243L3.00341 7.82521C3.01903 7.75612 3.01616 7.68385 2.99512 7.61636C2.97407 7.54886 2.93568 7.48876 2.88415 7.44267L0.129361 4.96883C0.0738871 4.91927 0.0336949 4.85357 0.0138747 4.78005C-0.00594558 4.70652 -0.00450214 4.62849 0.0180221 4.55583C0.0405464 4.48317 0.0831381 4.41915 0.140403 4.37188C0.197668 4.3246 0.267031 4.29621 0.339705 4.29028L3.95553 3.98672C4.02319 3.98105 4.08804 3.95594 4.14296 3.91413C4.19787 3.87233 4.24072 3.81546 4.26679 3.74977L5.65925 0.23957Z" />
        </svg>
      ))}
    </div>
  );
}

// function TripAdvisorBadge({ href }: { href: string }) {
//   return (
//     <a
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="group/badge hidden shrink-0 items-center gap-1.5 outline-none ring-0 focus-visible:outline-none lg:flex"
//       aria-label="View Nourbelle Tours on TripAdvisor"
//     >
//       <img
//         src="/trip-adviser.png"
//         alt=""
//         className="h-10 w-auto object-contain group-hover/badge:brightness-95"
//         loading="lazy"
//         decoding="async"
//       />
//       <span className="text-sm font-semibold text-[#0A0909]">Travellers’ Choice Winner</span>
//     </a>
//   );
// }

function CarouselNav({
  direction,
  disabled,
  onClick,
  label,
  className,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "flex size-9 md:size-11 select-none items-center justify-center rounded-full border border-[#0A090926] bg-white text-[#0A0909] shadow-md transition-colors",
        disabled ? "cursor-not-allowed opacity-40" : "hover:border-[#41736D] hover:text-[#41736D]",
        className ?? "",
      ].join(" ")}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {direction === "prev" ? (
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

/**
 * Responsive widths: 1 card (mobile), ~2.5 (`md` tablet), 3 (`lg` desktop).
 * `100%` is the scrollport (`w-full` scroller); gaps match `gap-4` (1rem).
 */
const reviewCardWidthClass =
  "w-full shrink-0 snap-start md:w-[calc((100%-2rem)/2.5)] lg:w-[calc((100%-2rem)/3)]";

export function TourReviewsCarouselSection({ content, variant = "default" }: Props) {
  const { headline, tripAdvisorHref, reviews, ctaLabel, ctaHref } = content;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || reviews.length === 0) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 4) {
      setCanPrev(false);
      setCanNext(false);
      return;
    }
    setCanPrev(el.scrollLeft > 6);
    setCanNext(el.scrollLeft < maxScroll - 6);
  }, [reviews.length]);

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

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.querySelector("article");
    if (!first) return;
    const w = first.getBoundingClientRect().width;
    el.scrollBy({ left: dir * (w + GAP_PX), behavior: "smooth" });
  }, []);

  const sectionSurface =
    variant === "plain" ? "w-full bg-transparent pb-0 md:pb-0 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20" : "w-full bg-[#FAFAFA] py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20";

  return (
    <section className={sectionSurface}>
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
            {headline}
          </h2>
          {/* {tripAdvisorHref ? <TripAdvisorBadge href={tripAdvisorHref} /> : null} */}
        </div>

        <div className="relative mt-4 min-h-[12rem] md:mt-6 lg:mt-8 xl:mt-10">
          <div
            ref={scrollerRef}
            className={[
              "flex w-full snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto scroll-smooth px-11 pb-2 pt-1 sm:px-12 [-ms-overflow-style:none] [scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden",
              reviews.length > 0 ? "touch-pan-x cursor-grab active:cursor-grabbing" : "",
            ].join(" ")}
          >
            {reviews.map((r) => (
              <article
                key={r.id}
                className={`flex min-h-[12rem] select-none flex-col rounded-[10px] border border-[#0A090926] bg-white p-4 md:rounded-2xl md:p-5 ${reviewCardWidthClass}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-heading text-sm font-semibold text-[#0A0909] md:text-base">{r.title}</h3>
                  <StarRow rating={r.rating} />
                </div>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-[#0A0909] md:text-sm">{r.quote}</p>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-[#0A090980] md:text-xs">
                  — {r.author}
                </p>
              </article>
            ))}
          </div>

          {reviews.length > 1 ?
            <>
              <CarouselNav
                direction="prev"
                disabled={!canPrev}
                onClick={() => scrollByCard(-1)}
                label="Previous reviews"
                className="absolute -left-1 top-1/2 z-20 flex -translate-y-1/2 sm:left-2 lg:-left-5"
              />
              <CarouselNav
                direction="next"
                disabled={!canNext}
                onClick={() => scrollByCard(1)}
                label="Next reviews"
                className="absolute -right-1 top-1/2 z-20 flex -translate-y-1/2 sm:right-2 lg:-right-5"
              />
            </>
          : null}
        </div>

        <div className="mt-5 sm:mt-8 flex justify-center">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#41736D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#365e59] md:px-8 md:py-4"
          >
            {ctaLabel}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
