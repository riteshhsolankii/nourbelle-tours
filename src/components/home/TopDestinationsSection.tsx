import Image from "next/image";
import Link from "next/link";

export type TopDestinationCard = {
  name: string;
  tagline: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

type Props = {
  title: string;
  exploreHref: string;
  exploreLabel: string;
  destinations: readonly TopDestinationCard[];
};

export function TopDestinationsSection({
  title,
  exploreHref,
  exploreLabel,
  destinations,
}: Props) {
  return (
    <section className="mx-auto w-full max-w-[1390px] px-4 sm:px-5 pt-8 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="flex gap-3 sm:gap-6 flex-row items-center justify-between">
        <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>
        <Link
          href={exploreHref}
          className="inline-flex w-fit items-center gap-2 rounded-full font-heading border border-[#0A090926] bg-white px-4 py-2 sm:px-5 sm:py-2.5 text-xs md:text-sm lg:text-base font-semibold text-[#0A0909] transition hover:border-[#41736D] hover:text-[#41736D]"
        >
          {exploreLabel}
           <span aria-hidden className="hidden sm:block"><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 7.09961H9.5" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg></span>
        </Link>
      </div>
      <ul className="mt-3 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 grid gap-2.5 md:gap-4 lg:gap-6 grid-cols-3 lg:grid-cols-4">
        {destinations.map((d, index) => (
          <li key={d.href} className={index > 2 ? "hidden lg:block" : ""}>
            <Link
              href={d.href}
              className="group flex flex-col rounded-[10px] md:rounded-[20px] border border-[#0A090926] bg-white md:p-2.5 lg:p-3.5 transition hover:border-[#41736D]/35 hover:shadow-[0_4px_20px_rgba(65,115,109,0.12)]"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[10px] md:rounded-[20px] bg-zinc-100 md:aspect-[4/3]">
                <Image
                  src={d.imageSrc}
                  alt={d.imageAlt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0A0909B2] to-[#0A090900] "
                  aria-hidden
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-3 md:p-4 lg:p-5 text-center">
                  <h3 className="font-heading text-xs md:text-base lg:text-xl xl:text-[22px] font-bold uppercase tracking-[0.12em] text-white">
                    {d.name}
                  </h3>
                  <p className="max-w-[14rem] hidden md:block text-xs lg:text-sm font-normal leading-snug text-white">
                    {d.tagline}
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
