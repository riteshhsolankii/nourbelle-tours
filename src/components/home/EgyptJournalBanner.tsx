import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  thumbnails: readonly { src: string; alt: string }[];
};

export function EgyptJournalBanner({ title, subtitle, ctaLabel, ctaHref, thumbnails }: Props) {
  return (
    <section className="w-full bg-[#F2ECE1]">
      <div className="mx-auto grid w-full max-w-[1390px] grid-cols-1 gap-6 px-4 py-8 sm:px-5 sm:py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-10">
        <h2 className="font-heading text-xl font-bold leading-tight text-[#0A0909] md:text-2xl lg:text-3xl">{title}</h2>
        <div>
          <p className="text-sm leading-relaxed text-[#0A0909]/70">{subtitle}</p>
          <Link
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-[#B98B3E] transition hover:text-[#a67a34]"
          >
            {ctaLabel}
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <div className="flex shrink-0 gap-3 sm:gap-4">
          {thumbnails.map((thumb) => (
            <div key={thumb.src} className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl sm:w-28 md:w-32">
              <Image src={thumb.src} alt={thumb.alt} fill className="object-cover" sizes="128px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
