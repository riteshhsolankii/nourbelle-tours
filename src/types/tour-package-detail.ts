import type { BreadcrumbItem } from "@/types/site";

/** Nile cruise detail: checklist line under each day (bold lead + body). */
export type NileItineraryDayBullet = { lead: string; text: string };

export type NileItineraryProgramDay = {
  label: string;
  title: string;
  bullets: readonly NileItineraryDayBullet[];
};

/** Selectable sailing programme (card) with its own day-by-day content. */
export type NileItineraryProgram = {
  id: string;
  imageSrc: string;
  imageAlt: string;
  nightsDaysBadge: string;
  routeTitle: string;
  priceFrom: number;
  days: readonly NileItineraryProgramDay[];
};

export type NileCruiseFacilitiesContent = {
  monumentalTitle: string;
  monumentalIntro: string;
  accommodationTitle: string;
  accommodationBullets: readonly string[];
  accommodationNarrative: string;
  diningTitle: string;
  diningSections: readonly { title: string; body: string }[];
};

/** One row in the horizontal schedule summary bar (nights / availability / departure). */
export type NileScheduleBar = {
  nights: string;
  availability: string;
  departure: string;
};

export type NileScheduleTab = {
  id: string;
  label: string;
  bar: NileScheduleBar;
};

export type NileScheduleContent = {
  title: string;
  tabs: readonly NileScheduleTab[];
};

/** Section anchors on package detail pages (maps to DOM id `tour-${section}`). */
export type TourPackageDetailSectionId =
  | "overview"
  | "highlights"
  | "itinerary"
  | "inclusions"
  | "accommodation"
  | "datePrice"
  | "reviews";

/** Full-page tour package (multi-day or day tour). */
export type TourPackagePageDetail = {
  slug: string;
  /** Listing page to link middle breadcrumb */
  listPath: "/multi-day-egypt-tours" | "/day-tours" | "/nile-cruises";
  breadcrumbs: readonly BreadcrumbItem[];
  title: string;
  /** Short tagline shown under the title on the redesigned multi-day hero (e.g. "Pyramids, Temples & Timeless Wonders"). */
  subtitle?: string;
  /** Aggregate rating shown in the hero; omitted entirely if not set. */
  ratingValue?: number;
  ratingCount?: number;
  bestSeller?: boolean;
  durationLabel: string;
  routeLabel: string;
  gallery: readonly { src: string; alt: string }[];
  /** Overview copy (above section nav). */
  overviewIntro: string;
  highlights: readonly string[];
  itinerary: readonly {
    label: string;
    title: string;
    body: string;
    /** Shown in accordion meta row; defaults by tour type if omitted. */
    overnight?: string;
    meals?: string;
  }[];
  /** Day tour: bold headline inside the single itinerary card (below the section title). */
  dayItineraryCardTitle?: string;
  /** Day tour: transport pill at bottom of the itinerary card. */
  dayTourTransportPill?: string;
  /** Day tour: meals pill at bottom of the itinerary card. */
  dayTourMealsPill?: string;
  /** Optional chip list shown after itinerary accordion. */
  placesToVisit?: readonly string[];
  inclusions: readonly string[];
  exclusions?: readonly string[];
  accommodation: string;
  accommodationItems?: readonly string[];
  /** Redesigned multi-day "Hotels" tab: image cards shown above the accommodation bullet list. */
  hotelCards?: readonly { name: string; imageSrc: string; imageAlt: string; stars?: 1 | 2 | 3 | 4 | 5; location?: string }[];
  /** Redesigned multi-day "Optional Add-ons" cards; section renders nothing when omitted. */
  addons?: readonly { title: string; imageSrc: string; imageAlt: string; priceFrom: number }[];
  dateAndPrice: string;
  datePriceRows?: readonly { start: string; end: string; price: number }[];
  datePriceTravelLabel?: string;
  datePriceSortLabel?: string;
  reviews: string;
  reviewCards?: readonly { title: string; body: string; author: string; date: string; rating?: 1 | 2 | 3 | 4 | 5 }[];
  audienceSegments?: readonly string[];
  faqTitle?: string;
  faqItems?: readonly { id: string; question: string; answer: string }[];
  /** Nile pages: two (or more) programme cards + checklist-style day accordions. */
  nileItineraryPrograms?: readonly NileItineraryProgram[];
  /** Nile pages: replaces “life on board” with facilities + dining blocks. */
  nileCruiseFacilities?: NileCruiseFacilitiesContent;
  /** Nile pages: weekly / sailing schedule table after dates. */
  nileSchedule?: NileScheduleContent;
  sidebar: {
    price: number;
    priceWas?: number;
    discountPercent?: number;
    durationInfo: string;
    destination: string;
    tourType: string;
  };
};
