import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import type { BreadcrumbItem } from "@/types/site";

type PerkIcon = "guide" | "transfer" | "groups" | "support" | "flexible";

function PerkIconGlyph({ icon }: { icon: PerkIcon }) {
  switch (icon) {
    case "guide":
      return (
        <>
          <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M6 19c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "transfer":
      return (
        <>
          <path d="M5 15h14v-3.5l-1.5-3h-11L5 11.5V15z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <circle cx="8" cy="16.5" r="1.3" fill="currentColor" />
          <circle cx="16" cy="16.5" r="1.3" fill="currentColor" />
        </>
      );
    case "groups":
      return (
        <>
          <circle cx="9" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="15" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4.5 18c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4M10.5 18c0-2.2 2-4 4.5-4s4.5 1.8 4.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </>
      );
    case "support":
      return (
        <>
          <path d="M6 13v-1a6 6 0 0 1 12 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="5" y="13" width="3" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
          <rect x="16" y="13" width="3" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
        </>
      );
    case "flexible":
      return (
        <>
          <circle cx="12" cy="12" r="6.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8.5V12l2.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );
  }
}

function PerkItem({ label, icon }: { label: string; icon: PerkIcon }) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2.5 text-center">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="text-[#D9AE6C] drop-shadow-sm" aria-hidden>
        <PerkIconGlyph icon={icon} />
      </svg>
      <span className="whitespace-nowrap text-xs font-semibold text-white sm:text-[13px]">{label}</span>
    </div>
  );
}

const AVATAR_COLORS = ["#41736D", "#B98B3E", "#6E5A8C", "#35635E"];

type Props = {
  breadcrumbs: readonly BreadcrumbItem[];
  title: string;
  subtitle: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
  perks: readonly { label: string; icon: PerkIcon }[];
  quoteCard: {
    title: string;
    subtitle: string;
    avatarInitials: readonly string[];
    extraCount: number;
    ctaLabel: string;
    ctaHref: string;
    note: string;
  };
};

export function MultiDayToursHero({ breadcrumbs, title, subtitle, backgroundImageSrc, backgroundImageAlt, perks, quoteCard }: Props) {
  return (
    <section className="relative isolate flex min-h-[400px] w-full flex-col overflow-hidden">
      <Image src={backgroundImageSrc} alt={backgroundImageAlt} fill priority className="object-cover object-center" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0909]/90 via-[#0A0909]/55 to-[#0A0909]/20" aria-hidden />
      <div className="relative mx-auto flex w-full max-w-[1390px] flex-1 flex-col gap-8 px-4 py-10 sm:px-5 md:flex-row md:items-center md:justify-between md:py-14">
        <div className="min-w-0 flex-1">
          <div className="max-w-xl">
            <Breadcrumb items={breadcrumbs} variant="banner" className="mb-4" />
            <h1 className="font-bold tracking-tight text-white text-2xl leading-tight sm:text-3xl lg:text-4xl">{title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-white/85 sm:text-base">{subtitle}</p>
          </div>
          <div className="mt-8 flex flex-nowrap items-start gap-x-8 overflow-x-auto pb-1">
            {perks.map((perk) => (
              <PerkItem key={perk.label} label={perk.label} icon={perk.icon} />
            ))}
          </div>
        </div>

        <div className="w-full max-w-xs shrink-0 rounded-2xl bg-[#0A3B37] p-5 shadow-xl md:max-w-[280px]">
          <p className="font-heading text-base font-bold text-white">{quoteCard.title}</p>
          <p className="mt-1 text-sm text-white/70">{quoteCard.subtitle}</p>
          <div className="mt-4 flex -space-x-2">
            {quoteCard.avatarInitials.map((initials, i) => (
              <span
                key={`${initials}-${i}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0A3B37] text-[11px] font-bold text-white"
                style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
              >
                {initials}
              </span>
            ))}
            {quoteCard.extraCount > 0 ?
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0A3B37] bg-white text-[11px] font-bold text-[#0A3B37]">
                +{quoteCard.extraCount}
              </span>
            : null}
          </div>
          <Link
            href={quoteCard.ctaHref}
            className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#B98B3E] font-heading text-sm font-semibold text-white transition hover:bg-[#a67a34]"
          >
            {quoteCard.ctaLabel}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <span className="mt-3 flex items-center gap-1.5 text-xs text-[#7FD9A8]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {quoteCard.note}
          </span>
        </div>
      </div>
    </section>
  );
}
