import Image from "next/image";
import Link from "next/link";
import type { TourReviewsContent } from "@/types/reviews";

type About = {
  title: string;
  paragraphs: readonly string[];
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
};

type Props = {
  about: About;
  reviewsContent: TourReviewsContent;
};

/** Home-only column title; tour pages use `headline` from JSON in `TourReviewsCarouselSection`. */
const HOME_REVIEWS_TITLE = "Traveller's Reviews";

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

function ChevronUp() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-[#0A0909]"
    >
      <path
        d="M4.66675 10L8.00008 6.66667L11.3334 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5 text-[#41736D]"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className={["size-3 md:size-4 shrink-0",
            i < rating ? "fill-current" : "fill-zinc-200 text-zinc-200",
          ].join(" ")} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.65925 0.23957C5.68697 0.168714 5.73417 0.108101 5.79484 0.06544C5.85552 0.0227793 5.92693 0 6 0C6.07306 0 6.14448 0.0227793 6.20515 0.06544C6.26583 0.108101 6.31303 0.168714 6.34074 0.23957L7.73321 3.74977C7.75927 3.81546 7.80212 3.87233 7.85704 3.91413C7.91195 3.95594 7.97681 3.98105 8.04447 3.98672L11.6603 4.29028C11.9873 4.31775 12.1196 4.74563 11.8706 4.96883L9.11584 7.44267C9.06438 7.48881 9.02602 7.54892 9.00499 7.61639C8.98395 7.68387 8.98104 7.75611 8.99658 7.82521L9.83862 11.5236C9.85554 11.5978 9.8511 11.6756 9.82587 11.7471C9.80064 11.8187 9.75573 11.8808 9.69684 11.9257C9.63794 11.9705 9.56769 11.996 9.49495 11.999C9.42222 12.002 9.35027 11.9824 9.28818 11.9425L6.19199 9.96114C6.13418 9.92412 6.06775 9.90453 6 9.90453C5.93225 9.90453 5.86581 9.92412 5.808 9.96114L2.71181 11.9432C2.64973 11.9831 2.57778 12.0027 2.50504 11.9997C2.43231 11.9967 2.36206 11.9712 2.30316 11.9263C2.24426 11.8815 2.19936 11.8194 2.17412 11.7478C2.14889 11.6763 2.14445 11.5985 2.16138 11.5243L3.00341 7.82521C3.01903 7.75612 3.01616 7.68385 2.99512 7.61636C2.97407 7.54886 2.93568 7.48876 2.88415 7.44267L0.129361 4.96883C0.0738871 4.91927 0.0336949 4.85357 0.0138747 4.78005C-0.00594558 4.70652 -0.00450214 4.62849 0.0180221 4.55583C0.0405464 4.48317 0.0831381 4.41915 0.140403 4.37188C0.197668 4.3246 0.267031 4.29621 0.339705 4.29028L3.95553 3.98672C4.02319 3.98105 4.08804 3.95594 4.14296 3.91413C4.19787 3.87233 4.24072 3.81546 4.26679 3.74977L5.65925 0.23957Z"/>
</svg>
      ))}
    </div>
  );
}

/** TripAdvisor-style accent badge (decorative; links to your TripAdvisor listing). */
function TripAdvisorBadge({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/badge shrink-0 outline-none ring-0 focus-visible:outline-none items-center gap-1.5 hidden lg:flex"
      aria-label="View Nourbelle Tours on TripAdvisor"
    >
     <img src="/trip-adviser.png" alt="TripAdvisor badge" className="h-10 w-auto object-contain group-hover/badge:brightness-95" 
      loading="lazy"
      decoding="async"/>
      <h5 className="text-[#0A0909] text-sm font-semibold">Travellers’ Choice Winner</h5>
    </a>
  );
}

export function AboutReviewsSection({ about, reviewsContent }: Props) {
  const { eyebrow, tripAdvisorHref, reviews, ctaLabel, ctaHref } = reviewsContent;
  return (
    <section className="w-full bg-[#FAFAFA] sm:bg-transparent sm:bg-[linear-gradient(180deg,#FAFAFA_0%,rgba(250,250,250,0)_100%)] pb-8 sm:pb-0 pt-8 sm:pt-10 md:pt-12 lg:pt-16 xl:pt-20">
      <div className="mx-auto grid max-w-[1390px] px-4 sm:px-5 lg:grid-cols-2 xl:grid-cols-[45%_55%] xl:items-start">
        <div className="lg:pr-5 xl:pr-8">
          <details
            open
            className="group rounded-[10px] border border-[#0A090926] bg-white p-4 lg:border-0 lg:bg-transparent lg:p-0"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 lg:pointer-events-none">
              <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">{about.title}</h2>
              <span className="transition-transform group-open:rotate-0 rotate-180 lg:hidden">
                <ChevronUp />
              </span>
            </summary>
            <div className="mt-2 lg:mt-1 sm:mt-2 md:mt-3 lg:space-y-5">
              <div className="space-y-2 lg:space-y-4 text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed text-[#0A0909]/80">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="relative mt-4 lg:mt-0 overflow-hidden rounded-xl lg:rounded-2xl border-0 lg:border-3 lg:border-white">
                <Image
                  src={about.imageSrc}
                  alt={about.imageAlt}
                  width={720}
                  height={480}
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <Link
                href={about.ctaHref}
                className="mt-3 md:mt-4 lg:mt-6 inline-flex items-center gap-2 font-heading rounded-full bg-white px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold text-[#0A0909] shadow-sm ring-1 ring-[#0A090926] lg:bg-[#41736D] lg:px-6 lg:py-4 lg:text-sm lg:text-white lg:ring-0 lg:shadow-none transition lg:hover:bg-[#365e59]"
              >
                {about.ctaLabel}
                <span className="hidden lg:inline-flex">
                  <ArrowRight />
                </span>
              </Link>
            </div>
          </details>
        </div>

        <div className="pt-7 lg:pt-0 lg:pl-5 xl:pl-8">
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-4">
            {/* <h3 className="font-bold tracking-tight text-[#0A0909] text-xl xl:text-2xl">{HOME_REVIEWS_TITLE}</h3> */}
            {eyebrow ? (
              <p className="max-w-xl text-xs uppercase leading-snug tracking-[0.16em] text-[#0A090980] md:text-sm">
                {eyebrow}
              </p>
            ) : null}
            <div className="flex justify-end">
              <TripAdvisorBadge href={tripAdvisorHref} />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 lg:hidden">
            <h3 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl">{HOME_REVIEWS_TITLE}</h3>
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full border border-[#0A09091A] bg-white px-4 py-2 text-[11px] font-semibold text-[#0A0909] sm:px-5 sm:py-2.5 sm:text-xs md:text-sm">
              {ctaLabel}
            </Link>
          </div>
          <ul className="mt-4 grid gap-2.5 md:gap-4 lg:gap-5 grid-cols-2">
            {reviews.map((r, index) => (
              <li key={r.id} className={index > 1 ? "hidden lg:block" : ""}>
                <article className="flex h-full flex-col rounded-[10px] md:rounded-2xl border border-[#0A090926] bg-white p-4 md:p-5">
                 <div className="flex justify-between items-center">
                   <h3 className="hidden sm:block font-heading text-sm md:text-base font-semibold text-[#0A0909]">
                    {r.title}
                  </h3>
                  <div className="">
                    <StarRow rating={r.rating} />
                  </div>
                 </div>
                  <p className="mt-2 sm:mt-4 flex-1 text-[10px] md:text-sm leading-relaxed text-[#0A0909]">
                    {r.quote}
                  </p>
                  <p className="mt-3 md:mt-5 text-[10px] md:text-xs font-semibold uppercase tracking-wide text-[#0A090980]">
                    — {r.author}
                  </p>
                </article>
              </li>
            ))}
          </ul>
          <Link
            href={ctaHref}
            className="mt-8 hidden items-center gap-2 rounded-full font-heading bg-[#41736D] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#365e59] lg:inline-flex"
          >
            {ctaLabel}
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
