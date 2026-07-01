export const GET_HOME_PAGE = /* GraphQL */ `
  query GetHomePage($pageUri: ID!) {
    page(id: $pageUri, idType: URI) {
      homepageBanner {
        banner {
          heading
          description
          image {
            node {
              id
              sourceUrl
              altText
            }
          }
        }
        searchBox {
          title
          filter1Label
          filter1Placeholder
          filter1Option
          filter2Label
          filter2Placeholder
          filter2Option
          filter3Label
          filter3Placeholder
          filter3Option {
            nodes {
              ... on Post {
                databaseId
                title
                slug
              }
            }
          }
          buttonText
        }
      }
    }
  }
`;

export type HomePageBannerResponse = {
  page?: {
    homepageBanner?: {
      banner?: {
        heading?: string | null;
        description?: string | null;
        image?: {
          node?: {
            id?: string | null;
            sourceUrl?: string | null;
            altText?: string | null;
          } | null;
        } | null;
      } | null;
      searchBox?: {
        title?: string | null;
        filter1Label?: string | null;
        filter1Placeholder?: string | null;
        filter1Option?: string[] | null;
        filter2Label?: string | null;
        filter2Placeholder?: string | null;
        filter2Option?: string[] | null;
        filter3Label?: string | null;
        filter3Placeholder?: string | null;
        filter3Option?: {
          nodes?: ({
            databaseId?: number | null;
            title?: string | null;
            slug?: string | null;
          } | null)[];
        } | null;
        buttonText?: string | null;
      } | null;
    } | null;
  } | null;
};
