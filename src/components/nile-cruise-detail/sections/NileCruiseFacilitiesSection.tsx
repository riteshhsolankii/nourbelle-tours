"use client";

import { CheckIcon } from "@/components/nile-cruise-detail/NileCruiseDetailIcons";
import type { NileCruiseFacilitiesContent } from "@/types/tour-package-detail";

type Props = {
  content: NileCruiseFacilitiesContent;
  sectionScrollClass: string;
};

export function NileCruiseFacilitiesSection({ content, sectionScrollClass }: Props) {
  return (
    <section id="nile-facilities" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10`}>
      <h2 className="font-heading text-xl font-bold text-[#0A0909] md:text-2xl">Cruise Facilities</h2>
      <div className="mt-5 rounded-2xl border border-[#0A090926] bg-[#F8F8F8] p-4 sm:p-8 md:p-10">
        <h3 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">{content.monumentalTitle}</h3>
        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{content.monumentalIntro}</p>
        <div className="mt-4 sm:mt-8 space-y-4 sm:space-y-6">
          <div className="rounded-xl border border-[#0A09091A] bg-white p-4 sm:p-6">
            <h4 className="font-heading text-base font-bold text-[#0A0909] md:text-lg">{content.accommodationTitle}</h4>
            <ul className="mt-4 space-y-2.5">
              {content.accommodationBullets.map((line) => (
                <li key={line} className="flex gap-2 sm:gap-3 items-start text-xs sm:text-sm text-[#0A0909]">
                  <CheckIcon />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{content.accommodationNarrative}</p>
          </div>

          <div className="rounded-xl border border-[#0A09091A] bg-white p-4 sm:p-6">
            <h4 className="font-heading text-base font-bold text-[#0A0909] md:text-lg">{content.diningTitle}</h4>
            <div className="mt-4 divide-y divide-[#0A09091A]">
              {content.diningSections.map((block) => (
                <div key={block.title} className="py-4 first:pt-0 last:pb-0">
                  <p className="font-heading text-xs sm:text-sm font-semibold text-[#0A0909]">{block.title}</p>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{block.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
