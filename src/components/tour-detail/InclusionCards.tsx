import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { CheckIcon, CrossIcon } from "@/components/tour-detail/helpers";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return `${first}${last}`.toUpperCase();
}

const AVATAR_COLORS = ["#41736D", "#B98B3E", "#6E5A8C", "#35635E"];

function InclusionsCard({ inclusions, sectionScrollClass }: { inclusions: readonly string[]; sectionScrollClass?: string }) {
  return (
    <div id="tour-inclusions" className={`${sectionScrollClass ?? ""} rounded-xl border border-[#0A09091A] bg-white p-5 md:p-6`}>
      <h3 className="font-heading text-base font-bold text-[#0A0909] md:text-lg">Inclusions</h3>
      <ul className="mt-4 space-y-3">
        {inclusions.map((line) => (
          <li key={line} className="flex gap-3 text-xs sm:text-sm text-[#0A0909]">
            <CheckIcon />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExclusionsCard({ exclusions, sectionScrollClass }: { exclusions?: readonly string[]; sectionScrollClass?: string }) {
  return (
    <div id="tour-exclusions" className={`${sectionScrollClass ?? ""} rounded-xl border border-[#0A09091A] bg-white p-5 md:p-6`}>
      <h3 className="font-heading text-base font-bold text-[#0A0909] md:text-lg">Exclusions</h3>
      <ul className="mt-4 space-y-3">
        {(exclusions ?? []).map((line) => (
          <li key={line} className="flex gap-3 text-xs sm:text-sm text-[#0A0909]">
            <CrossIcon />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function WhyTravelersLoveCard({
  highlights,
  reviewCards,
}: {
  highlights: readonly string[];
  reviewCards?: TourPackagePageDetail["reviewCards"];
}) {
  const loveBullets = highlights.slice(0, 3);
  const avatars = (reviewCards ?? []).slice(0, 4);

  return (
    <div className="rounded-xl border border-[#0A09091A] bg-white p-5 md:p-6">
      <h3 className="font-heading text-base font-bold text-[#0A0909] md:text-lg">Why Travelers Love This Tour</h3>
      <ul className="mt-4 space-y-3">
        {loveBullets.map((line) => (
          <li key={line} className="flex gap-3 text-xs sm:text-sm text-[#0A0909]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B98B3E]" />
            <span>{line}</span>
          </li>
        ))}
      </ul>
      {avatars.length > 0 ?
        <div className="mt-5 flex items-center gap-2">
          <div className="flex -space-x-2">
            {avatars.map((review, i) => (
              <span
                key={`${review.author}-${i}`}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
                style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {initials(review.author)}
              </span>
            ))}
          </div>
          <span className="text-xs font-medium text-[#0A0909]/70">{reviewCards?.length} reviews</span>
        </div>
      : null}
      {reviewCards?.[0] ?
        <div className="mt-4 border-t border-[#0A09091A] pt-4">
          <p className="text-xs sm:text-sm italic leading-relaxed text-[#0A0909]/80">&ldquo;{reviewCards[0].body}&rdquo;</p>
          <p className="mt-2 text-[11px] font-semibold tracking-[0.1em] text-[#0A0909]/50">— {reviewCards[0].author}</p>
        </div>
      : null}
    </div>
  );
}

type Props = {
  inclusions?: readonly string[];
  exclusions?: readonly string[];
  highlights?: readonly string[];
  reviewCards?: TourPackagePageDetail["reviewCards"];
  sectionScrollClass?: string;
  /** Which card(s) to render. Defaults to "all" (3-card row) for backward compatibility. */
  variant?: "all" | "inclusions" | "exclusions";
};

export function InclusionCards({
  inclusions = [],
  exclusions,
  highlights = [],
  reviewCards,
  sectionScrollClass,
  variant = "all",
}: Props) {
  if (variant === "inclusions") return <InclusionsCard inclusions={inclusions} sectionScrollClass={sectionScrollClass} />;
  if (variant === "exclusions") return <ExclusionsCard exclusions={exclusions} sectionScrollClass={sectionScrollClass} />;

  return (
    <div className="grid gap-4 md:grid-cols-3 md:gap-6">
      <InclusionsCard inclusions={inclusions} sectionScrollClass={sectionScrollClass} />
      <ExclusionsCard exclusions={exclusions} sectionScrollClass={sectionScrollClass} />
      <WhyTravelersLoveCard highlights={highlights} reviewCards={reviewCards} />
    </div>
  );
}
