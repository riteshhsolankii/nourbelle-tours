"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import type { TourCard } from "@/types/site";

function formatUsd(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

function discountPercentFor(tour: TourCard): number | null {
  if (tour.discountPercent != null) return tour.discountPercent;
  if (tour.priceWas != null && tour.priceWas > tour.price) {
    return Math.round(((tour.priceWas - tour.price) / tour.priceWas) * 100);
  }
  return null;
}

function durationLabelFor(tour: TourCard) {
  const title = tour.title.toLowerCase();
  if (tour.href.includes("/nile-cruises")) {
    const nightMatch = title.match(/(\d+)\s*night/);
    if (nightMatch?.[1]) return `${nightMatch[1]} nights`;
    const dayMatch = title.match(/(\d+)\s*day/);
    if (dayMatch?.[1]) return `${dayMatch[1]} days`;
    return "7 nights";
  }
  const dayMatch = title.match(/(\d+)\s*day/);
  if (dayMatch?.[1]) return `${dayMatch[1]} days`;

  const nightMatch = title.match(/(\d+)\s*night/);
  if (nightMatch?.[1]) return `${nightMatch[1]} days`;

  if (tour.href.includes("/day-tours")) return "1 day";
  return "7 days";
}

function destinationLabelFor(tour: TourCard) {
  const haystack = `${tour.title} ${tour.features.join(" ")}`.toLowerCase();
  if (haystack.includes("cairo") || haystack.includes("giza")) return "Cairo, Aswan, Luxor";
  if (haystack.includes("luxor") && haystack.includes("aswan")) return "Luxor, Aswan";
  if (haystack.includes("luxor")) return "Luxor";
  if (haystack.includes("aswan")) return "Aswan";
  if (haystack.includes("alexandria")) return "Alexandria";
  return "Cairo, Luxor, Aswan";
}

function ListingArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GuideArticleCheckIcon() {
  const clipId = useId();
  return (
    <span className="mt-0.5 flex shrink-0 items-center justify-center" aria-hidden>
      <svg className="min-h-4 min-w-4 sm:min-h-5 sm:min-w-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath={`url(#${clipId})`}>
          <path d="M18.3327 9.2333V9.99997C18.3317 11.797 17.7498 13.5455 16.6738 14.9848C15.5978 16.4241 14.0854 17.477 12.3621 17.9866C10.6389 18.4961 8.79707 18.4349 7.11141 17.8121C5.42575 17.1894 3.98656 16.0384 3.00848 14.5309C2.0304 13.0233 1.56584 11.24 1.68408 9.4469C1.80232 7.65377 2.49702 5.94691 3.66458 4.58086C4.83214 3.21482 6.41 2.26279 8.16284 1.86676C9.91568 1.47073 11.7496 1.65192 13.391 2.3833" stroke="#28A745" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.3333 3.33325L10 11.6749L7.5 9.17492" stroke="#28A745" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id={clipId}>
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </span>
  );
}

function FeatureCheckIcon() {
  return (
    <span
      className="mt-0.5 flex size-[10px] sm:size-[14px] shrink-0 items-center justify-center text-[#41736D]"
      aria-hidden
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.2" d="M13.5 7C13.5 7.78188 12.3863 8.37188 12.0825 9.10563C11.79 9.81313 12.1712 11.0212 11.5962 11.5962C11.0212 12.1712 9.81313 11.79 9.10563 12.0825C8.375 12.3863 7.78125 13.5 7 13.5C6.21875 13.5 5.625 12.3863 4.89437 12.0825C4.18687 11.79 2.97875 12.1712 2.40375 11.5962C1.82875 11.0212 2.21 9.81313 1.9175 9.10563C1.61375 8.375 0.5 7.78125 0.5 7C0.5 6.21875 1.61375 5.625 1.9175 4.89437C2.21 4.1875 1.82875 2.97875 2.40375 2.40375C2.97875 1.82875 4.1875 2.21 4.89437 1.9175C5.62812 1.61375 6.21875 0.5 7 0.5C7.78125 0.5 8.375 1.61375 9.10563 1.9175C9.81313 2.21 11.0212 1.82875 11.5962 2.40375C12.1712 2.97875 11.79 4.18687 12.0825 4.89437C12.3863 5.62812 13.5 6.21875 13.5 7Z" fill="currentcolor" />
        <path d="M13.1163 5.42625C12.8806 5.18 12.6369 4.92625 12.545 4.70312C12.46 4.49875 12.455 4.16 12.45 3.83187C12.4406 3.22187 12.4306 2.53062 11.95 2.05C11.4694 1.56937 10.7781 1.55937 10.1681 1.55C9.84 1.545 9.50125 1.54 9.29688 1.455C9.07438 1.36312 8.82 1.11937 8.57375 0.88375C8.1425 0.469375 7.6525 0 7 0C6.3475 0 5.85812 0.469375 5.42625 0.88375C5.18 1.11937 4.92625 1.36312 4.70312 1.455C4.5 1.54 4.16 1.545 3.83187 1.55C3.22187 1.55937 2.53062 1.56937 2.05 2.05C1.56937 2.53062 1.5625 3.22187 1.55 3.83187C1.545 4.16 1.54 4.49875 1.455 4.70312C1.36312 4.92562 1.11937 5.18 0.88375 5.42625C0.469375 5.8575 0 6.3475 0 7C0 7.6525 0.469375 8.14187 0.88375 8.57375C1.11937 8.82 1.36312 9.07375 1.455 9.29688C1.54 9.50125 1.545 9.84 1.55 10.1681C1.55937 10.7781 1.56937 11.4694 2.05 11.95C2.53062 12.4306 3.22187 12.4406 3.83187 12.45C4.16 12.455 4.49875 12.46 4.70312 12.545C4.92562 12.6369 5.18 12.8806 5.42625 13.1163C5.8575 13.5306 6.3475 14 7 14C7.6525 14 8.14187 13.5306 8.57375 13.1163C8.82 12.8806 9.07375 12.6369 9.29688 12.545C9.50125 12.46 9.84 12.455 10.1681 12.45C10.7781 12.4406 11.4694 12.4306 11.95 11.95C12.4306 11.4694 12.4406 10.7781 12.45 10.1681C12.455 9.84 12.46 9.50125 12.545 9.29688C12.6369 9.07438 12.8806 8.82 13.1163 8.57375C13.5306 8.1425 14 7.6525 14 7C14 6.3475 13.5306 5.85812 13.1163 5.42625ZM12.3944 7.88188C12.095 8.19438 11.785 8.5175 11.6206 8.91438C11.4631 9.29563 11.4563 9.73125 11.45 10.1531C11.4437 10.5906 11.4369 11.0487 11.2425 11.2425C11.0481 11.4363 10.5931 11.4437 10.1531 11.45C9.73125 11.4563 9.29563 11.4631 8.91438 11.6206C8.5175 11.785 8.19438 12.095 7.88188 12.3944C7.56938 12.6937 7.25 13 7 13C6.75 13 6.42812 12.6925 6.11812 12.3944C5.80813 12.0962 5.4825 11.785 5.08563 11.6206C4.70438 11.4631 4.26875 11.4563 3.84688 11.45C3.40938 11.4437 2.95125 11.4369 2.7575 11.2425C2.56375 11.0481 2.55625 10.5931 2.55 10.1531C2.54375 9.73125 2.53688 9.29563 2.37937 8.91438C2.215 8.5175 1.905 8.19438 1.60562 7.88188C1.30625 7.56938 1 7.25 1 7C1 6.75 1.3075 6.42812 1.60562 6.11812C1.90375 5.80813 2.215 5.4825 2.37937 5.08563C2.53688 4.70438 2.54375 4.26875 2.55 3.84688C2.55625 3.40938 2.56312 2.95125 2.7575 2.7575C2.95187 2.56375 3.40688 2.55625 3.84688 2.55C4.26875 2.54375 4.70438 2.53688 5.08563 2.37937C5.4825 2.215 5.80562 1.905 6.11812 1.60562C6.43062 1.30625 6.75 1 7 1C7.25 1 7.57188 1.3075 7.88188 1.60562C8.19188 1.90375 8.5175 2.215 8.91438 2.37937C9.29563 2.53688 9.73125 2.54375 10.1531 2.55C10.5906 2.55625 11.0487 2.56312 11.2425 2.7575C11.4363 2.95187 11.4437 3.40688 11.45 3.84688C11.4563 4.26875 11.4631 4.70438 11.6206 5.08563C11.785 5.4825 12.095 5.80562 12.3944 6.11812C12.6937 6.43062 13 6.75 13 7C13 7.25 12.6925 7.57188 12.3944 7.88188ZM9.85375 5.14625C9.90024 5.19269 9.93712 5.24783 9.96228 5.30853C9.98744 5.36923 10.0004 5.43429 10.0004 5.5C10.0004 5.56571 9.98744 5.63077 9.96228 5.69147C9.93712 5.75217 9.90024 5.80731 9.85375 5.85375L6.35375 9.35375C6.30731 9.40024 6.25217 9.43712 6.19147 9.46228C6.13077 9.48744 6.06571 9.50039 6 9.50039C5.93429 9.50039 5.86923 9.48744 5.80853 9.46228C5.74783 9.43712 5.69269 9.40024 5.64625 9.35375L4.14625 7.85375C4.05243 7.75993 3.99972 7.63268 3.99972 7.5C3.99972 7.36732 4.05243 7.24007 4.14625 7.14625C4.24007 7.05243 4.36732 6.99972 4.5 6.99972C4.63268 6.99972 4.75993 7.05243 4.85375 7.14625L6 8.29313L9.14625 5.14625C9.19269 5.09976 9.24783 5.06288 9.30853 5.03772C9.36923 5.01256 9.43429 4.99961 9.5 4.99961C9.56571 4.99961 9.63077 5.01256 9.69147 5.03772C9.75217 5.06288 9.80731 5.09976 9.85375 5.14625Z" fill="currentcolor" />
      </svg>
    </span>
  );
}

function ListingBestSellerIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ className, filled }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} aria-hidden>
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RatingStarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
      <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" />
    </svg>
  );
}

function ListingGuideIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="6.5" r="2.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17c0-3 2.7-5.3 6-5.3s6 2.3 6 5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ListingDurationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3" y="4.5" width="14" height="12.5" rx="1.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ListingGroupIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="7.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 16c0-2.6 2-4.6 4.5-4.6s4.5 2 4.5 4.6M12.8 12.3c1.9.2 3.2 1.8 3.2 3.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ListingTransferIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3.5 12.5l1.3-4.2A1.8 1.8 0 0 1 6.5 7h7a1.8 1.8 0 0 1 1.7 1.3l1.3 4.2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="2.5" y="12.5" width="15" height="3.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="16" r="0.9" fill="currentColor" />
      <circle cx="14" cy="16" r="0.9" fill="currentColor" />
    </svg>
  );
}

type TourPackageCardProps = {
  tour: TourCard;
  variant?: "default" | "listing" | "guideArticle";
  /**
   * Listing variant only: outer layout of the card — "grid" (vertical, default) or "row" (horizontal, for list view).
   */
  layout?: "grid" | "row";
  /**
   * Listing variant only: overrides the duration pill under the image (e.g. Nile cruises use nights badge).
   */
  listingDurationLabel?: string;
  /**
   * Listing variant only: overrides the “Destinations:” line (e.g. fixed “Luxor, Aswan” on Nile pages).
   */
  listingDestinationLabel?: string;
  /**
   * Listing variant only (e.g. Nile cruises): when set, replaces feature list + pricing with this single paragraph.
   */
  listingSummaryParagraph?: string;
};

export function TourPackageCard({
  tour,
  variant = "default",
  layout = "grid",
  listingDurationLabel,
  listingDestinationLabel,
  listingSummaryParagraph,
}: TourPackageCardProps) {
  const pct = discountPercentFor(tour);
  const showStrike = tour.priceWas != null && tour.priceWas > tour.price;
  const showBadge = pct != null && pct > 0 && showStrike;
  const footnote = tour.perPersonNote ?? "Per Person on twin sharing";
  const bullets = tour.features.slice(0, 3);
  const [liked, setLiked] = useState(false);

  if (variant === "guideArticle") {
    const dayBadge = listingDurationLabel?.trim() || durationLabelFor(tour);
    const showStrike = tour.priceWas != null && tour.priceWas > tour.price;

    return (
      <Link
        href={tour.href}
        className="group flex h-full flex-col rounded-[10px] border border-[#0A090926] bg-white transition hover:border-[#41736D]/35 hover:shadow-[0_4px_20px_rgba(65,115,109,0.12)] sm:rounded-[20px] sm:p-3.5"
      >
        <div className="relative">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px] sm:rounded-[20px] bg-zinc-100">
            <Image
              src={tour.imageSrc}
              alt={tour.imageAlt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
          </div>
          <span className="absolute -bottom-2.5 left-2.5 rounded-full bg-[#E9EFEE] px-3 py-1.5 text-[10px] font-semibold capitalize text-[#0A0909] sm:text-xs">
            {dayBadge}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-2.5 pt-4 sm:px-0 sm:pb-1 md:pt-3 lg:pt-5">
          <h3 className="font-heading text-sm sm:text-base font-bold text-[#0A0909] leading-3.5 sm:leading-5 md:text-lg">{tour.title}</h3>
          <ul className="mt-3 flex-1 space-y-2">
            {bullets.map((line) => (
              <li key={line} className="flex gap-2 items-start text-xs leading-relaxed text-[#0A0909] sm:text-sm">
                <GuideArticleCheckIcon />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-5">
            <hr className="border-0 border-t border-[#0A09091A]" />
            <div className="mt-4 flex sm:items-end flex-col sm:flex-row justify-between gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium text-[#0A0909]/55 sm:text-xs">Start From</p>
                {showStrike ?
                  <p className="mt-0.5 text-[11px] font-medium text-[#0A0909]/50 line-through sm:text-xs">
                    {formatUsd(tour.priceWas!)}
                  </p>
                : null}
                <p
                  className={[
                    "font-heading text-lg font-extrabold tracking-tight text-[#0A0909] sm:text-xl",
                    showStrike ? "mt-0.5" : "mt-1",
                  ].join(" ")}
                >
                  {formatUsd(tour.price)}
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 justify-center rounded-full border border-[#0A090926] bg-white px-4 py-2.5 font-heading text-xs font-semibold text-[#0A0909] transition group-hover:border-[#41736D] group-hover:bg-[#41736D] group-hover:text-white sm:px-5 sm:text-sm">
                View Tour
                <ListingArrowIcon className="hidden lg:block shrink-0" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "listing") {
    const dayBadge = listingDurationLabel?.trim() || durationLabelFor(tour);
    const destinationLine =
      listingDestinationLabel?.trim() ||
      tour.destinationsLine?.trim() ||
      destinationLabelFor(tour).split(", ").join(" • ");
    const nileSummary = listingSummaryParagraph?.trim();
    const isNileListing = Boolean(nileSummary);
    const listingFootnote = tour.perPersonNote ?? "Per person";
    const isRow = layout === "row";

    return (
      <Link
        href={tour.href}
        className={[
          "group flex h-full rounded-[10px] sm:rounded-[20px] border border-[#0A090926] bg-white sm:p-3.5 transition hover:border-[#41736D]/35 hover:shadow-[0_4px_20px_rgba(65,115,109,0.12)]",
          isRow ? "flex-col gap-3 sm:flex-row sm:gap-5" : "flex-col",
        ].join(" ")}
      >
        <div className={["relative w-full", isRow ? "sm:w-64 sm:shrink-0" : ""].join(" ")}>
          <div
            className={[
              "relative w-full overflow-hidden rounded-[10px] sm:rounded-2xl bg-zinc-100",
              isRow ? "aspect-[3/2] sm:aspect-auto sm:h-full" : "aspect-[3/2]",
            ].join(" ")}
          >
            <Image
              src={tour.imageSrc}
              alt={tour.imageAlt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          {tour.badgeLabel ?
            <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-[#B98B3E] px-2.5 py-1">
              <ListingBestSellerIcon />
              <span className="text-[10px] font-medium text-white">{tour.badgeLabel}</span>
            </span>
          : null}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked((prev) => !prev);
            }}
            aria-pressed={liked}
            aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 transition hover:bg-white"
          >
            <HeartIcon
              filled={liked}
              className={["size-4", liked ? "text-[#FF3A5C]" : "text-[#0A0909]/70"].join(" ")}
            />
          </button>
          {isRow ? null :
            <span className="absolute -bottom-2.5 left-2.5 rounded-full bg-[#0A3B37] px-3 py-1.5 text-[10px] font-semibold text-white sm:text-xs">
              {dayBadge}
            </span>
          }
        </div>
        <div className="flex flex-1 flex-col p-2.5 pt-4 sm:px-0 sm:pb-1 md:pt-3 lg:pt-5">
          {isRow ?
            <span className="mb-2 inline-flex w-fit items-center rounded-full bg-[#0A3B37] px-3 py-1.5 text-[10px] font-semibold text-white sm:text-xs">
              {dayBadge}
            </span>
          : null}
          <h3 className="font-heading text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-snug text-[#0A0909] hover:underline decoration-[#0A0909] decoration-1 underline-offset-[5px]">
            {tour.title}
          </h3>
          <div className="mt-2 space-y-2">
            {isNileListing ?
              <p className="text-[10px] leading-relaxed text-[#0A0909]/80 sm:text-xs md:text-sm">
                {nileSummary}
              </p>
            : <p className="text-xs text-[#0A0909]/60">{destinationLine}</p>
            }
            {tour.ratingValue != null ?
              <div className="flex items-center gap-1.5">
                <RatingStarIcon className="text-[#B98B3E]" />
                <span className="text-xs font-bold text-[#0A0909]">{tour.ratingValue.toFixed(1)}</span>
                {tour.ratingCount != null ?
                  <span className="text-xs text-[#0A0909]/50">({tour.ratingCount} reviews)</span>
                : null}
              </div>
            : null}
            <div className="flex items-center gap-3 sm:gap-4 text-[#0A0909]/50">
              <ListingGuideIcon />
              <ListingDurationIcon />
              <ListingGroupIcon />
              <ListingTransferIcon />
            </div>
          </div>
          <div className="mt-auto pt-2 sm:pt-3 lg:pt-5">
            <hr className="border-0 border-t border-zinc-200" />
            <div className="mt-3 lg:mt-4 flex flex-wrap items-end justify-between gap-2 lg:gap-4">
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <p className="text-[10px] font-regular text-[#0A0909E5]">From</p>
                {showStrike ? (
                  <span className="mt-0.5 block text-[10px] lg:text-[12px] font-semibold leading-none text-[#0A0909]/70 line-through">
                    {formatUsd(tour.priceWas!)}
                  </span>
                ) : null}
                <div
                  className={[
                    "flex flex-wrap items-center gap-2",
                    showStrike ? "mt-1" : "mt-0.5",
                  ].join(" ")}
                >
                  <span className="text-sm md:text-base lg:text-[22px] font-extrabold tracking-tight text-[#0A0909] sm:text-[1.65rem]">
                    {formatUsd(tour.price)}
                  </span>
                  {showBadge ? (
                    <span className="rounded-full bg-[#FFC9C980] px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-[#FF3A3A] lg:text-[12px]">
                      -{pct}%
                    </span>
                  ) : null}
                </div>
                <p className="mt-0.5 text-[8px] lg:text-[10px] leading-tight text-[#0A090980]">{listingFootnote}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 font-heading rounded-full bg-[#41736D] px-3 lg:px-4 py-2 lg:py-2.5 text-[10px] lg:text-sm font-semibold text-white transition group-hover:bg-[#365e59]">
                View Details
                <ListingArrowIcon className="shrink-0" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={tour.href}
      className="group flex h-full flex-col rounded-[10px] sm:rounded-[20px] border border-[#0A090926] bg-white sm:p-3.5 transition hover:border-[#41736D]/35 hover:shadow-[0_4px_20px_rgba(65,115,109,0.12)]"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px] sm:rounded-2xl bg-zinc-100">
        <Image
          src={tour.imageSrc}
          alt={tour.imageAlt}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-2.5 pt-4 sm:px-0 sm:pb-1 md:pt-3 lg:pt-5">
        <h3 className="font-heading text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold leading-snug text-[#0A0909] hover:underline decoration-[#0A0909] decoration-1 underline-offset-[5px]">
          {tour.title}
        </h3>
        <ul className="mt-2.5 md:mt-3 lg:mt-4 space-y-1 sm:space-y-2.5">
          {bullets.map((line) => (
            <li
              key={line}
              className="flex gap-1.5 text-[10px] sm:text-xs lg:text-sm font-normal leading-snug text-[#0A0909]/85"
            >
              <FeatureCheckIcon />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-2 sm:pt-3 lg:pt-5">
          <hr className="border-0 border-t border-zinc-200" />
          <div className="mt-3 lg:mt-5 flex flex-wrap items-end justify-between gap-2 lg:gap-4">
            <div className="flex min-w-0 flex-1 flex-col items-start">
              <p className="text-[10px] font-regular text-[#0A0909E5]">Starting From</p>
              {showStrike ? (
                <span className="mt-1.5 block text-[11px] lg:text-[13px] font-medium leading-none text-[#0A0909] line-through">
                  {formatUsd(tour.priceWas!)}
                </span>
              ) : null}
              <div
                className={[
                  "flex flex-wrap items-center gap-2",
                  showStrike ? "mt-1" : "mt-1.5",
                ].join(" ")}
              >
                <span className="text-sm md:text-base lg:text-[20px] font-extrabold tracking-tight text-[#0A0909] sm:text-[1.65rem]">
                  {formatUsd(tour.price)}
                </span>
                {showBadge ? (
                  <span className="rounded-full bg-[#FFC9C980] px-1.5 lg:px-2.5 py-0.5 text-[10px] lg:text-[12px] font-semibold tabular-nums text-[#FF3A3A]">
                    -{pct}%
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 text-[8px] lg:text-[10px] leading-tight text-[#0A090980]">
                {footnote}
              </p>
            </div>
            <span className="hidden sm:inline-flex shrink-0 items-center gap-2 font-heading rounded-full bg-[#41736D] px-3 lg:px-4 py-2 lg:py-2.5 text-[10px] lg:text-sm font-semibold text-white transition group-hover:bg-[#365e59]">
              Book Now
              <svg className="hidden lg:block" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 7.09961H9.5" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
