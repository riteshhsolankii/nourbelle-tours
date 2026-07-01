import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getSiteUrl, isWordPressGraphqlEnabled } from "@/lib/env";
import {
  PAGE_BY_URI,
  type ContentNodePayload,
  type PageByUriResponse,
} from "@/lib/queries/page-by-uri";
import { wpgraphql } from "@/lib/wpgraphql";

export function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function isContentNode(
  node: PageByUriResponse["nodeByUri"],
): node is ContentNodePayload {
  return (
    !!node &&
    "databaseId" in node &&
    typeof (node as ContentNodePayload).databaseId === "number" &&
    "uri" in node &&
    typeof (node as ContentNodePayload).uri === "string"
  );
}

/** WordPress `nodeByUri` expects a path with leading and trailing slash. */
export function segmentsToWpUri(segments: string[]): string {
  const clean = segments.map((s) => s.replace(/^\/+|\/+$/g, "")).filter(Boolean);
  if (!clean.length) notFound();
  return `/${clean.join("/")}/`;
}

/** Public pathname for canonical URLs (no trailing slash except `/`). */
export function segmentsToPathname(segments: string[]): string {
  const clean = segments.map((s) => s.replace(/^\/+|\/+$/g, "")).filter(Boolean);
  if (!clean.length) return "/";
  return `/${clean.join("/")}`;
}

export const getWordPressNodeByUri = cache(async (uri: string) => {
  if (!isWordPressGraphqlEnabled()) {
    notFound();
  }
  const data = await wpgraphql<PageByUriResponse>(PAGE_BY_URI, { uri });
  const node = data.nodeByUri;
  if (!isContentNode(node)) notFound();
  if (node.status && node.status !== "publish") notFound();
  return node;
});

export function buildWordPressNodeMetadata(
  node: ContentNodePayload,
  pathname: string,
): Metadata {
  const site = getSiteUrl().replace(/\/+$/, "");
  const canonicalPath = pathname === "/" ? "/" : pathname;
  const canonical = new URL(canonicalPath, `${site}/`).toString();

  const title =
    node.title?.trim() || pathname.split("/").filter(Boolean).pop() || "Content";
  const rawExcerpt = node.excerpt ?? "";
  const description = rawExcerpt
    ? stripTags(rawExcerpt).slice(0, 160)
    : stripTags(node.content ?? "").slice(0, 160);

  const img = node.featuredImage?.node;
  const ogImages =
    img?.sourceUrl ?
      [
        {
          url: img.sourceUrl,
          width: img.mediaDetails?.width ?? undefined,
          height: img.mediaDetails?.height ?? undefined,
          alt: img.altText ?? title,
        },
      ]
    : undefined;

  return {
    title,
    description: description || undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description: description || undefined,
      url: canonical,
      type:
        node.__typename === "Post" || node.__typename?.endsWith("Post") ?
          "article"
        : "website",
      images: ogImages,
      modifiedTime: node.modified ?? undefined,
    },
    twitter: {
      title,
      description: description || undefined,
      images: img?.sourceUrl ? [img.sourceUrl] : undefined,
    },
  };
}

export function isBlogPostingNode(node: ContentNodePayload): boolean {
  return (
    node.__typename === "Post" ||
    (typeof node.__typename === "string" && node.__typename.endsWith("Post"))
  );
}
