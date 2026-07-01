import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { PriceInfoCard } from "@/components/common/PriceInfoCard";
import type { GlobalPageBannerContent } from "@/types/site";

type Props = GlobalPageBannerContent;

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

export function GlobalPageBanner({
  breadcrumbs,
  title,
  description,
  backgroundImage,
  ctaText,
  ctaLink,
  priceCard,
}: Props) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/20">
      <Image
        src={backgroundImage.src}
        alt={backgroundImage.alt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(270deg,#0A09094D,#0A0909)]" aria-hidden />
      <div
        className={[
          "relative mx-auto grid w-full max-w-[1390px] gap-8 px-4 pt-8 pb-12 md:pb-16 sm:px-5 min-h-[270px] md:min-h-[320px] lg:min-h-[380px] xl:min-h-[460px]",
          priceCard ? "lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="max-w-[500px] text-white">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="mt-8 md:mt-12 leading-tight font-bold tracking-tight text-base md:text-xl lg:text-2xl xl:text-4xl">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed font-light text-white md:text-base">
            {description}
          </p>
          <Link
            href={ctaLink}
            className="mt-6 inline-flex items-center gap-2 font-heading rounded-full bg-white text-xs px-4 py-2 sm:text-sm font-semibold text-[#0A0909] shadow-sm ring-1 ring-[#0A090926] lg:bg-[#41736D] lg:px-6 lg:py-4 lg:text-sm lg:text-white lg:ring-0 lg:shadow-none transition lg:hover:bg-[#365e59]"
          >
            {ctaText}
             <span className="hidden lg:inline-flex">
                  <ArrowRight />
                </span>
          </Link>
        </div>
        {priceCard ?
          <div className="justify-self-start lg:justify-self-end">
            <PriceInfoCard {...priceCard} />
          </div>
        : null}
      </div>
    </section>
  );
}
