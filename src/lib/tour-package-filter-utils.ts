import type { TourCard } from "@/types/site";

export function getTravelStyleLabel(tour: TourCard) {
  if (tour.href.includes("/nile-cruises") || tour.href.includes("/nile-cruise")) return "Nile Cruise";
  if (tour.href.includes("/day-tours")) return "Day Tour";
  return "Tour Package";
}

/** Multi-day listing: fixed buckets 5–9 days and 10–15. */
export function getMultiDayDurationBucket(tour: TourCard) {
  const title = tour.title.toLowerCase();
  const matchedDays = title.match(/(\d+)\s*day/);
  const dayCount = matchedDays?.[1] ? Number(matchedDays[1]) : null;
  if (dayCount != null) {
    if (dayCount >= 10) return "10 to 15";
    if (dayCount >= 5) return `${dayCount} Days`;
  }
  const matchedNights = title.match(/(\d+)\s*night/);
  if (matchedNights?.[1]) {
    const nightCount = Number(matchedNights[1]);
    if (nightCount >= 9) return "10 to 15";
    if (nightCount >= 4) return `${nightCount + 1} Days`;
  }
  return "10 to 15";
}

/** Day tour listing: half vs full day from title. */
export function getDayTourDurationBucket(tour: TourCard) {
  const t = tour.title.toLowerCase();
  if (t.includes("half-day") || t.includes("half day")) return "Half day";
  return "Full day";
}

export function getDestinationLabel(tour: TourCard) {
  const haystack = `${tour.title} ${tour.features.join(" ")}`.toLowerCase();
  if (haystack.includes("cairo") || haystack.includes("giza")) return "Cairo & Giza";
  if (haystack.includes("luxor")) return "Luxor";
  if (haystack.includes("aswan")) return "Aswan";
  if (haystack.includes("alexandria")) return "Alexandria";
  return "Multiple Destinations";
}

export function getPriceRangeBucket(tour: TourCard) {
  if (tour.price < 500) return "Under $500";
  if (tour.price <= 1000) return "$500 - $1,000";
  return "$1,000+";
}

export function getDerivedDiscountPercent(tour: TourCard): number {
  if (tour.priceWas == null || tour.priceWas <= tour.price) return 0;
  return Math.round(((tour.priceWas - tour.price) / tour.priceWas) * 100);
}

export function sortToursByKey(tours: TourCard[], sortBy: string) {
  const sorted = [...tours];
  if (sortBy === "price-low") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === "discount") {
    sorted.sort(
      (a, b) =>
        (b.discountPercent ?? getDerivedDiscountPercent(b)) -
        (a.discountPercent ?? getDerivedDiscountPercent(a)),
    );
  }
  return sorted;
}
