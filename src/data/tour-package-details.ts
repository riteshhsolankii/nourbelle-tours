import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { homeFaqs } from "@/data/site-static";

/** Default multi-day package gallery (local `public/` assets). */
function galleryMultiDefault(title: string) {
  return [
    { src: "/multi-day-tours/banner.webp", alt: `${title} — Egypt experience` },
    { src: "/multi-day-tours/egypt-tour/luxor.webp", alt: `${title} — Luxor` },
    { src: "/tours/multi-day-tours.webp", alt: `${title} — Pyramids and Nile` },
    { src: "/multi-day-tours/egypt-tour/aswan.webp", alt: `${title} — Aswan` },
  ] as const;
}

/** Default day-tour gallery (local `public/` assets). */
function galleryDayDefault(title: string) {
  return [
    { src: "/destinations/cairo.webp", alt: `${title} — destination` },
    { src: "/multi-day-tours/egypt-tour/cairo.webp", alt: `${title} — sightseeing` },
    { src: "/destinations/luxor.webp", alt: `${title} — temples` },
    { src: "/multi-day-tours/egypt-tour/aswan.webp", alt: `${title} — Nile` },
  ] as const;
}

function itineraryDays(n: number, prefix: string) {
  return Array.from({ length: n }, (_, i) => ({
    label: `Day ${i + 1}`,
    title: `${prefix} — day ${i + 1} highlights`,
    body: "Licensed Egyptologist guiding, comfortable private transport, and time for photos at each site. Meals as per itinerary.",
    overnight: i === 0 ? "Hotel in Cairo" : "Hotel as per itinerary",
    meals: "Meals included where noted each day",
  }));
}

const highlightsDefault = [
  "Licensed Egyptologist guides throughout",
  "Carefully paced sightseeing with rest breaks",
  "Hand-picked hotels or cruise cabin upgrades on request",
  "24/7 local assistance from the Nourbelle team",
] as const;

const inclusionsDefault = [
  "Accommodation as per itinerary",
  "Daily breakfast; selected lunches or dinners where noted",
  "Private airport and intercity transfers",
  "Entrance fees to sites listed in the programme",
  "Domestic flights when shown in the itinerary",
] as const;

const exclusionsDefault = [
  "Entrance fees to optional attractions not in the programme",
  "Optional excursions and personal activities",
  "Tips for crew, drivers, and guide",
  "Pre or post-tour accommodation",
  "Other meals and drinks not mentioned",
] as const;

function datePriceRowsDefault(basePrice: number) {
  return [
    { start: "Tuesday 8 Jan 2026", end: "Tuesday 15 Jan 2026", price: Math.max(basePrice - 250, 350) },
    { start: "Thursday 10 Feb 2026", end: "Thursday 17 Feb 2026", price: Math.max(basePrice - 120, 390) },
    { start: "Tuesday 22 Jan 2026", end: "Tuesday 29 Jan 2026", price: Math.max(basePrice - 100, 420) },
    { start: "Thursday 3 Feb 2026", end: "Thursday 10 Feb 2026", price: basePrice + 640 },
  ] as const;
}

const reviewCardsDefault = [
  {
    title: "Recommended!",
    body: "Everything very well arranged. Friendly people, informed guides, and seamless day planning from arrival to departure.",
    author: "DAVY DECLERCQ",
    date: "4/20/2024",
    rating: 5 as const,
  },
  {
    title: "Highly Recommended!",
    body: "Our tour guides took great care of us and answered every question. The trip felt smooth and stress-free from start to finish.",
    author: "JENNY JENN",
    date: "3/14/2024",
    rating: 5 as const,
  },
] as const;

const audienceSegmentsDefault = ["Families", "Couples", "Solo Travelers", "Seniors", "First-Time Visitors", "Luxury Seekers"] as const;
const faqItemsDefault = homeFaqs.items.map((item) => ({
  id: item.id,
  question: item.question,
  answer: item.answer,
}));

function detailMulti(
  slug: string,
  title: string,
  opts: Partial<Omit<TourPackagePageDetail, "slug" | "title">> &
    Pick<TourPackagePageDetail, "durationLabel" | "routeLabel" | "overviewIntro" | "sidebar">,
): TourPackagePageDetail {
  const gallery = opts.gallery ?? [...galleryMultiDefault(title)];
  return {
    slug,
    title,
    listPath: "/multi-day-egypt-tours",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Multi Egypt Day Tours", href: "/multi-day-egypt-tours" },
      { label: title },
    ],
    bestSeller: opts.bestSeller,
    highlights: opts.highlights ?? [...highlightsDefault],
    itinerary: opts.itinerary ?? itineraryDays(8, title),
    inclusions: opts.inclusions ?? [...inclusionsDefault],
    exclusions: opts.exclusions ?? [...exclusionsDefault],
    accommodation: opts.accommodation ?? "4–5 star hotels in Cairo, Luxor, and Aswan, plus a 5-star Nile cruise vessel with en-suite cabins. Exact properties are confirmed before travel and may be substituted with equivalent hotels.",
    accommodationItems:
      opts.accommodationItems ?? [
        "4-Star hotel in Cairo (daily breakfast included)",
        "5-Star standard Nile cruise boat (full-board meals included)",
      ],
    dateAndPrice:
      opts.dateAndPrice ??
      "Rates vary by season and cabin category. Request a quote for your exact dates; private departures and single supplements available on request.",
    datePriceRows: opts.datePriceRows ?? datePriceRowsDefault(opts.sidebar.price),
    datePriceTravelLabel: opts.datePriceTravelLabel ?? "Travel dates",
    datePriceSortLabel: opts.datePriceSortLabel ?? "Start date (earliest)",
    reviews:
      opts.reviews ??
      "Guests consistently praise our guides’ knowledge and pacing. Full reviews will connect to your live review feed when integrated.",
    reviewCards: opts.reviewCards ?? [...reviewCardsDefault],
    audienceSegments: opts.audienceSegments ?? [...audienceSegmentsDefault],
    faqTitle: opts.faqTitle ?? "Frequently Asked Questions",
    faqItems: opts.faqItems ?? [...faqItemsDefault],
    gallery,
    ...opts,
  };
}

function detailDay(
  slug: string,
  title: string,
  opts: Partial<Omit<TourPackagePageDetail, "slug" | "title">> &
    Pick<TourPackagePageDetail, "durationLabel" | "routeLabel" | "overviewIntro" | "sidebar">,
): TourPackagePageDetail {
  const gallery = opts.gallery ?? [...galleryDayDefault(title)];
  return {
    slug,
    title,
    listPath: "/day-tours",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Day Tours", href: "/day-tours" },
      { label: title },
    ],
    highlights: opts.highlights ?? [...highlightsDefault.slice(0, 3), "Hotel pickup and drop-off included"],
    itinerary:
      opts.itinerary ??
      [
        {
          label: "Morning",
          title: "Pickup & first sites",
          body: "Morning pickup from your hotel, guided visits, and time for photos.",
        },
        {
          label: "Afternoon",
          title: "Continued exploration",
          body: "Flexible pacing with your guide; lunch break as preferred.",
        },
      ],
    inclusions: opts.inclusions ?? [
      "Licensed guide for the duration",
      "Private vehicle with driver",
      "Entry tickets as listed",
      "Bottled water on board",
    ],
    exclusions: opts.exclusions ?? [
      "International airfare and visa",
      "Personal expenses and shopping",
      "Meals not listed in the tour plan",
      "Optional add-ons or upgraded transport",
    ],
    accommodation: opts.accommodation ?? "This is a day excursion — overnight accommodation is not included.",
    accommodationItems: opts.accommodationItems ?? ["Private day-use vehicle and guide service only (no overnight stay)"],
    dateAndPrice:
      opts.dateAndPrice ??
      "Day tours operate daily subject to availability. Contact us for private vehicle upgrades or larger groups.",
    datePriceRows: opts.datePriceRows ?? datePriceRowsDefault(opts.sidebar.price),
    datePriceTravelLabel: opts.datePriceTravelLabel ?? "Travel dates",
    datePriceSortLabel: opts.datePriceSortLabel ?? "Start date (earliest)",
    reviews: opts.reviews ?? "Recent travellers highlight punctual pickups and knowledgeable guides.",
    reviewCards: opts.reviewCards ?? [...reviewCardsDefault],
    audienceSegments: opts.audienceSegments ?? [...audienceSegmentsDefault],
    faqTitle: opts.faqTitle ?? "Frequently Asked Questions",
    faqItems: opts.faqItems ?? [...faqItemsDefault],
    gallery,
    ...opts,
  };
}

export const multiDayTourDetails: Record<string, TourPackagePageDetail> = {
  "pyramids-explorer": detailMulti("pyramids-explorer", "Guided Tour of Cairo & 5-Star Nile Cruise", {
    bestSeller: true,
    subtitle: "Pyramids, Temples & Timeless Wonders",
    ratingValue: 4.9,
    ratingCount: 212,
    durationLabel: "8 Days",
    routeLabel: "Start and end in Cairo",
    overviewIntro:
      "Discover Egypt’s greatest treasures on this balanced journey: Cairo’s pyramids and museums, then a relaxed 5-star Nile cruise between Luxor and Aswan with expert-led temple visits. Perfect for first-time visitors who want comfort, clarity, and authentic local insight.",
    sidebar: {
      price: 800,
      priceWas: 1000,
      discountPercent: 20,
      durationInfo: "8 Days",
      destination: "Cairo",
      tourType: "Tour Packages",
    },
    highlights: [
      "Giza Plateau & Sphinx with private Egyptologist",
      "Egyptian Museum (or GEM when routing allows)",
      "5-star Nile cruise with balcony cabin category options",
      "Karnak, Luxor Temple, Valley of the Kings, and Philae",
      "Felucca sail or motorboat crossings as per season",
    ],
    itinerary: [
      {
        label: "Day 1",
        title: "Arrive Cairo",
        body: "Meet & assist at the airport, transfer to your hotel, and welcome briefing with your tour coordinator.",
      },
      {
        label: "Day 2",
        title: "Pyramids & Saqqara",
        body: "Full-day exploration of Giza and Saqqara with flexible photo stops and lunch at a local restaurant.",
      },
      {
        label: "Day 3",
        title: "Museum & flight to Luxor",
        body: "Morning museum visit, then flight to Luxor and embark your Nile cruise.",
      },
      {
        label: "Days 4–7",
        title: "Nile cruise programme",
        body: "East and West Bank highlights, Edfu and Kom Ombo temples, and Aswan sightseeing including Philae.",
      },
      {
        label: "Day 8",
        title: "Return Cairo & departure",
        body: "Flight to Cairo and transfer to the airport for your outbound flight.",
      },
    ],
    placesToVisit: ["Cairo", "Giza", "Saqqara", "Luxor", "Edfu", "Kom Ombo", "Aswan"],
    gallery: [
      { src: "/tours/multi-day-tours.webp", alt: "Guided Tour of Cairo & 5-Star Nile Cruise — main" },
      { src: "/multi-day-tours/egypt-tour/luxor.webp", alt: "Guided Tour of Cairo & 5-Star Nile Cruise — Luxor" },
      { src: "/multi-day-tours/banner.webp", alt: "Guided Tour of Cairo & 5-Star Nile Cruise — Nile" },
      { src: "/tours/8-days-legends.webp", alt: "Guided Tour of Cairo & 5-Star Nile Cruise — temples" },
    ],
    hotelCards: [
      { name: "Cairo City Hotel", imageSrc: "/destinations/cairo.webp", imageAlt: "Hotel in Cairo near Islamic Cairo", stars: 4, location: "Cairo" },
      { name: "Nile-View Hotel, Luxor", imageSrc: "/destinations/luxor.webp", imageAlt: "Hotel overlooking Luxor temples", stars: 4, location: "Luxor" },
      { name: "5-Star Nile Cruise Vessel", imageSrc: "/tours/5-days-luxury.webp", imageAlt: "5-star Nile cruise ship", stars: 5, location: "Luxor → Aswan" },
    ],
    addons: [
      { title: "Hot Air Balloon in Luxor", imageSrc: "/tours/8-days-legends.webp", imageAlt: "Hot air balloons over Luxor at sunrise", priceFrom: 120 },
      { title: "Abu Simbel Day Trip", imageSrc: "/tours/multi-day-tours.webp", imageAlt: "Abu Simbel temple facade", priceFrom: 160 },
    ],
  }),
  "nile-odyssey": detailMulti("nile-odyssey", "5 Day Luxury Dahabiya Nile Cruise", {
    bestSeller: true,
    durationLabel: "5 Days",
    routeLabel: "Luxor to Aswan",
    overviewIntro:
      "Explore hidden Gems in Cairo and embark on a magical cruise on the renowned River Nile with our guided Egypt tour. This carefully curated journey offers the optimal way to witness historical and iconic Egyptian landmarks and immerse yourself in its captivating culture.",
    sidebar: {
      price: 350,
      priceWas: 700,
      discountPercent: 50,
      durationInfo: "5 Days",
      destination: "Luxor & Aswan",
      tourType: "Tour Packages",
    },
    itinerary: itineraryDays(5, "Dahabiya"),
    placesToVisit: ["Cairo", "Aswan", "Kom Ombo", "Edfu", "Luxor"],
    gallery: [
      { src: "/tours/5-days-luxury.webp", alt: "5 Day Luxury Dahabiya Nile Cruise — dahabiya on the Nile" },
      { src: "/multi-day-tours/egypt-tour/luxor.webp", alt: "5 Day Luxury Dahabiya Nile Cruise — Luxor" },
      { src: "/multi-day-tours/banner.webp", alt: "5 Day Luxury Dahabiya Nile Cruise — river views" },
      { src: "/multi-day-tours/egypt-tour/aswan.webp", alt: "5 Day Luxury Dahabiya Nile Cruise — Aswan" },
    ],
  }),
  "giza-highlights": detailMulti("giza-highlights", "8 Day Legends of Egypt Tour", {
    durationLabel: "8 Days",
    routeLabel: "Cairo, Luxor & Aswan",
    overviewIntro:
      "A classic grand tour of Egypt’s icons: Cairo’s antiquities, domestic flights to Upper Egypt, and immersive temple days with time to unwind each evening.",
    sidebar: {
      price: 950,
      priceWas: 1000,
      discountPercent: 5,
      durationInfo: "8 Days",
      destination: "Cairo, Luxor, Aswan",
      tourType: "Tour Packages",
    },
    itinerary: itineraryDays(8, "Legends"),
    placesToVisit: ["Cairo", "Luxor", "Edfu", "Kom Ombo", "Aswan"],
    gallery: [
      { src: "/tours/8-days-legends.webp", alt: "8 Day Legends of Egypt Tour — main" },
      { src: "/multi-day-tours/egypt-tour/cairo.webp", alt: "8 Day Legends of Egypt Tour — Cairo" },
      { src: "/multi-day-tours/egypt-tour/luxor.webp", alt: "8 Day Legends of Egypt Tour — Luxor" },
      { src: "/multi-day-tours/egypt-tour/aswan.webp", alt: "8 Day Legends of Egypt Tour — Aswan" },
    ],
  }),
};

export const dayTourDetails: Record<string, TourPackagePageDetail> = {
  "cairo-in-a-day": detailDay("cairo-in-a-day", "Cairo in a day — Museums & Khan", {
    durationLabel: "1 Day",
    routeLabel: "Pickup in Cairo",
    overviewIntro:
      "Pack Cairo’s essentials into one well-paced day: world-class antiquities, Old Cairo atmosphere, and time to browse Khan el-Khalili with your private guide.",
    dayItineraryCardTitle: "Your Day in Egypt Exploring the Pyramids of Giza & The Egyptian Museum",
    dayTourTransportPill: "To and from your hotel in Cairo or Giza, and throughout the tour between locations",
    dayTourMealsPill: "Lunch at a local restaurant",
    itinerary: [
      {
        label: "Morning",
        title: "",
        body: "Start the morning at the Giza Plateau with your private Egyptologist: the Great Pyramid of Khufu, the Sphinx, and panoramic viewpoints with time for photos away from the busiest angles.",
      },
      {
        label: "Afternoon",
        title: "",
        body: "After a relaxed lunch, continue to the Egyptian Museum (or Grand Egyptian Museum when open and routing allows) to walk among pharaonic masterpieces before optional browsing time in Khan el-Khalili.",
      },
    ],
    placesToVisit: ["Giza Plateau", "Great Pyramid of Khufu", "Sphinx", "Egyptian Museum", "Khan el-Khalili"],
    sidebar: {
      price: 85,
      priceWas: 110,
      durationInfo: "1 Day",
      destination: "Cairo",
      tourType: "Day Tour",
    },
    gallery: [
      { src: "/destinations/cairo.webp", alt: "Cairo in a day — Cairo skyline" },
      { src: "/multi-day-tours/egypt-tour/cairo.webp", alt: "Cairo in a day — museums and streets" },
      { src: "/multi-day-tours/banner.webp", alt: "Cairo in a day — landmarks" },
      { src: "/multi-day-tours/egypt-tour/family-tour.webp", alt: "Cairo in a day — Old Cairo" },
    ],
  }),
  "luxor-temples": detailDay("luxor-temples", "Luxor temples & tombs", {
    durationLabel: "1 Day",
    routeLabel: "Pickup in Luxor",
    overviewIntro:
      "Walk the great hypostyle hall at Karnak, stroll Luxor Temple at golden hour, and descend into royal tombs in the Valley of the Kings.",
    placesToVisit: ["Karnak Temple", "Luxor Temple", "Valley of the Kings"],
    sidebar: {
      price: 95,
      durationInfo: "1 Day",
      destination: "Luxor",
      tourType: "Day Tour",
    },
    gallery: [
      { src: "/destinations/luxor.webp", alt: "Luxor temples — Karnak" },
      { src: "/multi-day-tours/egypt-tour/luxor.webp", alt: "Luxor — West Bank" },
      { src: "/multi-day-tours/banner.webp", alt: "Luxor — Nile" },
      { src: "/insights/group-tour-1.webp", alt: "Luxor — guided tour" },
    ],
  }),
  "giza-half-day": detailDay("giza-half-day", "Giza pyramids & Sphinx half-day", {
    durationLabel: "Half day",
    routeLabel: "Pickup in Cairo / Giza",
    overviewIntro:
      "Beat the heat with an early start at the Giza Plateau: pyramids, Sphinx, and panoramic viewpoints with stories that go beyond the guidebooks.",
    placesToVisit: ["Giza Plateau", "Great Pyramid", "Panoramic Viewpoint", "Sphinx"],
    sidebar: {
      price: 45,
      priceWas: 60,
      discountPercent: 25,
      durationInfo: "Half day",
      destination: "Giza",
      tourType: "Day Tour",
    },
    gallery: [
      { src: "/tours/multi-day-tours.webp", alt: "Giza pyramids and Sphinx" },
      { src: "/destinations/cairo.webp", alt: "Giza plateau views" },
      { src: "/multi-day-tours/banner.webp", alt: "Pyramids landscape" },
      { src: "/multi-day-tours/egypt-tour/cairo.webp", alt: "Cairo & Giza tour" },
    ],
  }),
  "aswan-philae": detailDay("aswan-philae", "Aswan Philae & Nubian village full-day", {
    durationLabel: "1 Day",
    routeLabel: "Pickup in Aswan",
    overviewIntro:
      "Motorboat to Philae Temple, then sail or drive to a Nubian village for tea, crafts, and Nile views away from the crowds.",
    placesToVisit: ["Philae Temple", "Nubian Village", "Aswan Corniche"],
    sidebar: {
      price: 110,
      priceWas: 135,
      durationInfo: "1 Day",
      destination: "Aswan",
      tourType: "Day Tour",
    },
    gallery: [
      { src: "/multi-day-tours/egypt-tour/aswan.webp", alt: "Aswan — Philae and Nile" },
      { src: "/multi-day-tours/banner.webp", alt: "Aswan river views" },
      { src: "/destinations/luxor.webp", alt: "Upper Egypt temples" },
      { src: "/insights/group-tour-1.webp", alt: "Aswan guided experience" },
    ],
  }),
  alexandria: detailDay("alexandria", "Alexandria day trip from Cairo", {
    durationLabel: "1 Day",
    routeLabel: "From Cairo",
    overviewIntro:
      "Coastal history in one day: catacombs, Roman traces, waterfront Corniche, and a photo stop at the modern library.",
    placesToVisit: ["Catacombs of Kom El Shoqafa", "Alexandria Corniche", "Bibliotheca Alexandrina"],
    sidebar: {
      price: 125,
      durationInfo: "1 Day",
      destination: "Alexandria",
      tourType: "Day Tour",
    },
    gallery: [
      { src: "/destinations/alexandria.webp", alt: "Alexandria waterfront" },
      { src: "/multi-day-tours/egypt-tour/cairo.webp", alt: "Day trip from Cairo" },
      { src: "/multi-day-tours/banner.webp", alt: "Mediterranean coast" },
      { src: "/insights/group-tour-1.webp", alt: "Alexandria sightseeing" },
    ],
  }),
  "hurghada-safari": detailDay("hurghada-safari", "Hurghada desert safari & Bedouin dinner", {
    durationLabel: "1 Day",
    routeLabel: "Pickup in Hurghada",
    overviewIntro:
      "Golden-hour dunes, Bedouin hospitality, and a relaxed dinner under the stars after an adrenaline-filled afternoon.",
    placesToVisit: ["Eastern Desert", "Bedouin Camp", "Hurghada Dunes"],
    sidebar: {
      price: 75,
      priceWas: 90,
      discountPercent: 17,
      durationInfo: "1 Day",
      destination: "Hurghada",
      tourType: "Day Tour",
    },
    gallery: [
      { src: "/destinations/hurghada.webp", alt: "Hurghada Red Sea" },
      { src: "/multi-day-tours/egypt-tour/hurghada.webp", alt: "Desert and coast" },
      { src: "/multi-day-tours/banner.webp", alt: "Eastern desert" },
      { src: "/insights/group-tour-1.webp", alt: "Safari experience" },
    ],
  }),
};

export const multiDayTourSlugs = Object.keys(multiDayTourDetails);
export const dayTourSlugs = Object.keys(dayTourDetails);

export function getMultiDayTourDetail(slug: string): TourPackagePageDetail | undefined {
  return multiDayTourDetails[slug];
}

export function getDayTourDetail(slug: string): TourPackagePageDetail | undefined {
  return dayTourDetails[slug];
}
