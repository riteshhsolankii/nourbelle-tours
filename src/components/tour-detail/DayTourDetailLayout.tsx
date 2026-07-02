"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { TourPackageCard } from "@/components/common/TourPackageCard";
import { dayTourDetails, multiDayTourDetails } from "@/data/tour-package-details";
import type { TourCard } from "@/types/site";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { FormCheckbox } from "@/components/common/FormCheckbox";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { ContactCtaSection } from "../common/ContactCtaSection";
import { ScrollableSectionNav } from "@/components/common/ScrollableSectionNav";
import { CustomizeTourDatePicker } from "@/components/tour-detail/CustomizeTourDatePicker";
import { PillSelect } from "@/components/common/PillSelect";
import { homeContactCta } from "@/data/site-static";
import {
  SECTION_NAV,
  formatUsd,
  formatUsdFull,
  type DatePriceSort,
  parseDateLabel,
  dayTourItineraryCardTitle,
  dayTourTransportPillText,
  dayTourMealsPillText,
  discountPct,
  scrollToSection,
  ChevronDownIcon,
  HotelIcon,
  MealsIcon,
  VehicleDayTourIcon,
  CheckIcon,
  CrossIcon,
  AudienceIcon,
  ReviewBadgeIcon,
} from "@/components/tour-detail/helpers";

type Props = {
  detail: TourPackagePageDetail;
};

const SIDEBAR_ADULTS_OPTIONS = [
  { value: "1", label: "1 Adult" },
  { value: "2", label: "2 Adults" },
  { value: "3", label: "3 Adults" },
  { value: "4+", label: "4+ Adults" },
];

const SIDEBAR_TRAVEL_DATE_OPTIONS = [
  { value: "", label: "Select date" },
  { value: "Dec 2026", label: "Dec 2026" },
  { value: "Jan 2027", label: "Jan 2027" },
];

const CUSTOMIZE_NATIONALITY_OPTIONS = [
  { value: "", label: "Select your nationality" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Other", label: "Other" },
];

const CUSTOMIZE_PHONE_CODE_OPTIONS = [
  { value: "+1", label: "+1" },
  { value: "+44", label: "+44" },
  { value: "+20", label: "+20" },
];

export function DayTourDetailLayout({ detail }: Props) {
  const [activeSection, setActiveSection] = useState<string>("tour-overview");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  /** Day-by-day accordion: all open by default; each item can toggle independently. */
  const [openItineraryIndexes, setOpenItineraryIndexes] = useState<Set<number>>(
    () => new Set(detail.itinerary.map((_, index) => index)),
  );
  const [travelDateFilter, setTravelDateFilter] = useState<string>("");
  const [dateSort, setDateSort] = useState<DatePriceSort>("startAsc");
  const [openFaqId, setOpenFaqId] = useState<string>(detail.faqItems?.[0]?.id ?? "");
  const [customizeFromDate, setCustomizeFromDate] = useState("");
  const [customizeToDate, setCustomizeToDate] = useState("");
  const [customizeAdults, setCustomizeAdults] = useState(2);
  const [customizeNationality, setCustomizeNationality] = useState("");
  const [customizePhoneCode, setCustomizePhoneCode] = useState("+1");
  const [sidebarAdults, setSidebarAdults] = useState("1");
  const [sidebarTravelDate, setSidebarTravelDate] = useState("");

  const customizeMinFrom = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const customizeMinTo = customizeFromDate || customizeMinFrom;

  useEffect(() => {
    if (customizeFromDate && customizeToDate && customizeToDate < customizeFromDate) {
      setCustomizeToDate("");
    }
  }, [customizeFromDate, customizeToDate]);

  useEffect(() => {
    setOpenItineraryIndexes(new Set(detail.itinerary.map((_, index) => index)));
  }, [detail.itinerary]);

  const showItineraryHotelTag = detail.listPath === "/multi-day-egypt-tours";

  const sectionNavItems = useMemo(() => {
    if (detail.listPath === "/day-tours") {
      return SECTION_NAV.filter((item) => item.domId !== "tour-accommodation");
    }
    return SECTION_NAV;
  }, [detail.listPath]);

  const sectionIds = useMemo(() => sectionNavItems.map((s) => s.domId), [sectionNavItems]);

  const images = detail.gallery;
  const thumbnails = images.slice(1);
  const maxVisibleThumbs = 4;
  const visibleThumbs = thumbnails.slice(0, maxVisibleThumbs);
  const remainingThumbCount = thumbnails.length - visibleThumbs.length;
  const thumbGridColsClass =
    visibleThumbs.length <= 2 ? "grid-cols-2" : visibleThumbs.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4";
  const pct = discountPct(detail.sidebar);

  const visibleDateRows = useMemo(() => {
    let rows = [...(detail.datePriceRows ?? [])];
    if (travelDateFilter) {
      const selectedTs = Date.parse(`${travelDateFilter}T00:00:00`);
      rows = rows.filter((row) => parseDateLabel(row.start) >= selectedTs);
    }
    rows.sort((a, b) => {
      if (dateSort === "startAsc") return parseDateLabel(a.start) - parseDateLabel(b.start);
      if (dateSort === "startDesc") return parseDateLabel(b.start) - parseDateLabel(a.start);
      if (dateSort === "priceAsc") return a.price - b.price;
      return b.price - a.price;
    });
    return rows;
  }, [dateSort, detail.datePriceRows, travelDateFilter]);

  const similarTours = useMemo<TourCard[]>(() => {
    const sourceMap = detail.listPath === "/multi-day-egypt-tours" ? multiDayTourDetails : dayTourDetails;
    return Object.values(sourceMap)
      .filter((item) => item.slug !== detail.slug)
      .slice(0, 2)
      .map((item) => ({
        id: `similar-${item.slug}`,
        title: item.title,
        imageSrc: item.gallery[0]?.src ?? "/tours/multi-day-tours.webp",
        imageAlt: item.gallery[0]?.alt ?? item.title,
        href: `${item.listPath}/${item.slug}`,
        features: [...item.highlights.slice(0, 3)],
        price: item.sidebar.price,
        priceWas: item.sidebar.priceWas,
        discountPercent: item.sidebar.discountPercent,
        perPersonNote: "Per person",
      }));
  }, [detail.listPath, detail.slug]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && sectionIds.includes(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [sectionIds]);

  useEffect(() => {
    if (!sectionIds.includes(activeSection)) {
      setActiveSection(sectionIds[0] ?? "tour-overview");
    }
  }, [sectionIds, activeSection]);

  useEffect(() => {
    const updateActive = () => {
      const offset = 130;
      const y = window.scrollY + offset;
      let current = sectionIds[0] ?? "tour-overview";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = window.scrollY + el.getBoundingClientRect().top;
        if (top <= y + 2) current = id;
      }
      setActiveSection(current);
    };
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sectionIds]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen, images.length]);

  const sectionScrollClass = "scroll-mt-[7.5rem]";

  return (
 <>
    <div className="w-full lg:pb-16 pt-6 sm:pt-8 md:pt-10">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <div className="mb-6">
          <Breadcrumb items={detail.breadcrumbs} variant="inline" className="mb-3" />
          <h1 className="font-heading text-xl font-bold leading-tight tracking-tight text-[#0A0909] sm:text-2xl md:text-3xl lg:text-4xl">
            {detail.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
            {detail.bestSeller ?
              <span className="flex items-center gap-1.5 rounded-full bg-[#E9EFEE] px-3 py-1.5">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path
                    d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                    stroke="#41736D"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-[10px] font-medium text-[#41736D] sm:text-[13px]">Best Seller</span>
              </span>
            : null}
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A0909] sm:text-[13px]">
              {detail.durationLabel}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#0A090999] sm:text-[13px]">
              <span className="h-1 w-1 shrink-0 rounded-full bg-[#0A0909]" />
              <span className="font-medium text-[#0A0909]">{detail.routeLabel}</span>
            </span>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-10">
          <div className="min-w-0 w-full">
            <ScrollRevealSection>
            <section id="tour-overview" className={sectionScrollClass}>
            <div className="space-y-2 sm:space-y-3">
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#41736D] sm:min-h-[320px] md:min-h-[400px] lg:rounded-2xl"
              >
                <Image
                  src={images[0]?.src ?? ""}
                  alt={images[0]?.alt ?? ""}
                  fill
                  className="object-cover transition hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  priority
                />
              </button>
              {visibleThumbs.length > 0 ?
                <div className={`grid ${thumbGridColsClass} gap-2 sm:gap-3`}>
                  {visibleThumbs.map((img, i) => {
                    const isLastVisible = i === visibleThumbs.length - 1;
                    return (
                      <button
                        key={`${img.src}-${i}`}
                        type="button"
                        onClick={() => openLightbox(i + 1)}
                        className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#41736D] lg:rounded-2xl"
                      >
                        <Image src={img.src} alt={img.alt} fill className="object-cover transition hover:scale-[1.02]" sizes="(max-width: 640px) 50vw, 20vw" />
                        {isLastVisible && remainingThumbCount > 0 ?
                          <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-[#0A0909]/60 font-heading text-xs font-semibold text-white sm:text-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                              <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
                              <path d="M3 17l5-5 4 4 5-6 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            +{remainingThumbCount} View All
                          </span>
                        : null}
                      </button>
                    );
                  })}
                </div>
              : null}
            </div>
              <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85 md:mt-8 md:text-base">{detail.overviewIntro}</p>
            </section>
            </ScrollRevealSection>

            <ScrollableSectionNav
              items={sectionNavItems}
              activeSection={activeSection}
              onNavigate={scrollToSection}
              ariaLabel="Page sections"
            />

            <ScrollRevealSection>
            <section id="tour-highlights" className={`${sectionScrollClass} mt-6 sm:mt-10`}>
              <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Tour Highlights</h2>
              <ul className="mt-4 space-y-3 md:mt-6">
                {detail.highlights.map((line) => (
                  <li key={line} className="flex gap-2 sm:gap-3 text-xs leading-snug text-[#0A0909] md:text-sm">
                    <CheckIcon />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>
            </ScrollRevealSection>

            <ScrollRevealSection>
            <section id="tour-itinerary" className={`${sectionScrollClass} mt-8 pt-8 sm:mt-10 sm:pt-10 border-t border-[#0A09091A]`}>
              <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">
                {detail.listPath === "/day-tours" ? "Itinerary" : "Day By Day Itinerary"}
              </h2>
              {detail.listPath === "/day-tours" ?
                <div className="mt-4 md:mt-6">
                  <div className="rounded-xl border border-[#0A090926] bg-white p-5 sm:p-6 md:p-8">
                    <h3 className="font-heading text-sm sm:text-base font-bold leading-snug text-[#0A0909] md:text-lg lg:text-xl">
                      {dayTourItineraryCardTitle(detail)}
                    </h3>
                    <div className="my-4 border-t border-[#0A09091A] sm:my-5" />
                    <div className="space-y-2.5 sm:space-y-4 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85 md:text-base">
                      {detail.itinerary.flatMap((d) => {
                        const chunks = d.body
                          .split(/\n\n+/)
                          .map((c) => c.trim())
                          .filter(Boolean);
                        const parts = chunks.length > 0 ? chunks : [d.body.trim()].filter(Boolean);
                        return parts.map((para, i) => (
                          <p key={`${d.label}-${i}`}>{para}</p>
                        ));
                      })}
                    </div>
                    <div className="mt-4 sm:mt-6 flex flex-col gap-3 md:mt-8">
                      <span className="inline-flex items-start gap-3 rounded-full bg-[#F3F4F6] px-4 py-3 text-left text-xs leading-snug text-[#0A0909] sm:text-[13px] sm:leading-relaxed">
                        <VehicleDayTourIcon />
                        <span>{dayTourTransportPillText(detail)}</span>
                      </span>
                      <span className="inline-flex items-start gap-3 rounded-full bg-[#F3F4F6] px-4 py-3 text-left text-xs leading-snug text-[#0A0909] sm:text-[13px] sm:leading-relaxed">
                        <MealsIcon />
                        <span>{dayTourMealsPillText(detail)}</span>
                      </span>
                    </div>
                  </div>
                  {detail.placesToVisit && detail.placesToVisit.length > 0 ?
                    <div className="mt-6">
                      <h3 className="font-heading text-xl font-bold text-[#0A0909]">Places To Visit</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {detail.placesToVisit.map((place) => (
                          <span key={place} className="inline-flex items-center rounded-full bg-[#F4F4F5] px-5 py-2 text-xs sm:text-sm font-medium text-[#0A0909]">
                            {place}
                          </span>
                        ))}
                      </div>
                    </div>
                  : null}
                </div>
              : <div className="mt-4 flex flex-col gap-3 md:mt-6">
                {detail.itinerary.map((d, index) => {
                  const open = openItineraryIndexes.has(index);
                  const overnight =
                    showItineraryHotelTag ? (d.overnight ?? "Hotel as per itinerary") : null;
                  const meals =
                    d.meals ?? "Meals included where noted each day";
                  const panelId = `itinerary-panel-${index}`;
                  const headerId = `itinerary-header-${index}`;
                  return (
                    <div
                      key={`${d.label}-${d.title}-${index}`}
                      className={[
                        "overflow-hidden rounded-xl border border-[#0A090926] bg-white transition-shadow duration-200",
                        open ? "shadow-[0_8px_20px_rgba(10,9,9,0.08)]" : "shadow-none",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        id={headerId}
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => {
                          setOpenItineraryIndexes((prev) => {
                            const next = new Set(prev);
                            if (next.has(index)) {
                              next.delete(index);
                            } else {
                              next.add(index);
                            }
                            return next;
                          });
                        }}
                        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 text-left transition hover:bg-zinc-50/60 sm:gap-4 sm:px-5 sm:py-5"
                      >
                        <span className="sm:min-w-[4.25rem] shrink-0 rounded-full bg-[#F3F4F6] px-3 py-1 text-center text-xs font-semibold text-[#0A0909] sm:text-sm">
                          {d.label}
                        </span>
                        <span className="min-w-0 flex-1 font-heading text-sm sm:text-base font-bold leading-snug text-[#0A0909] lg:text-lg">
                          {d.title}
                        </span>
                        <ChevronDownIcon open={open} />
                      </button>
                      {open ?
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={headerId}
                          className="px-4 pb-5 sm:px-5 sm:pb-6"
                        >
                          <div className="ml-[4rem] sm:ml-[5rem] border-t border-[#0A09091A] pt-4 md:ml-[5.25rem]">
                          <p className="text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{d.body}</p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            {overnight ?
                              <span className="inline-flex items-center gap-2 rounded-full bg-[#0A09090D] px-4 py-2.5 text-[11px] text-[#0A0909] sm:text-[13px]">
                                <HotelIcon />
                                {overnight}
                              </span>
                            : null}
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#0A09090D] px-4 py-2.5 text-[11px] text-[#0A0909] sm:text-[13px]">
                              <MealsIcon />
                              {meals}
                            </span>
                          </div>
                          </div>
                        </div>
                      : null}
                    </div>
                  );
                })}
              </div>
              }
              {detail.listPath !== "/day-tours" && detail.placesToVisit && detail.placesToVisit.length > 0 ?
                <div className="mt-6">
                  <h3 className="font-heading text-xl font-bold text-[#0A0909]">Places To Visit</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {detail.placesToVisit.map((place) => (
                      <span key={place} className="inline-flex items-center rounded-full bg-[#F4F4F5] px-5 py-2 text-xs sm:text-sm font-medium text-[#0A0909]">
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              : null}
            </section>
            </ScrollRevealSection>

            <ScrollRevealSection>
            <section id="tour-inclusions" className={`${sectionScrollClass} mt-8 pt-8 sm:mt-10 sm:pt-10 border-t border-[#0A09091A]`}>
              <div className="rounded-2xl bg-[#0A09090D] p-4 sm:p-6 md:p-10">
              <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Inclusions</h2>
                <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-6">
                  <div className="rounded-xl bg-white p-5 md:p-6">
                    <h3 className="font-heading text-base md:text-lg font-semibold text-[#0A0909]">What's Included</h3>
                    <ul className="mt-4 space-y-3">
                      {detail.inclusions.map((line) => (
                        <li key={line} className="flex gap-3 text-xs sm:text-sm text-[#0A0909]">
                          <CheckIcon />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-white p-5 md:p-6">
                    <h3 className="font-heading text-base md:text-lg font-semibold text-[#0A0909]">What's Not Included</h3>
                    <ul className="mt-4 space-y-3">
                      {(detail.exclusions ?? []).map((line) => (
                        <li key={line} className="flex gap-3 text-xs sm:text-sm text-[#0A0909]">
                          <CrossIcon />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            </ScrollRevealSection>

            {detail.listPath === "/multi-day-egypt-tours" ?
              <ScrollRevealSection>
                <section id="tour-accommodation" className={`${sectionScrollClass} mt-10 md:mt-12`}>
                  <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Accommodation</h2>
                  <ul className="mt-4 space-y-3 md:mt-5">
                    {(detail.accommodationItems ?? [detail.accommodation]).map((line) => (
                      <li key={line} className="flex gap-3 text-xs sm:text-sm text-[#0A0909]">
                        <CheckIcon />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </ScrollRevealSection>
            : null}

            <ScrollRevealSection>
            <section id="tour-date-price" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10 md:mt-12`}>
              <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Date &amp; Price</h2>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between md:mt-6">
                <div className="min-w-0 w-full sm:max-w-[200px]">
                  <CustomizeTourDatePicker
                    name="datePriceTravelFilter"
                    value={travelDateFilter}
                    onChange={setTravelDateFilter}
                    placeholder={detail.datePriceTravelLabel ?? "Travel dates"}
                    minDate={customizeMinFrom}
                  />
                </div>
                <PillSelect
                  value={dateSort}
                  onChange={(v) => setDateSort(v as DatePriceSort)}
                  options={[
                    { value: "startAsc", label: detail.datePriceSortLabel ?? "Start date (earliest)" },
                    { value: "startDesc", label: "Start date (latest)" },
                    { value: "priceAsc", label: "Price (low to high)" },
                    { value: "priceDesc", label: "Price (high to low)" },
                  ]}
                  ariaLabel="Sort dates"
                  className="w-full shrink-0 self-stretch sm:w-56 sm:self-auto"
                />
              </div>
              <div className="mt-6 overflow-hidden border-t border-[#0A09091A]">
                <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_190px] gap-4 border-b border-[#0A09091A] py-4 items-center text-sm font-semibold text-[#0A0909]">
                  <p>Starting</p>
                  <p>Ending</p>
                  <div className="text-right">
                    <p>Price From</p>
                    <p className="mt-0.5 text-xs font-normal text-[#0A0909]/50">Prices are subject to change</p>
                  </div>
                </div>
                {visibleDateRows.map((row) => (
                  <div key={`${row.start}-${row.end}-${row.price}`} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_190px] items-center gap-4 border-b border-[#0A09091A] py-4 last:border-b-0">
                    <p className="text-xs sm:text-sm text-[#0A0909]">{row.start}</p>
                    <p className="text-xs sm:text-sm text-[#0A0909]">{row.end}</p>
                    <div className="flex items-center gap-2 justify-self-end">
                      <p className="font-heading text-base sm:text-xl font-bold text-[#0A0909]">{formatUsdFull(row.price)}</p>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M6 9l6 6 6-6" stroke="#0A0909" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                ))}
                {visibleDateRows.length === 0 ?
                  <div className="py-6 text-center text-xs sm:text-sm text-[#0A0909]/65">
                    No departures available for this filter.
                  </div>
                : null}
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  className="inline-flex h-11 items-center cursor-pointer gap-2 rounded-full bg-[#35635E] px-5 font-heading text-sm font-semibold text-white transition hover:bg-[#2c5450]"
                >
                  View More Dates
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </section>
            </ScrollRevealSection>

            <ScrollRevealSection>
            <section id="tour-reviews" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10 md:mt-12`}>
              <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Reviews</h2>
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
                          <svg key={i} className="size-3 shrink-0 md:size-4 fill-current" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.65925 0.23957C5.68697 0.168714 5.73417 0.108101 5.79484 0.06544C5.85552 0.0227793 5.92693 0 6 0C6.07306 0 6.14448 0.0227793 6.20515 0.06544C6.26583 0.108101 6.31303 0.168714 6.34074 0.23957L7.73321 3.74977C7.75927 3.81546 7.80212 3.87233 7.85704 3.91413C7.91195 3.95594 7.97681 3.98105 8.04447 3.98672L11.6603 4.29028C11.9873 4.31775 12.1196 4.74563 11.8706 4.96883L9.11584 7.44267C9.06438 7.48881 9.02602 7.54892 9.00499 7.61639C8.98395 7.68387 8.98104 7.75611 8.99658 7.82521L9.83862 11.5236C9.85554 11.5978 9.8511 11.6756 9.82587 11.7471C9.80064 11.8187 9.75573 11.8808 9.69684 11.9257C9.63794 11.9705 9.56769 11.996 9.49495 11.999C9.42222 12.002 9.35027 11.9824 9.28818 11.9425L6.19199 9.96114C6.13418 9.92412 6.06775 9.90453 6 9.90453C5.93225 9.90453 5.86581 9.92412 5.808 9.96114L2.71181 11.9432C2.64973 11.9831 2.57778 12.0027 2.50504 11.9997C2.43231 11.9967 2.36206 11.9712 2.30316 11.9263C2.24426 11.8815 2.19936 11.8194 2.17412 11.7478C2.14889 11.6763 2.14445 11.5985 2.16138 11.5243L3.00341 7.82521C3.01903 7.75612 3.01616 7.68385 2.99512 7.61636C2.97407 7.54886 2.93568 7.48876 2.88415 7.44267L0.129361 4.96883C0.0738871 4.91927 0.0336949 4.85357 0.0138747 4.78005C-0.00594558 4.70652 -0.00450214 4.62849 0.0180221 4.55583C0.0405464 4.48317 0.0831381 4.41915 0.140403 4.37188C0.197668 4.3246 0.267031 4.29621 0.339705 4.29028L3.95553 3.98672C4.02319 3.98105 4.08804 3.95594 4.14296 3.91413C4.19787 3.87233 4.24072 3.81546 4.26679 3.74977L5.65925 0.23957Z"></path></svg>
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
                  className="inline-flex h-11 items-center cursor-pointer gap-2 rounded-full bg-[#35635E] px-5 font-heading text-sm font-semibold text-white transition hover:bg-[#2c5450]"
                >
                  See More Reviews
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </section>
            </ScrollRevealSection>

            {detail.listPath !== "/day-tours" ?
              <ScrollRevealSection>
              <section className="mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10 md:mt-12">
                <h3 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Who Is This Tour For?</h3>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  {(detail.audienceSegments ?? []).map((segment) => (
                    <div key={segment} className="flex min-h-[86px] flex-col items-center justify-center gap-2 rounded-[10px] border border-[#0A090926] bg-white p-3.5 text-center text-[#0A0909]">
                      <AudienceIcon label={segment} />
                      <p className="text-xs sm:text-sm font-medium leading-tight">{segment}</p>
                    </div>
                  ))}
                </div>
              </section>
              </ScrollRevealSection>
            : null}

            <ScrollRevealSection>
            <section className="mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10 md:mt-12">
              <h3 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">{detail.faqTitle ?? "Frequently Asked Questions"}</h3>
              <ul className="mt-4 space-y-3">
                {(detail.faqItems ?? []).map((item) => {
                  const open = openFaqId === item.id;
                  const panelId = `faq-panel-${item.id}`;
                  const buttonId = `faq-button-${item.id}`;
                  return (
                    <li key={item.id} className="overflow-hidden rounded-[10px] border border-[#0A090926] bg-white px-4 md:rounded-2xl md:px-5">
                      <button
                        id={buttonId}
                        type="button"
                        className="flex w-full items-center justify-between gap-4 py-3 text-left md:py-5"
                        aria-expanded={open}
                        aria-controls={panelId}
                        onClick={() => setOpenFaqId((prev) => (prev === item.id ? "" : item.id))}
                      >
                        <span className="text-sm font-heading font-semibold leading-[1.15] text-[#0A0909] md:text-base xl:text-lg">
                          {item.question}
                        </span>
                        <ChevronDownIcon open={open} />
                      </button>
                      {open ?
                        <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-3 sm:pb-5">
                          <p className="max-w-[95%] text-[11px] leading-relaxed text-[#0A0909] sm:text-xs md:text-sm">
                            {item.answer}
                          </p>
                        </div>
                      : null}
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  className="inline-flex h-11 items-center cursor-pointer gap-2 rounded-full bg-[#35635E] px-5 font-heading text-sm font-semibold text-white transition hover:bg-[#2c5450]"
                >
                  Read More FAQ’s
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </section>
            </ScrollRevealSection>

            {similarTours.length > 0 ?
              <ScrollRevealSection>
              <section className="mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10 md:mt-12">
                <h3 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Similar Tours</h3>
                <div className="mt-4 grid gap-2.5 sm:gap-4 md:mt-6 grid-cols-2">
                  {similarTours.map((tour) => (
                    <TourPackageCard key={tour.id} tour={tour} variant="listing" />
                  ))}
                </div>
              </section>
              </ScrollRevealSection>
            : null}
          </div>

          <ScrollRevealSection className="w-full min-w-0">
          <aside className="flex w-full min-w-0 flex-col gap-6 md:gap-8 lg:gap-10">
            <div className="rounded-[10px] sm:rounded-[20px] border border-[#0A090926] bg-white p-5">
              <div className="flex flex-col gap-1">
                {detail.sidebar.priceWas != null && detail.sidebar.priceWas > detail.sidebar.price ?
                  <span className="text-sm font-medium text-[#0A0909]/50 line-through">
                    From {formatUsdFull(detail.sidebar.priceWas)}
                  </span>
                : null}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-2xl font-extrabold tracking-tight text-[#0A0909]">{formatUsd(detail.sidebar.price)}</span>
                {pct != null && pct > 0 ?
                  <span className="rounded-full bg-[#FFC9C980] px-2 py-0.5 text-xs font-semibold text-[#FF3A3A]">
                    -{pct}%
                  </span>
                : null}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-[#0A0909]/70 sm:text-xs border border-[#0A09091A] rounded-lg py-2 px-4">
                <div className="">
                  <p className="text-[#0A090999]">Duration</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#0A0909]">{detail.sidebar.durationInfo}</p>
                </div>
                <div className="">
                  <p className="text-[#0A090999]">Destination</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#0A0909]">{detail.sidebar.destination}</p>
                </div>
                <div className="">
                  <p className="text-[#0A090999]">Tour Type</p>
                  <p className="mt-0.5 text-sm font-semibold text-[#0A0909]">{detail.sidebar.tourType}</p>
                </div>
              </div>
              <div className="mt-4">
                <PillSelect
                  label="Adults"
                  value={sidebarAdults}
                  onChange={setSidebarAdults}
                  options={SIDEBAR_ADULTS_OPTIONS}
                  ariaLabel="Adults"
                />
              </div>
              <div className="mt-3">
                <PillSelect
                  label="Travel date"
                  value={sidebarTravelDate}
                  onChange={setSidebarTravelDate}
                  options={SIDEBAR_TRAVEL_DATE_OPTIONS}
                  ariaLabel="Travel date"
                />
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href="/customize-your-tour"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-[#0A090926] bg-white px-3 text-center font-heading text-xs font-semibold text-[#0A0909] transition hover:bg-zinc-50"
                >Ask Questions
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <button
                  type="button"
                  className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#41736D] px-3 font-heading text-xs font-semibold text-white transition hover:bg-[#365e59]"
                >
                  Check Availability
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="rounded-[10px] sm:rounded-[20px] border border-[#0A090926] bg-white p-5">
              <h2 className="font-heading text-base font-bold text-[#0A0909]">Customize This Tour</h2>
              <form
                className="mt-4 space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <input
                  required
                  name="name"
                  placeholder="Name"
                  className="h-11 w-full rounded-lg border border-[#E0E0E0] px-3 text-xs sm:text-sm outline-none focus:border-[#41736D]"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  className="h-11 w-full rounded-lg border border-[#E0E0E0] px-3 text-xs sm:text-sm outline-none focus:border-[#41736D]"
                />
                <PillSelect
                  name="nationality"
                  value={customizeNationality}
                  onChange={setCustomizeNationality}
                  options={CUSTOMIZE_NATIONALITY_OPTIONS}
                  ariaLabel="Nationality"
                />
                <div className="flex gap-2">
                  <PillSelect
                    name="phoneCode"
                    value={customizePhoneCode}
                    onChange={setCustomizePhoneCode}
                    options={CUSTOMIZE_PHONE_CODE_OPTIONS}
                    ariaLabel="Country code"
                    className="w-[5.5rem] shrink-0"
                  />
                  <input name="phone" placeholder="Phone" className="h-11 min-w-0 flex-1 rounded-lg border border-[#E0E0E0] px-3 text-xs sm:text-sm outline-none focus:border-[#41736D]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <CustomizeTourDatePicker
                    name="dateFrom"
                    value={customizeFromDate}
                    onChange={setCustomizeFromDate}
                    placeholder="From"
                    minDate={customizeMinFrom}
                  />
                  <CustomizeTourDatePicker
                    name="dateTo"
                    value={customizeToDate}
                    onChange={setCustomizeToDate}
                    placeholder="To"
                    minDate={customizeMinTo}
                  />
                </div>
                <div className="flex items-center justify-between gap-3 pt-0.5">
                  <span className="text-xs sm:text-sm font-semibold text-[#0A0909]">How many adults?</span>
                  <div className="flex h-11 w-[9.75rem] shrink-0 items-center justify-between rounded-lg border border-[#E0E0E0] bg-white px-1.5">
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F3F4F6] text-base sm:text-lg font-medium leading-none text-[#0A0909] transition hover:bg-[#E8E8E8]"
                      aria-label="Decrease adults"
                      onClick={() => setCustomizeAdults((n) => Math.max(1, n - 1))}
                    >
                      −
                    </button>
                    <span className="min-w-[1.25rem] text-center text-xs sm:text-sm font-semibold text-[#0A0909]">{customizeAdults}</span>
                    <input type="hidden" name="adults" value={customizeAdults} readOnly />
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#41736D] text-base sm:text-lg font-medium leading-none text-white transition hover:bg-[#365e59]"
                      aria-label="Increase adults"
                      onClick={() => setCustomizeAdults((n) => Math.min(20, n + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Please advise your tour requirement"
                  className="w-full resize-y rounded-lg border border-[#E0E0E0] px-3 py-2 text-xs sm:text-sm outline-none focus:border-[#41736D]"
                />
                <FormCheckbox name="termsAccepted" required>
                  I have read and agree{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-[#41736D] no-underline hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms &amp; Conditions
                  </Link>
                </FormCheckbox>
                <button
                  type="submit"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#41736D] font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#365e59]"
                >
                  Submit
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
            </div>
          </aside>
          </ScrollRevealSection>
        </div>
      </div>
      {lightboxOpen ?
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-black/92 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <div className="flex items-center justify-between gap-4 text-white">
            <p className="truncate text-sm font-medium">
              {lightboxIndex + 1} / {images.length}
            </p>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Close
            </button>
          </div>
          <div className="relative mt-4 flex min-h-[55vh] flex-1 items-center justify-center sm:min-h-[60vh]">
            <button
              type="button"
              className="absolute left-0 z-10 rounded-full bg-white/10 p-3 text-2xl leading-none text-white hover:bg-white/20 sm:left-2"
              onClick={() => setLightboxIndex((i) => (i - 1 + images.length) % images.length)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="relative h-[55vh] w-full max-w-5xl sm:h-[60vh]">
              <Image
                src={images[lightboxIndex]?.src ?? ""}
                alt={images[lightboxIndex]?.alt ?? ""}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <button
              type="button"
              className="absolute right-0 z-10 rounded-full bg-white/10 p-3 text-2xl leading-none text-white hover:bg-white/20 sm:right-2"
              onClick={() => setLightboxIndex((i) => (i + 1) % images.length)}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
          <button type="button" className="mt-4 h-12 w-full max-w-md self-center rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/20 sm:hidden" onClick={() => setLightboxOpen(false)}>
            Close gallery
          </button>
        </div>
      : null}
    </div>

         <ScrollRevealSection>
                <ContactCtaSection
                  title={homeContactCta.title}
                  description={homeContactCta.description}
                  backgroundImageSrc={homeContactCta.backgroundImageSrc}
                  backgroundImageAlt={homeContactCta.backgroundImageAlt}
                  buttons={homeContactCta.buttons}
                />
              </ScrollRevealSection>
 </>
  );
}
