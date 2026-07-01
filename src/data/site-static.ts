import type { HomeTabId, NavItem, TourCard } from "@/types/site";
import type { GlobalPageBannerContent } from "@/types/site";
import type { WhyChooseNourbelleSectionContent } from "@/types/why-choose-nourbelle";

/** Replace this module’s exports with GraphQL loaders when WordPress is ready. */
export const topBar = {
  tagline: "Curated Multi-Day Egypt Tour Packages",
  phone: "+20 1009324992",
  phoneHref: "tel:+201009324992",
  email: "support@nourbelletours.com",
  emailHref: "mailto:support@nourbelletours.com",
} as const;

export const brand = {
  name: "Nourbelle Tours",
  /** Swap for /logo.svg from WordPress media when live. */
  logoAlt: "Nourbelle Tours",
} as const;

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Destinations",
    children: [
      { label: "Cairo Travel Guide", href: "/destinations/cairo" },
      { label: "Luxor", href: "" },
      { label: "Aswan", href: "" },
      { label: "Alexandria", href: "/destinations/alexandria" },
      { label: "Hurghada", href: "" },
      { label: "Marsa Alam", href: "" },
      { label: "Sharm El sheikh", href: "" },
      { label: "Hidden Gems", href: "" },
    ],
  },
  {
    label: "Tour Packages",
    children: [
      { label: "All Tour Packages", href: "" },
      { label: "Best Sellers", href: "" },
      { label: "7–9 Days", href: "" },
      { label: "10–12 Days", href: "" },
      { label: "Luxury Tours", href: "" },
      { label: "Family Tours", href: "" },
      { label: "Egypt + Jordan", href: "" },
      { label: "Customize Your Trip", href: "" },
    ],
  },
  {
    label: "Nile Cruises",
    children: [
      { label: "All Nile Cruises", href: "" },
      { label: "3 Nights (Aswan→Luxor)", href: "" },
      { label: "4 Nights (Luxor→Aswan)", href: "" },
      { label: "Dahabiya", href: "" },
      { label: "Luxury Nile Cruises", href: "" },
      { label: "Cruise + Cairo Packages", href: "" },
    ],
  },
  {
    label: "Day Tours",
    children: [
      { label: "All day tours", href: "" },
      { label: "Cairo & Giza", href: "" },
      { label: "Luxor", href: "" },
      { label: "Aswan", href: "" },
      { label: "Alexandria", href: "/destinations/alexandria" },
      { label: "Hurghada", href: "" },
      { label: "Marsa Alam", href: "" },
      { label: "Sharm El sheikh", href: "" },
      { label: "Hidden Gems", href: "" },
    ],
  },
  {
    label: "Why Nourbelle",
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Travel Blog", href: "/blog" },
      { label: "Travel Agents / B2B", href: "/travel-agents" },
      { label: "FAQs", href: "" },
      { label: "Contacts", href: "/contact-us" },
    ],
  },
];

export const headerCta = {
  label: "Customize Your Tour",
  href: "/customize-your-tour",
} as const;

export const headerSearch = {
  placeholder: "Search tours & articles…",
  buttonLabel: "Search",
} as const;

/** Legacy grid footer; prefer `footerMainMenu`, `footerQuickLinks`, `footerSocial` in `SiteFooter`. */
export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Egypt tours", href: "/multi-day-egypt-tours" },
      { label: "Nile cruises", href: "/nile-cruises" },
      { label: "Day tours", href: "/day-tours" },
      { label: "Journal", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Why Nourbelle", href: "/why-nourbelle" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact-us" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: topBar.phone, href: topBar.phoneHref },
      { label: topBar.email, href: topBar.emailHref },
    ],
  },
] as const;

export const footerLegal = {
  brandLine: "Nourbelle Tours",
} as const;

export const footerAbout = {
  blurb:
    "Nourbelle Tours is a top Destination Management Company in Egypt, specialising in tailor-made tours and travel packages.",
} as const;

export const footerMainMenu = {
  title: "Main Menu",
  links: [
    { label: "Multi-Day Tours", href: "/multi-day-egypt-tours" },
    { label: "Day Tours", href: "/day-tours" },
    { label: "Cairo", href: "/destinations/cairo" },
    { label: "Alexandria", href: "/destinations/alexandria" },
    { label: "Luxor", href: "/destinations/luxor" },
    { label: "Hurghada", href: "/destinations/red-sea" },
  ],
} as const;

export const footerQuickLinks = {
  title: "Quick Links",
  links: [
    { label: "About Us", href: "/about-us" },
    { label: "FAQ's", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Travel Agents", href: "/travel-agents" },
    { label: "Contact Us", href: "/contact-us" },
  ],
} as const;

export const footerSocial = [
  { label: "Facebook", href: "https://www.facebook.com/", kind: "facebook" as const },
  { label: "Instagram", href: "https://www.instagram.com/", kind: "instagram" as const },
  { label: "TripAdvisor", href: "https://www.tripadvisor.com/", kind: "tripadvisor" as const },
  { label: "YouTube", href: "https://www.youtube.com/", kind: "youtube" as const },
  { label: "Pinterest", href: "https://www.pinterest.com/", kind: "pinterest" as const },
] as const;

export const homeSearchFilters = {
  tourTypes: [
    { value: "", label: "Tour type" },
    { value: "nile", label: "Nile cruise" },
    { value: "cultural", label: "Cultural & historical" },
    { value: "family", label: "Family-friendly" },
    { value: "luxury", label: "Luxury" },
  ],
  durations: [
    { value: "", label: "Duration" },
    { value: "1-3", label: "1–3 days" },
    { value: "4-7", label: "4–7 days" },
    { value: "8+", label: "8+ days" },
  ],
  destinations: [
    { value: "", label: "Destination" },
    { value: "cairo", label: "Cairo & Giza" },
    { value: "luxor", label: "Luxor" },
    { value: "aswan", label: "Aswan" },
    { value: "red-sea", label: "Red Sea" },
  ],
  travelStyles: [
    { value: "", label: "Travel Style" },
    { value: "classic", label: "Classic" },
    { value: "luxury", label: "Luxury" },
    { value: "adventure", label: "Adventure" },
    { value: "family", label: "Family" },
  ],
  budgets: [
    { value: "", label: "Budget" },
    { value: "under-500", label: "Under $500" },
    { value: "500-1000", label: "$500 – $1,000" },
    { value: "1000-2000", label: "$1,000 – $2,000" },
    { value: "2000-plus", label: "$2,000+" },
  ],
} as const;

export const homeHero = {
  title: "Luxury Egypt Tours & Nile Cruises, Crafted Around You",
  subtitle:
    "Private journeys with expert Egyptologists, handpicked hotels, and seamless experiences from arrival to departure.",
  /** Local hero art; replace with WP media URL when available. */
  backgroundImageSrc: "/tours/banner.png",
  backgroundImageAlt: "The Great Sphinx and Pyramids of Giza at sunset",
  primaryCta: { label: "Plan My Trip", href: "/customize-your-tour" },
  secondaryCta: { label: "View Best Sellers", href: "/multi-day-egypt-tours" },
  quickFacts: [
    {
      htmlName: "destination",
      label: "Destination",
      hint: "Cairo, Luxor, Aswan",
      options: homeSearchFilters.destinations.slice(1),
    },
    {
      htmlName: "travelStyle",
      label: "Travel Style",
      hint: "Classic / Luxury",
      options: homeSearchFilters.travelStyles.slice(1),
    },
    {
      htmlName: "duration",
      label: "Duration",
      hint: "7–12 Days",
      options: homeSearchFilters.durations.slice(1),
    },
    {
      htmlName: "budget",
      label: "Budget",
      hint: "From $950",
      options: homeSearchFilters.budgets.slice(1),
    },
  ],
  quickFactsButtonLabel: "Search",
  quickFactsButtonHref: "/multi-day-egypt-tours",
  trustStats: [
    "10+ Years Egypt Expertise",
    "4.8/5 Traveler Reviews",
    "24/7 Local Support",
    "100% Tailor-Made Trips",
  ],
} as const;

/** Dedicated redesigned hero for `/multi-day-egypt-tours` (distinct from `globalPageBanners`, used only on this page). */
export const multiDayToursHero = {
  title: "Private Egypt Tours & Nile Cruises Designed by Local Experts",
  subtitle:
    "Explore Cairo, Luxor, Aswan, the Nile, and the Red Sea with handpicked hotels, licensed Egyptologist guides, private transfers, and 24/7 local support.",
  backgroundImageSrc: "/tours/multi-day-tours.webp",
  backgroundImageAlt: "The Great Sphinx and Pyramids of Giza at sunset",
  perks: [
    { label: "Licensed Guides", icon: "guide" as const },
    { label: "Private Transfers", icon: "transfer" as const },
    { label: "Small Groups", icon: "groups" as const },
    { label: "24/7 Support", icon: "support" as const },
    { label: "Flexible Trips", icon: "flexible" as const },
  ],
  quoteCard: {
    title: "Speak With Our Travel Experts",
    subtitle: "Plan your perfect Egypt journey",
    avatarInitials: ["JD", "SM", "RK", "AL"],
    extraCount: 25,
    ctaLabel: "Get a Free Quote",
    ctaHref: "/customize-your-tour",
    note: "Response within 24 hours",
  },
} as const;

export const globalPageBanners: Record<
  "multiDayTours" | "nileCruises" | "dayTours",
  GlobalPageBannerContent
> = {
  multiDayTours: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Multi Day Tours" },
    ],
    title: "Multi-Day Egypt Tours Designed by Local Experts",
    description:
      "Carefully crafted journeys combining Egypt's iconic highlights, hidden gems, and authentic local experiences guided by licensed Egyptologists.",
    backgroundImage: {
      src: "/multi-day-tours/banner.webp",
      alt: "Camel and mountains at sunset in Egypt",
    },
    ctaText: "Explore Our Best-Seller Tours",
    ctaLink: "#",
    priceCard: {
      startingFrom: "Starting From",
      price: "$1,850 USD",
      duration: "5 to 15 days",
      groupType: "Private Small Group",
      buttonText: "Request Custom Quote",
      buttonLink: "#",
    },
  },
  nileCruises: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Nile Cruises" },
    ],
    title: "Nile River Cruise",
    description:
      "Sail between Luxor and Aswan on luxury ships, traditional dahabiyas, and great-value cruisers—with guided temples, smooth transfers, and options for every style and budget.",
    backgroundImage: {
      src: "/hero/home-hero-bg.webp",
      alt: "Nile cruise sailing near ancient temples",
    },
    ctaText: "Browse Nile Cruise Packages",
    ctaLink: "/nile-cruises",
    priceCard: {
      startingFrom: "Starting From",
      price: "$850 USD",
      duration: "3 to 7 days",
      groupType: "Private and Shared",
      buttonText: "Plan My Cruise",
      buttonLink: "/customize-your-tour",
    },
  },

  dayTours: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Day Tours" },
    ],
    title: "Things to Do in Egypt with Nourbelle Tours",
    description:
      "Egypt is more than a destination, it’s a journey through time, culture, and unforgettable moments. At Nourbelle Tours, we curate the best things to do in Egypt, offering expertly guided day tours, excursions, and private experiences in Cairo, Luxor, Hurghada, and Sharm El Sheikh.",
    backgroundImage: {
      src: "/multi-day-tours/banner.webp",
      alt: "Ancient Egypt landmarks for day tour experiences",
    },
    ctaText: "Explore Our Best-Seller Tours ",
    ctaLink: "#",
    priceCard: {
      startingFrom: "Starting From",
      price: "$89 USD",
      duration: "Day Tour",
      groupType: "Pyramids and Grand Egyptian Museum",
      buttonText: "Request Custom Quote",
      buttonLink: "#",
    },
  },
} as const;

/** Contact page hero — no price card (single-column banner). */
export const contactPageBanner: GlobalPageBannerContent = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Contact Us" },
  ],
  title: "Contact Us",
  description:
    "Have questions or want to create a custom Egypt tour? Our friendly and knowledgeable Egypt travel experts are here to guide you every step of the way and help you plan the perfect, unforgettable trip tailored to your needs.",
  backgroundImage: {
    src: "/contact/contact-banner.webp",
    alt: "Ancient Egyptian winged figure carved in stone at dusk",
  },
  ctaText: "Speak to Travel Expert",
  ctaLink: "#send-message",
};

/** About page hero — no price card. */
export const aboutPageBanner: GlobalPageBannerContent = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About Nourbelle Tours" },
  ],
  title: "About Nourbelle Tours",
  description:
    "Your trusted local experts for tailor-made Egypt tours and Nile River cruises. With deep local knowledge and years of experience, we create personalized journeys that highlight the best of Egypt.",
  backgroundImage: {
    src: "/about/about-banner.webp",
    alt: "Nile cruise ship on the river with desert hills in the distance",
  },
  ctaText: "Speak to Travel Expert",
  ctaLink: "/contact-us",
};

/** Travel agents / B2B landing hero — no price card. */
export const travelAgentsPageBanner: GlobalPageBannerContent = {
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Travel Agents" },
  ],
  title: "Travel Agents & Tour Operators in Egypt",
  description:
    "Partner with Nourbelle Tours as your trusted local DMC in Egypt. We help travel agents and tour operators win more business with tailor-made itineraries, competitive contracted rates, and dependable B2B support—from quoting to seamless delivery on the ground.",
  backgroundImage: {
    src: "/about/about-banner.webp",
    alt: "Nile cruise ship on the river with desert mountains under a clear sky",
  },
  ctaText: "Register & Grow together",
  ctaLink: "/travel-agents#travel-agent-registration",
};

export const contactUsPage = {
  infoCards: [
    {
      id: "phone",
      primary: topBar.phone,
      secondary: "We're interested in working together!",
      href: topBar.phoneHref,
    },
    {
      id: "email",
      primary: topBar.email,
      secondary: "Have a project in mind? Send a message.",
      href: topBar.emailHref,
    },
    {
      id: "address",
      primary: "12th Street From El Eshreen Street",
      secondary: "Join our growing team!",
      href: "https://www.google.com/maps/search/?api=1&query=Luxor%2C+Egypt",
    },
  ] as const,
  getInTouch: {
    title: "Get in Touch Today!",
    intro:
      "Whether you need itinerary ideas, a private quote, or help with an existing booking, our team replies quickly with clear, honest advice.",
    features: [
      {
        id: "support",
        title: "24/7 customer support",
        description: "Always available to guide your business with reliable support anytime.",
      },
      {
        id: "chat",
        title: "Live chat and Instant help",
        description: "Quick solutions delivered instantly to keep your business moving forward.",
      },
    ] as const,
  },
  map: {
    title: "Find us",
    /** OpenStreetMap embed — Luxor area (desaturated via CSS on the page). */
    embedSrc:
      "https://www.openstreetmap.org/export/embed.html?bbox=32.569%2C25.665%2C32.669%2C25.732&layer=mapnik&marker=25.6993%2C32.6396",
    externalMapHref: "https://www.openstreetmap.org/?mlat=25.6993&mlon=32.6396#map=13/25.6993/32.6396",
  },
} as const;


export const findPerfectTour = {
  title: "Find Your Perfect Tour",
  categories: [
    {
      label: "Tour Packages",
      href: "/multi-day-egypt-tours",
      icon: "packages" as const,
    },
    {
      label: "Nile Cruises",
      href: "/nile-cruises",
      icon: "cruises" as const,
    },
    {
      label: "Day Tours",
      href: "/day-tours",
      icon: "dayTours" as const,
    },
    {
      label: "Shore Excursions",
      href: "/shore-excursions",
      icon: "shore" as const,
    },
  ],
} as const;

export const topDestinations = {
  title: "Top Egypt Destinations",
  exploreHref: "/destinations/egypt",
  exploreLabel: "Explore All Destinations",
  destinations: [
    {
      name: "Cairo",
      tagline: "City of a Thousand Minarets",
      href: "/destinations/cairo",
      imageSrc: "/destinations/cairo.webp",
      imageAlt: "Mosque of Muhammad Ali and the Citadel of Cairo",
    },
    {
      name: "Alexandria",
      tagline: "Pearl of the Mediterranean",
      href: "/destinations/alexandria",
      imageSrc: "/destinations/alexandria.webp",
      imageAlt: "Yellow tram and palm-lined street in Alexandria",
    },
    {
      name: "Luxor",
      tagline: "City of a Hundred Gates",
      href: "/destinations/luxor",
      imageSrc: "/destinations/luxor.webp",
      imageAlt: "Sunlit colonnade and hieroglyphs at an ancient Egyptian temple",
    },
    {
      name: "Hurghada",
      tagline: "Red Sea diving & beach resorts",
      href: "/destinations/red-sea",
      imageSrc: "/destinations/hurghada.webp",
      imageAlt: "Palm trees and hammock silhouetted at sunset on the Red Sea coast",
    },
  ],
} as const;

/** About column only — review copy lives in `src/data/reviews.json`. */
export const aboutAndReviews = {
  about: {
    title: "About Nourbelle Tours",
    paragraphs: [
      "Nourbelle Tours is a top Destination Management Company in Egypt, specializing in tailor-made tours and travel packages. Nourbelle Tours is a top Destination Management Company in Egypt, specializing in tailor-made tours and travel packages.",
    ],
    imageSrc: "/about/nourbelle-van.webp",
    imageAlt:
      "Nourbelle Tours guide welcoming a traveller into a branded white tour van",
    ctaLabel: "About Us",
    ctaHref: "/about-us",
  },
} as const;

/** Compact teaser banner shown right after the "Handpicked Journeys" tour grid. */
export const egyptJournalBanner = {
  title: "Egypt, Beyond the Extraordinary",
  subtitle: "Stories, travel guides, and insider tips from our Egyptologists to inspire your next journey.",
  ctaLabel: "Explore Our Journal",
  ctaHref: "/blog",
  thumbnails: [
    { src: "/destinations/cairo.webp", alt: "Mosque of Muhammad Ali in Cairo" },
    { src: "/about/nourbelle-van.webp", alt: "Traveller boarding Nourbelle Tours van" },
    { src: "/destinations/luxor.webp", alt: "Karnak Temple columns in Luxor" },
  ],
} as const;

export const homeInsights = {
  title: "Egypt Travel Guide & Insights",
  exploreHref: "/blog",
  exploreLabel: "Explore Our Blogs",
  cards: [
    {
      id: "i1",
      title: "2 Week Egypt Itinerary with Nourbelle Tours",
      excerpt:
        "Egypt is where yesterday and today shake hands. One moment you're standing in the shadow of the Pyramids of Giza.",
      href: "/blog",
      imageSrc: "/tours/multi-day-tours.webp",
      imageAlt: "Nourbelle Tours guests posing in Egypt",
    },
    {
      id: "i2",
      title: "10 Days Egypt Itinerary: Egypt Travel Packages Await!",
      excerpt:
        "Ready to see Ancient Egypt come alive? This 10 Days Egypt itinerary blends iconic highlights with a relaxed Nile River cruise.",
      href: "/blog",
      imageSrc: "/about/nourbelle-van.webp",
      imageAlt: "Traveller boarding Nourbelle Tours van",
    },
    {
      id: "i3",
      title: "Top 10 Hidden Gems in Aswan Egypt",
      excerpt:
        "Explore the best hidden gems in Aswan with Nourbelle Tours. From Philae Temple and Abu Simbel to authentic Nubian culture.",
      href: "/blog",
      imageSrc: "/destinations/luxor.webp",
      imageAlt: "Travellers visiting ancient Egyptian landmarks",
    },
  ],
} as const;

export const homeFaqs = {
  title: "Frequently Asked Questions",
  items: [
    {
      id: "f1",
      question: "What types of tours do you offer?",
      answer:
        "We specialize in both multi-day tours and day trips covering popular destinations such as Cairo, Luxor, Aswan, Alexandria, and more. You can also enquire about Custom Tours here!",
    },
    {
      id: "f2",
      question: "Can I customize my tour itinerary?",
      answer:
        "Yes. We can tailor your trip to your dates, pace, budget, and interests, including private guides, hotels, cruises, and special experiences.",
    },
    {
      id: "f3",
      question: "What is included in your tour packages?",
      answer:
        "Most packages include accommodation, transfers, guided sightseeing, and listed meals. Inclusions vary by itinerary, and we always share full details before booking.",
    },
    {
      id: "f4",
      question: "Do your tours include visits to the major attractions?",
      answer:
        "Absolutely. Our itineraries typically cover the key highlights such as the Pyramids of Giza, Egyptian Museum, Luxor temples, and Aswan landmarks.",
    },
    {
      id: "f5",
      question: "What languages are your tours conducted in?",
      answer:
        "Our tours are primarily conducted in English, and other languages can often be arranged on request depending on guide availability.",
    },
  ],
  ctaLabel: "Read More FAQ's",
  ctaHref: "/faq",
} as const;

export const homeContactCta = {
  title: "Contact Us",
  description: "Please get in touch with us! Our travel team will be happy to assist you with your inquiry.",
  backgroundImageSrc: "/contact/contact-cta-bg.svg",
  backgroundImageAlt: "Cairo skyline illustration with pyramids and landmarks",
  buttons: [
    { label: "Customize a Tour", href: "/customize-your-tour", variant: "primary" as const },
    { label: "Travel Agent Partnership", href: "/travel-agents", variant: "secondary" as const },
  ],
} as const;

export const bestSelling = {
  title: "Best Selling Tours",
  exploreHref: "/multi-day-egypt-tours",
  exploreLabel: "Explore All Tours",
  tabs: [
    { id: "packages" as HomeTabId, label: "Tour Packages" },
    { id: "cruises" as HomeTabId, label: "Nile Cruises" },
    { id: "dayTours" as HomeTabId, label: "Day Tours" },
  ],
  toursByTab: {
    packages: [
      {
        id: "1",
        title: "5 Day Luxury Dahabiya Nile Cruise",
        imageSrc: "/tours/5-days-luxury.webp",
        imageAlt: "Dahabiya sailboat on the Nile",
        href: "/multi-day-egypt-tours/nile-odyssey",
        features: [
          "Private cabin with Nile views",
          "Expert Egyptologist guide",
          "All meals & temple entries included",
        ],
        price: 350,
        priceWas: 700,
        discountPercent: 50,
        badgeLabel: "Luxury",
        destinationsLine: "Luxor • Aswan",
        durationDays: 5,
        ratingValue: 4.8,
        ratingCount: 199,
      },
      {
        id: "2",
        title: "Guided Tour of Cairo & 5 Star Nile Cruise",
        imageSrc: "/tours/multi-day-tours.webp",
        imageAlt: "Pyramids of Giza and Nile cruise",
        href: "/multi-day-egypt-tours/pyramids-explorer",
        features: [
          "Cairo pyramids & museum visits",
          "5-star Nile cruise with balcony",
          "Door-to-door airport transfers",
        ],
        price: 550,
        priceWas: 1050,
        discountPercent: 30,
        badgeLabel: "Best Seller",
        destinationsLine: "Cairo • Luxor • Aswan",
        durationDays: 8,
        ratingValue: 4.9,
        ratingCount: 336,
      },
      {
        id: "3",
        title: "8 Day Legends of Egypt Tour",
        imageSrc: "/tours/8-days-legends.webp",
        imageAlt: "Ancient Egyptian temple columns",
        href: "/multi-day-egypt-tours/giza-highlights",
        features: [
          "Cairo, Luxor & Aswan highlights",
          "Small-group sightseeing",
          "Boutique hotels & domestic flights",
        ],
        price: 950,
        priceWas: 1000,
        discountPercent: 5,
        badgeLabel: "Private",
        destinationsLine: "Cairo • Luxor • Aswan",
        durationDays: 8,
        ratingValue: 4.7,
        ratingCount: 158,
      },
    ] satisfies TourCard[],
    cruises: [
      {
        id: "c1",
        title: "Luxor to Aswan — Classic cruise",
        imageSrc:
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Cruise on the Nile",
        href: "/nile-cruises/staria-nile-dahabiya",
        features: [
          "Full-board on a deluxe vessel",
          "Temple visits with licensed guides",
          "Evening entertainment on board",
        ],
        price: 899,
        priceWas: 1200,
        discountPercent: 25,
      },
      {
        id: "c2",
        title: "4-night Pharaohs’ route",
        imageSrc:
          "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Felucca on the Nile",
        href: "/nile-cruises/princess-sarah",
        features: [
          "Compact Luxor–Aswan itinerary",
          "Sun deck & pool access",
          "Optional Abu Simbel extension",
        ],
        price: 620,
        priceWas: 780,
      },
      {
        id: "c3",
        title: "7-night Nile discovery",
        imageSrc: "/tours/5-days-luxury.webp",
        imageAlt: "Nile river cruise ship at sunset",
        href: "/nile-cruises/oberoi-zahra",
        features: [
          "All major riverside temples",
          "Spacious suites available",
          "Kids’ activities & family cabins",
        ],
        price: 1100,
        badgeLabel: "Family Friendly",
        destinationsLine: "Luxor • Aswan • Kom Ombo",
        durationDays: 8,
        ratingValue: 4.8,
        ratingCount: 210,
      },
    ] satisfies TourCard[],
    dayTours: [
      {
        id: "d1",
        title: "Cairo in a day — Museums & Khan",
        imageSrc:
          "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Cairo cityscape",
        href: "/day-tours/cairo-in-a-day",
        features: [
          "Egyptian Museum & Old Cairo",
          "Khan el-Khalili bazaar time",
          "Lunch at a local restaurant",
        ],
        price: 85,
        priceWas: 110,
      },
      {
        id: "d2",
        title: "Luxor temples & tombs",
        imageSrc:
          "https://images.unsplash.com/photo-1568322445389-h1e238cee6bd?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Karnak temple columns",
        href: "/day-tours/luxor-temples",
        features: [
          "Karnak & Luxor temples",
          "Valley of the Kings entry",
          "Hotel pickup in Luxor",
        ],
        price: 95,
      },
      {
        id: "d3",
        title: "Giza pyramids & Sphinx half-day",
        imageSrc:
          "https://images.unsplash.com/photo-1503177119275-0faa32b59773?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Sphinx and pyramids",
        href: "/day-tours/giza-half-day",
        features: [
          "Great Pyramid plateau access",
          "Camel ride add-on available",
          "Beat-the-crowds early departure",
        ],
        price: 45,
        priceWas: 60,
        discountPercent: 25,
      },
      {
        id: "d4",
        title: "Aswan Philae & Nubian village full-day",
        imageSrc:
          "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Philae temple on the Nile",
        href: "/day-tours/aswan-philae",
        features: [
          "Philae Temple motorboat crossing",
          "Nubian village visit & tea",
          "Licensed Egyptologist guide",
        ],
        price: 110,
        priceWas: 135,
      },
      {
        id: "d5",
        title: "Alexandria day trip from Cairo",
        imageSrc:
          "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Alexandria waterfront",
        href: "/day-tours/alexandria",
        features: [
          "Catacombs & Pompey’s Pillar",
          "Bibliotheca Alexandrina photo stop",
          "Comfortable private vehicle",
        ],
        price: 125,
      },
      {
        id: "d6",
        title: "Hurghada desert safari & Bedouin dinner",
        imageSrc:
          "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=800&q=80",
        imageAlt: "Desert dunes at sunset",
        href: "/day-tours/hurghada-safari",
        features: [
          "Quad or jeep dunes run",
          "Bedouin camp dinner & show",
          "Hotel pickup in Hurghada",
        ],
        price: 75,
        priceWas: 90,
        discountPercent: 17,
      },
    ] satisfies TourCard[],
  },
};

/** Flat 4-card grid shown right below the hero, mixing categories (no tabs). */
export const handpickedJourneys = {
  title: "Handpicked Journeys for Every Traveler",
  exploreHref: "/multi-day-egypt-tours",
  exploreLabel: "View All Tours",
  tours: [
    bestSelling.toursByTab.packages[1],
    bestSelling.toursByTab.packages[0],
    bestSelling.toursByTab.cruises[2],
    bestSelling.toursByTab.packages[2],
  ] satisfies TourCard[],
} as const;

export const popularTourPackages = {
  sectionTitle: "Most Popular Egypt Tour Packages",
  /** Heading for the listing grid on `/day-tours` (no filter bar). */
  dayToursListingTitle: "Things to do and Daily Trips",
  sectionCtaText: "Show All",
  allTours: [
    ...bestSelling.toursByTab.packages,
    ...bestSelling.toursByTab.cruises,
    ...bestSelling.toursByTab.dayTours,
  ],
  byPage: {
    multiDayTours: bestSelling.toursByTab.packages,
    nileCruises: bestSelling.toursByTab.cruises,
    dayTours: bestSelling.toursByTab.dayTours,
  },
} as const;

/** Category grid after packages on `/multi-day-egypt-tours`. */
export const multiDayTourCategoriesSection = {
  title: "Most Popular Egypt Tour Packages",
  cardCtaLabel: "View Packages",
  ctaLabel: "Explore All Tour Packages",
  ctaHref: "/multi-day-egypt-tours",
  cards: [
    {
      title: "Luxury Tour Packages",
      imageSrc: "/multi-day-tours/egypt-tour/luxor.webp",
      imageAlt: "Luxury Egypt tour package",
      href: "/multi-day-egypt-tours",
    },
    {
      title: "Cultural / Historical Tours",
      imageSrc: "/multi-day-tours/egypt-tour/cairo.webp",
      imageAlt: "Cultural and historical Egypt tours",
      href: "/multi-day-egypt-tours",
    },
    {
      title: "Multi Country Tour",
      imageSrc: "/multi-day-tours/egypt-tour/aswan.webp",
      imageAlt: "Multi-country tour options",
      href: "/multi-day-egypt-tours",
    },
    {
      title: "Private Tour Packages",
      imageSrc: "/multi-day-tours/egypt-tour/hurghada.webp",
      imageAlt: "Private tour package in Egypt",
      href: "/multi-day-egypt-tours",
    },
    {
      title: "Family-Friendly Tours",
      imageSrc: "/multi-day-tours/egypt-tour/family-tour.webp",
      imageAlt: "Family-friendly tours in Egypt",
      href: "/multi-day-egypt-tours",
    },
    {
      title: "Solo Travelers Tours",
      imageSrc: "/multi-day-tours/egypt-tour/travelers-tour.webp",
      imageAlt: "Solo traveler tours in Egypt",
      href: "/multi-day-egypt-tours",
    },
  ],
} as const;

/** “Things to do” grid after packages on `/day-tours`. */
export const dayTourThingsToDoSection = {
  title: "Things to Do",
  cardCtaLabel: "View Tours",
  ctaLabel: "Explore All Tours",
  ctaHref: "/day-tours",
  cards: [
    {
      title: "Things to do in Cairo",
      imageSrc: "/destinations/cairo.webp",
      imageAlt: "Pyramids and Cairo skyline",
      href: "/destinations/cairo",
    },
    {
      title: "Things to do in Luxor",
      imageSrc: "/destinations/luxor.webp",
      imageAlt: "Ancient Egyptian temple in Luxor",
      href: "/destinations/luxor",
    },
    {
      title: "Things to do in Aswan",
      imageSrc: "/multi-day-tours/egypt-tour/aswan.webp",
      imageAlt: "Nile and mountains near Aswan",
      href: "/day-tours",
    },
    {
      title: "Things to do in Hurghada",
      imageSrc: "/destinations/hurghada.webp",
      imageAlt: "Red Sea coast at Hurghada",
      href: "/destinations/red-sea",
    },
    {
      title: "Things to do in Alexandria",
      imageSrc: "/destinations/alexandria.webp",
      imageAlt: "Alexandria waterfront and architecture",
      href: "/destinations/alexandria",
    },
    {
      title: "Things to do in Sharm El Sheikh",
      imageSrc: "/multi-day-tours/banner.webp",
      imageAlt: "Desert and coast experience in Sharm El Sheikh",
      href: "/destinations/red-sea",
    },
  ],
} as const;

const tourTwinCtaSharedBody =
  "Tell us your travel dates, preferences, and interests and we'll design a custom itinerary just for you.";

/** Two promo cards after categories on `/multi-day-egypt-tours`. */
export const multiDayTourTwinCtaSection = {
  cards: [
    {
      title: "Tailor-Made Egypt Tours By Local Experts",
      description: tourTwinCtaSharedBody,
      buttonLabel: "Customize Your Egypt Tour",
      href: "/customize-your-tour",
      icon: "uTurn" as const,
    },
    {
      title: "What's Included in Our Egypt Tour Packages?",
      description: tourTwinCtaSharedBody,
      buttonLabel: "Customize Your Egypt Tour",
      href: "/customize-your-tour",
      icon: "plane" as const,
    },
  ],
} as const;

/** Two promo cards after categories on `/day-tours`. */
export const dayTourTwinCtaSection = {
  cards: [
    {
      title: "Tailor-Made Egypt Day Tours By Local Experts",
      description: tourTwinCtaSharedBody,
      buttonLabel: "Customize Your Egypt Tour",
      href: "/customize-your-tour",
      icon: "uTurn" as const,
    },
    {
      title: "What's Included in Our Egypt Day Tours?",
      description: tourTwinCtaSharedBody,
      buttonLabel: "Customize Your Egypt Tour",
      href: "/customize-your-tour",
      icon: "plane" as const,
    },
  ],
} as const;

/** Icon row after reviews on `/day-tours` and `/multi-day-egypt-tours`. */
export const whyChooseNourbelleSection: WhyChooseNourbelleSectionContent = {
  title: "Why Choose Nourbelle Tours",
  items: [
    { label: "Guided Tours", icon: "mapPin" },
    { label: "Handpicked Hotels", icon: "hotel" },
    { label: "Domestic Flights Included", icon: "flight" },
    { label: "Fully Customizable", icon: "customize" },
    { label: "Fully Protected", icon: "lock" },
    { label: "Sustainable Travel", icon: "leaf" },
  ],
};

/** Icon row on `/nile-cruises` (seven selling points). */
export const whyChooseNileCruisesSection: WhyChooseNourbelleSectionContent = {
  title: "Why Choose Nourbelle Tours",
  items: [
    { label: "Handpicked Hotels", icon: "hotel" },
    { label: "Best Price Guarantee", icon: "customize" },
    { label: "24/7 Support", icon: "lock" },
    { label: "Licensed Local Guides", icon: "mapPin" },
    { label: "Domestic Flights Included", icon: "flight" },
    { label: "Fully Protected", icon: "leaf" },
    { label: "Sustainable Travel", icon: "hotel" },
  ],
};

/** Contact strip on `/nile-cruises`. */
export const nileContactCta = {
  title: "Contact Us",
  description:
    "Speak with a Nile cruise specialist about dates, cabin categories, and extensions—we reply quickly and tailor every sailing.",
  backgroundImageSrc: homeContactCta.backgroundImageSrc,
  backgroundImageAlt: homeContactCta.backgroundImageAlt,
  buttons: [
    { label: "Customize a Tour", href: "/customize-your-tour", variant: "primary" as const },
    {
      label: "Talk to Expert on WhatsApp",
      href: "https://wa.me/201009324992",
      variant: "secondary" as const,
    },
  ],
} as const;
