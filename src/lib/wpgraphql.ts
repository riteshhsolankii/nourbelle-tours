import { GraphQLClient } from "graphql-request";
import {
  getGraphqlAuthHeader,
  getWordPressGraphQLEndpoint,
  isWordPressGraphqlEnabled,
} from "@/lib/env";

const revalidateSeconds = 60;
const requestTimeoutMs = 2500;

function client() {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const auth = getGraphqlAuthHeader();
  if (auth) headers.Authorization = auth;
  return new GraphQLClient(getWordPressGraphQLEndpoint(), {
    fetch: async (input, init) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
      const signal =
        init?.signal ? AbortSignal.any([init.signal, controller.signal]) : controller.signal;

      try {
        return await fetch(input, {
          ...init,
          signal,
          next: { revalidate: revalidateSeconds },
        });
      } finally {
        clearTimeout(timeout);
      }
    },
    headers,
  });
}

export async function wpgraphql<T>(
  document: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  if (!isWordPressGraphqlEnabled()) {
    throw new Error("WordPress GraphQL is disabled (see isWordPressGraphqlEnabled).");
  }
  return client().request<T>(document, variables);
}
