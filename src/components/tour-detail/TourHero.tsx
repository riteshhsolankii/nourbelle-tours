import { Breadcrumb } from "@/components/common/Breadcrumb";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { ReviewSummary } from "@/components/tour-detail/ReviewSummary";

function DurationIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#41736D]" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TourTypeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#41736D]" aria-hidden>
      <path d="M3 12l3-7h12l3 7-3 7H6l-3-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FlightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#41736D]" aria-hidden>
      <path
        d="M10.5 13.5L4 15l.6-2.4L10.5 10 9 4.5 10.8 4 14 9.5l4.7-2.7c.9-.5 2-.2 2.5.7.5.9.2 2-.7 2.5L15.8 12.7 15.5 19.5 14 20l-1-6.7-2.5 1.5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HotelsCountIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#41736D]" aria-hidden>
      <path d="M4 20V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14M12 20v-8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 20h18M7 8h1m0 3h1m3 3h1m0 3h1m3-3h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GuideIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#41736D]" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function includesAny(text: string, needles: readonly string[]) {
  const lower = text.toLowerCase();
  return needles.some((n) => lower.includes(n));
}

type Props = {
  detail: TourPackagePageDetail;
};

export function TourHero({ detail }: Props) {
  const destinationTags = (detail.placesToVisit ?? []).slice(0, 3);
  const inclusionsText = detail.inclusions.join(" ");
  const highlightsText = detail.highlights.join(" ");
  const flightsIncluded = includesAny(inclusionsText, ["flight"]);
  const expertGuides = includesAny(`${inclusionsText} ${highlightsText}`, ["guide", "egyptologist"]);
  const hotelsCount = detail.hotelCards?.length ?? detail.accommodationItems?.length ?? 0;

  return (
    <div className="mb-6 rounded-2xl bg-[#F5F0EA] p-4 sm:p-6 md:mb-8">
      <Breadcrumb items={detail.breadcrumbs} variant="inline" className="mb-3" />
      <h1 className="font-heading text-xl font-bold leading-tight tracking-tight text-[#0A0909] sm:text-2xl md:text-3xl lg:text-4xl">
        {detail.title}
      </h1>
      {detail.subtitle ?
        <p className="mt-1.5 text-sm text-[#0A0909]/70 md:text-base">{detail.subtitle}</p>
      : null}

      <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
        <ReviewSummary ratingValue={detail.ratingValue} ratingCount={detail.ratingCount} variant="inline" />
        {destinationTags.length > 0 ?
          <span className="inline-flex items-center gap-1.5 text-xs text-[#0A0909]/80 sm:text-[13px]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#0A0909]/50" aria-hidden>
              <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {destinationTags.join(", ")}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#0A0909]/40" aria-hidden>
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        : null}
        {detail.bestSeller ?
          <span className="flex items-center gap-1.5 rounded-full bg-[#B98B3E] px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path
                d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                stroke="#FFFFFF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[10px] font-medium text-white sm:text-[13px]">Best Seller</span>
          </span>
        : null}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A0909]/80 sm:text-[13px]">
          <DurationIcon />
          {detail.sidebar.durationInfo}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A0909]/80 sm:text-[13px]">
          <TourTypeIcon />
          {detail.sidebar.tourType}
        </span>
        {flightsIncluded ?
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A0909]/80 sm:text-[13px]">
            <FlightIcon />
            Flights Included
          </span>
        : null}
        {hotelsCount > 0 ?
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A0909]/80 sm:text-[13px]">
            <HotelsCountIcon />
            {hotelsCount}+ Hotels
          </span>
        : null}
        {expertGuides ?
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A0909]/80 sm:text-[13px]">
            <GuideIcon />
            Expert Guides
          </span>
        : null}
      </div>
    </div>
  );
}
