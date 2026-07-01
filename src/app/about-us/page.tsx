import { AboutUsPageBody } from "@/components/about-us/AboutUsPageBody";
import { AboutUsSecondaryNav } from "@/components/about-us/AboutUsSecondaryNav";
import { GlobalPageBanner } from "@/components/common/GlobalPageBanner";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { aboutPageBanner } from "@/data/site-static";
import { tourReviewsContent } from "@/lib/tour-reviews";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet Nourbelle Tours — local experts for tailor-made Egypt tours, Nile cruises, and trusted on-the-ground support.",
};

export default function AboutPage() {
  const reviewsContent = {
    ...tourReviewsContent,
  };

  return (
    <>
      <ScrollRevealSection>
        <GlobalPageBanner {...aboutPageBanner} />
      </ScrollRevealSection>
      <AboutUsSecondaryNav />
      <AboutUsPageBody reviewsContent={reviewsContent} />
    </>
  );
}
