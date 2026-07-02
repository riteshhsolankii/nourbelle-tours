import Image from "next/image";
import Link from "next/link";
import type { HomePageBannerContent } from "@/lib/home-banner";
import { homeHero } from "@/data/site-static";
import { HomeQuickFactsBar } from "@/components/home/HomeQuickFactsBar";

type Props = Pick<
  HomePageBannerContent,
  | "heroTitle"
  | "heroSubtitle"
  | "heroImageSrc"
  | "heroImageAlt"
  | "primaryCta"
  | "secondaryCta"
  | "quickFacts"
  | "quickFactsButtonLabel"
  | "quickFactsButtonHref"
  | "trustStats"
>;

function UserStatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#B98B3E]" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StarStatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#B98B3E]" aria-hidden>
      <path
        d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeadsetStatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#B98B3E]" aria-hidden>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M19 19v1a2 2 0 0 1-2 2h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function GiftStatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#B98B3E]" aria-hidden>
      <rect x="3" y="9" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <rect x="4" y="13" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9v12M12 9c-1.8 0-3.2-1.2-3.2-3S10.2 3 12 4.5C13.8 3 15.2 4.2 15.2 6S13.8 9 12 9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const STAT_ICONS = [UserStatIcon, StarStatIcon, HeadsetStatIcon, GiftStatIcon];

export function HomeHero({
  heroTitle,
  heroSubtitle,
  heroImageSrc,
  heroImageAlt,
  primaryCta,
  secondaryCta,
  quickFacts,
  quickFactsButtonLabel,
  quickFactsButtonHref,
  trustStats,
}: Props) {
  const imgSrc = heroImageSrc?.trim() || homeHero.backgroundImageSrc;
  const imgAlt = heroImageAlt?.trim() || homeHero.backgroundImageAlt;

  return (
    <section className="relative isolate flex w-full flex-col overflow-visible">
      <div className="relative flex min-h-[540px] w-full flex-col md:min-h-[540px]">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="relative mx-auto flex w-full max-w-[1390px] flex-1 flex-col px-4 sm:px-5 pb-9 pt-10 md:pb-16 md:pt-15">
          <div className="max-w-2xl space-y-3 md:space-y-4">
            <h1 className="font-bold tracking-tight text-white text-2xl lg:text-4xl xl:text-5xl leading-snug">{heroTitle}</h1>
            <p className="max-w-md text-sm text-white/90 md:text-base xl:text-lg">{heroSubtitle}</p>
            {primaryCta || secondaryCta ?
              <div className="flex flex-wrap items-center gap-3 pt-1">
                {primaryCta ?
                  <Link
                    href={primaryCta.href}
                    className="inline-flex h-11 items-center justify-center rounded-full bg-[#B98B3E] px-6 font-heading text-sm font-semibold text-white transition hover:bg-[#a67a34]"
                  >
                    {primaryCta.label}
                  </Link>
                : null}
                {secondaryCta ?
                  <Link
                    href={secondaryCta.href}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/70 px-6 font-heading text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    {secondaryCta.label}
                  </Link>
                : null}
              </div>
            : null}
          </div>
          {quickFacts && quickFacts.length > 0 ?
            <div className="mt-6 w-full md:mt-10">
              <HomeQuickFactsBar
                fields={quickFacts}
                buttonLabel={quickFactsButtonLabel ?? "Search"}
                actionHref={quickFactsButtonHref ?? "/multi-day-egypt-tours"}
              />
            </div>
          : null}
        </div>
      </div>
      {trustStats && trustStats.length > 0 ?
        <div className="w-full bg-[#0A3B37]">
          <div className="mx-auto flex w-full max-w-[1390px] flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3 sm:px-5 sm:py-4 sm:justify-between">
            {trustStats.map((stat, i) => {
              const StatIcon = STAT_ICONS[i % STAT_ICONS.length];
              return (
                <span key={stat} className="inline-flex items-center gap-2.5 text-sm font-bold text-white sm:text-base">
                  <StatIcon />
                  {stat}
                </span>
              );
            })}
          </div>
        </div>
      : null}
    </section>
  );
}
