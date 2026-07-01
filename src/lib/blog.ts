import { blogPosts, type BlogCategoryId, type BlogPost } from "@/data/blog-page";
import { blogPostDetails, type BlogPostDetail } from "@/data/blog-post-details";

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getBlogPostDetail(slug: string): BlogPostDetail | undefined {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;
  return blogPostDetails[slug] ?? buildDefaultBlogDetail(post);
}

export function getRelatedBlogPosts(slugs: string[], excludeSlug: string, limit = 5): BlogPost[] {
  const picked = slugs
    .filter((s) => s !== excludeSlug)
    .map((s) => getBlogPostBySlug(s))
    .filter((p): p is BlogPost => Boolean(p));
  if (picked.length >= limit) return picked.slice(0, limit);

  const fallback = blogPosts.filter((p) => p.slug !== excludeSlug && !picked.some((x) => x.slug === p.slug));
  return [...picked, ...fallback].slice(0, limit);
}

export function buildBlogPageHref(page: number, category: BlogCategoryId): string {
  const params = new URLSearchParams();
  if (category !== "all") params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

function buildDefaultBlogDetail(post: BlogPost): BlogPostDetail {
  return {
    ...post,
    dateLabel: "Recent",
    tableOfContents: [{ id: "overview", label: post.title }],
    introParagraphs: [post.excerpt],
    sections: [],
    faq: [],
    relatedSlugs: blogPosts
      .filter((p) => p.slug !== post.slug && p.category === post.category)
      .slice(0, 5)
      .map((p) => p.slug),
  };
}
