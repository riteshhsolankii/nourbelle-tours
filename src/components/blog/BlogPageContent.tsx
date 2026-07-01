"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HorizontalScrollStrip } from "@/components/common/HorizontalScrollStrip";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import { buildBlogPageHref } from "@/lib/blog";
import {
  blogPageCategories,
  blogPosts,
  type BlogCategoryId,
  type BlogPost,
} from "@/data/blog-page";

const POSTS_PER_PAGE = 9;

function ArrowRight() {
  return (
    <span className="hidden md:inline-flex">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    </span>
  );
}

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex h-full flex-col">
      <Link href={post.href} className="group block">
        <div className="relative aspect-[16/9] overflow-hidden rounded-[12px] bg-zinc-100">
          <Image
            src={post.imageSrc}
            alt={post.imageAlt}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
        <h3 className="mt-2.5 sm:mt-4 min-h-[2.4em] text-sm font-bold leading-[1.2] text-[#0A0909] decoration-1 underline-offset-[5px] transition hover:underline md:text-base lg:text-xl">
          {post.title}
        </h3>
      </Link>
      <div className="flex flex-1 flex-col">
        <p className="mt-1.5 flex-1 text-[11px] leading-relaxed text-[#0A0909] sm:text-xs md:mt-3 md:text-sm">
          {post.excerpt}
        </p>
        <div className="mt-auto pt-3 md:pt-4">
          <Link
            href={post.href}
            className="inline-flex items-center text-xs underline underline-offset-2 transition md:gap-2 md:rounded-full md:border md:border-[#0A0909] md:px-4 md:py-2.5 md:font-heading md:text-sm md:font-semibold md:no-underline md:hover:border-[#41736D] md:hover:bg-[#365e59] md:hover:text-white"
          >
            Read Post <span className="md:hidden">...</span>
            <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

const validCategories = new Set<BlogCategoryId>([
  "all",
  "travel-tips",
  "destination-guides",
  "itinerary-ideas",
  "culture-history",
]);

function parseCategory(value: string | null | undefined): BlogCategoryId {
  if (value && validCategories.has(value as BlogCategoryId)) {
    return value as BlogCategoryId;
  }
  return "all";
}

function parsePage(value: string | null | undefined, totalPages: number): number {
  const n = parseInt(value ?? "1", 10);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.min(n, totalPages);
}

type Props = {
  customizeMinFrom: string;
};

export function BlogPageContent({ customizeMinFrom }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategory = parseCategory(searchParams.get("category"));

  const filteredPosts = useMemo(() => {
    if (activeCategory === "all") return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = parsePage(searchParams.get("page"), totalPages);

  const pagePosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredPosts.slice(start, start + POSTS_PER_PAGE);
  }, [filteredPosts, currentPage]);

  function selectCategory(category: BlogCategoryId) {
    router.push(buildBlogPageHref(1, category));
  }

  return (
    <div className="w-full lg:pb-16 pt-6 sm:pt-8 md:pt-10">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <ScrollRevealSection>
        <header className="mb-6 sm:mb-8 md:mb-10">
          <Breadcrumb
            variant="inline"
            className="mb-3"
            items={[
              { label: "Home", href: "/" },
              { label: "Egypt Travel Blog", href: "/blog" },
              { label: "Blog" },
            ]}
          />
          <h1 className="font-heading text-xl am:text-2xl font-bold tracking-tight text-[#0A0909] md:text-3xl lg:text-4xl">
            Egypt Travel Blog
          </h1>
          <nav className="mt-5 border-b border-[#0A090926]" aria-label="Blog categories">
            <HorizontalScrollStrip
              ariaLabel="Blog categories"
              className="-mb-px"
              scrollClassName="pb-px"
              prevLabel="Scroll categories left"
              nextLabel="Scroll categories right"
            >
              <ul className="flex flex-nowrap gap-x-5 sm:gap-x-8">
                {blogPageCategories.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <li key={cat.id} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => selectCategory(cat.id)}
                        className={[
                          "whitespace-nowrap font-heading pb-1.5 sm:pb-3 text-xs sm:text-sm font-semibold transition md:text-base",
                          isActive ?
                            "border-b-2 border-[#0A0909] text-[#0A0909]"
                          : "border-b-2 border-transparent text-[#0A0909]/70 hover:text-[#0A0909]",
                        ].join(" ")}
                      >
                        {cat.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </HorizontalScrollStrip>
          </nav>
        </header>
        </ScrollRevealSection>

        <ScrollRevealSection>
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:items-start lg:gap-10 xl:gap-12">
          <div className="min-w-0">
            <div className="grid grid-cols-2 items-stretch gap-x-4 gap-y-8 xl:grid-cols-3" key={`${activeCategory}-${currentPage}`}>
              {pagePosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
            {pagePosts.length === 0 ?
              <p className="py-12 text-center text-zinc-600">No articles in this category yet.</p>
            : null}
            <BlogPagination currentPage={currentPage} totalPages={totalPages} category={activeCategory} />
          </div>
          <BlogSidebar customizeMinFrom={customizeMinFrom} />
        </div>
        </ScrollRevealSection>
      </div>
    </div>
  );
}
