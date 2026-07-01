import Image from "next/image";
import Link from "next/link";
import type { NileCruiseListingItem } from "@/types/nile-cruises-page";

function formatUsdMain(value: number) {
  return `USD $${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

function formatUsdStrike(value: number) {
  return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

type Props = {
  item: NileCruiseListingItem;
};

/**
 * Package card for tier rows (Luxury / Dahabiya / Standard) on `/nile-cruises`.
 * Separate from the top “Nile River Cruise” filtered grid (`TourPackageCard`).
 */
export function NileCruiseTierPackageCard({ item }: Props) {
  const { tour, nightsBadge, summary } = item;
  const showStrike = tour.priceWas != null && tour.priceWas > tour.price;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-[#0A090926] bg-white shadow-[0_4px_24px_rgba(10,9,9,0.06)] transition hover:border-[#41736D]/35 hover:shadow-[0_8px_28px_rgba(65,115,109,0.12)] sm:rounded-[20px] sm:p-3.5">
      <Link href={tour.href} className="group flex min-h-0 flex-1 flex-col">
        <div className="relative">
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px] sm:rounded-2xl bg-zinc-100">
            <Image
              src={tour.imageSrc}
              alt={tour.imageAlt}
              fill
              className="object-cover transition duration-300 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </div>
          <span className="absolute -bottom-2.5 left-2.5 rounded-full bg-[#E9EFEE] px-3 py-1.5 text-[10px] font-semibold text-[#0A0909] sm:text-xs">
            {nightsBadge}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-2.5 pt-4 sm:px-0 sm:pb-1 md:pt-3 lg:pt-5">
          <div className="flex min-h-0 flex-1 flex-col pb-3 sm:pb-4 md:pb-5">
            <h3 className="font-heading text-xs font-bold leading-snug text-[#0A0909] sm:text-sm md:text-base lg:text-lg group-hover:underline">
              {tour.title}
            </h3>
            <p className="mt-2 line-clamp-4 flex-1 text-[10px] leading-relaxed text-[#0A0909]/80 sm:text-xs md:text-sm">
              {summary}
            </p>
          </div>
          <div className="mt-auto pt-3 border-t border-zinc-100 flex sm:items-end flex-col sm:flex-row justify-between gap-3 sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-medium text-[#0A0909]/55 sm:text-xs">Start from</p>
              {showStrike ?
                <p className="mt-0.5 text-[11px] font-medium text-[#0A0909]/50 line-through sm:text-xs">
                  {formatUsdStrike(tour.priceWas!)}
                </p>
                : null}
              <p className="mt-1 font-heading text-sm font-extrabold tracking-tight text-[#0A0909] sm:text-base md:text-lg">
                {formatUsdMain(tour.price)}
              </p>
            </div>
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E0E0E0] bg-white px-4 py-2 font-heading text-xs font-semibold text-[#0A0909] transition group-hover:border-[#41736D] group-hover:bg-[#41736D] group-hover:text-white sm:px-5 sm:py-2.5 sm:text-sm"
            >
              Book Now
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
