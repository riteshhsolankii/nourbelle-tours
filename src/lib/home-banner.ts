import { cache } from "react";
import { homeHero, homeSearchFilters } from "@/data/site-static";
import { getWordPressHomePageUri, isWordPressGraphqlEnabled } from "@/lib/env";
import {
  GET_HOME_PAGE,
  type HomePageBannerResponse,
} from "@/lib/queries/home-banner";
import { wpgraphql } from "@/lib/wpgraphql";

/** ACF “Filter 1 Option” choice values → labels. */
const FILTER1_VALUE_LABEL: Record<string, string> = {
  "1": "Day Tours",
  "2": "Multiday Tours",
};

/** ACF “Filter 2 Option” choice values → labels. */
const FILTER2_VALUE_LABEL: Record<string, string> = {
  "1": "1 Day",
  "2": "2 Day",
  "3": "3 Day",
};

export type HomeSearchFilterField = {
  /** GET param name for `/search` */
  htmlName: string;
  /** Column heading (e.g. What / How / Where) */
  columnTitle: string;
  /** Sub copy when nothing is selected */
  hint: string;
  emptyOptionLabel: string;
  options: { value: string; label: string }[];
};

export type HomeQuickFactField = {
  /** GET param name submitted to `quickFactsButtonHref` */
  htmlName: string;
  label: string;
  /** Shown when nothing is selected */
  hint: string;
  options: readonly { value: string; label: string }[];
};

export type HomePageBannerContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImageSrc: string;
  heroImageAlt: string;
  searchTitle: string;
  searchFilters: HomeSearchFilterField[];
  searchButtonLabel: string;
  /** New hero CTAs/trust bar; undefined when sourced from WordPress until those fields exist there too. */
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  quickFacts?: readonly HomeQuickFactField[];
  quickFactsButtonLabel?: string;
  quickFactsButtonHref?: string;
  trustStats?: readonly string[];
};

function staticFallback(): HomePageBannerContent {
  return {
    heroTitle: homeHero.title,
    heroSubtitle: homeHero.subtitle,
    heroImageSrc: homeHero.backgroundImageSrc,
    heroImageAlt: homeHero.backgroundImageAlt,
    searchTitle: "Where To?",
    searchFilters: [
      {
        htmlName: "type",
        columnTitle: "What",
        hint: "Tour type",
        emptyOptionLabel: homeSearchFilters.tourTypes[0].label,
        options: homeSearchFilters.tourTypes.slice(1).map((o) => ({
          value: o.value,
          label: o.label,
        })),
      },
      {
        htmlName: "duration",
        columnTitle: "How",
        hint: "Duration",
        emptyOptionLabel: homeSearchFilters.durations[0].label,
        options: homeSearchFilters.durations.slice(1).map((o) => ({
          value: o.value,
          label: o.label,
        })),
      },
      {
        htmlName: "destination",
        columnTitle: "Where",
        hint: "Destination",
        emptyOptionLabel: homeSearchFilters.destinations[0].label,
        options: homeSearchFilters.destinations.slice(1).map((o) => ({
          value: o.value,
          label: o.label,
        })),
      },
    ],
    searchButtonLabel: "Search",
    primaryCta: homeHero.primaryCta,
    secondaryCta: homeHero.secondaryCta,
    quickFacts: homeHero.quickFacts,
    quickFactsButtonLabel: homeHero.quickFactsButtonLabel,
    quickFactsButtonHref: homeHero.quickFactsButtonHref,
    trustStats: homeHero.trustStats,
  };
}

function mapWpToContent(data: HomePageBannerResponse): HomePageBannerContent | null {
  const hb = data.page?.homepageBanner;
  const banner = hb?.banner;
  const box = hb?.searchBox;
  if (!banner?.heading || !box) return null;

  const img = banner.image?.node;
  const heroImageSrc =
    (img?.sourceUrl && img.sourceUrl.trim()) || homeHero.backgroundImageSrc;
  const heroImageAlt =
    img?.altText?.trim() || banner.heading || homeHero.backgroundImageAlt;

  const filter1Values = box.filter1Option ?? [];
  const filter1Options = filter1Values.map((value) => ({
    value,
    label: FILTER1_VALUE_LABEL[value] ?? value,
  }));

  const f1Empty =
    box.filter1Placeholder?.trim() ||
    (box.filter1Label?.trim() ?
      `${box.filter1Label.trim()} / Tour type`
    : homeSearchFilters.tourTypes[0].label);

  const filter2Values = box.filter2Option ?? [];
  const filter2Options =
    filter2Values.length ?
      filter2Values.map((value) => ({
        value,
        label: FILTER2_VALUE_LABEL[value] ?? value,
      }))
    : homeSearchFilters.durations.slice(1).map((o) => ({
        value: o.value,
        label: o.label,
      }));

  const f2Empty =
    box.filter2Placeholder?.trim() ||
    (box.filter2Label?.trim() ?
      `${box.filter2Label.trim()} / Duration`
    : homeSearchFilters.durations[0].label);

  const f3Nodes = (box.filter3Option?.nodes ?? []).filter(
    (n): n is NonNullable<typeof n> => n != null,
  );
  const f3Options =
    f3Nodes.length ?
      f3Nodes.map((n) => ({
        value: n.slug?.trim() || String(n.databaseId ?? ""),
        label: n.title?.trim() || n.slug || "Post",
      }))
    : homeSearchFilters.destinations.slice(1).map((o) => ({
        value: o.value,
        label: o.label,
      }));

  const f3Empty =
    box.filter3Placeholder?.trim() ||
    (box.filter3Label?.trim() ?
      `${box.filter3Label.trim()} / Destination`
    : homeSearchFilters.destinations[0].label);

  const searchFilters: HomeSearchFilterField[] = [
    {
      htmlName: "type",
      columnTitle: box.filter1Label?.trim() || "What",
      hint: box.filter1Placeholder?.trim() || "Tour type",
      emptyOptionLabel: f1Empty,
      options: filter1Options,
    },
    {
      htmlName: "duration",
      columnTitle: box.filter2Label?.trim() || "How",
      hint: box.filter2Placeholder?.trim() || "Duration",
      emptyOptionLabel: f2Empty,
      options: filter2Options,
    },
    {
      htmlName: "destination",
      columnTitle: box.filter3Label?.trim() || "Where",
      hint: box.filter3Placeholder?.trim() || "Destination",
      emptyOptionLabel: f3Empty,
      options: f3Options,
    },
  ];

  return {
    heroTitle: banner.heading.trim(),
    heroSubtitle: (banner.description ?? "").trim() || homeHero.subtitle,
    heroImageSrc,
    heroImageAlt,
    searchTitle: box.title?.trim() || "Where To?",
    searchFilters,
    searchButtonLabel: box.buttonText?.trim() || "Search",
  };
}

/** WPGraphQL `idType: URI` may resolve `home`, `/home`, or `/home/` depending on site config. */
function homePageUriCandidates(): string[] {
  const raw = getWordPressHomePageUri().trim();
  const slug = raw.replace(/^\/+|\/+$/g, "");
  const out: string[] = [];
  const push = (u: string) => {
    if (u && !out.includes(u)) out.push(u);
  };
  if (raw) push(raw);
  if (slug) {
    push(slug);
    push(`/${slug}/`);
    push(`/${slug}`);
  }
  return out.length ? out : ["home", "/home/"];
}

function isConnectivityError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const maybeName = "name" in error ? String(error.name) : "";
  const maybeMessage = "message" in error ? String(error.message).toLowerCase() : "";
  return (
    maybeName === "AbortError" ||
    maybeMessage.includes("timed out") ||
    maybeMessage.includes("timeout") ||
    maybeMessage.includes("fetch failed") ||
    maybeMessage.includes("network")
  );
}

export const getHomePageBanner = cache(async (): Promise<HomePageBannerContent> => {
  if (!isWordPressGraphqlEnabled()) {
    return staticFallback();
  }

  for (const pageUri of homePageUriCandidates()) {
    try {
      const data = await wpgraphql<HomePageBannerResponse>(GET_HOME_PAGE, {
        pageUri,
      });
      const mapped = mapWpToContent(data);
      if (mapped) return mapped;
    } catch (error) {
      // If WordPress is unavailable, return static content immediately.
      if (isConnectivityError(error)) {
        return staticFallback();
      }
      /* try next URI variant or fall through */
    }
  }

  return staticFallback();
});
