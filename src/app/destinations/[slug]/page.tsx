import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";
import { TourReviewsCarouselSection } from "@/components/common/TourReviewsCarouselSection";
import { DestinationGuidePageContent } from "@/components/destinations/DestinationGuidePageContent";
import { destinationGuideSlugs, getDestinationGuide } from "@/data/destination-guides";
import { homeContactCta } from "@/data/site-static";
import { tourReviewsContent } from "@/lib/tour-reviews";

export function generateStaticParams() {
  return destinationGuideSlugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getDestinationGuide(slug);
  if (!guide) return { title: "Destination" };
  return {
    title: `${guide.title} | Nourbelle Tours`,
    description: guide.metaDescription,
  };
}

function customizeMinFromToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default async function DestinationGuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getDestinationGuide(slug);
  if (!guide) notFound();

  return (
    <>
      <DestinationGuidePageContent guide={guide} customizeMinFrom={customizeMinFromToday()} />
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
