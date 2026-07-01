"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RequestCustomTourForm } from "@/components/common/RequestCustomTourForm";
import type { BlogPost } from "@/data/blog-page";
import type { BlogPostDetail, BlogTocItem } from "@/data/blog-post-details";

type Props = {
  post: BlogPostDetail;
  relatedPosts: readonly BlogPost[];
  customizeMinFrom: string;
};

function TocLink({
  item,
  activeId,
  onSelect,
  nested = false,
}: {
  item: BlogTocItem;
  activeId: string;
  onSelect: (id: string) => void;
  nested?: boolean;
}) {
  const isActive = activeId === item.id;
  return (
    <a
      href={`#${item.id}`}
      onClick={() => onSelect(item.id)}
      className={[
        "block py-3.5 text-xs sm:text-sm leading-snug text-[#0A0909] transition hover:text-[#41736D] md:text-base",
        nested ? "pl-4 text-[13px] md:text-sm" : "font-medium",
        isActive ? "font-medium underline underline-offset-2" : nested ? "font-normal" : "",
      ].join(" ")}
    >
      {item.label}
    </a>
  );
}

function TableOfContentsPanel({ post }: { post: BlogPostDetail }) {
  const [activeId, setActiveId] = useState(post.tableOfContents[0]?.id ?? "");

  return (
    <section className="overflow-hidden rounded-xl border border-[#0A090926] bg-white">
      <h2 className="rounded-t-xl bg-[#0A0909] px-4 py-3 font-heading text-sm font-bold md:text-base lg:text-xl text-white sm:px-5">
        Table of Contents
      </h2>
      <nav aria-label="Table of contents" className="px-4 sm:px-5">
        <ul className="divide-y divide-[#0A09091A]">
          {post.tableOfContents.map((item) => (
            <li key={item.id}>
              <TocLink item={item} activeId={activeId} onSelect={setActiveId} />
              {item.children && item.children.length > 0 ?
                <ul className="divide-y divide-[#0A09091A] border-t border-[#0A09091A]">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <TocLink item={child} activeId={activeId} onSelect={setActiveId} nested />
                    </li>
                  ))}
                </ul>
              : null}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export function BlogPostSidebar({ post, relatedPosts, customizeMinFrom }: Props) {
  return (
    <aside className="order-2 flex w-full min-w-0 flex-col gap-8 lg:order-1 lg:max-w-none">
      <TableOfContentsPanel post={post} />
      <section>
        <h2 className="font-heading text-base font-bold text-[#0A0909] sm:text-lg">Related Post</h2>
        <ul className="mt-4 divide-y divide-[#0A09091A]">
          {relatedPosts.map((related) => (
            <li key={related.slug} className="py-4 first:pt-0">
              <Link href={related.href} className="group flex gap-3">
                <div className="relative size-[72px] shrink-0 overflow-hidden rounded-lg bg-zinc-100 sm:size-20">
                  <Image
                    src={related.imageSrc}
                    alt={related.imageAlt}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-[#0A0909] transition group-hover:text-[#41736D] sm:text-[15px]">
                    {related.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#0A0909]/60 sm:text-sm">
                    {related.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RequestCustomTourForm
        variant="blog"
        customizeMinFrom={customizeMinFrom}
        contextField={{ name: "blogPost", value: post.slug }}
      />
    </aside>
  );
}
