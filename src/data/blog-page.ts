export type BlogCategoryId =
  | "all"
  | "travel-tips"
  | "destination-guides"
  | "itinerary-ideas"
  | "culture-history";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  category: Exclude<BlogCategoryId, "all">;
};

export const blogPageCategories = [
  { id: "all" as const, label: "All Articles" },
  { id: "travel-tips" as const, label: "Travel Tips" },
  { id: "destination-guides" as const, label: "Destination Guides" },
  { id: "itinerary-ideas" as const, label: "Itinerary Ideas" },
  { id: "culture-history" as const, label: "Culture & History" },
] as const;

export const blogPosts: readonly BlogPost[] = [
  {
    slug: "best-places-to-visit-egypt-2026",
    title: "Best Places to Visit in Egypt 2026 – Egypt Destinations",
    excerpt:
      "From Cairo and Giza to Luxor, Aswan, and the Red Sea — a practical guide to Egypt's must-see regions and how to combine them.",
    href: "/blog/best-places-to-visit-egypt-2026",
    imageSrc: "/insights/group-tour-1.webp",
    imageAlt: "Travellers visiting the Pyramids of Giza",
    category: "destination-guides",
  },
  {
    slug: "2-week-egypt-itinerary",
    title: "2 Week Egypt Itinerary: Best of Egypt in 14 Days",
    excerpt:
      "Balance Cairo, the Nile, and the coast with room for rest days — a fourteen-day plan built for first-time visitors.",
    href: "/blog/2-week-egypt-itinerary",
    imageSrc: "/multi-day-tours/egypt-tour/travelers-tour.webp",
    imageAlt: "Group tour in Egypt",
    category: "itinerary-ideas",
  },
  {
    slug: "nile-river-cruise-luxor-aswan",
    title: "Nile River Cruise from Luxor to Aswan: A Complete Guide",
    excerpt:
      "Choose your ship, plan temple days, and know what to pack for a relaxed sail between Egypt's greatest open-air museums.",
    href: "/blog/nile-river-cruise-luxor-aswan",
    imageSrc: "/multi-day-tours/egypt-tour/luxor.webp",
    imageAlt: "Nile cruise near Luxor",
    category: "travel-tips",
  },
  {
    slug: "cairo-layover-7-hours",
    title: "Cairo Layover 7 Hours: A Perfect Short Visit",
    excerpt:
      "Make the most of a half-day stopover with a focused route through Giza or the Egyptian Museum — timing and transfers included.",
    href: "/blog/cairo-layover-7-hours",
    imageSrc: "/destinations/cairo.webp",
    imageAlt: "Cairo skyline and landmarks",
    category: "itinerary-ideas",
  },
  {
    slug: "visit-egypt-on-a-budget",
    title: "How to Visit Egypt on a Budget: 13 Tips",
    excerpt:
      "Smart savings on hotels, guides, and sightseeing without missing the highlights — what to book ahead and where to splurge.",
    href: "/blog/visit-egypt-on-a-budget",
    imageSrc: "/about/nourbelle-van.webp",
    imageAlt: "Nourbelle Tours transport",
    category: "travel-tips",
  },
  {
    slug: "abu-simbel-day-trip-aswan",
    title: "Abu Simbel Day Trip from Aswan Guide",
    excerpt:
      "Early starts, flight vs road options, and what to expect at Ramses II's temples — everything for a smooth Abu Simbel day.",
    href: "/blog/abu-simbel-day-trip-aswan",
    imageSrc: "/multi-day-tours/egypt-tour/aswan.webp",
    imageAlt: "Aswan and Upper Egypt scenery",
    category: "destination-guides",
  },
  {
    slug: "egypt-visa-us-citizens-2026",
    title: "Egypt Visa for US Citizens 2026: How to Apply",
    excerpt:
      "e-Visa steps, fees, and timelines for American travellers — plus passport rules and what to print before you fly.",
    href: "/blog/egypt-visa-us-citizens-2026",
    imageSrc: "/destinations/luxor.webp",
    imageAlt: "Travellers at an Egyptian temple",
    category: "travel-tips",
  },
  {
    slug: "is-egypt-safe",
    title: "Is Egypt Safe? Crime Rate, Tourist Areas, and More",
    excerpt:
      "Honest context on tourist zones, common scams, and how to travel confidently with a reputable local operator.",
    href: "/blog/is-egypt-safe",
    imageSrc: "/multi-day-tours/egypt-tour/family-tour.webp",
    imageAlt: "Family enjoying an Egypt tour",
    category: "culture-history",
  },
  {
    slug: "best-time-to-visit-egypt",
    title: "Best Time to Visit Egypt Weather, Crowds, and Peak Seasons",
    excerpt:
      "Compare winter comfort, summer heat, and Ramadan travel — when to book Nile cruises and Red Sea holidays.",
    href: "/blog/best-time-to-visit-egypt",
    imageSrc: "/multi-day-tours/egypt-tour/cairo.webp",
    imageAlt: "Cairo and Giza travel season",
    category: "travel-tips",
  },
  {
    slug: "10-best-things-cairo",
    title: "10 Best Things to Do in Cairo for First-Time Visitors",
    excerpt:
      "Pyramids, museums, Khan el-Khalili, and Nile dinners — a one-city hit list with realistic timing for each stop.",
    href: "/blog/10-best-things-cairo",
    imageSrc: "/insights/group-tour-1.webp",
    imageAlt: "Sightseeing in Cairo",
    category: "destination-guides",
  },
  {
    slug: "luxor-west-bank-guide",
    title: "Luxor West Bank Guide: Valley of the Kings & More",
    excerpt:
      "Tombs, temples, and photo stops on the west bank — how to sequence your day and beat the midday heat.",
    href: "/blog/luxor-west-bank-guide",
    imageSrc: "/multi-day-tours/egypt-tour/luxor.webp",
    imageAlt: "Luxor temples and tombs",
    category: "destination-guides",
  },
  {
    slug: "egyptian-food-guide",
    title: "Egyptian Food Guide: What to Try and Where",
    excerpt:
      "Koshari, ful, grilled seafood, and safe street-food tips — dishes worth ordering on your first trip to Egypt.",
    href: "/blog/egyptian-food-guide",
    imageSrc: "/about/about.webp",
    imageAlt: "Dining and culture in Egypt",
    category: "culture-history",
  },
  {
    slug: "what-to-pack-nile-cruise",
    title: "What to Pack for a Nile Cruise",
    excerpt:
      "Comfortable layers, sun protection, and dress codes for temples and evenings on board.",
    href: "/blog/what-to-pack-nile-cruise",
    imageSrc: "/multi-day-tours/egypt-tour/hurghada.webp",
    imageAlt: "Nile cruise packing essentials",
    category: "travel-tips",
  },
  {
    slug: "hurghada-vs-sharm",
    title: "Hurghada vs Sharm el-Sheikh: Which Red Sea Base?",
    excerpt:
      "Compare diving, resorts, and day trips — pick the coast that fits your beach extension after Cairo and the Nile.",
    href: "/blog/hurghada-vs-sharm",
    imageSrc: "/destinations/hurghada.webp",
    imageAlt: "Red Sea resort coast",
    category: "destination-guides",
  },
  {
    slug: "10-day-egypt-itinerary",
    title: "10 Days Egypt Itinerary: Egypt Travel Packages Await!",
    excerpt:
      "A compact route through Cairo, Luxor, Aswan, and optional Abu Simbel — ideal when two weeks is out of reach.",
    href: "/blog/10-day-egypt-itinerary",
    imageSrc: "/multi-day-tours/egypt-tour/travelers-tour.webp",
    imageAlt: "Ten-day Egypt tour highlights",
    category: "itinerary-ideas",
  },
  {
    slug: "ancient-egypt-timeline",
    title: "Ancient Egypt Timeline for Curious Travellers",
    excerpt:
      "Pharaohs, dynasties, and the monuments you'll see — light history to enrich every temple visit on your trip.",
    href: "/blog/ancient-egypt-timeline",
    imageSrc: "/destinations/luxor.webp",
    imageAlt: "Ancient Egyptian monuments",
    category: "culture-history",
  },
  {
    slug: "alexandria-day-trip",
    title: "Alexandria Day Trip from Cairo: Catacombs & Coast",
    excerpt:
      "Library, fort, seafood lunch, and Mediterranean views — how to fit Alexandria into a Cairo-based itinerary.",
    href: "/blog/alexandria-day-trip",
    imageSrc: "/destinations/alexandria.webp",
    imageAlt: "Alexandria Mediterranean coast",
    category: "itinerary-ideas",
  },
  {
    slug: "egypt-travel-insurance",
    title: "Egypt Travel Insurance: What to Look For",
    excerpt:
      "Medical cover, trip cancellation, and adventure add-ons — practical advice before you confirm your package.",
    href: "/blog/egypt-travel-insurance",
    imageSrc: "/about/nourbelle-van.webp",
    imageAlt: "Planning an Egypt holiday",
    category: "travel-tips",
  },
];

export const blogPopularArticles = [
  { slug: "is-egypt-safe", title: "Is Egypt Safe to Visit?", href: "/blog/is-egypt-safe" },
  { slug: "best-time-to-visit-egypt", title: "Best Time to Visit Egypt", href: "/blog/best-time-to-visit-egypt" },
  { slug: "10-best-things-cairo", title: "10 Best Things to Do in Cairo", href: "/blog/10-best-things-cairo" },
  {
    slug: "2-week-egypt-itinerary",
    title: "2 Week Egypt Itinerary: Best of Egypt in 14 Days",
    href: "/blog/2-week-egypt-itinerary",
  },
  {
    slug: "egypt-visa-us-citizens-2026",
    title: "Egypt Visa for US Citizens: How to Apply",
    href: "/blog/egypt-visa-us-citizens-2026",
  },
] as const;

export const blogCategoryTags = [
  { label: "Travel Tips", href: "/blog?category=travel-tips" },
  { label: "Destination Guides", href: "/blog?category=destination-guides" },
  { label: "Itinerary Ideas", href: "/blog?category=itinerary-ideas" },
  { label: "Culture & History", href: "/blog?category=culture-history" },
] as const;

export const blogQuoteCta = {
  title: "Start Your Personalized Journey Through Egypt with Our Expert Team",
  bullets: ["No obligation", "Fully Customizable", "Local Egypt expert"] as const,
  buttonLabel: "Request Your Free Quote",
  buttonHref: "/contact",
} as const;
