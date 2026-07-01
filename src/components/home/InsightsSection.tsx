import Image from "next/image";
import Link from "next/link";

type InsightCard = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

type Props = {
  title: string;
  exploreHref: string;
  exploreLabel: string;
  cards: readonly InsightCard[];
};

function ArrowRight() {
  return (
    <svg className="hidden md:block" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
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

export function InsightsSection({ title, exploreHref, exploreLabel, cards }: Props) {
  return (
    <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="px-4 sm:px-5 mx-auto max-w-[1390px]">
        <div className="flex gap-3 sm:gap-6 flex-row items-center justify-between">
          <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
            {title}
          </h2>
          <Link
            href={exploreHref}
            className="inline-flex w-fit items-center gap-2 rounded-full font-heading border border-[#0A090926] bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs md:text-sm lg:text-base font-semibold text-[#0A0909] transition hover:border-[#41736D] hover:text-[#41736D]">
            {exploreLabel}
            <ArrowRight />
          </Link>
        </div>
        <ul className="mt-4 md:mt-6 lg:mt-8 grid gap-3 md:gap-4 lg:gap-5 grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <li key={card.id} className={idx > 1 ? "hidden lg:block" : ""}>
              <article className="flex h-full flex-col rounded-[10px] md:rounded-[20px] md:border border-[#0A090926] md:p-4">
                <Link href={card.href} className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-zinc-100">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                 <h3 className="mt-4 text-sm md:text-base lg:text-xl font-bold leading-[1.2] text-[#0A0909] transition hover:underline decoration-1 underline-offset-[5px] min-h-[2.4em]">
  {card.title}
</h3>
                </Link>
                <p className="mt-1.5 md:mt-3 text-[11px] sm:text-xs md:text-sm leading-relaxed text-[#0A0909]">{card.excerpt}</p>
                <div className="mt-1.5 md:mt-4">
                  <Link
                    href={card.href}
                    className={
                      "inline-flex items-center md:gap-2 underline underline-offset-2 md:no-underline md:rounded-full md:px-4 md:py-2.5 text-xs md:text-sm font-heading md:font-semibold transition md:border border-[#0A0909] text-[#0A0909] hover:border-[#41736D] hover:text-white hover:bg-[#365e59]"}>
                    Read Post <span className="md:hidden">...</span>
                    <ArrowRight />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
