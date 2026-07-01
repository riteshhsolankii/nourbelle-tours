import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourPackageDetailClient } from "@/components/tour-detail/TourPackageDetailClient";
import { dayTourSlugs, getDayTourDetail } from "@/data/tour-package-details";

export function generateStaticParams() {
  return dayTourSlugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getDayTourDetail(slug);
  if (!d) return { title: "Day tour" };
  return {
    title: `${d.title} | Nourbelle Tours`,
    description: d.overviewIntro.slice(0, 155),
  };
}

export default async function DayTourPackagePage({ params }: Props) {
  const { slug } = await params;
  const detail = getDayTourDetail(slug);
  if (!detail) notFound();
  return <TourPackageDetailClient detail={detail} />;
}
