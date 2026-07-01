import type { Metadata } from "next";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { NileCruiseTierSection } from "@/components/nile-cruises/NileCruiseTierSection";
import { NileCruisesFeaturedClient } from "@/components/nile-cruises/NileCruisesFeaturedClient";
import {
  nileCruiseFeaturedCatalog,
  nileCruiseFeaturedViewMore,
  nileCruiseIntro,
  nileCruiseTierSections,
} from "@/data/nile-cruises-page";
import { WhyChooseNourbelleSection } from "@/components/common/WhyChooseNourbelleSection";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";
import { homeContactCta, whyChooseNourbelleSection } from "@/data/site-static";

export const metadata: Metadata = {
  title: "Nile Cruises",
  description: nileCruiseIntro.description,
};

export default function NileCruisesPage() {
  return (
    <>
      <ScrollRevealSection>
        <NileCruisesFeaturedClient
          introTitle={nileCruiseIntro.title}
          introDescription={nileCruiseIntro.description}
          catalog={nileCruiseFeaturedCatalog}
          viewMore={nileCruiseFeaturedViewMore}
        />
      </ScrollRevealSection>
      {nileCruiseTierSections.map((section, i) => (
        <ScrollRevealSection key={section.title}>
          <NileCruiseTierSection
            section={section}
            surfaceClassName={i % 2 === 0 ? "bg-[#F3F4F6]" : "bg-white"}
          />
        </ScrollRevealSection>
      ))}
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
