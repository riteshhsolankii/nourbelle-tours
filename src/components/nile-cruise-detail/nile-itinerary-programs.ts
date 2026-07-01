import type { NileItineraryProgram, TourPackagePageDetail } from "@/types/tour-package-detail";

export function defaultProgramsFromDetail(detail: TourPackagePageDetail): NileItineraryProgram[] {
  const img0 = detail.gallery[0] ?? { src: "/multi-day-tours/banner.webp", alt: detail.title };
  const img1 = detail.gallery[1] ?? img0;
  const days = detail.itinerary.map((d) => ({
    label: d.label,
    title: d.title,
    bullets: [{ lead: "", text: d.body }] as const,
  }));
  return [
    {
      id: "program-a",
      imageSrc: img0.src,
      imageAlt: img0.alt,
      nightsDaysBadge: detail.sidebar.durationInfo,
      routeTitle: `${detail.routeLabel} — standard sailing`,
      priceFrom: detail.sidebar.price,
      days,
    },
    {
      id: "program-b",
      imageSrc: img1.src,
      imageAlt: img1.alt,
      nightsDaysBadge: detail.sidebar.durationInfo,
      routeTitle: `${detail.routeLabel} — extended programme`,
      priceFrom: Math.round(detail.sidebar.price * 1.22),
      days,
    },
  ];
}

export function getNileItineraryPrograms(detail: TourPackagePageDetail): NileItineraryProgram[] {
  if (detail.nileItineraryPrograms?.length) return [...detail.nileItineraryPrograms];
  return defaultProgramsFromDetail(detail);
}
