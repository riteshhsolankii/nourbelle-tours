"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";
import { homeContactCta } from "@/data/site-static";
import { NILE_CRUISE_SECTION_NAV } from "@/components/nile-cruise-detail/nile-cruise-section-nav";
import { scrollToSection, parseDateLabel, type DatePriceSort } from "@/components/nile-cruise-detail/nile-detail-utils";
import { getNileItineraryPrograms } from "@/components/nile-cruise-detail/nile-itinerary-programs";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { NileCruiseSectionNav } from "@/components/nile-cruise-detail/sections/NileCruiseSectionNav";
import { NileCruiseOverviewSection } from "@/components/nile-cruise-detail/sections/NileCruiseOverviewSection";
import { NileCruiseItinerariesSection } from "@/components/nile-cruise-detail/sections/NileCruiseItinerariesSection";
import { NileCruiseInclusionsSection } from "@/components/nile-cruise-detail/sections/NileCruiseInclusionsSection";
import { NileCruiseFacilitiesSection } from "@/components/nile-cruise-detail/sections/NileCruiseFacilitiesSection";
import { NileCruiseDatePriceSection } from "@/components/nile-cruise-detail/sections/NileCruiseDatePriceSection";
import { NileCruiseScheduleSection } from "@/components/nile-cruise-detail/sections/NileCruiseScheduleSection";
import { NileCruiseGallerySection } from "@/components/nile-cruise-detail/sections/NileCruiseGallerySection";
import { NileCruiseReviewsSection } from "@/components/nile-cruise-detail/sections/NileCruiseReviewsSection";
import { NileCruiseBookingSidebar } from "@/components/nile-cruise-detail/sections/NileCruiseBookingSidebar";

const SECTION_SCROLL = "scroll-mt-[7.5rem]";

type Props = {
  detail: TourPackagePageDetail;
};

export function NileCruiseDetailClient({ detail }: Props) {
  const sectionNavItems = useMemo(() => {
    return NILE_CRUISE_SECTION_NAV.filter((item) => {
      if (item.domId === "nile-facilities" && !detail.nileCruiseFacilities) return false;
      if (item.domId === "nile-schedule" && !detail.nileSchedule) return false;
      return true;
    });
  }, [detail.nileCruiseFacilities, detail.nileSchedule]);

  const sectionIds = useMemo(() => sectionNavItems.map((s) => s.domId), [sectionNavItems]);

  const [activeSection, setActiveSection] = useState(() => sectionIds[0] ?? "nile-overview");
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false);
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(0);
  const [travelDateFilter, setTravelDateFilter] = useState("");
  const [dateSort, setDateSort] = useState<DatePriceSort>("startAsc");

  const programs = useMemo(() => getNileItineraryPrograms(detail), [detail]);
  const programIds = useMemo(() => programs.map((p) => p.id), [programs]);
  const [selectedProgramId, setSelectedProgramId] = useState(() => programs[0]?.id ?? "");

  useEffect(() => {
    if (!programs.some((p) => p.id === selectedProgramId)) {
      setSelectedProgramId(programs[0]?.id ?? "");
    }
  }, [programs, selectedProgramId]);

  const customizeMinFrom = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const heroImage = detail.gallery[0] ?? { src: "/multi-day-tours/banner.webp", alt: detail.title };
  const galleryImages = detail.gallery;

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

  const openGalleryLightbox = useCallback((index: number) => {
    setGalleryLightboxIndex(index);
    setGalleryLightboxOpen(true);
  }, []);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash && sectionIds.includes(hash)) {
      requestAnimationFrame(() => scrollToSection(hash));
    }
  }, [sectionIds]);

  useEffect(() => {
    if (!sectionIds.includes(activeSection)) {
      setActiveSection(sectionIds[0] ?? "nile-overview");
    }
  }, [sectionIds, activeSection]);

  useEffect(() => {
    const updateActive = () => {
      const offset = 130;
      const y = window.scrollY + offset;
      let current = sectionIds[0] ?? "nile-overview";
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
    if (!galleryLightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGalleryLightboxOpen(false);
      if (e.key === "ArrowRight") setGalleryLightboxIndex((i) => (i + 1) % galleryImages.length);
      if (e.key === "ArrowLeft") setGalleryLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [galleryLightboxOpen, galleryImages.length]);

  return (
    <>
      <div className="w-full lg:pb-16 pt-6 sm:pt-8 md:pt-10">
        <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
          <div className="mb-6">
            <Breadcrumb items={detail.breadcrumbs} variant="inline" className="mb-3" />
            <h1 className="font-heading text-xl font-bold leading-tight tracking-tight text-[#0A0909] sm:text-2xl md:text-3xl lg:text-4xl">
              {detail.title}
            </h1>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-10">
            <div className="min-w-0 w-full">
              <ScrollRevealSection>
                <NileCruiseOverviewSection detail={detail} heroImage={heroImage} sectionScrollClass={SECTION_SCROLL} />
              </ScrollRevealSection>

              <NileCruiseSectionNav items={sectionNavItems} activeSection={activeSection} />

              <ScrollRevealSection>
                <NileCruiseItinerariesSection
                  sectionScrollClass={SECTION_SCROLL}
                  programs={programs}
                  selectedProgramId={selectedProgramId}
                  onSelectProgram={setSelectedProgramId}
                />
              </ScrollRevealSection>

              <ScrollRevealSection>
                <NileCruiseInclusionsSection detail={detail} sectionScrollClass={SECTION_SCROLL} />
              </ScrollRevealSection>

              {detail.nileCruiseFacilities ?
                <ScrollRevealSection>
                  <NileCruiseFacilitiesSection content={detail.nileCruiseFacilities} sectionScrollClass={SECTION_SCROLL} />
                </ScrollRevealSection>
              : null}

              <ScrollRevealSection>
                <NileCruiseDatePriceSection
                  detail={detail}
                  sectionScrollClass={SECTION_SCROLL}
                  travelDateFilter={travelDateFilter}
                  setTravelDateFilter={setTravelDateFilter}
                  dateSort={dateSort}
                  setDateSort={setDateSort}
                  visibleDateRows={visibleDateRows}
                  customizeMinFrom={customizeMinFrom}
                />
              </ScrollRevealSection>

              {detail.nileSchedule ?
                <ScrollRevealSection>
                  <NileCruiseScheduleSection
                    schedule={detail.nileSchedule}
                    sectionScrollClass={SECTION_SCROLL}
                    selectedProgramId={selectedProgramId}
                    onSelectProgramId={setSelectedProgramId}
                    programIds={programIds}
                  />
                </ScrollRevealSection>
              : null}

              {galleryImages.length > 0 ?
                <ScrollRevealSection>
                  <NileCruiseGallerySection
                    images={galleryImages}
                    sectionScrollClass={SECTION_SCROLL}
                    onOpenLightbox={openGalleryLightbox}
                  />
                </ScrollRevealSection>
              : null}

              <ScrollRevealSection>
                <NileCruiseReviewsSection detail={detail} sectionScrollClass={SECTION_SCROLL} />
              </ScrollRevealSection>
            </div>

            <ScrollRevealSection className="w-full min-w-0">
              <NileCruiseBookingSidebar detail={detail} customizeMinFrom={customizeMinFrom} />
            </ScrollRevealSection>
          </div>
        </div>

        {galleryLightboxOpen && galleryImages.length > 0 ?
          <div className="fixed inset-0 z-[100] flex flex-col bg-black/92 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Gallery">
            <div className="flex items-center justify-between gap-4 text-white">
              <p className="truncate text-sm font-medium">
                {galleryLightboxIndex + 1} / {galleryImages.length}
              </p>
              <button
                type="button"
                onClick={() => setGalleryLightboxOpen(false)}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <div className="relative mt-4 flex min-h-[55vh] flex-1 items-center justify-center sm:min-h-[60vh]">
              <button
                type="button"
                className="absolute left-0 z-10 rounded-full bg-white/10 p-3 text-2xl leading-none text-white hover:bg-white/20 sm:left-2"
                onClick={() => setGalleryLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
                aria-label="Previous image"
              >
                ‹
              </button>
              <div className="relative h-[55vh] w-full max-w-5xl sm:h-[60vh]">
                <Image
                  src={galleryImages[galleryLightboxIndex]?.src ?? ""}
                  alt={galleryImages[galleryLightboxIndex]?.alt ?? ""}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <button
                type="button"
                className="absolute right-0 z-10 rounded-full bg-white/10 p-3 text-2xl leading-none text-white hover:bg-white/20 sm:right-2"
                onClick={() => setGalleryLightboxIndex((i) => (i + 1) % galleryImages.length)}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <button
              type="button"
              className="mt-4 h-12 w-full max-w-md self-center rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/20 sm:hidden"
              onClick={() => setGalleryLightboxOpen(false)}
            >
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
