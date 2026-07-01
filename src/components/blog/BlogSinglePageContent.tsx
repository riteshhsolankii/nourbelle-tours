"use client";

import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { FaqAccordion } from "@/components/common/FaqAccordion";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { BlogPostSidebar } from "@/components/blog/BlogPostSidebar";
import type { BlogPost } from "@/data/blog-page";
import { homeFaqs } from "@/data/site-static";
import type {
  BlogDestinationSection,
  BlogDestinationsBlock,
  BlogPostDetail,
  BlogRichContentSection,
} from "@/data/blog-post-details";

type Props = {
  post: BlogPostDetail;
  relatedPosts: readonly BlogPost[];
  customizeMinFrom: string;
};

function sectionAnchorId(section: BlogDestinationSection) {
  return section.title.toLowerCase().replace(/\s+/g, "-");
}

function ArticleCheckIcon() {
  return (
    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center text-[#0A0909]" aria-hidden>
      <svg className="size-4" viewBox="0 0 16 16" fill="none">
        <path
          d="M13.5 4.5L6.5 11.5L3 8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function DestinationWhiteCard({ section }: { section: BlogDestinationSection }) {
  const displayHeading = section.heading ?? section.title;

  return (
    <article className="rounded-[10px] bg-white p-3.5 sm:p-5">
      <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold leading-snug text-[#0A0909] lg:text-xl">
        {section.number}. {displayHeading}
      </h3>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-2 sm:mt-4 text-xs sm:text-sm leading-relaxed text-[#0A0909] md:text-base">
          {paragraph}
        </p>
      ))}
      {section.subsections?.map((block) => (
        <div key={block.heading}>
          <h5 className="mt-4 sm:mt-6 font-heading text-sm sm:text-base font-bold text-[#0A0909]">{block.heading}</h5>
          <ul className="mt-3 space-y-3">
            {block.items.map((item) => (
              <li key={item.title} className="flex gap-2 sm:gap-3">
                <ArticleCheckIcon />
                <p className="min-w-0 text-xs sm:text-sm leading-relaxed text-[#0A0909] md:text-base">
                  <span className="font-bold">{item.title}</span>
                  <span> – {item.description}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {section.closing ?
        <p className="mt-4 md:mt-6 text-xs sm:text-sm leading-relaxed text-[#0A0909] md:text-base">{section.closing}</p>
      : null}
    </article>
  );
}

function DestinationsBlockSection({
  block,
  sections,
}: {
  block: BlogDestinationsBlock;
  sections: readonly BlogDestinationSection[];
}) {
  const richSections = sections.filter((s) => s.subsections && s.subsections.length > 0);
  const simpleSections = sections.filter((s) => !s.subsections || s.subsections.length === 0);

  return (
    <section id={block.id} className="scroll-mt-28 mt-8">
      <h2 className="font-heading text-base sm:text-xl font-bold text-[#0A0909] md:text-2xl lg:text-[28px]">{block.heading}</h2>
      {block.introParagraphs && block.introParagraphs.length > 0 ?
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#0A0909] sm:text-base">
          {block.introParagraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      : null}
      <div className="bg-[#0A09090D] rounded-2xl mt-4 sm:mt-6 md:mt-8 p-3 sm:p-4 md:p-5">
      {richSections.length > 0 ?
        <div className="space-y-4 sm:space-y-7">
          {richSections.map((section) => (
            <div key={section.title}>
              <DestinationWhiteCard section={section} />
            </div>
          ))}
        </div>
      : null}
      {simpleSections.length > 0 ?
        <div className="mt-4 space-y-4">
          {simpleSections.map((section) => (
            <DestinationSimpleSection key={section.title} section={section} />
          ))}
        </div>
      : null}
      </div>
    </section>
  );
}

function GreenCheckIcon() {
  const clipId = useId();
  return (
    <span className="mt-0.5 flex shrink-0" aria-hidden>
      <svg className="size-4" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5L6.5 11.5L3 8" stroke="#28A745" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    </span>
  );
}

function BlogRichContentBlock({ section }: { section: BlogRichContentSection }) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 mt-6 sm:mt-8 space-y-3 sm:space-y-4 text-xs sm:text-sm leading-relaxed text-[#0A0909] md:text-base"
    >
      <h2 className="font-heading text-base sm:text-lg font-bold text-[#0A0909] md:text-xl">{section.heading}</h2>
      {section.intro ?
        <p>{section.intro}</p>
      : null}
      {section.checklist && section.checklist.length > 0 ?
        <ul className="space-y-3">
          {section.checklist.map((item) => (
            <li key={item.title} className="flex gap-2 sm:gap-3">
              <ArticleCheckIcon />
              <p className="min-w-0">
                <span className="font-bold">{item.title}</span>
                <span> – {item.description}</span>
              </p>
            </li>
          ))}
        </ul>
      : null}
      {section.highlightedBox ?
        <div className="rounded-xl bg-[#F5F5F5] p-4 sm:p-6">
          {section.highlightedBox.intro ?
            <p className="mb-3">{section.highlightedBox.intro}</p>
          : null}
          <ul className="space-y-2.5">
            {section.highlightedBox.items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <GreenCheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      : null}
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
      ))}
      {section.subheading ?
        <>
          <h5 className="font-heading text-base font-bold text-[#0A0909] sm:text-lg">{section.subheading}</h5>
          {section.subheadingParagraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </>
      : null}
    </section>
  );
}

function DestinationSimpleSection({ section }: { section: BlogDestinationSection }) {
  return (
    <article className="rounded-xl bg-white p-6 sm:p-8">
      <h3 className="font-heading text-base font-bold text-[#0A0909] sm:text-lg">
        {section.number}- {section.title}
      </h3>
      {section.intro ?
        <p className="mt-3 text-sm leading-relaxed text-[#0A0909] sm:text-base">{section.intro}</p>
      : null}
      {section.whyVisit && section.whyVisit.length > 0 ?
        <>
          <p className="mt-4 text-sm font-semibold text-[#0A0909]">Why you should visit this place</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#0A0909]">
            {section.whyVisit.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </>
      : null}
      {section.thingsToDo && section.thingsToDo.length > 0 ?
        <>
          <p className="mt-4 text-sm font-semibold text-[#0A0909]">Best things to do</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#0A0909]">
            {section.thingsToDo.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </>
      : null}
    </article>
  );
}

function FaqArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BlogSinglePageContent({ post, relatedPosts, customizeMinFrom }: Props) {
  const faqTitle = post.faqTitle ?? homeFaqs.title;
  const faqCtaLabel = post.faqCtaLabel ?? homeFaqs.ctaLabel;
  const faqCtaHref = post.faqCtaHref ?? homeFaqs.ctaHref;

  return (
    <div className="w-full lg:pb-16 pt-6 sm:pt-8 md:pt-10">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <ScrollRevealSection>
          <header className="mb-6 sm:mb-8">
            <Breadcrumb
              variant="inline"
              className="mb-3"
              items={[
                { label: "Home", href: "/" },
                { label: "Egypt Travel Blog", href: "/blog" },
                { label: "Blog" },
              ]}
            />
          </header>

          <h1 className="mb-6 font-heading text-xl sm:text-2xl font-bold leading-tight tracking-tight text-[#0A0909] sm:mb-8 md:text-3xl lg:text-4xl">
            {post.title}
          </h1>
        </ScrollRevealSection>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[minmax(0,370px)_minmax(0,1fr)] xl:gap-12">
          <BlogPostSidebar post={post} relatedPosts={relatedPosts} customizeMinFrom={customizeMinFrom} />

          <article className="order-1 min-w-0 lg:order-2">
            <ScrollRevealSection>
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl bg-zinc-100 sm:rounded-3xl">
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 65vw"
              />
            </div>

            {post.introParagraphs.length > 0 ?
              <div
                id="overview"
                className="scroll-mt-28 mt-6 space-y-3 sm:space-y-4 text-xs sm:text-sm leading-relaxed text-[#0A0909] sm:text-base"
              >
                {post.introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            : null}
            </ScrollRevealSection>

            {post.articleSections?.map((section) => (
              <ScrollRevealSection key={section.id}>
                <section
                  id={section.id}
                  className="scroll-mt-28 mt-5 sm:mt-8 space-y-2 sm:space-y-4 text-xs sm:text-sm leading-relaxed text-[#0A0909] md:text-base"
                >
                  <h2 className="font-heading text-base sm:text-lg font-bold text-[#0A0909] md:text-xl">{section.heading}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </section>
              </ScrollRevealSection>
            ))}

            {post.destinationsBlock && post.sections.length > 0 ?
              <ScrollRevealSection>
                <DestinationsBlockSection block={post.destinationsBlock} sections={post.sections} />
              </ScrollRevealSection>
            : post.sections.length > 0 ?
              <ScrollRevealSection>
                <div className="mt-8 space-y-6 sm:space-y-8">
                  {post.sections.map((section) =>
                    section.subsections && section.subsections.length > 0 ?
                      <DestinationWhiteCard key={section.title} section={section} />
                    : <DestinationSimpleSection key={section.title} section={section} />,
                  )}
                </div>
              </ScrollRevealSection>
            : null}

            {post.richContentSections?.map((section) => (
              <ScrollRevealSection key={section.id}>
                <BlogRichContentBlock section={section} />
              </ScrollRevealSection>
            ))}

            {post.bulletSections?.map((block) => (
              <ScrollRevealSection key={block.heading}>
                <div
                  id={block.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                  className={[
                    "scroll-mt-28 mt-8",
                    block.highlighted ? "rounded-xl bg-[#FAFAFA] p-4 sm:p-5" : "",
                  ].join(" ")}
                >
                  <h2 className="font-heading text-base sm:text-lg font-bold text-[#0A0909] md:text-xl">{block.heading}</h2>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#0A0909] sm:text-base">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </ScrollRevealSection>
            ))}

            {post.closingParagraphs && post.closingParagraphs.length > 0 ?
              <ScrollRevealSection>
                {post.closingParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-6 text-sm leading-relaxed text-[#0A0909] sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </ScrollRevealSection>
            : null}

            {post.faq.length > 0 ?
              <ScrollRevealSection>
              <section id="faq" className="scroll-mt-28 mt-6 sm:mt-10 border-t border-[#0A09091A] pt-6 sm:pt-10">
                <h2 className="font-heading text-base sm:text-lg font-bold text-[#0A0909] md:text-xl">{faqTitle}</h2>
                <FaqAccordion items={post.faq} className="mt-5 max-w-none" />
                <div className="mt-8 flex justify-center">
                  <Link
                    href={faqCtaHref}
                    className="inline-flex items-center gap-2 rounded-full bg-[#41736D] px-6 py-3.5 font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#365e59] sm:px-8 sm:py-4"
                  >
                    {faqCtaLabel}
                    <FaqArrowRight />
                  </Link>
                </div>
              </section>
              </ScrollRevealSection>
            : null}
          </article>
        </div>
      </div>
    </div>
  );
}
