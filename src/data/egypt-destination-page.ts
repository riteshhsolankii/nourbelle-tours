/** Egypt destination landing (`/destinations/egypt`) — cards and sidebar blog teasers. */

export type EgyptDestinationCard = {
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
};

export type EgyptRelatedBlog = {
  slug: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
};

export const egyptDestinationCards: readonly EgyptDestinationCard[] = [
  {
    slug: "cairo",
    title: "Cairo",
    description:
      "Delve into Cairo Egypt’s fascinating history, learn essential facts, and gather key info about Egypt’s heritage, museums, and the Pyramids of Giza.",
    imageSrc: "/destinations/cairo.webp",
    imageAlt: "Mosque of Muhammad Ali and the Citadel of Cairo",
    href: "/destinations/cairo",
  },
  {
    slug: "alexandria",
    title: "Alexandria",
    description:
      "Mediterranean charm, Roman ruins, and a breezy waterfront — a coastal counterpoint to the desert interior.",
    imageSrc: "/destinations/alexandria.webp",
    imageAlt: "Alexandria waterfront",
    href: "/destinations/alexandria",
  },
  {
    slug: "aswan",
    title: "Aswan",
    description:
      "Nile feluccas, Nubian culture, and easy access to Philae and Abu Simbel — relaxed Upper Egypt at its best.",
    imageSrc: "/multi-day-tours/egypt-tour/aswan.webp",
    imageAlt: "Aswan on the Nile",
    href: "/destinations/aswan",
  },
  {
    slug: "el-gouna",
    title: "El Gouna",
    description:
      "Lagoons, golf, and Red Sea diving in a purpose-built resort town — ideal for couples and families.",
    imageSrc: "/destinations/hurghada.webp",
    imageAlt: "Red Sea resort coast",
    href: "/destinations/el-gouna",
  },
  {
    slug: "hurghada",
    title: "Hurghada",
    description:
      "Crystal-clear reefs, boat trips, and desert adventures — Egypt’s busiest seaside hub for sun and snorkelling.",
    imageSrc: "/destinations/hurghada.webp",
    imageAlt: "Hurghada Red Sea",
    href: "/destinations/red-sea",
  },
  {
    slug: "luxor",
    title: "Luxor",
    description:
      "Karnak, the Valley of the Kings, and the Nile’s greatest open-air museum — a must for every Egypt itinerary.",
    imageSrc: "/destinations/luxor.webp",
    imageAlt: "Luxor temples",
    href: "/destinations/luxor",
  },
  {
    slug: "marsa-alam",
    title: "Marsa Alam",
    description:
      "Pristine reefs and quieter beaches — divers and snorkellers love the marine parks along this southern coast.",
    imageSrc: "/multi-day-tours/egypt-tour/hurghada.webp",
    imageAlt: "Red Sea diving and coast",
    href: "/destinations/marsa-alam",
  },
  {
    slug: "sharm-el-sheikh",
    title: "Sharm El Sheikh",
    description:
      "Ras Mohammed diving, Sinai desert trips, and resort comfort at the tip of the Sinai Peninsula.",
    imageSrc: "/multi-day-tours/banner.webp",
    imageAlt: "Sinai coast",
    href: "/destinations/sharm-el-sheikh",
  },
  {
    slug: "makadi-bay",
    title: "Makadi Bay",
    description:
      "Family-friendly bays south of Hurghada — calm waters, all-inclusive resorts, and easy reef access.",
    imageSrc: "/multi-day-tours/egypt-tour/family-tour.webp",
    imageAlt: "Resort bay Egypt",
    href: "/destinations/makadi-bay",
  },
];

export const egyptRelatedBlogs: readonly EgyptRelatedBlog[] = [
  {
    slug: "best-time-to-visit-egypt",
    title: "2 Week Egypt Itinerary with Nourbelle Tours",
    excerpt: "How to balance Cairo, the Nile, and the Red Sea in fourteen days with room for rest days.",
    imageSrc: "/insights/group-tour-1.webp",
    imageAlt: "Travellers on an Egypt tour",
  },
  {
    slug: "what-to-pack-nile-cruise",
    title: "What to pack for a Nile cruise",
    excerpt: "Comfortable layers, sun protection, and what to wear at temples and on board.",
    imageSrc: "/multi-day-tours/egypt-tour/luxor.webp",
    imageAlt: "Nile cruise scenery",
  },
  {
    slug: "best-time-to-visit-egypt",
    title: "Best time to visit Egypt",
    excerpt: "Seasons, crowds, and weather at a glance for Cairo, Luxor, and the coast.",
    imageSrc: "/destinations/cairo.webp",
    imageAlt: "Egypt travel planning",
  },
];
