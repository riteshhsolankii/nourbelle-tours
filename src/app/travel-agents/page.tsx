import { GlobalPageBanner } from "@/components/common/GlobalPageBanner";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { TravelAgentsDesignedForSection } from "@/components/travel-agents/TravelAgentsDesignedForSection";
import { TravelAgentsWhatWeOfferSection } from "@/components/travel-agents/TravelAgentsWhatWeOfferSection";
import { TravelAgentsWhyPartnerSection } from "@/components/travel-agents/TravelAgentsWhyPartnerSection";
import { TravelAgentsHowItWorksSection } from "@/components/travel-agents/TravelAgentsHowItWorksSection";
import { TravelAgentRegistrationSection } from "@/components/travel-agents/TravelAgentRegistrationSection";
import { homeContactCta, travelAgentsPageBanner } from "@/data/site-static";
import type { Metadata } from "next";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";

export const metadata: Metadata = {
  title: "Travel Agents & B2B",
  description:
    "Partner with Nourbelle Tours in Egypt — DMC support, tailor-made itineraries, competitive rates, and dedicated B2B service for travel agents and tour operators.",
};

export default function TravelAgentsPage() {
  return (
    <>
      <ScrollRevealSection>
        <GlobalPageBanner {...travelAgentsPageBanner} />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TravelAgentsDesignedForSection />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TravelAgentsWhatWeOfferSection />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TravelAgentsWhyPartnerSection />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TravelAgentsHowItWorksSection />
      </ScrollRevealSection>
      <ScrollRevealSection>
        <TravelAgentRegistrationSection />
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
