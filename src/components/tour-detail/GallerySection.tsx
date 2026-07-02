"use client";

import Image from "next/image";

type GalleryImage = { src: string; alt: string };

type Props = {
  images: readonly GalleryImage[];
  onOpenLightbox: (index: number) => void;
};

export function GallerySection({ images, onOpenLightbox }: Props) {
  const hero = images[0];
  const otherIndexes = images.map((_, i) => i).filter((i) => i !== 0);
  const maxVisibleThumbs = 4;
  const visibleThumbIndexes = otherIndexes.slice(0, maxVisibleThumbs);
  const remainingThumbCount = otherIndexes.length - visibleThumbIndexes.length;
  const thumbGridColsClass =
    visibleThumbIndexes.length <= 2 ? "grid-cols-2"
    : visibleThumbIndexes.length === 3 ? "grid-cols-3"
    : "grid-cols-2 sm:grid-cols-4";

  if (!hero) return null;

  return (
    <div className="space-y-2 sm:space-y-3">
      <button
        type="button"
        onClick={() => onOpenLightbox(0)}
        className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-zinc-100 text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#41736D] sm:min-h-[200px] md:min-h-[260px] lg:rounded-2xl"
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          className="object-cover transition hover:scale-[1.02]"
          sizes="(max-width: 1024px) 100vw, 65vw"
          priority
        />
      </button>
      {visibleThumbIndexes.length > 0 ?
        <div className={`grid ${thumbGridColsClass} gap-2 sm:gap-3`}>
          {visibleThumbIndexes.map((imgIndex, i) => {
            const img = images[imgIndex];
            const isLastVisible = i === visibleThumbIndexes.length - 1;
            return (
              <button
                key={`${img.src}-${imgIndex}`}
                type="button"
                onClick={() => onOpenLightbox(imgIndex)}
                aria-label={`Show image ${imgIndex + 1}`}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-100 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-[#41736D] lg:rounded-2xl"
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transition hover:scale-[1.02]" sizes="(max-width: 640px) 50vw, 20vw" />
                {isLastVisible && remainingThumbCount > 0 ?
                  <span className="absolute inset-0 flex items-center justify-center gap-1.5 bg-[#0A0909]/60 font-heading text-xs font-semibold text-white sm:text-sm">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
                      <path d="M3 17l5-5 4 4 5-6 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    +{remainingThumbCount} View All
                  </span>
                : null}
              </button>
            );
          })}
        </div>
      : null}
    </div>
  );
}
