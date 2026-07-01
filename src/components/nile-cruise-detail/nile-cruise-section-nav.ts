/** Anchor targets for Nile cruise detail pages only (`id` on each section). */
export const NILE_CRUISE_SECTION_NAV: { domId: string; label: string }[] = [
  { domId: "nile-overview", label: "Overview" },
  { domId: "nile-itinerary", label: "Itinerary" },
  { domId: "nile-inclusions", label: "Inclusions" },
  { domId: "nile-facilities", label: "Facilities" },
  { domId: "nile-dates-availability", label: "Dates and Availabilities" },
  { domId: "nile-schedule", label: "Schedule" },
  { domId: "nile-gallery", label: "Gallery" },
  { domId: "nile-reviews", label: "Reviews" },
];

export const NILE_CRUISE_SECTION_IDS = NILE_CRUISE_SECTION_NAV.map((s) => s.domId);
