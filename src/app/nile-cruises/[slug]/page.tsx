import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NileCruiseDetailClient } from "@/components/nile-cruise-detail/NileCruiseDetailClient";
import { getNileCruisePackageDetail, nileCruisePackageSlugs } from "@/data/nile-cruise-package-details";

export function generateStaticParams() {
  return nileCruisePackageSlugs.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getNileCruisePackageDetail(slug);
  if (!d) return { title: "Nile cruise" };
  return {
    title: `${d.title} | Nourbelle Tours`,
    description: d.overviewIntro.slice(0, 155),
  };
}

export default async function NileCruisePackagePage({ params }: Props) {
  const { slug } = await params;
  const detail = getNileCruisePackageDetail(slug);
  if (!detail) notFound();
  return <NileCruiseDetailClient detail={detail} />;
}
