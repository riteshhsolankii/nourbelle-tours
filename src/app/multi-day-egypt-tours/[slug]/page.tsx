import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TourPackageDetailClient } from "@/components/tour-detail/TourPackageDetailClient";
import { getMultiDayTourDetail, multiDayTourSlugs } from "@/data/tour-package-details";

export function generateStaticParams() {
  return multiDayTourSlugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getMultiDayTourDetail(slug);
  if (!d) return { title: "Tour package" };
  return {
    title: `${d.title} | Nourbelle Tours`,
    description: d.overviewIntro.slice(0, 155),
  };
}

export default async function MultiDayTourPackagePage({ params }: Props) {
  const { slug } = await params;
  const detail = getMultiDayTourDetail(slug);
  if (!detail) notFound();
  return <TourPackageDetailClient detail={detail} />;
}
