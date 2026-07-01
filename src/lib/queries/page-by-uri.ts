/**
 * CPTs that implement ContentNode in WPGraphQL are covered by the fragments below.
 * Add WPGraphQL fields for your SEO plugin after enabling the extension, e.g. Yoast:
 *   ... on PostTypeWithSeo { seo { title metaDesc opengraphUrl canonical } }
 * ACF: expose groups in GraphQL and add `... on YourCpt { yourAcfGroup { ... } }`
 */
export const PAGE_BY_URI = /* GraphQL */ `
  query NodeByUri($uri: String!) {
    nodeByUri(uri: $uri) {
      __typename
      ... on ContentNode {
        id
        databaseId
        modified
        slug
        uri
        status
      }
      ... on NodeWithTitle {
        title
      }
      ... on NodeWithExcerpt {
        excerpt
      }
      ... on NodeWithContentEditor {
        content
      }
      ... on NodeWithFeaturedImage {
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
      }
    }
  }
`;

export type FeaturedImageNode = {
  sourceUrl: string;
  altText?: string | null;
  mediaDetails?: { width?: number | null; height?: number | null } | null;
};

export type ContentNodePayload = {
  __typename: string;
  id: string;
  databaseId: number;
  title?: string | null;
  excerpt?: string | null;
  content?: string | null;
  modified?: string | null;
  slug?: string | null;
  uri: string;
  status?: string | null;
  featuredImage?: { node: FeaturedImageNode } | null;
};

export type PageByUriResponse = {
  nodeByUri: ContentNodePayload | { __typename: string } | null;
};
