import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function wordpressImageRemotePattern():
  | { protocol: "http" | "https"; hostname: string; pathname: string }
  | undefined {
  const raw = process.env.NEXT_PUBLIC_WORDPRESS_URL?.trim();
  if (!raw) return undefined;
  try {
    const u = new URL(raw);
    const protocol = u.protocol === "http:" ? "http" : "https";
    return {
      protocol,
      hostname: u.hostname,
      pathname: "/wp-content/**",
    };
  } catch {
    return undefined;
  }
}

const wpPattern = wordpressImageRemotePattern();

const unsplashImages = {
  protocol: "https" as const,
  hostname: "images.unsplash.com",
  pathname: "/**",
};

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  /** Hides the floating “N” dev tools badge (default: bottom-left). Dev-only; no effect on production. */
  devIndicators: false,
  images: {
    remotePatterns: [unsplashImages, ...(wpPattern ? [wpPattern] : [])],
  },
  async redirects() {
    return [
      { source: "/egypt-tours", destination: "/multi-day-egypt-tours", permanent: true },
      { source: "/egypt-tours/:slug([^.]+)", destination: "/multi-day-egypt-tours/:slug", permanent: true },
      { source: "/multi-day-tours", destination: "/multi-day-egypt-tours", permanent: true },
      { source: "/multi-day-tours/:slug([^.]+)", destination: "/multi-day-egypt-tours/:slug", permanent: true },
      { source: "/destinations/cairo-giza", destination: "/destinations/cairo", permanent: true },
    ];
  },
};

export default nextConfig;
