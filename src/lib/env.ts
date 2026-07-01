const trimTrailingSlashes = (s: string) => s.replace(/\/+$/, "");

/** Hostnames from `.env.example` that are not a reachable CMS. */
function isPlaceholderWordPressHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return h === "example.com" || h.endsWith(".example.com");
}

/**
 * When false, the app does not call WPGraphQL (no network to WordPress).
 * False if `NEXT_PUBLIC_WORDPRESS_URL` is empty, invalid, or a placeholder host
 * (`example.com` / `*.example.com`), unless overridden with
 * `NEXT_PUBLIC_WORDPRESS_GRAPHQL=true`.
 *
 * Set `NEXT_PUBLIC_WORDPRESS_GRAPHQL=false` to disable even with a real URL.
 */
export function isWordPressGraphqlEnabled(): boolean {
  const flag = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL?.trim().toLowerCase();
  if (flag === "false" || flag === "0") return false;

  const v = process.env.NEXT_PUBLIC_WORDPRESS_URL?.trim();
  if (!v) return false;

  try {
    const host = new URL(v).hostname;
    const force = flag === "true" || flag === "1";
    if (!force && isPlaceholderWordPressHostname(host)) return false;
  } catch {
    return false;
  }

  return true;
}

export function getSiteUrl(): string {
  const v = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return v ? trimTrailingSlashes(v) : "http://localhost:3000";
}

export function getWordPressUrl(): string {
  const v = process.env.NEXT_PUBLIC_WORDPRESS_URL?.trim();
  if (!v) {
    throw new Error(
      "Set NEXT_PUBLIC_WORDPRESS_URL to your WordPress origin (no trailing slash).",
    );
  }
  return trimTrailingSlashes(v);
}

export function getWordPressGraphQLEndpoint(): string {
  return `${getWordPressUrl()}/graphql`;
}

export function getGraphqlAuthHeader(): string | undefined {
  return process.env.WORDPRESS_GRAPHQL_AUTH_HEADER?.trim() || undefined;
}

export function getSitemapContentTypes(): string[] {
  const raw = process.env.WP_SITEMAP_CONTENT_TYPES?.trim();
  if (!raw) return ["posts", "pages"];
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}

/**
 * WordPress page identifier for `page(id: …, idType: URI)` (slug or path, e.g. `home` or `/home/`).
 * Must match how WPGraphQL resolves the home page that has ACF `homepageBanner`.
 */
export function getWordPressHomePageUri(): string {
  const v = process.env.NEXT_PUBLIC_WORDPRESS_HOME_PAGE_URI?.trim();
  return v || "home";
}
