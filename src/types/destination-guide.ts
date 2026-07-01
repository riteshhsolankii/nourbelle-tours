import type { BreadcrumbItem } from "@/types/site";
import type { TourCard } from "@/types/site";

export type DestinationGuideHighlightTag = {
  label: string;
  icon: "pyramids" | "museum" | "history" | "culture";
};

export type DestinationGuideActivityCard = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  highlights: readonly string[];
  learnMoreHref: string;
  bookNowHref: string;
};

export type DestinationGuideDurationCard = {
  durationLabel: string;
  imageSrc: string;
  imageAlt: string;
  highlights: readonly string[];
  learnMoreHref: string;
};

export type DestinationGuidePage = {
  slug: string;
  title: string;
  metaDescription: string;
  breadcrumbs: readonly BreadcrumbItem[];
  heroImage: { src: string; alt: string };
  whyVisit: {
    heading: string;
    paragraphs: readonly string[];
    tags: readonly DestinationGuideHighlightTag[];
  };
  thingsToDo: {
    heading: string;
    cards: readonly DestinationGuideActivityCard[];
    viewAllHref: string;
    viewAllLabel: string;
  };
  bestTours: {
    heading: string;
    cards: readonly DestinationGuideDurationCard[];
    viewAllHref: string;
    viewAllLabel: string;
  };
  articles: {
    heading: string;
    tours: readonly TourCard[];
    viewAllHref: string;
    viewAllLabel: string;
  };
  planTrip: {
    heading: string;
    intro: string;
    bullets: readonly string[];
    ctaLabel: string;
    ctaHref: string;
  };
  faq: {
    heading: string;
    items: readonly { id: string; question: string; answer: string }[];
    ctaLabel: string;
    ctaHref: string;
  };
};
