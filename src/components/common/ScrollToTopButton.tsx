"use client";

import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER_PX = 360;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollTop}
      tabIndex={visible ? 0 : -1}
      aria-label="Back to top"
      title="Back to top"
      className={[
        "fixed bottom-5 right-4 z-50 flex size-10 sm:size-11 select-none items-center justify-center rounded-full border border-[#0A090926] bg-[#41736D] text-white shadow-lg transition-[opacity,transform,visibility] duration-300 ease-out cursor-pointer hover:bg-[#365e59] md:bottom-8 md:right-6 md:size-12",
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0 invisible",
      ].join(" ")}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M12 19V5M12 5l-6 6M12 5l6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
