import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogPageContent } from "@/components/blog/BlogPageContent";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";
import { homeContactCta } from "@/data/site-static";

export const metadata: Metadata = {
  title: "Egypt Travel Blog",
  description: "Travel tips, destination guides, itineraries, and culture stories for planning your Egypt trip.",
};

function customizeMinFromToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function BlogListingFallback() {
  return <div className="min-h-[40vh] w-full" aria-hidden />;
}

export default function BlogIndexPage() {
  return (
    <>
      <Suspense fallback={<BlogListingFallback />}>
        <BlogPageContent customizeMinFrom={customizeMinFromToday()} />
      </Suspense>
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
