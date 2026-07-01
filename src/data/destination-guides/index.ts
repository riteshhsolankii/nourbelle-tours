import { alexandriaDestinationGuide } from "@/data/destination-guides/alexandria";
import { cairoDestinationGuide } from "@/data/destination-guides/cairo";
import type { DestinationGuidePage } from "@/types/destination-guide";

const destinationGuides: Record<string, DestinationGuidePage> = {
  [cairoDestinationGuide.slug]: cairoDestinationGuide,
  [alexandriaDestinationGuide.slug]: alexandriaDestinationGuide,
};

export const destinationGuideSlugs = Object.keys(destinationGuides);

export function getDestinationGuide(slug: string): DestinationGuidePage | undefined {
  return destinationGuides[slug];
}
