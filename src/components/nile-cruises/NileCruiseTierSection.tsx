import Link from "next/link";
import { NileCruiseTierPackageCard } from "@/components/nile-cruises/NileCruiseTierPackageCard";
import type { NileCruiseTierSection as NileCruiseTierSectionModel } from "@/types/nile-cruises-page";

type Props = {
  section: NileCruiseTierSectionModel;
  /** Surface behind the section (alternate with siblings for rhythm). */
  surfaceClassName?: string;
};

export function NileCruiseTierSection({ section, surfaceClassName = "bg-[#FAFAFA]" }: Props) {
  return (
    <section className={["w-full py-8 sm:py-10 md:py-12 lg:py-16", surfaceClassName].join(" ")}>
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {section.title}
        </h2>
        <ul className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 grid grid-cols-2 gap-[10px] sm:gap-4 md:grid-cols-3 md:gap-6">
          {section.items.map((item) => (
            <li key={`${section.title}-${item.tour.id}`}>
              <NileCruiseTierPackageCard item={item} />
            </li>
          ))}
        </ul>
        <div className="mt-6 sm:mt-8 flex justify-center md:mt-10">
          <Link
            href={section.viewMoreHref}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#41736D] px-6 py-2.5 sm:px-8 sm:py-3 font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#365e59] md:px-10 md:py-4 md:text-base"
          >
            {section.viewMoreLabel}
            <svg className="hidden sm:block" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
