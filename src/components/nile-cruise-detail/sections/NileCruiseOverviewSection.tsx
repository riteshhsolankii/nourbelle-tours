"use client";

import Image from "next/image";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";

type Props = {
  detail: TourPackagePageDetail;
  heroImage: { src: string; alt: string };
  sectionScrollClass: string;
};

export function NileCruiseOverviewSection({ detail, heroImage, sectionScrollClass }: Props) {
  return (
    <section id="nile-overview" className={sectionScrollClass}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-100 lg:rounded-2xl">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 65vw"
          priority
        />
      </div>
      <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85 md:mt-8 md:text-base">{detail.overviewIntro}</p>
    </section>
  );
}
