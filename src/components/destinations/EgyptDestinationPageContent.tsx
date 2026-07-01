"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { RequestCustomTourForm } from "@/components/common/RequestCustomTourForm";
import type { EgyptDestinationCard, EgyptRelatedBlog } from "@/data/egypt-destination-page";

const INITIAL_VISIBLE = 6;

type Props = {
  customizeMinFrom: string;
  cards: readonly EgyptDestinationCard[];
  relatedBlogs: readonly EgyptRelatedBlog[];
};

export function EgyptDestinationPageContent({ customizeMinFrom, cards, relatedBlogs }: Props) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleCards = useMemo(() => cards.slice(0, visibleCount), [cards, visibleCount]);
  const canLoadMore = visibleCount < cards.length;

  function ArrowRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 7.09961H9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 3.59961L9.5 7.09961L6 10.5996"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

  return (
    <div className="w-full lg:pb-16 pt-6 sm:pt-8 md:pt-10">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <Breadcrumb
            variant="inline"
            className="mb-3"
            items={[
              { label: "Home", href: "/" },
              { label: "Egypt & Middle East", href: "/destinations" },
              { label: "Egypt" },
            ]}
          />
          <h1 className="font-heading text-xl font-bold leading-tight tracking-tight text-[#0A0909] sm:text-2xl md:text-3xl lg:text-4xl">
            Egypt Destination
          </h1>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <div className="grid gap-x-3 gap-y-5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6 xl:grid-cols-3">
              {visibleCards.map((card) => (
                <article
                  key={card.slug}
                  className="flex flex-col overflow-hidden">
                  <Link href={card.href} className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl bg-zinc-100">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      className="object-cover transition duration-300 hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col justify-start items-start py-2 sm:py-3">
                    <h2 className="font-heading text-base font-bold text-[#0A0909] sm:text-lg">{card.title}</h2>
                    <p className="mt-1 sm:mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-[#0A0909]">{card.description}</p>
                    <Link
                      href={card.href}
                      className="mt-2 sm:mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-[#0A090926] bg-white px-4 py-2.5 font-heading text-xs font-semibold text-[#0A0909] transition hover:bg-[#0A0909] hover:text-white sm:text-sm"
                    >
                      View More
                      <span aria-hidden className="hidden sm:block">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {canLoadMore ?
              <div className="mt-4 md:mt-6 lg:mt-10 xl:mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((n) => Math.min(n + INITIAL_VISIBLE, cards.length))}
                  className="inline-flex items-center gap-2 font-heading rounded-full px-4 py-2.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-semibold bg-[#41736D] lg:px-6 lg:py-4 lg:text-sm text-white lg:ring-0 transition hover:bg-[#365e59]"
                >
                  Load More
 <span className="hidden lg:inline-flex">
                  <ArrowRight />
                </span>
                </button>
              </div>
            : null}
          </div>

          <aside className="flex w-full min-w-0 flex-col gap-8 lg:max-w-none">
            <div className="">
              <h3 className="font-heading text-lg font-bold text-[#0A0909]">Related Blogs</h3>
              <ul className="mt-5 space-y-5">
                {relatedBlogs.map((post, idx) => (
                  <li key={`${post.slug}-${idx}`} className="pb-5 border-b border-[#0A09091A] last:border-0 last:pb-0">
                    <Link href={`/blog/${post.slug}`} className="group flex gap-3">
                      <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-xl bg-zinc-100">
                        <Image
                          src={post.imageSrc}
                          alt={post.imageAlt}
                          fill
                          className="object-cover transition"
                          sizes="72px"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-heading text-sm font-bold leading-snug text-[#0A0909] transition group-hover:text-[#35635E]">
                          {post.title}
                        </h4>
                        <p className="text-xs line-clamp-2 leading-relaxed text-[#0A0909]">{post.excerpt}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <RequestCustomTourForm
              customizeMinFrom={customizeMinFrom}
              contextField={{ name: "destinationPage", value: "egypt" }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
