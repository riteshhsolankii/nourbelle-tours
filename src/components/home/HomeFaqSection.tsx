"use client";

import Link from "next/link";
import { FaqAccordion, type FaqAccordionItem } from "@/components/common/FaqAccordion";

type Props = {
  title: string;
  items: readonly FaqAccordionItem[];
  ctaLabel: string;
  ctaHref: string;
};

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeFaqSection({ title, items, ctaLabel, ctaHref }: Props) {
  return (
    <section className="w-full bg-[#FAFAFA] sm:bg-transparent sm:bg-[linear-gradient(180deg,#FAFAFA_0%,rgba(250,250,250,0)_100%)] py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <div className="flex flex-row items-center justify-between gap-3 sm:gap-6 md:justify-center">
          <h2 className="text-left font-heading text-base font-bold tracking-tight text-[#0A0909] sm:text-center md:text-xl lg:text-2xl xl:text-4xl">
            {title}
          </h2>
          <Link
            href={ctaHref}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0A090926] bg-white px-4 py-2 font-heading text-xs font-semibold text-[#0A0909] transition hover:border-[#41736D] hover:text-[#41736D] sm:px-5 sm:py-2.5 md:hidden md:text-sm lg:text-base"
          >
            {ctaLabel}
          </Link>
        </div>

        <FaqAccordion items={items} className="mx-auto mt-3 max-w-4xl sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10" />

        <div className="mt-9 hidden justify-center md:flex">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-[#41736D] px-6 py-4 font-heading text-sm font-semibold text-white transition hover:bg-[#365e59]"
          >
            {ctaLabel}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
