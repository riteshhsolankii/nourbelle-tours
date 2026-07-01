"use client";

import Link from "next/link";
import { footerLegal } from "@/data/site-static";

/** Renders the current calendar year on the client so it stays correct without rebuilds. */
export function FooterCopyright() {
  const year = new Date().getFullYear();

  return (
    <p className="text-center text-[10px] sm:text-xs md:text-sm font-regular text-white">
      Copyright © {year}{" "}
      <Link
        href="/"
        className="font-regular text-white underline decoration-white/80 underline-offset-2 transition hover:text-white/80"
      >
        {footerLegal.brandLine}
      </Link>
      . All rights reserved.
    </p>
  );
}
