import type { Metadata } from "next";
import { HandpickedJourneysSection } from "@/components/home/HandpickedJourneysSection";
import { EgyptJournalBanner } from "@/components/home/EgyptJournalBanner";
import { FindPerfectTourSection } from "@/components/home/FindPerfectTourSection";
import { HomeHero } from "@/components/home/HomeHero";
import { InsightsSection } from "@/components/home/InsightsSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { TopDestinationsSection } from "@/components/home/TopDestinationsSection";
import { AboutReviewsSection } from "@/components/home/AboutReviewsSection";
import { getHomePageBanner } from "@/lib/home-banner";
import {
  aboutAndReviews,
  egyptJournalBanner,
  findPerfectTour,
  handpickedJourneys,
  homeContactCta,
  homeFaqs,
  homeInsights,
  topDestinations,
} from "@/data/site-static";
import { tourReviewsContent } from "@/lib/tour-reviews";

export async function generateMetadata(): Promise<Metadata> {
  const b = await getHomePageBanner();
  return {
    title: b.heroTitle,
    description: b.heroSubtitle,
    openGraph: {
      title: `${b.heroTitle} | Nourbelle Tours`,
      description: b.heroSubtitle,
    },
  };
}

export default async function HomePage() {
  const banner = await getHomePageBanner();

  return (
    <>
      <HomeHero
        heroTitle={banner.heroTitle}
        heroSubtitle={banner.heroSubtitle}
        heroImageSrc={banner.heroImageSrc}
        heroImageAlt={banner.heroImageAlt}
        primaryCta={banner.primaryCta}
        secondaryCta={banner.secondaryCta}
        quickFacts={banner.quickFacts}
        quickFactsButtonLabel={banner.quickFactsButtonLabel}
        quickFactsButtonHref={banner.quickFactsButtonHref}
        trustStats={banner.trustStats}
      />
      <ScrollRevealSection>
        <HandpickedJourneysSection
          title={handpickedJourneys.title}
          exploreHref={handpickedJourneys.exploreHref}
          exploreLabel={handpickedJourneys.exploreLabel}
          tours={handpickedJourneys.tours}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <EgyptJournalBanner
          title={egyptJournalBanner.title}
          subtitle={egyptJournalBanner.subtitle}
          ctaLabel={egyptJournalBanner.ctaLabel}
          ctaHref={egyptJournalBanner.ctaHref}
          thumbnails={egyptJournalBanner.thumbnails}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <FindPerfectTourSection
          title={findPerfectTour.title}
          categories={findPerfectTour.categories}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TopDestinationsSection
          title={topDestinations.title}
          exploreHref={topDestinations.exploreHref}
          exploreLabel={topDestinations.exploreLabel}
          destinations={topDestinations.destinations}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <AboutReviewsSection about={aboutAndReviews.about} reviewsContent={tourReviewsContent} />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <InsightsSection
          title={homeInsights.title}
          exploreHref={homeInsights.exploreHref}
          exploreLabel={homeInsights.exploreLabel}
          cards={homeInsights.cards}
        />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <HomeFaqSection
          title={homeFaqs.title}
          items={homeFaqs.items}
          ctaLabel={homeFaqs.ctaLabel}
          ctaHref={homeFaqs.ctaHref}
        />
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
