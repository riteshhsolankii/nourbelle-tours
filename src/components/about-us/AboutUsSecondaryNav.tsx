"use client";

import { aboutUsSecondaryNav } from "@/data/about-us-page";
import { useEffect, useState } from "react";

const SCROLL_OFFSET_PX = 140;

export function AboutUsSecondaryNav() {
  const [activeId, setActiveId] = useState<string>(aboutUsSecondaryNav[0].id);

  useEffect(() => {
    const onScroll = () => {
      let current: string = aboutUsSecondaryNav[0].id;
      for (const { id } of aboutUsSecondaryNav) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= SCROLL_OFFSET_PX) current = id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="About page sections"
      className="border-b border-[#0A090914] bg-white sticky top-[57px] sm:top-[76px] md:top-[85px] z-10"
    >
      <div className="mx-auto flex max-w-[1390px] flex-wrap items-center justify-center gap-1.5 px-4 sm:justify-start sm:gap-4 sm:px-5 md:gap-6">
        {aboutUsSecondaryNav.map(({ id, label }) => {
          const active = activeId === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className={[
                "relative text-xs sm:text-sm font-normal transition-colors px-1.5 py-3 sm:px-3 sm:py-5",
                active ? "text-[#0A0909] font-medium" : "text-[#0A090999] hover:text-[#0A0909]",
              ].join(" ")}
              aria-current={active ? "location" : undefined}
            >
              {label}
              <span
                className={[
                  "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-opacity",
                  active ? "bg-[#0A0909] opacity-100" : "bg-[#0A0909] opacity-0",
                ].join(" ")}
                aria-hidden
              />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
