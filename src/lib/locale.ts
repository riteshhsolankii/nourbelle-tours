/**
 * Default locale until WPML (or similar) is wired from WordPress.
 * Later: read from segment `[lang]`, cookie, or GraphQL `language`.
 */
export const defaultLocale = "en" as const;

export type SiteLocale = typeof defaultLocale | (string & {});

export type LocaleOption = {
  code: SiteLocale;
  label: string;
  /** Fallback when no SVG asset is mapped for this locale (e.g. emoji). */
  flag: string;
};

/** Expand when WPML exposes languages via GraphQL. `flag` is emoji fallback when no `/usa-flag.svg` mapping. */
export const localeOptions: LocaleOption[] = [
  { code: "en", label: "English", flag: "" },
  { code: "ar", label: "العربية", flag: "🇪🇬" },
];
