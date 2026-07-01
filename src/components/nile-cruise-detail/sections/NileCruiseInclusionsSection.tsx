"use client";

import { CheckIcon, CrossIcon } from "@/components/nile-cruise-detail/NileCruiseDetailIcons";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";

type Props = {
  detail: TourPackagePageDetail;
  sectionScrollClass: string;
};

export function NileCruiseInclusionsSection({ detail, sectionScrollClass }: Props) {
  return (
    <section id="nile-inclusions" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10`}>
      <div className="rounded-2xl bg-[#0A09090D] p-4 sm:p-6 md:p-10">
        <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Inclusions</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="rounded-xl bg-white p-5 md:p-6">
            <h3 className="font-heading text-base sm:text-lg font-semibold text-[#0A0909]">What's Included</h3>
            <ul className="mt-4 space-y-3">
              {detail.inclusions.map((line) => (
                <li key={line} className="flex gap-2 sm:gap-3 items-start text-xs sm:text-sm text-[#0A0909]">
                  <CheckIcon />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white p-5 md:p-6">
            <h3 className="font-heading text-base sm:text-lg font-semibold text-[#0A0909]">What's Not Included</h3>
            <ul className="mt-4 space-y-3">
              {(detail.exclusions ?? []).map((line) => (
                <li key={line} className="flex gap-2 sm:gap-3 items-start text-xs sm:text-sm text-[#0A0909]">
                  <CrossIcon />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
