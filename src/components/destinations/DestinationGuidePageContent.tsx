"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { RequestCustomTourForm } from "@/components/common/RequestCustomTourForm";
import { TourPackageCard } from "@/components/common/TourPackageCard";
import { topBar } from "@/data/site-static";
import type {
  DestinationGuideActivityCard,
  DestinationGuideDurationCard,
  DestinationGuideHighlightTag,
  DestinationGuidePage,
} from "@/types/destination-guide";

type Props = {
  guide: DestinationGuidePage;
  customizeMinFrom: string;
};

function ArrowRight({ className }: { className?: string }) {
  return (
    <span className="hidden sm:block">
      <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    </span>
  );
}

function FeatureCheckIcon() {
  return (
    <span className="mt-0.5 flex shrink-0 items-center justify-center" aria-hidden>
      <svg className="size-3 sm:size-4 shrink-0 text-[##0A0909]" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13.5 4.5L6.5 11.5L3 8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    </span>
  );
}

function HighlightTagIcon({ icon }: { icon: DestinationGuideHighlightTag["icon"] }) {
  const common = "stroke-[#41736D]";
  switch (icon) {
    case "pyramids":
      return (
       <svg className="size-4 sm:size-5" viewBox="0 0 25 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.1681 9.74935H2.91406L6.91864 2.96606L9.1558 5.06026L9.96199 5.81362L13.3511 8.98514L14.1681 9.74935Z" stroke="#0A0909" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M6.92042 2.96606L2.91585 9.74935H0.75L6.92042 2.96606Z" stroke="#0A0909" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M20.1949 8.98574H13.3578L9.96875 5.81421L12.5625 0.75L17.4353 6.00798L17.8089 6.41255L20.1949 8.98574Z" stroke="#0A0909" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12.5601 0.75L9.96634 5.81421L9.16016 5.06086L12.5601 0.75Z" stroke="#0A0909" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M23.7844 8.98506H20.1829L17.7969 6.41188L19.079 3.90845L23.7844 8.98506Z" stroke="#0A0909" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M19.0894 3.90845L17.8072 6.41188L17.4336 6.0073L19.0894 3.90845Z" stroke="#0A0909" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
    case "museum":
      return (
        <svg className="size-4 sm:size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_777_26325)">
            <path d="M1.66797 18.3335H18.3346" stroke="#0A0909" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3.33594 3.0305C3.33594 3.0305 6.2526 1.66675 10.0026 1.66675C13.7526 1.66675 16.6693 3.0305 16.6693 3.0305V5.41675H3.33594V3.0305Z" stroke="#0A0909" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M4.16797 5.41675V15.8334M7.08464 5.41675V15.8334M10.0013 5.41675V15.8334M12.918 5.41675V15.8334M15.8346 5.41675V15.8334" stroke="#0A0909" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.91797 15.8335H17.0846V18.3335H2.91797V15.8335Z" stroke="#0A0909" strokeWidth="1.5" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_777_26325">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
    case "history":
      return (
        <svg className="size-4 sm:size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.83333 15.8334L7.30667 5.52258C7.4025 4.84841 7.45083 4.51175 7.58417 4.20341C7.7175 3.89508 7.93083 3.62925 8.3575 3.09925L8.82167 2.52091C9.37667 1.95175 9.655 1.66675 10 1.66675C10.345 1.66675 10.6233 1.95175 11.1783 2.52091L11.6425 3.09925C12.0683 3.62925 12.2817 3.89508 12.4158 4.20341C12.5492 4.51175 12.5975 4.84841 12.6933 5.52258L14.1667 15.8334M2.5 18.3334H17.5M16.6667 18.3334L16.4842 18.0601C15.7575 16.9701 15.3942 16.4251 14.8417 16.1292C14.2892 15.8334 13.6333 15.8334 12.3242 15.8334H7.675C6.365 15.8334 5.71 15.8334 5.1575 16.1292C4.605 16.4251 4.24083 16.9701 3.515 18.0601L3.33333 18.3334M7.5 5.00008H12.5M10 15.8334V10.8334" stroke="#0A0909" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg className="size-4 sm:size-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_776_19880)">
            <path d="M12.5026 10H8.33594M12.5026 6.66667H8.33594M15.8359 14.1667V4.16667C15.8359 3.72464 15.6603 3.30072 15.3478 2.98816C15.0352 2.67559 14.6113 2.5 14.1693 2.5H3.33594" stroke="#0A0909" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.66797 17.5H16.668C17.11 17.5 17.5339 17.3244 17.8465 17.0118C18.159 16.6993 18.3346 16.2754 18.3346 15.8333V15C18.3346 14.779 18.2468 14.567 18.0906 14.4107C17.9343 14.2545 17.7223 14.1667 17.5013 14.1667H9.16797C8.94695 14.1667 8.73499 14.2545 8.57871 14.4107C8.42243 14.567 8.33464 14.779 8.33464 15V15.8333C8.33464 16.2754 8.15904 16.6993 7.84648 17.0118C7.53392 17.3244 7.11 17.5 6.66797 17.5ZM6.66797 17.5C6.22594 17.5 5.80202 17.3244 5.48946 17.0118C5.1769 16.6993 5.0013 16.2754 5.0013 15.8333V4.16667C5.0013 3.72464 4.82571 3.30072 4.51315 2.98816C4.20059 2.67559 3.77666 2.5 3.33464 2.5C2.89261 2.5 2.46868 2.67559 2.15612 2.98816C1.84356 3.30072 1.66797 3.72464 1.66797 4.16667V5.83333C1.66797 6.05435 1.75577 6.26631 1.91205 6.42259C2.06833 6.57887 2.28029 6.66667 2.5013 6.66667H5.0013" stroke="#0A0909" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_776_19880">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
      );
  }
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-3xl">{children}</h2>
  );
}

function ViewAllButton({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-6 sm:mt-8 flex justify-center md:mt-10">
      <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#41736D] px-6 py-3 font-heading text-xs font-semibold text-white transition hover:bg-[#365e59] sm:px-8 sm:py-3.5 sm:text-sm"
      >
        {label}
        <ArrowRight />
      </Link>
    </div>
  );
}

function ActivityCard({ card }: { card: DestinationGuideActivityCard }) {
  return (
    <article className="flex h-full flex-col overflow-hidden bg-white">
      <Link href={card.learnMoreHref} className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className="object-cover transition duration-300 hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        <h3 className="font-heading text-sm sm:text-base font-bold text-[#0A0909] leading-3.5 sm:leading-5 md:text-lg">{card.title}</h3>
        <ul className="mt-3 flex-1 space-y-2">
          {card.highlights.map((line) => (
            <li key={line} className="flex gap-1 sm:gap-2 items-start text-xs leading-relaxed text-[#0A0909] sm:text-sm">
              <FeatureCheckIcon />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col sm:flex-row flex-wrap sm:items-center gap-1.5 sm:gap-3 pt-3 sm:pt-5">
          <Link
            href={card.learnMoreHref}
            className="inline-flex sm:h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#0A090926] bg-white px-3 py-3 text-center font-heading text-xs font-semibold text-[#0A0909] transition hover:bg-[#0A0909] hover:text-white"
          >
            Learn More
            <ArrowRight />
          </Link>
          <Link
            href={card.bookNowHref}
            className="inline-flex sm:h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#41736D] px-3 py-3 font-heading text-xs font-semibold text-white transition hover:bg-[#365e59] sm:text-sm">
            Book Now
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

function DurationCard({ card }: { card: DestinationGuideDurationCard }) {
  return (
    <article className="flex h-full flex-col bg-white">
      <Link href={card.learnMoreHref} className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          fill
          className="object-cover transition duration-300 hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </Link>
      <div className="flex flex-1 flex-col pt-3 sm:pt-4">
        <h3 className="font-heading text-sm sm:text-base font-bold text-[#0A0909] leading-3.5 sm:leading-5 md:text-lg">{card.durationLabel}</h3>
        <ul className="mt-3 flex-1 space-y-2 border-t border-[#0A09091A] pt-3">
          {card.highlights.map((line) => (
            <li key={line} className="flex gap-1 sm:gap-2 items-start text-xs leading-relaxed text-[#0A0909] sm:text-sm">
              <FeatureCheckIcon />
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <Link
            href={card.learnMoreHref}
            className="inline-flex w-full sm:w-auto flex-1 items-center justify-center gap-2 rounded-full border border-[#0A090926] bg-white px-3 py-2.5 text-center font-heading text-xs font-semibold text-[#0A0909] transition hover:bg-[#0A0909] hover:text-white">
            Learn More
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

function FaqChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      className={["size-5 shrink-0 text-[#0A0909]/50 transition-transform", open ? "rotate-180 opacity-100" : ""].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M8 9L13 14L18 9" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DestinationGuideFaqSection({ guide }: { guide: DestinationGuidePage }) {
  const { faq } = guide;
  const [openId, setOpenId] = useState(faq.items[0]?.id ?? "");

  return (
    <section className="mt-8 pt-8 sm:mt-10 sm:pt-10 border-t border-[#0A09091A]">
      <SectionHeading>{faq.heading}</SectionHeading>
      <ul className="mt-6 space-y-2 sm:space-y-3">
        {faq.items.map((item) => {
          const open = openId === item.id;
          const panelId = `guide-faq-panel-${item.id}`;
          const buttonId = `guide-faq-button-${item.id}`;
          return (
            <li
              key={item.id}
              className="overflow-hidden rounded-2xl border border-[#0A090926] bg-white px-4 sm:px-5"
            >
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 py-4 text-left sm:py-5"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
              >
                <span className="font-heading text-sm font-bold leading-snug text-[#0A0909] sm:text-base">
                  {item.question}
                </span>
                <FaqChevron open={open} />
              </button>
              {open ?
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="pb-4 sm:pb-5"
                >
                  <p className="text-xs leading-relaxed text-[#0A0909] sm:text-sm">{item.answer}</p>
                </div>
                : null}
            </li>
          );
        })}
      </ul>
      <div className="mt-6 sm:mt-8 flex justify-center md:mt-10">
        <Link
          href={faq.ctaHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#41736D] px-6 py-3 font-heading text-xs font-semibold text-white transition hover:bg-[#365e59] sm:px-8 sm:py-3.5 sm:text-sm"
        >
          {faq.ctaLabel}
          <ArrowRight />
        </Link>
      </div>
    </section>
  );
}

function PlanYourTripBox({ guide }: { guide: DestinationGuidePage }) {
  const { planTrip } = guide;
  return (
    <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(90deg,#ECF0F3_0%,rgba(214,224,230)_100%)] p-5 sm:p-6">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-[url('/insights/blog-cta-bg.svg')] bg-contain bg-[center_107%] bg-no-repeat"
        aria-hidden
      />
      <div>
        <h2 className="font-heading text-lg font-bold text-[#0A0909]">{planTrip.heading}</h2>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{planTrip.intro}</p>
        <ul className="mt-4 space-y-1">
          <li>
            <a
              href={topBar.phoneHref}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#0A0909] hover:text-[#41736D]">
             <svg className="size-4 shrink-0 text-current transition-colors duration-200" viewBox="0 0 15 15" fill="none" aria-hidden="true"><path d="M9.40664 3.125C10.0171 3.2441 10.5781 3.54266 11.0179 3.98246C11.4577 4.42226 11.7563 4.98329 11.8754 5.59375M9.40664 0.625C10.6749 0.765898 11.8576 1.33386 12.7605 2.23563C13.6634 3.1374 14.2329 4.31938 14.3754 5.5875M13.7504 10.575V12.45C13.7511 12.6241 13.7154 12.7964 13.6457 12.9558C13.576 13.1153 13.4737 13.2585 13.3454 13.3762C13.2172 13.4938 13.0657 13.5834 12.9009 13.6392C12.736 13.695 12.5612 13.7157 12.3879 13.7C10.4647 13.491 8.61726 12.8338 6.99414 11.7813C5.48403 10.8217 4.20372 9.54136 3.24414 8.03125C2.18787 6.40075 1.53054 4.54437 1.32539 2.6125C1.30977 2.43967 1.33031 2.26548 1.3857 2.10102C1.44109 1.93656 1.53012 1.78543 1.64711 1.65726C1.76411 1.5291 1.90651 1.42669 2.06525 1.35658C2.224 1.28646 2.3956 1.25016 2.56914 1.25H4.44414C4.74745 1.24701 5.04151 1.35442 5.27149 1.55221C5.50147 1.74999 5.65168 2.02465 5.69414 2.325C5.77327 2.92504 5.92004 3.5142 6.13164 4.08125C6.21573 4.30495 6.23392 4.54807 6.18408 4.7818C6.13423 5.01553 6.01842 5.23007 5.85039 5.4L5.05664 6.19375C5.94636 7.75847 7.24192 9.05403 8.80664 9.94375L9.60039 9.15C9.77032 8.98196 9.98486 8.86616 10.2186 8.81631C10.4523 8.76646 10.6954 8.78466 10.9191 8.86875C11.4862 9.08034 12.0753 9.22711 12.6754 9.30625C12.979 9.34908 13.2563 9.502 13.4545 9.73594C13.6527 9.96987 13.758 10.2685 13.7504 10.575Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              {topBar.phone}
            </a>
          </li>
          <li>
            <a href={topBar.emailHref} className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#0A0909] hover:text-[#41736D]">
             <svg className="size-4 shrink-0 text-current transition-colors duration-200" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 2.5H12.5C13.1875 2.5 13.75 3.0625 13.75 3.75V11.25C13.75 11.9375 13.1875 12.5 12.5 12.5H2.5C1.8125 12.5 1.25 11.9375 1.25 11.25V3.75C1.25 3.0625 1.8125 2.5 2.5 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.75 3.75L7.5 8.125L1.25 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
              {topBar.email}
            </a>
          </li>
        </ul>
        <ul className="mt-4 space-y-2.5">
          {planTrip.bullets.map((item) => (
            <li key={item} className="flex gap-2 text-xs sm:text-sm text-[#0A0909]">
              <FeatureCheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <Link
          href={planTrip.ctaHref}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#0A0909] px-5 py-3 font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#2a2929]">
          {planTrip.ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export function DestinationGuidePageContent({ guide, customizeMinFrom }: Props) {
  return (
    <div className="w-full lg:pb-16 pt-6 sm:pt-8 md:pt-10">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <ScrollRevealSection>
          <header className="mb-6 sm:mb-8">
            <Breadcrumb variant="inline" className="mb-3" items={guide.breadcrumbs} />
            <h1 className="font-heading text-xl font-bold leading-tight tracking-tight text-[#0A0909] sm:text-2xl md:text-3xl lg:text-4xl">
              {guide.title}
            </h1>
          </header>
        </ScrollRevealSection>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start lg:gap-10 xl:gap-12">
          <div className="min-w-0 space-y-4 sm:space-y-6 md:space-y-10">
            <ScrollRevealSection>
              <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl bg-zinc-100 sm:rounded-3xl mb-5">
                <Image
                  src={guide.heroImage.src}
                  alt={guide.heroImage.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                />
              </div>

              <section>
                <SectionHeading>{guide.whyVisit.heading}</SectionHeading>
              <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-4 text-xs ms:text-sm leading-relaxed text-[#0A0909] sm:text-base">
                {guide.whyVisit.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              <ul className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
                {guide.whyVisit.tags.map((tag) => (
                  <li
                    key={tag.label}
                    className="inline-flex items-center gap-2 rounded-full bg-[#0A09090D] px-4 py-3 text-xs text-[#0A0909] sm:px-4 sm:text-sm"
                  >
                    <HighlightTagIcon icon={tag.icon} />
                    {tag.label}
                  </li>
                ))}
              </ul>
              </section>
            </ScrollRevealSection>

            <ScrollRevealSection>
            <section className="mt-8 pt-8 sm:mt-10 sm:pt-10 border-t border-[#0A09091A]">
              <SectionHeading>{guide.thingsToDo.heading}</SectionHeading>
              <div className="mt-4 sm:mt-6 grid items-stretch gap-y-6 gap-x-3 sm:gap-x-4.5 grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                {guide.thingsToDo.cards.map((card, idx) => (
                  <div key={card.title} className={idx > 1 ? "hidden lg:block" : ""}>
                    <ActivityCard card={card} />
                  </div>
                ))}
              </div>
              <ViewAllButton href={guide.thingsToDo.viewAllHref} label={guide.thingsToDo.viewAllLabel} />
            </section>
            </ScrollRevealSection>

            <ScrollRevealSection>
            <section className="mt-8 pt-8 sm:mt-10 sm:pt-10 border-t border-[#0A09091A]">
              <SectionHeading>{guide.bestTours.heading}</SectionHeading>
              <div className="mt-4 sm:mt-6 grid items-stretch gap-y-6 gap-x-3 sm:gap-x-4.5 grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                {guide.bestTours.cards.map((card, idx) => (
                  <div key={card.durationLabel} className={idx > 1 ? "hidden lg:block" : ""}>
                    <DurationCard card={card} />
                  </div>
                ))}
              </div>
              <ViewAllButton href={guide.bestTours.viewAllHref} label={guide.bestTours.viewAllLabel} />
            </section>
            </ScrollRevealSection>

            <ScrollRevealSection>
            <section className="mt-8 pt-8 sm:mt-10 sm:pt-10 border-t border-[#0A09091A]">
              <SectionHeading>{guide.articles.heading}</SectionHeading>
              <div className="mt-4 sm:mt-6 grid items-stretch gap-y-6 gap-x-3 sm:gap-x-4.5 grid-cols-2 md:gap-x-6 lg:grid-cols-3">
                {guide.articles.tours.map((tour, idx) => (
                     <div key={tour.id} className={idx > 1 ? "hidden lg:block" : ""}>
                  <TourPackageCard key={tour.id} tour={tour} variant="guideArticle" />
                  </div>
                ))}
              </div>
              <ViewAllButton href={guide.articles.viewAllHref} label={guide.articles.viewAllLabel} />
            </section>
            </ScrollRevealSection>

            <ScrollRevealSection>
              <DestinationGuideFaqSection guide={guide} />
            </ScrollRevealSection>
          </div>

          <ScrollRevealSection className="flex w-full min-w-0 flex-col gap-8 lg:max-w-none">
            <PlanYourTripBox guide={guide} />
            <RequestCustomTourForm
              customizeMinFrom={customizeMinFrom}
              contextField={{ name: "destinationGuide", value: guide.slug }}
            />
          </ScrollRevealSection>
        </div>
      </div>
    </div>
  );
}
