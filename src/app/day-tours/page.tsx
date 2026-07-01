import type { Metadata } from "next";
import { GlobalPageBanner } from "@/components/common/GlobalPageBanner";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { PopularPackagesSection } from "@/components/common/PopularPackagesSection";
import { TourPackagesCategoriesSection } from "@/components/common/TourPackagesCategoriesSection";
import { TourPromoTwinCardsSection } from "@/components/common/TourPromoTwinCardsSection";
import { TourReviewsCarouselSection } from "@/components/common/TourReviewsCarouselSection";
import { WhyChooseNourbelleSection } from "@/components/common/WhyChooseNourbelleSection";
import {
  dayTourThingsToDoSection,
  dayTourTwinCtaSection,
  globalPageBanners,
  homeContactCta,
  popularTourPackages,
  whyChooseNourbelleSection,
} from "@/data/site-static";
import { tourReviewsContent } from "@/lib/tour-reviews";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";

const banner = globalPageBanners.dayTours;

export const metadata: Metadata = {
  title: "Day Tours",
  description: banner.description,
};

export default function DayToursPage() {
  return (
    <>
      <GlobalPageBanner {...banner} />
      <ScrollRevealSection>
        <PopularPackagesSection
          title={popularTourPackages.dayToursListingTitle}
          tours={popularTourPackages.byPage.dayTours}
          ctaText={popularTourPackages.sectionCtaText}
          ctaLink="/day-tours"
          filterPreset="dayTour"
          maxItems={6}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TourPackagesCategoriesSection
          title={dayTourThingsToDoSection.title}
          cards={dayTourThingsToDoSection.cards}
          cardCtaLabel={dayTourThingsToDoSection.cardCtaLabel}
          ctaLabel={dayTourThingsToDoSection.ctaLabel}
          ctaHref={dayTourThingsToDoSection.ctaHref}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TourPromoTwinCardsSection cards={dayTourTwinCtaSection.cards} />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TourReviewsCarouselSection content={tourReviewsContent} />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <WhyChooseNourbelleSection content={whyChooseNourbelleSection} />
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
