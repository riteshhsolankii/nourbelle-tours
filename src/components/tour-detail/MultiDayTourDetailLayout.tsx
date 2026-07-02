"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TourPackageCard } from "@/components/common/TourPackageCard";
import { PillSelect } from "@/components/common/PillSelect";
import { dayTourDetails, multiDayTourDetails } from "@/data/tour-package-details";
import type { TourCard } from "@/types/site";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";
import { CustomizeTourDatePicker } from "@/components/tour-detail/CustomizeTourDatePicker";
import { FormCheckbox } from "@/components/common/FormCheckbox";
import Link from "next/link";
import { homeContactCta } from "@/data/site-static";
import {
  formatUsdFull,
  type DatePriceSort,
  parseDateLabel,
  ChevronDownIcon,
  CheckIcon,
  ReviewBadgeIcon,
  AudienceIcon,
} from "@/components/tour-detail/helpers";
import { TourHero } from "@/components/tour-detail/TourHero";
import { GallerySection } from "@/components/tour-detail/GallerySection";
import { TourTabs, MULTI_DAY_TABS } from "@/components/tour-detail/TourTabs";
import { ItineraryTimeline } from "@/components/tour-detail/ItineraryTimeline";
import { TourMap } from "@/components/tour-detail/TourMap";
import { InclusionCards, WhyTravelersLoveCard } from "@/components/tour-detail/InclusionCards";
import { HotelsSection } from "@/components/tour-detail/HotelsSection";
import { ReviewSummary } from "@/components/tour-detail/ReviewSummary";
import { BookingSidebar } from "@/components/tour-detail/BookingSidebar";

type Props = {
  detail: TourPackagePageDetail;
};

const TAB_IDS = MULTI_DAY_TABS.map((t) => t.domId);

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

export function MultiDayTourDetailLayout({ detail }: Props) {
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    // One-time sync from the URL hash (unavailable during SSR, so this can't move into
    // useState's initializer without reintroducing a server/client hydration mismatch).
    const hash = window.location.hash.slice(1);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (TAB_IDS.includes(hash)) setActiveTab(hash);
  }, []);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [travelDateFilter, setTravelDateFilter] = useState<string>("");
  const [dateSort, setDateSort] = useState<DatePriceSort>("startAsc");
  const [openFaqId, setOpenFaqId] = useState<string>(detail.faqItems?.[0]?.id ?? "");
  const [sidebarTravelDate, setSidebarTravelDate] = useState("");
  const [customizeFromDate, setCustomizeFromDate] = useState("");
  const [customizeToDate, setCustomizeToDate] = useState("");
  const [customizeAdults, setCustomizeAdults] = useState(2);
  const [customizeNationality, setCustomizeNationality] = useState("");
  const [customizePhoneCode, setCustomizePhoneCode] = useState("+1");

  const customizeMinFrom = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const customizeMinTo = customizeFromDate || customizeMinFrom;

  const images = detail.gallery;

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

  const handleSelectTab = useCallback((tabId: string) => {
    setActiveTab(tabId);
    try {
      window.history.replaceState(null, "", `#${tabId}`);
    } catch {
      /* ignore */
    }
  }, []);

  const itineraryTimelineEl = <ItineraryTimeline itinerary={detail.itinerary} placesToVisit={detail.placesToVisit} />;

  const itineraryAndGalleryBlock = (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[42%_1fr] lg:items-start">
      <div className="min-w-0">
        <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Itinerary Highlights</h2>
        <div className="mt-4 md:mt-6">
          <ItineraryTimeline itinerary={detail.itinerary} />
        </div>
      </div>
      <div className="min-w-0">
        <GallerySection images={images} onOpenLightbox={openLightbox} />
        <div className="mt-3">
          <TourMap placesToVisit={detail.placesToVisit} aspectClassName="aspect-[21/9]" />
        </div>
      </div>
    </div>
  );

  const itineraryOnlyBlock = (
    <div>
      <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Itinerary Highlights</h2>
      <div className="mt-4 md:mt-6">{itineraryTimelineEl}</div>
    </div>
  );

  return (
    <>
      <div className="w-full lg:pb-16 pt-6 sm:pt-8 md:pt-10">
        <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-10">
            <div className="min-w-0 w-full">
              <TourHero detail={detail} />
              <div>
                <TourTabs activeTab={activeTab} onSelectTab={handleSelectTab} />

                <ScrollRevealSection key={activeTab}>
                <div className="mt-6 sm:mt-10">
                  {activeTab === "overview" ?
                    <div>
                      <div className="mb-8 pb-8 border-b border-[#0A09091A]">{itineraryAndGalleryBlock}</div>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">{detail.overviewIntro}</p>
                      <div className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
                        <div className="rounded-xl border border-[#0A09091A] bg-white p-5 md:p-6">
                          <h3 className="font-heading text-base font-bold text-[#0A0909] md:text-lg">Tour Highlights</h3>
                          <ul className="mt-4 space-y-3">
                            {detail.highlights.map((line) => (
                              <li key={line} className="flex gap-2 sm:gap-3 text-xs leading-snug text-[#0A0909] md:text-sm">
                                <CheckIcon />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <InclusionCards variant="inclusions" inclusions={detail.inclusions} />
                        <InclusionCards variant="exclusions" exclusions={detail.exclusions} />
                        <div className="md:col-span-3">
                          <WhyTravelersLoveCard highlights={detail.highlights} reviewCards={detail.reviewCards} />
                        </div>
                      </div>
                    </div>
                  : null}

                  {activeTab === "itinerary" ? itineraryOnlyBlock : null}

                  {activeTab === "inclusions" ?
                    <InclusionCards variant="inclusions" inclusions={detail.inclusions} />
                  : null}

                  {activeTab === "exclusions" ?
                    <InclusionCards variant="exclusions" exclusions={detail.exclusions} />
                  : null}

                  {activeTab === "hotels" ?
                    <HotelsSection
                      hotelCards={detail.hotelCards}
                      accommodationItems={detail.accommodationItems}
                      accommodation={detail.accommodation}
                      sectionScrollClass=""
                    />
                  : null}

                  {activeTab === "map" ?
                    <div>
                      <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Route Map</h2>
                      <div className="mt-4 md:mt-6">
                        <TourMap placesToVisit={detail.placesToVisit} />
                      </div>
                    </div>
                  : null}

                  {activeTab === "reviews" ?
                    <div>
                      <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">Reviews</h2>
                      <div className="mt-4 max-w-xs">
                        <ReviewSummary ratingValue={detail.ratingValue} ratingCount={detail.ratingCount} variant="card" />
                      </div>
                      <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                    </div>
                  : null}

                  {activeTab === "faq" ?
                    <div>
                      <h2 className="font-heading text-lg font-bold text-[#0A0909] md:text-[22px]">{detail.faqTitle ?? "Frequently Asked Questions"}</h2>
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
                    </div>
                  : null}

                  {activeTab === "dateAndPrice" ?
                    <div>
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
                          ariaLabel="Sort dates"
                          className="w-full sm:w-auto"
                          options={[
                            { value: "startAsc", label: detail.datePriceSortLabel ?? "Start date (earliest)" },
                            { value: "startDesc", label: "Start date (latest)" },
                            { value: "priceAsc", label: "Price (low to high)" },
                            { value: "priceDesc", label: "Price (high to low)" },
                          ]}
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
                            </div>
                          </div>
                        ))}
                        {visibleDateRows.length === 0 ?
                          <div className="py-6 text-center text-xs sm:text-sm text-[#0A0909]/65">
                            No departures available for this filter.
                          </div>
                        : null}
                      </div>
                    </div>
                  : null}
                </div>
                </ScrollRevealSection>
              </div>

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

            <aside className="w-full min-w-0 flex flex-col gap-6 md:gap-8 lg:gap-10 lg:sticky lg:top-[6.5rem]">
              <ScrollRevealSection>
                <BookingSidebar
                  detail={detail}
                  travelDate={sidebarTravelDate}
                  onTravelDateChange={setSidebarTravelDate}
                  minTravelDate={customizeMinFrom}
                />
              </ScrollRevealSection>

              <ScrollRevealSection>
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
              </ScrollRevealSection>
            </aside>
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
