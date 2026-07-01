"use client";

import { useState } from "react";

export type FaqAccordionItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items: readonly FaqAccordionItem[];
  className?: string;
  /** When true, no item is expanded until the user opens one. */
  startCollapsed?: boolean;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      className={["size-5 text-[#0A090980] transition-transform opacity-50", open ? "rotate-180 opacity-100" : ""].join(" ")}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M8 9L13 14L18 9" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FaqAccordion({ items, className, startCollapsed = false }: Props) {
  const [openId, setOpenId] = useState(startCollapsed ? "" : (items[0]?.id ?? ""));

  return (
    <ul className={["space-y-2 md:space-y-3.5", className].filter(Boolean).join(" ")}>
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;
        return (
          <li
            key={item.id}
            className="overflow-hidden rounded-[10px] border border-[#0A090926] bg-white px-4 md:rounded-2xl md:px-5"
          >
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-4 py-3 text-left md:py-5"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
            >
              <span className="font-heading text-sm font-semibold leading-[1.15] text-[#0A0909] md:text-base xl:text-xl">
                {item.question}
              </span>
              <Chevron open={open} />
            </button>
            {open ?
              <div id={panelId} role="region" aria-labelledby={buttonId} className="pb-3 sm:pb-5">
                <p className="max-w-[95%] text-[11px] leading-relaxed text-[#0A0909] sm:text-xs md:text-sm xl:text-base">
                  {item.answer}
                </p>
              </div>
            : null}
          </li>
        );
      })}
    </ul>
  );
}
