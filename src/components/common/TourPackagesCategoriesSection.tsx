import Image from "next/image";
import Link from "next/link";

type CategoryCard = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

type Props = {
  title: string;
  cards: readonly CategoryCard[];
  /** Text on each card pill (e.g. “View Packages” vs “View Tours”). */
  cardCtaLabel?: string;
  ctaLabel: string;
  ctaHref: string;
};

function ArrowRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 7.09961H9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 3.59961L9.5 7.09961L6 10.5996"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TourPackagesCategoriesSection({
  title,
  cards,
  cardCtaLabel = "View Packages",
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-[1390px] px-4 sm:px-5 py-8 sm:py-10 md:py-14 lg:py-20 bg-[#FAFAFA]">
      <div className="flex gap-3 sm:gap-6 flex-row items-center justify-between">
        <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>
      </div>

      <ul className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 grid gap-2.5 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.title}>
            <Link
              href={card.href}
              className="group flex flex-col rounded-[10px] md:rounded-[20px] border border-[#0A090926] bg-white md:p-2.5 lg:p-3.5 transition hover:border-[#41736D]/35 hover:shadow-[0_4px_20px_rgba(65,115,109,0.12)]"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px] md:rounded-[20px] bg-zinc-100">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-[#0A0909B2]/20 to-[#0A0909]"
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-3 md:p-4 lg:p-5">
                  <h3 className="font-heading text-xs md:text-base lg:text-xl xl:text-[22px] font-bold text-white">
                    {card.title}
                  </h3>
                  <span className="mt-2 inline-flex gap-2 items-center rounded-full bg-white font-heading px-6 py-2.5 text-[12px] sm:text-sm font-semibold text-[#0A0909] transition group-hover:text-[#41736D]">
                    {cardCtaLabel}
                         <span className="hidden lg:inline-flex">
                  <ArrowRight />
                </span>
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 md:mt-10 flex justify-center">
        <Link
          href={ctaHref}
          className="inline-flex items-center gap-2 font-heading rounded-full bg-white px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-[#0A0909] shadow-sm ring-1 ring-[#0A090926] lg:bg-[#41736D] lg:px-6 lg:py-4 lg:text-sm lg:text-white lg:ring-0 lg:shadow-none transition lg:hover:bg-[#365e59]"
        >
          {ctaLabel}
                         <span className="hidden lg:inline-flex">
                  <ArrowRight />
                </span>
        </Link>
      </div>
    </section>
  );
}
