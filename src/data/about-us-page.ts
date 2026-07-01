/** Static copy for `/about-us` — replace with CMS when ready. */

export const aboutUsSecondaryNav = [
  { id: "overview", label: "Overview" },
  { id: "why-choose-us", label: "Why Choose Us" },
  { id: "our-purpose", label: "Our Purpose" },
  { id: "reviews", label: "Reviews" },
] as const;

export const aboutUsOverview = {
  title: "About Us",
  paragraphs: [
    "Nourbelle Tours is a top Destination Management Company in Egypt, specializing in tailor-made tours and travel packages.",
    "We invite you to explore all the wonders that Egypt has to offer with Nourbelle Tours as your host. Cruise the majestic River Nile between Luxor and Aswan aboard our luxury fleet for 4 or 5 days. Enjoy daily guided excursions led by professional Egyptologists, followed by delightful leisure activities. Experience exceptional hospitality as you journey through history, delving into the 5,000 years of history that unfold on your unforgettable journey through ancient Egypt.",
    "We offer a diverse range of tour packages tailored to various interests and preferences. Whether you’re seeking Egypt’s ancient wonders, exploring its vibrant cities, or simply craving relaxation on pristine beaches, there’s a tour option perfectly suited to your desires.",
  ],
  imageSrc: "/about/about.webp",
  imageAlt: "Great Sphinx and pyramids at Giza with a visitor in the foreground",
} as const;

export const aboutUsWhyChoose = {
  title: "Why Choose Nourbelle Tours?",
  items: [
    {
      id: "personalized",
      title: "Personalized Travel Plans",
      description:
        "Itineraries built around your pace, must-sees, and travel style — not one-size-fits-all templates.",
      icon: "plane" as const,
    },
    {
      id: "tailored",
      title: "Tailored Holiday Experience",
      description:
        "Private transfers, hand-picked pacing, and flexible adjustments so your holiday feels like yours.",
      icon: "spark" as const,
    },
    {
      id: "local",
      title: "Local Experts",
      description:
        "Licensed Egyptologists and local teams who know the sites, timing, and culture — and share them clearly.",
      icon: "user" as const,
    },
    {
      id: "accommodations",
      title: "Selected Accommodations",
      description:
        "Hotels and cruise options vetted for comfort, location, and value across Cairo, Luxor, Aswan, and the Red Sea.",
      icon: "building" as const,
    },
    {
      id: "culinary",
      title: "Authentic Culinary Experiences",
      description:
        "From classic Egyptian dishes to well-chosen local restaurants, we help you taste the country safely and memorably.",
      icon: "utensils" as const,
    },
    {
      id: "trusted",
      title: "Your Trusted Travel Companion",
      description:
        "Support before departure and responsive help on the ground so you can focus on enjoying the journey.",
      icon: "shield" as const,
    },
  ],
} as const;

export const aboutUsPurpose = {
  title: "Our Purpose",
  vision: {
    title: "Vision",
    text: "To be the Egypt travel partner travellers recommend first — known for honest advice, seamless logistics, and journeys that respect both guests and local communities.",
  },
  mission: {
    title: "Mission",
    text: "To design and deliver safe, well-organized Egypt tours and Nile cruises with transparent pricing, expert guiding, and service that turns first-time visitors into lifelong friends of the country.",
  },
} as const;
