import {
  getSiteUrl,
  getSitemapContentTypes,
  isWordPressGraphqlEnabled,
  getWordPressUrl,
} from "@/lib/env";
import { wpgraphql } from "@/lib/wpgraphql";

const GRAPHQL_NAME = /^[_A-Za-z][_0-9A-Za-z]*$/;

type CursorPage = {
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
  nodes: { uri: string; modified?: string | null }[];
};

function buildSitemapQuery(rootField: string): string {
  if (!GRAPHQL_NAME.test(rootField)) {
    throw new Error(`Invalid GraphQL field for sitemap: ${rootField}`);
  }
  return `
    query Sitemap_%ROOT%($after: String) {
      %ROOT%(first: 100, after: $after, where: { status: PUBLISH }) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          uri
          modified
        }
      }
    }
  `.replace(/%ROOT%/g, rootField);
}

async function fetchAllUris(rootField: string): Promise<{ uri: string; modified?: string | null }[]> {
  const out: { uri: string; modified?: string | null }[] = [];
  let after: string | null = null;
  const query = buildSitemapQuery(rootField);

  for (;;) {
    type R = Record<string, CursorPage | undefined>;
    const data: R = await wpgraphql<R>(query, { after });
    const connection = data[rootField];
    if (!connection?.nodes?.length) break;
    out.push(...connection.nodes);
    if (!connection.pageInfo.hasNextPage || !connection.pageInfo.endCursor) break;
    after = connection.pageInfo.endCursor;
  }
  return out;
}

function absoluteUrlFromWpUri(uri: string): string {
  const site = getSiteUrl().replace(/\/+$/, "");
  const path = uri.startsWith("/") ? uri : `/${uri}`;
  return new URL(path.replace(/\/{2,}/g, "/"), `${site}/`).toString();
}

export async function collectSitemapEntries(): Promise<
  { url: string; lastModified?: Date; changeFrequency?: "weekly" | "monthly"; priority?: number }[]
> {
  if (!isWordPressGraphqlEnabled()) return [];

  try {
    getWordPressUrl();
  } catch {
    return [];
  }

  const types = getSitemapContentTypes();
  const merged = new Map<string, { uri: string; modified?: string | null }>();

  for (const t of types) {
    try {
      const nodes = await fetchAllUris(t);
      for (const n of nodes) {
        if (n?.uri) merged.set(n.uri, n);
      }
    } catch {
      /* Unknown CPT root field or plugin not exposing type — skip. */
    }
  }

  return [...merged.values()].map((n) => ({
    url: absoluteUrlFromWpUri(n.uri),
    lastModified: n.modified ? new Date(n.modified) : undefined,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));
}
