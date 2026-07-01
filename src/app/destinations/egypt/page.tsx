import type { Metadata } from "next";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { EgyptDestinationPageContent } from "@/components/destinations/EgyptDestinationPageContent";
import { TopDestinationsSection } from "@/components/home/TopDestinationsSection";
import { egyptDestinationCards, egyptRelatedBlogs } from "@/data/egypt-destination-page";
import { homeContactCta, topDestinations } from "@/data/site-static";
import { TourReviewsCarouselSection } from "@/components/common/TourReviewsCarouselSection";
import { tourReviewsContent } from "@/lib/tour-reviews";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";

export const metadata: Metadata = {
  title: "Egypt Destination",
  description:
    "Discover Cairo, Luxor, the Nile, and the Red Sea — destinations across Egypt with travel ideas from Nourbelle Tours.",
};

function customizeMinFromToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function EgyptDestinationPage() {
  return (
    <>
      <ScrollRevealSection>
        <EgyptDestinationPageContent
          customizeMinFrom={customizeMinFromToday()}
          cards={egyptDestinationCards}
          relatedBlogs={egyptRelatedBlogs}
        />
      </ScrollRevealSection>
      <ScrollRevealSection className="w-full bg-[#FAFAFA]">
        <TopDestinationsSection
          title={topDestinations.title}
          exploreHref={topDestinations.exploreHref}
          exploreLabel={topDestinations.exploreLabel}
          destinations={topDestinations.destinations}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TourReviewsCarouselSection content={tourReviewsContent} variant="plain" />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <ContactCtaSection
          title={homeContactCta.title}
          description={homeContactCta.description}
          backgroundImageSrc={homeContactCta.backgroundImageSrc}
          backgroundImageAlt={homeContactCta.backgroundImageAlt}
          buttons={homeContactCta.buttons}
        />
      </ScrollRevealSection>
    </>
  );
}
