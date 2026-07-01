"use client";

import { ReviewBadgeIcon } from "@/components/nile-cruise-detail/NileCruiseDetailIcons";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";

type Props = {
  detail: TourPackagePageDetail;
  sectionScrollClass: string;
};

export function NileCruiseReviewsSection({ detail, sectionScrollClass }: Props) {
  return (
    <section id="nile-reviews" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10 md:mt-12`}>
      <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Reviews</h2>
      <p className="mt-2 text-xs sm:text-sm text-[#0A0909]/75">{detail.reviews}</p>
      <div className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2">
        {(detail.reviewCards ?? []).map((review, idx) => (
          <article key={`${review.author}-${idx}`} className="rounded-2xl border border-[#0A09091A] bg-white p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <ReviewBadgeIcon />
                <p className="font-heading text-sm sm:text-base font-bold text-[#0A0909]">{review.title}</p>
              </div>
              <div className="flex items-center gap-1 text-[#35635E]">
                {Array.from({ length: review.rating ?? 5 }, (_, i) => (
                  <svg key={i} className="size-3 shrink-0 fill-current md:size-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.65925 0.23957C5.68697 0.168714 5.73417 0.108101 5.79484 0.06544C5.85552 0.0227793 5.92693 0 6 0C6.07306 0 6.14448 0.0227793 6.20515 0.06544C6.26583 0.108101 6.31303 0.168714 6.34074 0.23957L7.73321 3.74977C7.75927 3.81546 7.80212 3.87233 7.85704 3.91413C7.91195 3.95594 7.97681 3.98105 8.04447 3.98672L11.6603 4.29028C11.9873 4.31775 12.1196 4.74563 11.8706 4.96883L9.11584 7.44267C9.06438 7.48881 9.02602 7.54892 9.00499 7.61639C8.98395 7.68387 8.98104 7.75611 8.99658 7.82521L9.83862 11.5236C9.85554 11.5978 9.8511 11.6756 9.82587 11.7471C9.80064 11.8187 9.75573 11.8808 9.69684 11.9257C9.63794 11.9705 9.56769 11.996 9.49495 11.999C9.42222 12.002 9.35027 11.9824 9.28818 11.9425L6.19199 9.96114C6.13418 9.92412 6.06775 9.90453 6 9.90453C5.93225 9.90453 5.86581 9.92412 5.808 9.96114L2.71181 11.9432C2.64973 11.9831 2.57778 12.0027 2.50504 11.9997C2.43231 11.9967 2.36206 11.9712 2.30316 11.9263C2.24426 11.8815 2.19936 11.8194 2.17412 11.7478C2.14889 11.6763 2.14445 11.5985 2.16138 11.5243L3.00341 7.82521C3.01903 7.75612 3.01616 7.68385 2.99512 7.61636C2.97407 7.54886 2.93568 7.48876 2.88415 7.44267L0.129361 4.96883C0.0738871 4.91927 0.0336949 4.85357 0.0138747 4.78005C-0.00594558 4.70652 -0.00450214 4.62849 0.0180221 4.55583C0.0405464 4.48317 0.0831381 4.41915 0.140403 4.37188C0.197668 4.3246 0.267031 4.29621 0.339705 4.29028L3.95553 3.98672C4.02319 3.98105 4.08804 3.95594 4.14296 3.91413C4.19787 3.87233 4.24072 3.81546 4.26679 3.74977L5.65925 0.23957Z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{review.body}</p>
            <p className="mt-4 text-[11px] tracking-[0.2em] text-[#0A0909]/45">- {review.author}</p>
            <p className="mt-1 text-[11px] text-[#0A0909]/45">{review.date}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="inline-flex h-9 sm:h-11 cursor-pointer items-center gap-2 rounded-full bg-[#35635E] px-5 font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#2c5450]"
        >
          More reviews
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
