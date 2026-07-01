/** Static copy for `/travel-agents` — replace with CMS when ready. */

export const travelAgentsDesignedFor = {
  title: "This Partnership is Designed For",
  items: [
    {
      id: "leisure-mice",
      label: "Leisure & MICE Specialists",
      icon: "calendarCheck" as const,
    },
    {
      id: "dmc",
      label: "DMC In Egypt And Beyond",
      icon: "globe" as const,
    },
    {
      id: "b2b-support",
      label: "Dedicated B2B Support Team",
      icon: "handshake" as const,
    },
    {
      id: "tailor-made",
      label: "Tailor-Made Itineraries",
      icon: "clipboardList" as const,
    },
    {
      id: "rates",
      label: "Competitive Contracted Rates",
      icon: "priceTag" as const,
    },
    {
      id: "operations",
      label: "Trusted Local Operations",
      icon: "shieldCheck" as const,
    },
  ],
} as const;

export const travelAgentsWhatWeOffer = {
  title: "What We Offer to Our Partners",
  cards: [
    {
      id: "group-fit",
      imageSrc: "/tours/multi-day-tours.webp",
      imageAlt: "Great Sphinx of Giza with pyramids in the background",
      title: "Group Tour and FIT",
      bullets: [
        "Leisure & MICE Specialists",
        "DMC in Egypt and Beyond",
        "Competitive B2B & Contracted Rates",
        "Fully Tailor-Made Itineraries",
        "Reliable Ground Handling Services",
      ],
      ctaLabel: "View More",
      ctaHref: "/multi-day-egypt-tours",
      ctaVariant: "primary" as const,
    },
    {
      id: "dmc-mice",
      imageSrc: "/multi-day-tours/banner.webp",
      imageAlt: "Nile cruise ship on the river at sunset",
      title: "Top Egypt DMC & MICE Business",
      bullets: [
        "Strategic Meeting & Venue Selection",
        "Incentive Travel Programs & Group Management",
        "End-To-End Conference Management",
        "Corporate & Personal Event Management",
        "Exhibition Planning & Organization",
      ],
      ctaLabel: "View More",
      ctaHref: "/contact-us",
      ctaVariant: "secondary" as const,
    },
  ],
} as const;

export const travelAgentsWhyPartner = {
  title: "Why Partner With Nourbelle Tours",
  cards: [
    {
      id: "licensed-dmc",
      icon: "documentEye" as const,
      title: "Licensed Egyptian DMC",
      bullets: [
        "Destination management services",
        "Customized ground handling solutions",
        "Transfers & transportation",
        "Event and incentive travel services",
        "Hotel and sightseeing arrangements",
      ],
    },
    {
      id: "b2b-team",
      icon: "supportPerson" as const,
      title: "Dedicated B2B Support Team",
      bullets: [
        "Dedicated Account Managers",
        "Operations & B2B Coordination",
        "Competitive Supplier Negotiations",
        "Quick Response And Pricing Support",
        "Emergency Assistance & Local Expertise",
      ],
    },
  ],
} as const;

export const travelAgentsHowItWorks = {
  title: "How It Works",
  steps: [
    {
      id: "register",
      label: "Register",
      variant: "primary" as const,
      icon: "cursor" as const,
    },
    {
      id: "approve",
      label: "Approve",
      variant: "muted" as const,
      icon: "check" as const,
    },
    {
      id: "book",
      label: "Book",
      variant: "muted" as const,
      icon: "command" as const,
    },
    {
      id: "operate",
      label: "Operate",
      variant: "muted" as const,
      icon: "thumbsUp" as const,
    },
  ],
} as const;
