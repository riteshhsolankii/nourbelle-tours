"use client";

import Image from "next/image";

type Props = {
  images: readonly { src: string; alt: string }[];
  sectionScrollClass: string;
  onOpenLightbox: (index: number) => void;
};

export function NileCruiseGallerySection({ images, sectionScrollClass, onOpenLightbox }: Props) {
  if (images.length === 0) return null;
  return (
    <section id="nile-gallery" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10`}>
      <h2 className="font-heading text-xl font-bold text-[#0A0909] md:text-2xl">Gallery</h2>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:gap-4">
        {images.map((img, index) => (
          <button
            key={`${img.src}-${index}`}
            type="button"
            onClick={() => onOpenLightbox(index)}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#41736D]"
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover transition hover:scale-[1.03]" sizes="(max-width:640px) 50vw, 33vw" />
          </button>
        ))}
      </div>
    </section>
  );
}
