import Image from "next/image";
import Link from "next/link";
import { travelAgentsWhatWeOffer } from "@/data/travel-agents-page";

function CheckIcon() {
  return (
    <svg className="mt-0.5 size-4 shrink-0 text-[#41736D]" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.5 4.5L6.5 11.5L3 8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TravelAgentsWhatWeOfferSection() {
  const { title, cards } = travelAgentsWhatWeOffer;

  return (
    <section className="bg-[#FAFAFA] py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="px-4 sm:px-5 mx-auto max-w-[1390px]">
        <h2 className="text-center font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 md:mt-10 md:grid-cols-2 md:gap-8 lg:mt-12 lg:gap-10 max-w-4xl mx-auto">
          {cards.map((card) => {
            return (
              <article
                key={card.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#0A090926] bg-white sm:p-4"
              >
                <div className="relative aspect-[16/10] w-full shrink-0 rounded-[15px]">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    className="object-cover rounded-[15px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3 sm:pt-4">
                  <h3 className="font-heading text-base sm:text-lg font-bold text-[#0A0909] md:text-xl">{card.title}</h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {card.bullets.map((line) => (
                      <li key={line} className="flex gap-2.5 text-xs sm:text-sm leading-snug text-[#0A0909]">
                        <CheckIcon />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 md:mt-6">
                    <Link
                      href={card.ctaHref}
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition md:px-6 md:py-3 border border-[#0A090926] bg-white text-[#0A0909] hover:bg-[#41736D] hover:text-white",
                      ].join(" ")}
                    >
                      {card.ctaLabel}
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
