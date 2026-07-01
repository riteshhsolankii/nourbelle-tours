import type {
  NileCruiseListingItem,
  NileCruisePort,
  NileCruiseTierSection,
} from "@/types/nile-cruises-page";
import type { TourCard } from "@/types/site";

const img = (path: string) =>
  `/tours/8-days-legends.webp`;

function tour(t: TourCard): TourCard {
  return t;
}

const n1 = tour({
  id: "n1",
  title: "Sanctuary Sun Boat — Luxor to Aswan",
  imageSrc: img("photo-1544551763-46a013bb70d5"),
  imageAlt: "Luxury Nile cruise ship",
  href: "/nile-cruises/sanctuary-sun-boat",
  features: ["All-suite ship", "Private balconies", "Gourmet dining"],
  price: 1890,
  priceWas: 2200,
});
const n2 = tour({
  id: "n2",
  title: "Oberoi Zahra 7-night signature cruise",
  imageSrc: img("photo-1553913861-c0fddf2619ee"),
  imageAlt: "Premium Nile cruiser",
  href: "/nile-cruises/oberoi-zahra",
  features: ["Spa & wellness deck", "Small guest count", "Butler service"],
  price: 2450,
});
const n3 = tour({
  id: "n3",
  title: "MS Mayfair luxury 6 nights",
  imageSrc: img("photo-1566195999-2ea8e6dfbee6"),
  imageAlt: "Mayfair Nile cruise",
  href: "/nile-cruises/ms-mayfair",
  features: ["Pool & sun deck", "Egyptologist lectures", "Wine pairing dinners"],
  price: 1650,
  priceWas: 1890,
});

const n4 = tour({
  id: "n4",
  title: "Sonesta St George 5 nights",
  imageSrc: img("photo-1572252009286-268acec5ca0a"),
  imageAlt: "Nile at Luxor",
  href: "/nile-cruises/sonesta-st-george",
  features: ["Five-star cabins", "Temple programme", "Evening shows"],
  price: 980,
  priceWas: 1150,
});

const n5 = tour({
  id: "n5",
  title: "Amoura Dahabiya private charter",
  imageSrc: img("photo-1509316785289-025f5b846b35"),
  imageAlt: "Dahabiya sailboat",
  href: "/nile-cruises/amoura-dahabiya",
  features: ["6–8 guests only", "Flexible moorings", "Home-style meals"],
  price: 1420,
});
const nStaria = tour({
  id: "n-staria",
  title: "Staria Nile Dahabiya",
  imageSrc: "/tours/5-days-luxury.webp",
  imageAlt: "Staria Nile Dahabiya sailing",
  href: "/nile-cruises/staria-nile-dahabiya",
  features: ["Aswan–Luxor route", "Boutique cabins", "Full board"],
  price: 1350,
  priceWas: 1600,
});
const n6 = tour({
  id: "n6",
  title: "Nebyt Dahabiya 5 nights classic",
  imageSrc: img("photo-1539768942893-daf53e448371"),
  imageAlt: "Traditional dahabiya",
  href: "/nile-cruises/nebyt",
  features: ["Handcrafted wood decks", "Unhurried sailing", "Village visits"],
  price: 1180,
});
const n7 = tour({
  id: "n7",
  title: "Merit Dahabiya Aswan → Luxor",
  imageSrc: img("photo-1469854524086-cc49f757b889"),
  imageAlt: "Nile river banks",
  href: "/nile-cruises/merit-dahabiya",
  features: ["Open-air dining", "Small group", "Abu Simbel optional"],
  price: 1095,
});

const n8 = tour({
  id: "n8",
  title: "El Nil Dahabiya family week",
  imageSrc: img("photo-1526778541-a7cdf2c532bd"),
  imageAlt: "Felucca and Nile",
  href: "/nile-cruises/el-nil-family",
  features: ["Family cabins", "Kids’ activities", "Snorkel add-on Red Sea"],
  price: 890,
  priceWas: 1020,
});

const n9 = tour({
  id: "n9",
  title: "MS Princess Sarah 4 nights",
  imageSrc: img("photo-1503177119275-0faa32b59773"),
  imageAlt: "Standard Nile cruise",
  href: "/nile-cruises/princess-sarah",
  features: ["Full board", "Guided temples", "Sun deck bar"],
  price: 620,
  priceWas: 750,
});
const n10 = tour({
  id: "n10",
  title: "MS Nile Style 3 nights express",
  imageSrc: img("photo-1470252649378-f9ece84cda8e"),
  imageAlt: "Cruise ship on Nile",
  href: "/nile-cruises/nile-style",
  features: ["East & West Bank highlights", "Airport transfers", "Shared guide"],
  price: 445,
});
const n11 = tour({
  id: "n11",
  title: "MS Royal Ruby 7 nights value",
  imageSrc: img("photo-1516026887239-504198847b0e"),
  imageAlt: "Ruby cruise deck",
  href: "/nile-cruises/royal-ruby",
  features: ["Spacious cabins", "All meals", "Traditional galabiya night"],
  price: 720,
});
const n12 = tour({
  id: "n12",
  title: "MS Concerto 5 nights budget-friendly",
  imageSrc: img("photo-1590523277543-a94d2e4eb00b"),
  imageAlt: "Concerto ship",
  href: "/nile-cruises/concerto",
  features: ["Pool on board", "English-speaking crew", "Optional hot-air balloon"],
  price: 510,
  priceWas: 590,
});

function item(
  tourCard: TourCard,
  tier: NileCruiseListingItem["tier"],
  nights: number,
  nightsBadge: string,
  summary: string,
  port: NileCruisePort,
): NileCruiseListingItem {
  return { tour: tourCard, tier, nights, nightsBadge, summary, port };
}

/** All cruises used for the top filtered grid (12). */
export const nileCruiseFeaturedCatalog: readonly NileCruiseListingItem[] = [
  item(n1, "luxury", 7, "7–10 Nights", "Ultra-luxury sailing with spacious suites and curated temple days.", "luxor-aswan"),
  item(n2, "luxury", 7, "7 Nights", "The gold standard in Nile hospitality with spa and fine dining.", "luxor-aswan"),
  item(n3, "luxury", 6, "6 Nights", "Polished service and elegant cabins between Luxor and Aswan.", "luxor-aswan"),
  item(n4, "luxury", 5, "5 Nights", "Premium five-star vessel with attentive crew and rich excursions.", "luxor"),
  item(n5, "dahabiya", 6, "6 Nights", "Slow travel on an intimate sailboat with flexible moorings.", "luxor-aswan"),
  item(nStaria, "dahabiya", 5, "5 Nights", "Refined dahabiya sailing with Egyptologist-led temple days.", "luxor-aswan"),
  item(n7, "dahabiya", 5, "5 Nights", "Quiet decks, small groups, and authentic riverside stops.", "aswan"),
  item(n8, "dahabiya", 7, "7 Nights", "Relaxed family-friendly dahabiya week with optional add-ons.", "luxor-aswan"),
  item(n9, "standard", 4, "4 Nights", "Great value full-board cruise covering the essential temples.", "luxor"),
  item(n10, "standard", 3, "3 Nights", "Short Luxor–Aswan hop ideal for tight itineraries.", "luxor-aswan"),
  item(n11, "standard", 7, "7 Nights", "Comfortable mid-range ship with pool and nightly entertainment.", "luxor-aswan"),
  item(n12, "standard", 5, "5 Nights", "Affordable five-night programme with guided sightseeing.", "luxor"),
];

export const nileCruiseIntro = {
  title: "Nile River Cruise",
  description:
    "Discover Egypt’s ancient wonders onboard Nile River cruise between Luxor and Aswan. Enjoy expert-guided excursions and stunning views of iconic temples and historic landmarks. Whether on a luxury cruise ship or a cozy dahabiya, each journey offers comfort and authentic Egyptian experiences.",
} as const;

export const nileCruiseTierSections: readonly NileCruiseTierSection[] = [
  {
    title: "Luxury Nile Cruise",
    viewMoreLabel: "Explore More",
    viewMoreHref: "/nile-cruises?type=luxury",
    items: [
      item(n1, "luxury", 7, "7–10 Nights", "Ultra-luxury sailing with spacious suites and curated temple days.", "luxor-aswan"),
      item(n2, "luxury", 7, "7 Nights", "The gold standard in Nile hospitality with spa and fine dining.", "luxor-aswan"),
      item(n3, "luxury", 6, "6 Nights", "Polished service and elegant cabins between Luxor and Aswan.", "luxor-aswan"),
    ],
  },
  {
    title: "Dahabiya Nile Cruise",
    viewMoreLabel: "Explore More",
    viewMoreHref: "/nile-cruises?type=dahabiya",
    items: [
      item(nStaria, "dahabiya", 5, "5 Nights", "Refined dahabiya sailing with Egyptologist-led temple days.", "luxor-aswan"),
      item(n5, "dahabiya", 6, "6 Nights", "Slow travel on an intimate sailboat with flexible moorings.", "luxor-aswan"),
      item(n6, "dahabiya", 5, "5 Nights", "Classic dahabiya charm with home-style Egyptian cuisine.", "aswan"),
    ],
  },
  {
    title: "Standard Nile Cruise",
    viewMoreLabel: "Explore More",
    viewMoreHref: "/nile-cruises?type=standard",
    items: [
      item(n9, "standard", 4, "4 Nights", "Great value full-board cruise covering the essential temples.", "luxor"),
      item(n10, "standard", 3, "3 Nights", "Short Luxor–Aswan hop ideal for tight itineraries.", "luxor-aswan"),
      item(n11, "standard", 7, "7 Nights", "Comfortable mid-range ship with pool and nightly entertainment.", "luxor-aswan"),
    ],
  },
];

export const nileCruiseFeaturedViewMore = {
  label: "Explore More",
  href: "/nile-cruises",
} as const;
