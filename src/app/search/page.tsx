import type { Metadata } from "next";
import Link from "next/link";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Nourbelle Tours packages and travel guides.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  return (
    <div className="mx-auto max-w-3xl flex-1 px-4 py-12 sm:py-16">
      <ScrollRevealSection>
        <h1 className="font-heading text-2xl font-bold text-[#0A0909] sm:text-3xl">Search</h1>
        {query ?
          <p className="mt-2 text-xs sm:text-sm text-zinc-600">
            Results for <span className="font-medium text-[#0A0909]">&ldquo;{query}&rdquo;</span> will appear here
            once search is connected to WordPress.
          </p>
        : <p className="mt-2 text-xs sm:text-sm text-[#0A0909]">Enter a term in the header search to find tours and articles.</p>}
        <Link
          href="/"
          className="mt-6 sm:mt-8 inline-flex rounded-full border border-[#0A090926] px-5 py-2.5 font-heading text-sm font-semibold text-[#0A0909] transition hover:bg-zinc-50"
        >
          Back to home
        </Link>
      </ScrollRevealSection>
    </div>
  );
}
