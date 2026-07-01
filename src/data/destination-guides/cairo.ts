import type { DestinationGuidePage } from "@/types/destination-guide";
import { popularTourPackages } from "@/data/site-static";

const cairoTourPackages = popularTourPackages.byPage.multiDayTours.filter((t) =>
  `${t.title} ${t.features.join(" ")}`.toLowerCase().includes("cairo"),
);

const articleTours =
  cairoTourPackages.length >= 3 ?
    cairoTourPackages.slice(0, 3)
  : popularTourPackages.byPage.multiDayTours.slice(0, 3);

export const cairoDestinationGuide: DestinationGuidePage = {
  slug: "cairo",
  title: "Cairo Travel Guide",
  metaDescription:
    "Plan your Cairo trip with expert tips on the Pyramids of Giza, museums, Islamic Cairo, and the best guided tours from Nourbelle Tours.",
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Cairo Travel Guide", href: "/destinations/cairo" },
    { label: "Cairo" },
  ],
  heroImage: {
    src: "/tours/multi-day-tours.webp",
    alt: "Great Sphinx and Pyramids of Giza near Cairo",
  },
  whyVisit: {
    heading: "Why Visit Cairo?",
    paragraphs: [
      "Cairo is Egypt’s vibrant capital — a city where ancient pharaonic wonders meet bustling souks, Nile views, and world-class museums. From the Pyramids of Giza on the city’s edge to the treasures of the Grand Egyptian Museum, every day brings another layer of history.",
      "Whether you have one day or a full week, Cairo rewards curious travellers with expert-guided tours, authentic local food, and easy connections to Luxor, Aswan, and the Red Sea. Nourbelle’s local team designs private itineraries so you see more with less stress.",
    ],
    tags: [
      { label: "Pyramids of Giza", icon: "pyramids" },
      { label: "Grand Egyptian Museum", icon: "museum" },
      { label: "Ancient Wonders", icon: "history" },
      { label: "Rich History", icon: "culture" },
    ],
  },
  thingsToDo: {
    heading: "Top Things to Do in Cairo",
    cards: [
      {
        title: "Visit the Pyramids of Giza",
        imageSrc: "/tours/multi-day-tours.webp",
        imageAlt: "Pyramids of Giza and the Great Sphinx",
        highlights: [
          "Great Pyramid, Sphinx & panoramic viewpoints",
          "Optional camel ride or solar boat museum",
          "Licensed Egyptologist guide & hotel pickup",
        ],
        learnMoreHref: "/day-tours/giza-half-day",
        bookNowHref: "/customize-your-tour",
      },
      {
        title: "Explore the Grand Egyptian Museum",
        imageSrc: "/multi-day-tours/egypt-tour/cairo.webp",
        imageAlt: "Museum galleries and ancient artefacts in Cairo",
        highlights: [
          "Tutankhamun galleries & royal treasures",
          "Skip-the-line options with expert commentary",
          "Combine with Giza or Old Cairo in one day",
        ],
        learnMoreHref: "/day-tours/cairo-in-a-day",
        bookNowHref: "/customize-your-tour",
      },
      {
        title: "Discover Islamic Cairo",
        imageSrc: "/destinations/cairo.webp",
        imageAlt: "Historic mosques and minarets in Islamic Cairo",
        highlights: [
          "Citadel, Muhammad Ali Mosque & Sultan Hassan",
          "Khan el-Khalili bazaar & local coffee stops",
          "Walking tours tailored to your pace",
        ],
        learnMoreHref: "/day-tours/cairo-in-a-day",
        bookNowHref: "/customize-your-tour",
      },
    ],
    viewAllHref: "/day-tours",
    viewAllLabel: "View All Cairo Tours",
  },
  bestTours: {
    heading: "Best Cairo Tours",
    cards: [
      {
        durationLabel: "2–3 Days",
        imageSrc: "/multi-day-tours/egypt-tour/cairo.webp",
        imageAlt: "Short Cairo city break",
        highlights: [
          "Pyramids, Sphinx & GEM highlights",
          "Old Cairo churches & Khan el-Khalili",
          "Private guide & comfortable transfers",
        ],
        learnMoreHref: "/multi-day-egypt-tours/pyramids-explorer",
      },
      {
        durationLabel: "4–5 Days",
        imageSrc: "/destinations/cairo.webp",
        imageAlt: "Cairo and Nile extension",
        highlights: [
          "Cairo sights plus domestic flight to Luxor",
          "Valley of the Kings & Karnak Temple",
          "Boutique hotels & small-group sightseeing",
        ],
        learnMoreHref: "/multi-day-egypt-tours/giza-highlights",
      },
      {
        durationLabel: "6+ Days",
        imageSrc: "/tours/8-days-legends.webp",
        imageAlt: "Extended Egypt tour including Cairo",
        highlights: [
          "Cairo, Luxor, Aswan & optional Nile cruise",
          "Abu Simbel or Red Sea add-ons available",
          "Fully tailor-made pacing & hotel class",
        ],
        learnMoreHref: "/multi-day-egypt-tours/nile-odyssey",
      },
    ],
    viewAllHref: "/multi-day-egypt-tours",
    viewAllLabel: "View All Cairo Tours",
  },
  articles: {
    heading: "Articles and Blogs",
    tours: articleTours,
    viewAllHref: "/blog",
    viewAllLabel: "View All Cairo Tours",
  },
  planTrip: {
    heading: "Plan Your Cairo Trip",
    intro:
      "Speak with our Egypt travel specialists for a free, no-obligation quote. We reply within one business day with clear pricing and itinerary ideas.",
    bullets: [
      "Tailor-Made Private Tours",
      "Licensed Egyptologist Guides",
      "Hand-Picked Hotels & Cruises",
      "24/7 Support While You Travel",
    ],
    ctaLabel: "Customize Your Cairo Tour",
    ctaHref: "/customize-your-tour",
  },
  faq: {
    heading: "Plan Your Cairo Trip",
    items: [
      {
        id: "cairo-f1",
        question: "Is Cairo safe for tourists?",
        answer:
          "We specialize in both multi-day tours and day trips covering popular destinations such as Cairo, Luxor, Aswan, Alexandria, and more. You can also enquire about Custom Tours here!",
      },
      {
        id: "cairo-f2",
        question: "Can I visit Cairo with kids?",
        answer:
          "Yes. Many families visit Cairo each year. Pyramids tours, museum visits, and Nile felucca rides can be paced for children. We recommend private transfers, morning starts, and family-friendly hotels—and we help you avoid overly long days in traffic.",
      },
      {
        id: "cairo-f3",
        question: "How many days should I stay in Cairo?",
        answer:
          "Most travellers spend 2–4 days in Cairo to cover Giza, the Grand Egyptian Museum or Egyptian Museum, Islamic Cairo, and Khan el-Khalili. With one extra day you can add Memphis, Saqqara, or a dinner cruise on the Nile.",
      },
      {
        id: "cairo-f4",
        question: "Can I combine Cairo with a trip to Luxor or Aswan?",
        answer:
          "Yes. Domestic flights from Cairo to Luxor or Aswan are frequent and affordable. Many of our itineraries pair 2–3 days in Cairo with a Nile cruise or temple touring in Upper Egypt—our team handles flights, guides, and hotels in one quote.",
      },
      {
        id: "cairo-f5",
        question: "Is it easy to get around Cairo?",
        answer:
          "Cairo is large and busy, so most visitors prefer private transfers and guided tours. Metro and ride apps exist, but for sightseeing we arrange door-to-door transport with licensed drivers so you save time and travel comfortably.",
      },
    ],
    ctaLabel: "Read More FAQ's",
    ctaHref: "/faq",
  },
};
