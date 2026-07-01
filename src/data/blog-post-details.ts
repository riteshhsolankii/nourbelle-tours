import type { BlogPost } from "@/data/blog-page";

export type BlogTocItem = {
  id: string;
  label: string;
  children?: readonly BlogTocItem[];
};

export type BlogDestinationsBlock = {
  id: string;
  heading: string;
  introParagraphs?: readonly string[];
};

export type BlogArticleSection = {
  id: string;
  heading: string;
  paragraphs: readonly string[];
};

export type BlogChecklistItem = {
  title: string;
  description: string;
};

export type BlogDestinationSubsection = {
  heading: string;
  items: readonly BlogChecklistItem[];
};

export type BlogDestinationSection = {
  number: string;
  title: string;
  /** Full heading after the number, e.g. "Cairo – The Egyptian Capital…" */
  heading?: string;
  paragraphs?: readonly string[];
  subsections?: readonly BlogDestinationSubsection[];
  closing?: string;
  /** Legacy simple layout (why visit / things to do). */
  intro?: string;
  whyVisit?: readonly string[];
  thingsToDo?: readonly string[];
};

export type BlogFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type BlogRichContentSection = {
  id: string;
  heading: string;
  intro?: string;
  checklist?: readonly BlogChecklistItem[];
  paragraphs?: readonly string[];
  subheading?: string;
  subheadingParagraphs?: readonly string[];
  highlightedBox?: {
    intro?: string;
    items: readonly string[];
  };
};

export type BlogPostDetail = BlogPost & {
  dateLabel: string;
  tableOfContents: readonly BlogTocItem[];
  introParagraphs: readonly string[];
  /** Headed sections shown after the hero image (before destinations block). */
  articleSections?: readonly BlogArticleSection[];
  /** Gray wrapper: heading + optional intro, then white destination cards inside. */
  destinationsBlock?: BlogDestinationsBlock;
  sections: readonly BlogDestinationSection[];
  /** Rich sections after destinations (tourism cities, about Nourbelle, etc.). */
  richContentSections?: readonly BlogRichContentSection[];
  /** @deprecated Use richContentSections */
  bulletSections?: readonly { heading: string; items: readonly string[]; highlighted?: boolean }[];
  /** @deprecated Use richContentSections */
  closingParagraphs?: readonly string[];
  faq: readonly BlogFaqItem[];
  faqTitle?: string;
  faqCtaLabel?: string;
  faqCtaHref?: string;
  relatedSlugs: readonly string[];
};

export const blogPostDetails: Record<string, BlogPostDetail> = {
  "best-places-to-visit-egypt-2026": {
    slug: "best-places-to-visit-egypt-2026",
    title: "Best Places to Visit in Egypt 2026 – Egypt Destinations",
    excerpt:
      "From Cairo and Giza to Luxor, Aswan, and the Red Sea — a practical guide to Egypt's must-see regions and how to combine them.",
    href: "/blog/best-places-to-visit-egypt-2026",
    imageSrc: "/insights/group-tour-1.webp",
    imageAlt: "Travellers visiting the Pyramids of Giza",
    category: "destination-guides",
    dateLabel: "January 2026",
    tableOfContents: [
      { id: "overview", label: "Best Places to Visit in Egypt 2026 – Egypt Destinations" },
      { id: "why-visit-egypt-2026", label: "Why Visit Egypt in 2026?" },
      { id: "intro-ancient-egypt", label: "Introduction to Ancient Egypt" },
      {
        id: "best-places-2026",
        label: "Best Places to Visit in Egypt 2026",
      },
      { id: "egypt-tourism-cities", label: "Best Egypt Tourism Cities for Every Traveler" },
      { id: "nourbelle-tours", label: "Why Nourbelle Tours Stands Out" },
      { id: "egypt-no-other", label: "Egypt Is a Destination Like No Other" },
      { id: "faq", label: "Frequently Asked Questions" },
    ],
    introParagraphs: [
      "Discover the best places to visit in Egypt 2026, from Cairo to Luxor, Aswan, and the Red Sea. Explore Egypt tourism cities, Nile cruises, and top travel tips. Choosing Egypt as your destination feels like stepping into a place where every sunrise reveals something new. This is a country where the energy of modern life blends effortlessly with the timeless spirit of Ancient Egypt, and where the gentle flow of the River Nile continues to shape daily life across Upper Egypt. From Egypt's bustling Cairo and Alexandria to the majestic temples of Luxor and Aswan, and the tranquil oases of the Western Desert, each region offers its own unique charm and history. Egypt's Mediterranean Coast and Egypt's Black and White Deserts are just a few examples of the country's diverse landscapes. Many travelers arrive with big expectations, but Egypt has a way of surpassing them the moment you enter the vibrant Egyptian capital or watch the sky turn gold over the desert.",
      "The magic of Egypt isn't only in its legendary sites—the ancient wonders, the temples, the royal tombs, and the monumental landmarks that have inspired the world for centuries. It's in the feeling of discovery that follows you everywhere. It's exploring the atmospheric streets of Luxor, one of the top places to visit in Egypt. The best cities to visit in Egypt, such as Cairo, Alexandria, Luxor, and Aswan, each offer unique attractions and experiences for travelers. It's drifting along the river on a peaceful Nile cruise, watching small villages pass by. It's diving into the clear waters of the Red Sea, where coral reefs and marine life create a world of color beneath the surface.",
    ],
    articleSections: [
      {
        id: "why-visit-egypt-2026",
        heading: "Why Visit Egypt in 2026?",
        paragraphs: [
          "The magic of Egypt isn't only in its legendary sites—the ancient wonders, the temples, the royal tombs, and the monumental landmarks that have inspired the world for centuries. It's in the feeling of discovery that follows you everywhere. It's exploring the atmospheric streets of Luxor, one of the top places to visit in Egypt. The best cities to visit in Egypt, such as Cairo, Alexandria, Luxor, and Aswan, each offer unique attractions and experiences for travelers. It's drifting along the river on a peaceful Nile cruise, watching small villages pass by. It's diving into the clear waters of the Red Sea, where coral reefs and marine life create a world of color beneath the surface.",
        ],
      },
      {
        id: "intro-ancient-egypt",
        heading: "Introduction to Ancient Egypt",
        paragraphs: [
          "Egypt stands as one of the world's most captivating destinations, where ancient wonders and vibrant modern life exist side by side. The legacy of Ancient Egypt is visible everywhere—from the awe-inspiring Pyramids of Giza to the grand temples of Luxor, each site telling a story that spans millennia. The mighty Nile River, the lifeblood of this ancient civilization, continues to shape the country's landscape and culture, making a Nile cruise one of the most memorable ways to experience Egypt's timeless beauty.",
          "History enthusiasts will find endless fascination in the ancient city of Thebes, the treasures of the Egyptian Museum in Cairo, and the countless archaeological marvels scattered along the Nile. Yet, Egypt is not just about its ancient history; it's also a land of stunning contrasts. Along the Red Sea coast, beautiful beaches and crystal-clear waters invite travelers to relax, dive, and explore vibrant marine life. Whether you're drawn to the mysteries of ancient Egypt, the bustling energy of a modern city, or the tranquil shores of the Red Sea, visiting Egypt promises an adventure that blends culture, relaxation, and discovery in every moment.",
        ],
      },
    ],
    destinationsBlock: {
      id: "best-places-2026",
      heading: "Best Places to Visit in Egypt 2026",
    },
    sections: [
      {
        number: "1",
        title: "Cairo",
        heading: "Cairo – The Egyptian Capital & Gateway to Ancient Wonders",
        paragraphs: [
          "Egypt's sprawling capital is where most journeys begin. Within a short drive you reach the Giza plateau, while the city itself layers pharaonic, Coptic, and Islamic heritage with world-class museums and lively bazaars.",
          "Plan at least two to four days: one for Giza and Saqqara, one for museum collections and Old Cairo, and optional time for Islamic Cairo, the Citadel, and a Nile felucca or dinner cruise.",
        ],
        subsections: [
          {
            heading: "Why Cairo Should Be Your First Stop?",
            items: [
              {
                title: "Gateway to Giza & Saqqara",
                description:
                  "The pyramids, Sphinx, and Step Pyramid are within easy reach — most first-time visitors start here.",
              },
              {
                title: "Museums & Old Cairo",
                description:
                  "World-class collections and layered Coptic, Islamic, and pharaonic sites reward two to four full days.",
              },
            ],
          },
          {
            heading: "Top Attractions in Cairo",
            items: [
              {
                title: "The Great Pyramids & Great Sphinx",
                description:
                  "Egypt's most iconic landmarks on the Giza plateau — best visited at sunrise with a private guide to beat crowds and heat.",
              },
              {
                title: "Grand Egyptian Museum (GEM)",
                description:
                  "The new home for Tutankhamun treasures and vast royal collections; pair with the classic Egyptian Museum in Tahrir if time allows.",
              },
              {
                title: "Islamic Cairo & Khan el-Khalili",
                description:
                  "Medieval streets, mosques, and one of the Middle East's oldest bazaars — ideal for an afternoon walk and traditional coffee.",
              },
              {
                title: "Citadel of Saladin & Mosque of Muhammad Ali",
                description:
                  "Panoramic views over the city and a striking Ottoman mosque within a fortress that dominated Cairo for centuries.",
              },
            ],
          },
        ],
        closing:
          "Cairo sets the tone for the rest of Egypt — efficient private transfers and a well-paced first week make Luxor and Aswan feel effortless. Nourbelle Tours builds Cairo stays with hand-picked hotels and Egyptologist guides.",
      },
      {
        number: "2",
        title: "Luxor",
        heading: "Luxor – The World's Greatest Open-Air Museum",
        paragraphs: [
          "Luxor sits on the site of ancient Thebes, capital of the New Kingdom. The east bank holds colossal temples; the west bank hides royal tombs and mortuary temples in the desert hills.",
          "Allow three to four full days — or combine with a Nile cruise — to cover Karnak, the Valley of the Kings, and optional balloon rides, Dendera, or Abydos extensions.",
        ],
        subsections: [
          {
            heading: "What Makes Luxor the Heart of Ancient Egypt?",
            items: [
              {
                title: "Capital of the New Kingdom",
                description:
                  "Thebes was Egypt's religious and political centre — temples and tombs here define classic pharaonic history.",
              },
              {
                title: "East & West Banks",
                description:
                  "Living temples face the Nile; royal necropolises lie in the desert — plan time for both.",
              },
            ],
          },
          {
            heading: "East Bank Highlights",
            items: [
              {
                title: "Karnak Temple Complex",
                description:
                  "A vast sanctuary of pylons, obelisks, and the famous Hypostyle Hall — allow half a day with an expert guide.",
              },
              {
                title: "Luxor Temple",
                description:
                  "Elegant columns and statues linked to the Karnak processional way; stunning when lit at night.",
              },
            ],
          },
          {
            heading: "West Bank Highlights",
            items: [
              {
                title: "Valley of the Kings",
                description:
                  "Royal tombs including Seti I and Tutankhamun (ticketed separately) — visit early morning for fewer groups.",
              },
              {
                title: "Temple of Hatshepsut & Colossi of Memnon",
                description:
                  "Cliff-cut mortuary temple and giant seated statues framing the agricultural plain.",
              },
              {
                title: "Valley of the Queens & Nobles' Tombs",
                description:
                  "Vivid wall paintings in smaller tombs — excellent add-ons when you want depth beyond the kings.",
              },
            ],
          },
          {
            heading: "Experiences & Extensions",
            items: [
              {
                title: "Hot-Air Balloon at Dawn",
                description:
                  "Seasonal flights over the Theban necropolis — book ahead; weather-dependent.",
              },
              {
                title: "Dendera & Abydos Day Trips",
                description:
                  "Full-day drives north for some of Egypt's best-preserved temple decoration.",
              },
            ],
          },
        ],
        closing:
          "Luxor is the heart of classic Egypt itineraries. Private west-bank circuits and pre-booked tomb tickets save hours — we arrange guides, boats, and balloon slots as part of your package.",
      },
    ],
    richContentSections: [
      {
        id: "egypt-tourism-cities",
        heading: "Best Egypt Tourism Cities for Every Traveler",
        intro: "Choosing one city is nearly impossible given the diversity of landscapes and attractions. Here's a quick overview:",
        checklist: [
          {
            title: "Cairo",
            description:
              "Egypt's bustling capital, home to the Pyramids of Giza and the Egyptian Museum.",
          },
          {
            title: "Alexandria",
            description:
              "A Mediterranean port city with Greco-Roman landmarks and a vibrant cultural scene.",
          },
          {
            title: "El Alamein",
            description:
              "One of Egypt's popular tourist destinations, renowned for its historical significance from World War II, beautiful Mediterranean beaches, and unique local culture, making it an appealing spot for visitors seeking well-known vacation spots.",
          },
          {
            title: "Luxor",
            description:
              "Known as the world's greatest open-air museum, featuring the Valley of the Kings and Karnak Temple.",
          },
          {
            title: "Aswan",
            description:
              "Famous for its beautiful Nile views, Philae Temple, and Nubian culture.",
          },
          {
            title: "Sharm El Sheikh & Hurghada",
            description: "Top Red Sea resorts for diving, snorkeling, and beach relaxation.",
          },
        ],
        paragraphs: [
          "Additionally, Mount Sinai stands out as a key destination for travelers seeking both hiking adventures and spiritual experiences. Climbing Mount Sinai offers breathtaking sunrise views from the summit and is located near the historic St. Catherine's Monastery, making it a significant attraction in Egypt.",
        ],
        subheading: "El Gouna: A Luxury Resort Town",
        subheadingParagraphs: [
          "El Gouna has emerged as one of Egypt's premier luxury resort towns, offering a unique blend of upscale amenities, stunning natural beauty, and world-class hospitality. Nestled along the Red Sea coast, this purpose-built resort destination features crystal-clear turquoise lagoons, pristine beaches, and a vibrant marina lined with boutique shops, fine dining restaurants, and entertainment venues.",
          "Whether you're seeking a romantic getaway, a family vacation, or a base for Red Sea diving adventures, El Gouna delivers an exceptional experience with its championship golf courses, spa facilities, and easy access to some of Egypt's best coral reefs.",
        ],
      },
      {
        id: "nourbelle-tours",
        heading: "Why Nourbelle Tours Stands Out",
        intro:
          "Among Egypt's leading travel companies, Nourbelle Tours has established a strong reputation for excellence in:",
        highlightedBox: {
          items: [
            "Premium Nile cruise packages",
            "Guided tours of Cairo, Luxor, Aswan, and Abu Simbel",
            "Red Sea vacations in Sharm El Sheikh, El Gouna, and Marsa Alam",
            "Personalized private tours",
            "Expert local guides",
            "Reliable transportation and curated itineraries",
          ],
        },
        paragraphs: [
          "As a boutique Destination Management Company, Nourbelle Tours specializes in crafting bespoke Egypt experiences that go beyond standard package tours. Our team of certified Egyptologists brings ancient history to life, while our local expertise ensures you discover hidden gems alongside iconic landmarks.",
          "Whether you dream of a luxury Nile cruise, an adventure through desert oases, or a family-friendly exploration of Cairo's treasures, we design fully customizable private tours tailored to your interests, pace, and budget.",
        ],
      },
      {
        id: "egypt-no-other",
        heading: "Egypt Is a Destination Like No Other",
        paragraphs: [
          "From the moment you land in Cairo to your final sunset over the Nile, Egypt offers a journey through time that no other destination can match. The country's unique combination of ancient wonders, warm hospitality, and diverse landscapes creates an unforgettable travel experience.",
          "Whether you're drawn to the mysteries of the pharaohs, the tranquility of a felucca sail, or the vibrant marine life of the Red Sea, Egypt delivers moments that stay with you long after you return home.",
          "With Nourbelle Tours, your Egyptian adventure is in expert hands. We handle every detail — from airport transfers to temple tickets — so you can focus on making memories. Contact us today to start planning your personalized Egypt vacation package.",
        ],
      },
    ],
    faqTitle: "Frequently Asked Questions",
    faqCtaLabel: "Read More FAQ's",
    faqCtaHref: "/faq",
    faq: [
      {
        id: "safe-usa",
        question: "Is Egypt safe to visit for American tourists?",
        answer:
          "Millions of visitors travel to Egypt each year. Tourist areas such as Cairo, Luxor, Aswan, and Red Sea resorts are well served by police and tourism police. We recommend booking with a licensed operator, using private transfers, and following your guide's advice — the same precautions you would take in any major destination.",
      },
      {
        id: "how-long",
        question: "How long should I spend in Egypt?",
        answer:
          "A first trip of 8–10 days can cover Cairo, Luxor, and Aswan (with or without a Nile cruise). Add 3–4 days for the Red Sea or Abu Simbel. Two weeks allows a relaxed pace with room for Alexandria or a desert extension.",
      },
      {
        id: "best-season",
        question: "What is the best season to visit Egypt?",
        answer:
          "October through April offers the most comfortable temperatures for sightseeing. Summer is hotter but fine for Red Sea beach time and early-morning temple visits. Ramadan can affect restaurant hours; we advise on dates when you enquire.",
      },
    ],
    relatedSlugs: [
      "2-week-egypt-itinerary",
      "10-best-things-cairo",
      "nile-river-cruise-luxor-aswan",
      "best-time-to-visit-egypt",
      "is-egypt-safe",
    ],
  },
};
