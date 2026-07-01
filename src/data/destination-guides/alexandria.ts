import type { DestinationGuidePage } from "@/types/destination-guide";
import { popularTourPackages } from "@/data/site-static";

const alexandriaTourPackages = popularTourPackages.allTours.filter((t) =>
  `${t.title} ${t.features.join(" ")}`.toLowerCase().includes("alexandria"),
);

const articleTours =
  alexandriaTourPackages.length >= 3 ?
    alexandriaTourPackages.slice(0, 3)
  : [
      ...alexandriaTourPackages,
      ...popularTourPackages.byPage.dayTours
        .filter((t) => !alexandriaTourPackages.some((a) => a.id === t.id))
        .slice(0, 3 - alexandriaTourPackages.length),
    ];

export const alexandriaDestinationGuide: DestinationGuidePage = {
  slug: "alexandria",
  title: "Alexandria Travel Guide",
  metaDescription:
    "Plan your Alexandria trip with expert tips on the Mediterranean Corniche, Catacombs, Bibliotheca Alexandrina, and guided day tours from Nourbelle Tours.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Alexandria Travel Guide", href: "/destinations/alexandria" },
    { label: "Alexandria" },
  ],
  heroImage: {
    src: "/destinations/alexandria.webp",
    alt: "Alexandria waterfront and Mediterranean coast",
  },
  whyVisit: {
    heading: "Why Visit Alexandria?",
    paragraphs: [
      "Alexandria is Egypt’s storied Mediterranean port — a city of Greek, Roman, and modern layers where sea breezes, palm-lined streets, and fresh seafood meet world-famous landmarks. From the Catacombs of Kom El Shoqafa to the Bibliotheca Alexandrina, every visit feels like a journey through centuries.",
      "Whether you add a day trip from Cairo or stay overnight on the coast, Alexandria rewards travellers with relaxed pacing, coastal views, and easy links to the Delta and North Coast resorts. Nourbelle’s team arranges private guides and comfortable transfers so you make the most of your time by the sea.",
    ],
    tags: [
      { label: "Mediterranean Coast", icon: "pyramids" },
      { label: "Bibliotheca Alexandrina", icon: "museum" },
      { label: "Roman Heritage", icon: "history" },
      { label: "Seafood & Corniche", icon: "culture" },
    ],
  },
  thingsToDo: {
    heading: "Top Things to Do in Alexandria",
    cards: [
      {
        title: "Explore the Catacombs of Kom El Shoqafa",
        imageSrc: "/destinations/alexandria.webp",
        imageAlt: "Historic underground catacombs in Alexandria",
        highlights: [
          "Greco-Roman tombs & carved burial chambers",
          "Licensed guide explains layers of history",
          "Combine with Pompey’s Pillar on the same route",
        ],
        learnMoreHref: "/day-tours/alexandria",
        bookNowHref: "/customize-your-tour",
      },
      {
        title: "Visit Bibliotheca Alexandrina & Qaitbay Citadel",
        imageSrc: "/multi-day-tours/egypt-tour/cairo.webp",
        imageAlt: "Modern library and citadel on Alexandria harbour",
        highlights: [
          "Photo stop at the iconic modern library",
          "15th-century fort on the Eastern Harbour",
          "Panoramic Mediterranean views from the ramparts",
        ],
        learnMoreHref: "/day-tours/alexandria",
        bookNowHref: "/customize-your-tour",
      },
      {
        title: "Stroll the Mediterranean Corniche",
        imageSrc: "/multi-day-tours/banner.webp",
        imageAlt: "Alexandria corniche and waterfront promenade",
        highlights: [
          "Coastal promenade & fresh seafood lunch stops",
          "Montaza Palace gardens optional add-on",
          "Relaxed pacing tailored to your interests",
        ],
        learnMoreHref: "/day-tours/alexandria",
        bookNowHref: "/customize-your-tour",
      },
    ],
    viewAllHref: "/day-tours",
    viewAllLabel: "View All Alexandria Tours",
  },
  bestTours: {
    heading: "Best Alexandria Tours",
    cards: [
      {
        durationLabel: "1 Day",
        imageSrc: "/destinations/alexandria.webp",
        imageAlt: "Alexandria day trip from Cairo",
        highlights: [
          "Catacombs, Pompey’s Pillar & library photo stop",
          "Private vehicle from Cairo with expert guide",
          "Seafood lunch on the Corniche (optional)",
        ],
        learnMoreHref: "/day-tours/alexandria",
      },
      {
        durationLabel: "2–3 Days",
        imageSrc: "/multi-day-tours/egypt-tour/cairo.webp",
        imageAlt: "Alexandria overnight and Cairo combination",
        highlights: [
          "Overnight on the Mediterranean coast",
          "Full-day Alexandria sightseeing at an easy pace",
          "Round-trip transfers from Cairo included",
        ],
        learnMoreHref: "/multi-day-egypt-tours/pyramids-explorer",
      },
      {
        durationLabel: "4+ Days",
        imageSrc: "/tours/multi-day-tours.webp",
        imageAlt: "North Egypt tour including Alexandria",
        highlights: [
          "Cairo, Alexandria & North Coast extensions",
          "Tailor-made hotel class & daily pacing",
          "Combine with Nile cruise or Red Sea add-ons",
        ],
        learnMoreHref: "/multi-day-egypt-tours/giza-highlights",
      },
    ],
    viewAllHref: "/multi-day-egypt-tours",
    viewAllLabel: "View All Alexandria Tours",
  },
  articles: {
    heading: "Articles and Blogs",
    tours: articleTours,
    viewAllHref: "/blog?category=destination-guides",
    viewAllLabel: "View All Alexandria Tours",
  },
  planTrip: {
    heading: "Plan Your Alexandria Trip",
    intro:
      "Speak with our Egypt travel specialists for a free, no-obligation quote. We reply within one business day with clear pricing for day trips, overnights, and Cairo combinations.",
    bullets: [
      "Tailor-Made Private Tours",
      "Licensed Egyptologist Guides",
      "Hand-Picked Coastal Hotels",
      "24/7 Support While You Travel",
    ],
    ctaLabel: "Customize Your Alexandria Tour",
    ctaHref: "/customize-your-tour",
  },
  faq: {
    heading: "Plan Your Alexandria Trip",
    items: [
      {
        id: "alex-f1",
        question: "Can I visit Alexandria on a day trip from Cairo?",
        answer:
          "Yes. Our most popular option is a full-day private tour from Cairo (about 2.5–3 hours each way) covering the catacombs, Pompey’s Pillar, the Corniche, and a photo stop at the Bibliotheca Alexandrina. We handle transport, guide, and timing—you can also enquire about Custom Tours here!",
      },
      {
        id: "alex-f2",
        question: "How many days do I need in Alexandria?",
        answer:
          "One day is enough for the main highlights if you are based in Cairo. Stay 2 nights if you want a relaxed coastal break, evening walks on the Corniche, and optional visits to Montaza Palace or Al-Alamein.",
      },
      {
        id: "alex-f3",
        question: "What is the best time to visit Alexandria?",
        answer:
          "Spring (March–May) and autumn (September–November) offer pleasant Mediterranean weather. Summer is popular for sea breezes and beaches but can be humid; winter is mild and quieter, ideal for sightseeing without crowds.",
      },
      {
        id: "alex-f4",
        question: "Can I combine Alexandria with Cairo or the North Coast?",
        answer:
          "Absolutely. Many guests pair a Cairo stay with a day or overnight in Alexandria, or extend north toward Marsa Matrouh and the Mediterranean resorts. We build one itinerary with transfers, hotels, and guides included.",
      },
      {
        id: "alex-f5",
        question: "Is Alexandria suitable for families?",
        answer:
          "Yes. The Corniche, library exterior, and fort are engaging for older children; catacombs may be tight for very young kids. We pace the day with breaks, recommend seafood lunches, and use private vehicles for comfort.",
      },
    ],
    ctaLabel: "Read More FAQ's",
    ctaHref: "/faq",
  },
};
