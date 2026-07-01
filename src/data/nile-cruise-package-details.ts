import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { homeFaqs } from "@/data/site-static";

function galleryNileDefault(title: string) {
  return [
    { src: "/multi-day-tours/banner.webp", alt: `${title} — Nile sailing` },
    { src: "/multi-day-tours/egypt-tour/luxor.webp", alt: `${title} — Luxor` },
    { src: "/tours/5-days-luxury.webp", alt: `${title} — dahabiya` },
    { src: "/multi-day-tours/egypt-tour/aswan.webp", alt: `${title} — Aswan` },
  ] as const;
}

function itineraryDays(n: number, _titleShort: string) {
  return Array.from({ length: n }, (_, i) => ({
    label: `Day ${i + 1}`,
    title: `Nile programme — day ${i + 1}`,
    body: "Guided temple visits or relaxed sailing between moorings, with your Egyptologist on hand. Timing adapts to river conditions and local events.",
    overnight: "On board (en-suite cabin)",
    meals: "Full board on board unless noted",
  }));
}

const highlightsCruise = [
  "Small-group dahabiya or cruise experience on the Nile",
  "Licensed Egyptologist guiding at temples and tombs",
  "Full-board or generous meal plan as per programme",
  "Air-conditioned en-suite cabins with river views on request",
] as const;

const inclusionsCruise = [
  "Accommodation on board in the booked cabin category",
  "Meals as per the published meal plan",
  "Guided excursions listed in the sailing programme",
  "Transfers between airport/station and embarkation point when stated",
  "On-board hospitality and housekeeping",
] as const;

const exclusionsCruise = [
  "International flights and entry visa",
  "Travel insurance (strongly recommended)",
  "Optional tours (e.g. Abu Simbel) and personal expenses",
  "Beverages outside the included drinks policy",
  "Tips for crew, guides, and drivers",
] as const;

function datePriceRowsFor(basePrice: number) {
  return [
    { start: "Saturday 4 Jan 2026", end: "Wednesday 8 Jan 2026", price: Math.max(basePrice - 200, 400) },
    { start: "Monday 10 Feb 2026", end: "Friday 14 Feb 2026", price: Math.max(basePrice - 80, 420) },
    { start: "Thursday 6 Mar 2026", end: "Monday 10 Mar 2026", price: basePrice },
    { start: "Tuesday 1 Apr 2026", end: "Saturday 5 Apr 2026", price: basePrice + 180 },
  ] as const;
}

const reviewCardsDefault = [
  {
    title: "Unforgettable Nile week",
    body: "Calm sailing, attentive crew, and temple visits that never felt rushed. We would book again without hesitation.",
    author: "MARIA K.",
    date: "2/8/2025",
    rating: 5 as const,
  },
  {
    title: "Exactly as described",
    body: "Cabins were comfortable, food was excellent, and our guide made Egyptian history come alive every day.",
    author: "JAMES P.",
    date: "11/21/2024",
    rating: 5 as const,
  },
] as const;

const audienceSegmentsDefault = ["Couples", "Small groups", "Culture lovers", "Slow travellers", "Honeymooners"] as const;

const faqItemsDefault = homeFaqs.items.map((item) => ({
  id: item.id,
  question: item.question,
  answer: item.answer,
}));

function defaultNileFacilities(title: string) {
  return {
    monumentalTitle: "Life on the river",
    monumentalIntro: `Sail in comfort between Luxor and Aswan with guided temple visits, attentive crew, and time to unwind on deck aboard ${title}.`,
    accommodationTitle: "Cabins & suites",
    accommodationBullets: [
      "Climate-controlled en-suite cabin",
      "Daily housekeeping and turndown service",
    ],
    accommodationNarrative:
      "Cabin categories are confirmed before travel; upper-deck and suite upgrades may be available on request.",
    diningTitle: "Dining on board",
    diningSections: [
      {
        title: "Main dining",
        body: "Buffet and à la carte service depending on vessel; special diets can be requested in advance.",
      },
      {
        title: "Sun deck & bar",
        body: "Light lunches, afternoon tea, and evening drinks with Nile views.",
      },
    ],
  };
}

function defaultNileSchedule(title: string) {
  return {
    title: "Schedule",
    tabs: [
      {
        id: "default",
        label: "Sailing dates",
        bar: {
          nights: "3 Nights",
          availability: "Around All Year",
          departure: `4 Day-Friday From Aswan`,
        },
      },
    ],
  };
}

function detailNile(
  slug: string,
  title: string,
  opts: Partial<Omit<TourPackagePageDetail, "slug" | "title">> &
    Pick<TourPackagePageDetail, "durationLabel" | "routeLabel" | "overviewIntro" | "sidebar">,
): TourPackagePageDetail {
  const gallery = opts.gallery ?? [...galleryNileDefault(title)];
  return {
    slug,
    title,
    listPath: "/nile-cruises",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Nile Cruises", href: "/nile-cruises" },
      { label: title },
    ],
    bestSeller: opts.bestSeller,
    highlights: opts.highlights ?? [...highlightsCruise],
    itinerary: opts.itinerary ?? itineraryDays(5, title),
    inclusions: opts.inclusions ?? [...inclusionsCruise],
    exclusions: opts.exclusions ?? [...exclusionsCruise],
    accommodation:
      opts.accommodation ??
      "Elegant en-suite cabins on a well-maintained Nile vessel or dahabiya. Exact ship or sailboat is confirmed before travel and may be substituted with an equivalent category.",
    accommodationItems:
      opts.accommodationItems ?? [
        "Nile-view or upper-deck cabin subject to availability",
        "Daily housekeeping and on-board concierge-style assistance",
      ],
    dateAndPrice:
      opts.dateAndPrice ??
      "Rates vary by season, cabin deck, and single-use policy. Request a quote for your exact travel window.",
    datePriceRows: opts.datePriceRows ?? [...datePriceRowsFor(opts.sidebar.price)],
    datePriceTravelLabel: opts.datePriceTravelLabel ?? "Travel dates",
    datePriceSortLabel: opts.datePriceSortLabel ?? "Start date (earliest)",
    reviews:
      opts.reviews ??
      "Travellers praise the rhythm of river days, friendly crews, and knowledgeable guides at each stop.",
    reviewCards: opts.reviewCards ?? [...reviewCardsDefault],
    audienceSegments: opts.audienceSegments ?? [...audienceSegmentsDefault],
    faqTitle: opts.faqTitle ?? "Frequently Asked Questions",
    faqItems: opts.faqItems ?? [...faqItemsDefault],
    gallery,
    ...opts,
    nileCruiseFacilities: opts.nileCruiseFacilities ?? defaultNileFacilities(title),
    nileSchedule: opts.nileSchedule ?? defaultNileSchedule(title),
  };
}

const stariaItinerary = [
  {
    label: "Day 1",
    title: "Aswan — embark the dahabiya",
    body: "Meet your crew, settle into your cabin, and enjoy a welcome refreshment. Afternoon felucca or motorboat options around Aswan’s islands when timing allows.",
    overnight: "On board Staria Dahabiya",
    meals: "Dinner on board",
  },
  {
    label: "Day 2",
    title: "Kom Ombo & sailing north",
    body: "Morning visit to the double temple at Kom Ombo, then unhurried sailing with time on deck to watch life along the Nile.",
    overnight: "On board Staria Dahabiya",
    meals: "Full board",
  },
  {
    label: "Day 3",
    title: "Edfu — Temple of Horus",
    body: "Horse-drawn carriage to Edfu’s towering temple of Horus, among the best preserved in Egypt, then sail toward Esna.",
    overnight: "On board Staria Dahabiya",
    meals: "Full board",
  },
  {
    label: "Day 4",
    title: "Esna lock & Luxor approach",
    body: "Transit the Esna lock, relax on deck, and begin Luxor’s West Bank story with guidance from your Egyptologist.",
    overnight: "On board Staria Dahabiya",
    meals: "Full board",
  },
  {
    label: "Day 5",
    title: "Luxor disembarkation",
    body: "Disembark after breakfast. Optional extensions for East Bank sites or airport transfers can be arranged on request.",
    meals: "Breakfast on board",
  },
] as const;

const STARIA_ITINERARY_PROGRAMS = [
  {
    id: "fri-5d",
    imageSrc: "/tours/5-days-luxury.webp",
    imageAlt: "Staria dahabiya on the Nile",
    nightsDaysBadge: "4 Nights / 5 Days",
    routeTitle: "Aswan – Kom Ombo – Edfu – Luxor — each Friday",
    priceFrom: 1399,
    days: [
      {
        label: "Day 1",
        title: "Welcome to Aswan and the Nubian Nile.",
        bullets: [
          {
            lead: "Welcome:",
            text: "Your tour leader meets you at the airport or hotel and assists with a smooth transfer to the embarkation point.",
          },
          {
            lead: "Sightseeing in Aswan:",
            text: "Board a small motorboat with your guide to Philae Temple and take in Aswan’s islands and Nubian colours from the water.",
          },
          {
            lead: "Check-in:",
            text: "Settle into your luxury cabin with time to unpack before the first evening on the river.",
          },
          {
            lead: "Lunch:",
            text: "Enjoy your first meal on The Terrace with Nile views and a relaxed pace.",
          },
          {
            lead: "Evening:",
            text: "Watch the shoreline soften at sunset and get to know the crew as the dahabiya finds its mooring for the night.",
          },
          { lead: "Overnight", text: "on board." },
        ],
      },
      {
        label: "Day 2",
        title: "Ancient temples & river life",
        bullets: [
          {
            lead: "Sailing:",
            text: "Morning sail toward Kom Ombo with commentary from your Egyptologist on life along the Nile.",
          },
          {
            lead: "Kom Ombo:",
            text: "Visit the double temple dedicated to Sobek and Haroeris, then return on board for lunch.",
          },
          { lead: "Afternoon:", text: "Free time on deck, tea service, and optional spa time before dinner." },
        ],
      },
      {
        label: "Day 3",
        title: "Edfu & Esna",
        bullets: [
          { lead: "Edfu:", text: "Carriage ride to the Temple of Horus, among the best preserved in Egypt." },
          { lead: "Esna:", text: "Transit the lock when routing allows, then sail toward Luxor." },
        ],
      },
      {
        label: "Day 4",
        title: "Luxor West Bank",
        bullets: [
          { lead: "West Bank:", text: "Valley of the Kings and mortuary highlights with flexible pacing." },
          { lead: "Evening:", text: "Captain’s dinner and storytelling under the stars." },
        ],
      },
      {
        label: "Day 5",
        title: "Disembarkation in Luxor",
        bullets: [
          { lead: "Breakfast:", text: "On board before farewells and transfers to the airport or your next hotel." },
        ],
      },
    ],
  },
  {
    id: "fri-4d",
    imageSrc: "/multi-day-tours/banner.webp",
    imageAlt: "Nile sailing at golden hour",
    nightsDaysBadge: "3 Nights / 4 Days",
    routeTitle: "Aswan – Kom Ombo – Edfu — compact Friday departure",
    priceFrom: 1849,
    days: [
      {
        label: "Day 1",
        title: "Aswan embarkation",
        bullets: [
          { lead: "Arrival:", text: "Meet & assist, then motorboat orientation on the Nile before boarding." },
          { lead: "Evening:", text: "Welcome dinner and safety briefing with the crew." },
        ],
      },
      {
        label: "Day 2",
        title: "Kom Ombo & Edfu",
        bullets: [
          { lead: "Temples:", text: "Kom Ombo in the morning and Edfu by horse-drawn carriage." },
          { lead: "Sailing:", text: "Afternoon glide toward Esna with time on the sun deck." },
        ],
      },
      {
        label: "Day 3",
        title: "Esna & Luxor approach",
        bullets: [{ lead: "Esna lock:", text: "Lock transit when scheduled, then sail toward Luxor." }],
      },
      {
        label: "Day 4",
        title: "Luxor & farewell",
        bullets: [{ lead: "Morning:", text: "Disembark after breakfast; optional East Bank add-ons on request." }],
      },
    ],
  },
] as const;

const STARIA_CRUISE_FACILITIES = {
  monumentalTitle: "Monumental experiences",
  monumentalIntro:
    "Between Luxor and Aswan, Staria threads the Nile’s most storied banks: Philae, Kom Ombo, Edfu, Esna, and the great monuments of Luxor. Moorings favour quieter bays when conditions allow, so evenings feel intimate and unhurried.",
  accommodationTitle: "Accommodation",
  accommodationBullets: [
    "6 Storia luxury cabins — 28 sqm (301 sq ft)",
    "1 Polaris suite — 60 sqm (646 sq ft)",
    "1 Moonlight suite — 70 sqm (753 sq ft)",
  ],
  accommodationNarrative:
    "Cabins pair warm woods with crisp linens and picture windows toward the river. Upper-deck categories add space for lounging; connecting layouts are available on request. Bathrooms are finished in stone with rainfall showers; select suites add a glass-front balcony for private Nile views.",
  diningTitle: "The dining on Staria Dahabiya",
  diningSections: [
    {
      title: "The dining room",
      body: "Chef-led menus celebrate Egyptian produce and Mediterranean lightness, served in an intimate room with wraparound river views.",
    },
    {
      title: "The terrace",
      body: "Open-air lunches, sunset cocktails, and a compact plunge pool on the sun deck make the most of golden-hour sailing.",
    },
    {
      title: "The Storia salon",
      body: "A quiet salon for tea, briefings, and evening briefings from your Egyptologist—always with the Nile in sight.",
    },
  ],
} as const;

const STARIA_SCHEDULE = {
  title: "Schedule",
  tabs: [
    {
      id: "fri-5d",
      label: "4 Nights / 5 Days",
      bar: {
        nights: "4 Nights",
        availability: "Around All Year",
        departure: "Friday from Aswan (5-day programme)",
      },
    },
    {
      id: "fri-4d",
      label: "3 Nights / 4 Days",
      bar: {
        nights: "3 Nights",
        availability: "Around All Year",
        departure: "4 Day-Friday From Aswan",
      },
    },
  ],
} as const;

export const nileCruisePackageDetails: Record<string, TourPackagePageDetail> = {
  "staria-nile-dahabiya": detailNile("staria-nile-dahabiya", "Staria Nile Dahabiya", {
    bestSeller: true,
    durationLabel: "5 Days",
    routeLabel: "Aswan → Kom Ombo → Edfu → Esna → Luxor",
    overviewIntro:
      "Sail the Nile at a human pace aboard the Staria dahabiya: refined cabins, attentive crew, and carefully paced temple days between Aswan and Luxor. Evenings are for starlit decks, gentle breezes, and Egyptian hospitality.",
    sidebar: {
      price: 1350,
      priceWas: 1600,
      discountPercent: 16,
      durationInfo: "5 Days / 4 Nights",
      destination: "Luxor & Aswan",
      tourType: "Nile Cruise",
    },
    highlights: [
      "Private-style dahabiya with a high crew-to-guest ratio",
      "Route: Aswan, Kom Ombo, Edfu, Esna, and Luxor highlights",
      "Egyptologist-led excursions at major riverside temples",
      "Open-air dining and sun deck for golden-hour sailing",
      "Flexible moorings away from the largest cruiser crowds when conditions allow",
    ],
    itinerary: [...stariaItinerary],
    inclusions: [
      "Four nights on board Staria Dahabiya in booked cabin category",
      "Daily breakfast, lunch, and dinner on board unless stated",
      "Guided sightseeing as per the published sailing programme",
      "Transfers from Aswan airport/station to embarkation when booked as a package",
    ],
    exclusions: [
      "International flights and Egypt entry visa",
      "Entrance fees to monuments (often paid locally)",
      "Optional tours and tips for crew and guides",
      "Travel insurance and personal expenses",
    ],
    accommodation:
      "Staria offers a limited number of en-suite cabins finished in warm woods and soft linens. Upper-deck cabins are prized for panoramic Nile views—request early when booking.",
    accommodationItems: [
      "Climate-controlled en-suite cabin with private bathroom",
      "Sun deck lounges, shaded outdoor dining, and indoor salon",
    ],
    dateAndPrice:
      "Published from-prices are per person based on double occupancy. Solo travellers and peak holiday windows may differ—request a tailored quote.",
    gallery: [
      { src: "/tours/5-days-luxury.webp", alt: "Staria Nile Dahabiya on the Nile" },
      { src: "/multi-day-tours/banner.webp", alt: "Staria — river sailing" },
      { src: "/multi-day-tours/egypt-tour/luxor.webp", alt: "Staria — Luxor temples" },
      { src: "/multi-day-tours/egypt-tour/aswan.webp", alt: "Staria — Aswan" },
    ],
    nileItineraryPrograms: STARIA_ITINERARY_PROGRAMS as TourPackagePageDetail["nileItineraryPrograms"],
    nileCruiseFacilities: STARIA_CRUISE_FACILITIES as TourPackagePageDetail["nileCruiseFacilities"],
    nileSchedule: STARIA_SCHEDULE as TourPackagePageDetail["nileSchedule"],
  }),

  "sanctuary-sun-boat": detailNile("sanctuary-sun-boat", "Sanctuary Sun Boat — Luxor to Aswan", {
    durationLabel: "7 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Ultra-luxury suites, private balconies, and curated temple days between Luxor and Aswan aboard Sanctuary’s acclaimed Sun Boat.",
    sidebar: {
      price: 1890,
      priceWas: 2200,
      durationInfo: "7 Nights",
      destination: "Nile River",
      tourType: "Nile Cruise",
    },
    itinerary: itineraryDays(7, "Sun Boat"),
  }),

  "oberoi-zahra": detailNile("oberoi-zahra", "Oberoi Zahra 7-night signature cruise", {
    durationLabel: "7 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Spa, fine dining, and spacious suites with butler-led service on one of the Nile’s most celebrated vessels.",
    sidebar: { price: 2450, durationInfo: "7 Nights", destination: "Nile River", tourType: "Nile Cruise" },
    itinerary: itineraryDays(7, "Zahra"),
  }),

  "ms-mayfair": detailNile("ms-mayfair", "MS Mayfair luxury 6 nights", {
    durationLabel: "6 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Polished service, pool and sun deck, and wine-pairing evenings between the classic Upper Egypt sites.",
    sidebar: {
      price: 1650,
      priceWas: 1890,
      durationInfo: "6 Nights",
      destination: "Nile River",
      tourType: "Nile Cruise",
    },
    itinerary: itineraryDays(6, "Mayfair"),
  }),

  "sonesta-st-george": detailNile("sonesta-st-george", "Sonesta St George 5 nights", {
    durationLabel: "5 Nights",
    routeLabel: "Luxor area",
    overviewIntro:
      "Five-star comfort, evening entertainment, and a full temple programme from a trusted Nile operator.",
    sidebar: {
      price: 980,
      priceWas: 1150,
      durationInfo: "5 Nights",
      destination: "Luxor & Aswan",
      tourType: "Nile Cruise",
    },
    itinerary: itineraryDays(5, "St George"),
  }),

  "amoura-dahabiya": detailNile("amoura-dahabiya", "Amoura Dahabiya private charter", {
    durationLabel: "6 Nights",
    routeLabel: "Flexible moorings",
    overviewIntro:
      "Intimate dahabiya for small groups who want flexible moorings, home-style cuisine, and quiet Nile nights.",
    sidebar: { price: 1420, durationInfo: "6 Nights", destination: "Nile River", tourType: "Nile Cruise" },
    itinerary: itineraryDays(6, "Amoura"),
  }),

  nebyt: detailNile("nebyt", "Nebyt Dahabiya 5 nights classic", {
    durationLabel: "5 Nights",
    routeLabel: "Aswan → Luxor",
    overviewIntro:
      "Handcrafted decks, relaxed sailing, and village stops for an authentic slow-travel Nile rhythm.",
    sidebar: { price: 1180, durationInfo: "5 Nights", destination: "Nile River", tourType: "Nile Cruise" },
    itinerary: itineraryDays(5, "Nebyt"),
  }),

  "merit-dahabiya": detailNile("merit-dahabiya", "Merit Dahabiya Aswan → Luxor", {
    durationLabel: "5 Nights",
    routeLabel: "Aswan → Luxor",
    overviewIntro:
      "Open-air dining, small groups, and optional Abu Simbel extensions when scheduling allows.",
    sidebar: { price: 1095, durationInfo: "5 Nights", destination: "Nile River", tourType: "Nile Cruise" },
    itinerary: itineraryDays(5, "Merit"),
  }),

  "el-nil-family": detailNile("el-nil-family", "El Nil Dahabiya family week", {
    durationLabel: "7 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Family-friendly pacing with cabins suited to parents and children plus optional Red Sea add-ons.",
    sidebar: {
      price: 890,
      priceWas: 1020,
      durationInfo: "7 Nights",
      destination: "Nile River",
      tourType: "Nile Cruise",
    },
    itinerary: itineraryDays(7, "El Nil"),
  }),

  "princess-sarah": detailNile("princess-sarah", "MS Princess Sarah 4 nights", {
    durationLabel: "4 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Full-board value with guided temples and a lively sun deck—ideal for first-time Nile cruisers.",
    sidebar: {
      price: 620,
      priceWas: 750,
      durationInfo: "4 Nights",
      destination: "Nile River",
      tourType: "Nile Cruise",
    },
    itinerary: itineraryDays(4, "Princess Sarah"),
  }),

  "nile-style": detailNile("nile-style", "MS Nile Style 3 nights express", {
    durationLabel: "3 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Short hop covering East and West Bank highlights with shared guiding and airport transfers when packaged.",
    sidebar: { price: 445, durationInfo: "3 Nights", destination: "Luxor & Aswan", tourType: "Nile Cruise" },
    itinerary: itineraryDays(3, "Nile Style"),
  }),

  "royal-ruby": detailNile("royal-ruby", "MS Royal Ruby 7 nights value", {
    durationLabel: "7 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Spacious cabins, all meals included, and traditional galabiya night for a sociable on-board atmosphere.",
    sidebar: { price: 720, durationInfo: "7 Nights", destination: "Nile River", tourType: "Nile Cruise" },
    itinerary: itineraryDays(7, "Royal Ruby"),
  }),

  concerto: detailNile("concerto", "MS Concerto 5 nights budget-friendly", {
    durationLabel: "5 Nights",
    routeLabel: "Luxor ↔ Aswan",
    overviewIntro:
      "Pool on board, English-speaking crew, and optional hot-air balloon over Luxor’s West Bank.",
    sidebar: {
      price: 510,
      priceWas: 590,
      durationInfo: "5 Nights",
      destination: "Nile River",
      tourType: "Nile Cruise",
    },
    itinerary: itineraryDays(5, "Concerto"),
  }),
};

export const nileCruisePackageSlugs = Object.keys(nileCruisePackageDetails);

export function getNileCruisePackageDetail(slug: string): TourPackagePageDetail | undefined {
  return nileCruisePackageDetails[slug];
}
