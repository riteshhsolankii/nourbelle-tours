import type { TourPackagePageDetail } from "@/types/tour-package-detail";

function truncateToWords(text: string, maxWords: number) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(" ")}…`;
}

function TargetMarkerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

type Props = {
  itinerary: TourPackagePageDetail["itinerary"];
  placesToVisit?: TourPackagePageDetail["placesToVisit"];
};

export function ItineraryTimeline({ itinerary, placesToVisit }: Props) {
  return (
    <div>
      <div className="relative">
        <div className="absolute bottom-2 left-3 top-2 w-px bg-[#0A09091A]" aria-hidden />
        <div className="space-y-5">
          {itinerary.map((d, index) => (
            <div key={`${d.label}-${d.title}-${index}`} className="relative flex gap-4">
              <span
                className="relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#0A0909]"
                aria-hidden
              >
                <TargetMarkerIcon />
              </span>
              <div className="flex min-w-0 flex-1 gap-3 pb-1 sm:gap-4">
                <span className="w-14 shrink-0 pt-1 text-sm font-bold text-[#0A0909]/55 sm:w-20">{d.label}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-snug text-[#0A0909] sm:text-[15px]">{d.title}</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{truncateToWords(d.body, 12)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {placesToVisit && placesToVisit.length > 0 ?
        <div className="mt-6">
          <h3 className="font-heading text-base font-bold text-[#0A0909]">Places To Visit</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {placesToVisit.map((place) => (
              <span key={place} className="inline-flex items-center rounded-full bg-[#F4F4F5] px-5 py-2 text-xs sm:text-sm font-medium text-[#0A0909]">
                {place}
              </span>
            ))}
          </div>
        </div>
      : null}
    </div>
  );
}
