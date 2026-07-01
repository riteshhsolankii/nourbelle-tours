"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

type Phase = "init" | "hidden" | "shown";

/**
 * Fades and slides content up when it enters the viewport. Layout effect picks
 * initial visibility so there is no “animate out” on load. Honors `prefers-reduced-motion`.
 */
export function ScrollRevealSection({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("init");
  const revealedByObserver = useRef(false);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("shown");
      return;
    }

    const el = ref.current;
    if (!el) return;

    const vh = window.innerHeight;
    const rect = el.getBoundingClientRect();
    const mostlyVisible = rect.top < vh * 0.92 && rect.bottom > vh * 0.08;

    if (mostlyVisible) {
      setPhase("shown");
      return;
    }

    setPhase("hidden");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealedByObserver.current = true;
            setPhase("shown");
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const useRevealTransition = phase === "shown" && revealedByObserver.current;

  return (
    <div
      ref={ref}
      className={[
        phase === "hidden" ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100",
        useRevealTransition &&
          "motion-safe:transition-[opacity,transform] motion-safe:duration-[680ms] motion-safe:ease-out",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
