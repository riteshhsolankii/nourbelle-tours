import type { Metadata } from "next";
import { MultiDayToursHero } from "@/components/multi-day-tours/MultiDayToursHero";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { PopularPackagesSection } from "@/components/common/PopularPackagesSection";
import { TourPackagesCategoriesSection } from "@/components/common/TourPackagesCategoriesSection";
import { TourPromoTwinCardsSection } from "@/components/common/TourPromoTwinCardsSection";
import { TourReviewsCarouselSection } from "@/components/common/TourReviewsCarouselSection";
import { WhyChooseNourbelleSection } from "@/components/common/WhyChooseNourbelleSection";
import {
  globalPageBanners,
  homeContactCta,
  multiDayTourCategoriesSection,
  multiDayToursHero,
  multiDayTourTwinCtaSection,
  popularTourPackages,
  whyChooseNourbelleSection,
} from "@/data/site-static";
import { tourReviewsContent } from "@/lib/tour-reviews";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";

const banner = globalPageBanners.multiDayTours;

export const metadata: Metadata = {
  title: "Multi Day Tours",
  description: banner.description,
};

export default function MultiDayToursPage() {
  return (
    <>
      <MultiDayToursHero
        breadcrumbs={banner.breadcrumbs}
        title={multiDayToursHero.title}
        subtitle={multiDayToursHero.subtitle}
        backgroundImageSrc={multiDayToursHero.backgroundImageSrc}
        backgroundImageAlt={multiDayToursHero.backgroundImageAlt}
        perks={multiDayToursHero.perks}
        quoteCard={multiDayToursHero.quoteCard}
      />
      <ScrollRevealSection>
        <PopularPackagesSection
          title={popularTourPackages.sectionTitle}
          tours={popularTourPackages.byPage.multiDayTours}
          ctaText={popularTourPackages.sectionCtaText}
          ctaLink="/multi-day-egypt-tours"
          filterPreset="multiDay"
          maxItems={6}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TourPackagesCategoriesSection
          title={multiDayTourCategoriesSection.title}
          cards={multiDayTourCategoriesSection.cards}
          cardCtaLabel={multiDayTourCategoriesSection.cardCtaLabel}
          ctaLabel={multiDayTourCategoriesSection.ctaLabel}
          ctaHref={multiDayTourCategoriesSection.ctaHref}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TourPromoTwinCardsSection cards={multiDayTourTwinCtaSection.cards} />
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
