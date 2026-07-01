import type { Metadata } from "next";
import Link from "next/link";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore Egypt and the Middle East — cities, coast, and Nile regions.",
};

export default function DestinationsIndexPage() {
  return (
    <div className="mx-auto max-w-[1390px] px-4 py-12 sm:px-5 md:py-16">
      <ScrollRevealSection>
        <h1 className="font-heading text-2xl font-bold text-[#0A0909] md:text-3xl">Destinations</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#0A0909]/80 md:text-base">
          Choose a region to browse curated itineraries and local highlights.
        </p>
        <ul className="mt-8 space-y-3">
          <li>
            <Link
              href="/destinations/egypt"
              className="inline-flex items-center gap-2 font-heading text-base font-semibold text-[#35635E] underline-offset-4 hover:underline"
            >
              Egypt Destination
              <span aria-hidden>→</span>
            </Link>
          </li>
        </ul>
      </ScrollRevealSection>
    </div>
  );
}
