import type { TourPackagePageDetail } from "@/types/tour-package-detail";

export function formatUsd(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatUsdFull(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export type DatePriceSort = "startAsc" | "startDesc" | "priceAsc" | "priceDesc";

export function parseDateLabel(value: string) {
  const direct = Date.parse(value);
  if (!Number.isNaN(direct)) return direct;
  const withoutWeekday = value.replace(/^[A-Za-z]+\s+/, "");
  const fallback = Date.parse(withoutWeekday);
  if (!Number.isNaN(fallback)) return fallback;
  return 0;
}

export function discountPct(d: TourPackagePageDetail["sidebar"]) {
  if (d.discountPercent != null) return d.discountPercent;
  if (d.priceWas != null && d.priceWas > d.price) {
    return Math.round(((d.priceWas - d.price) / d.priceWas) * 100);
  }
  return null;
}

export function scrollToSection(domId: string) {
  document.getElementById(domId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  try {
    window.history.replaceState(null, "", `#${domId}`);
  } catch {
    /* ignore */
  }
}
