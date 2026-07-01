/** Navigation item: leaf link or dropdown (static now; replace via GraphQL later). */
export type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

export type TourCard = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  /** Bullet lines shown with check icons (typically 3). */
  features: string[];
  /** Current “from” price (USD). */
  price: number;
  /** Original list price when discounted. */
  priceWas?: number;
  /** Discount label percent, e.g. 50 → "-50%". If omitted but `priceWas` is set, it is derived. */
  discountPercent?: number;
  /** Small line under price (e.g. twin sharing). */
  perPersonNote?: string;
  /** Small badge pill over the card image (e.g. "Best Seller", "Luxury"). */
  badgeLabel?: string;
  /** Short route line under the title (e.g. "Cairo • Luxor • Aswan"). */
  destinationsLine?: string;
  durationDays?: number;
  ratingValue?: number;
  ratingCount?: number;
};

export type HomeTabId = "packages" | "cruises" | "dayTours";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type PriceInfoCardContent = {
  startingFrom: string;
  price: string;
  duration: string;
  groupType: string;
  buttonText: string;
  buttonLink: string;
};

export type GlobalPageBannerContent = {
  breadcrumbs: readonly BreadcrumbItem[];
  title: string;
  description: string;
  backgroundImage: {
    src: string;
    alt: string;
  };
  ctaText: string;
  ctaLink: string;
  /** When omitted, the banner is single-column (e.g. Contact Us). */
  priceCard?: PriceInfoCardContent;
};
