import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogSinglePageContent } from "@/components/blog/BlogSinglePageContent";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { ContactCtaSection } from "@/components/common/ContactCtaSection";
import { isWordPressGraphqlEnabled } from "@/lib/env";
import { getAllBlogSlugs, getBlogPostDetail, getRelatedBlogPosts } from "@/lib/blog";
import { homeContactCta } from "@/data/site-static";
import {
  buildWordPressNodeMetadata,
  getWordPressNodeByUri,
  segmentsToPathname,
  segmentsToWpUri,
} from "@/lib/wordpress-node";
import { WordPressArticle } from "@/components/wp/WordPressArticle";

export const revalidate = 60;

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

function customizeMinFromToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostDetail(slug);
  if (post) {
    return {
      title: `${post.title} | Nourbelle Tours`,
      description: post.excerpt,
    };
  }

  if (!isWordPressGraphqlEnabled()) {
    return { title: "Article" };
  }

  const segments = ["blog", slug];
  const node = await getWordPressNodeByUri(segmentsToWpUri(segments));
  return buildWordPressNodeMetadata(node, segmentsToPathname(segments));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostDetail(slug);

  if (post) {
    const relatedPosts = getRelatedBlogPosts([...post.relatedSlugs], post.slug);
    return (
      <>
        <BlogSinglePageContent
          post={post}
          relatedPosts={relatedPosts}
          customizeMinFrom={customizeMinFromToday()}
        />
        <ScrollRevealSection>
          <ContactCtaSection
            title={homeContactCta.title}
            description={homeContactCta.description}
            backgroundImageSrc={homeContactCta.backgroundImageSrc}
            backgroundImageAlt={homeContactCta.backgroundImageAlt}
            buttons={homeContactCta.buttons}
          />
        </ScrollRevealSection>
      </>
    );
  }

  if (!isWordPressGraphqlEnabled()) {
    notFound();
  }

  const segments = ["blog", slug];
  return (
    <WordPressArticle uri={segmentsToWpUri(segments)} pathname={segmentsToPathname(segments)} />
  );
}
