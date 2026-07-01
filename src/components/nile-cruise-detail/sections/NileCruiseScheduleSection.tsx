"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { NileScheduleContent } from "@/types/tour-package-detail";

type Props = {
  schedule: NileScheduleContent;
  sectionScrollClass: string;
  /** When tab `id` matches a Nile itinerary programme id, tab changes update the selected sailing. */
  selectedProgramId?: string;
  onSelectProgramId?: (id: string) => void;
  programIds?: readonly string[];
};

export function NileCruiseScheduleSection({
  schedule,
  sectionScrollClass,
  selectedProgramId,
  onSelectProgramId,
  programIds,
}: Props) {
  const indexFromProgram = useMemo(() => {
    if (!selectedProgramId) return 0;
    const i = schedule.tabs.findIndex((t) => t.id === selectedProgramId);
    return i >= 0 ? i : 0;
  }, [schedule.tabs, selectedProgramId]);

  const [manualTabIndex, setManualTabIndex] = useState<number | null>(null);

  useEffect(() => {
    setManualTabIndex(null);
  }, [selectedProgramId]);

  const activeIndex = manualTabIndex !== null ? manualTabIndex : indexFromProgram;
  const activeBar = schedule.tabs[activeIndex]?.bar ?? schedule.tabs[0]!.bar;

  const handleTab = useCallback(
    (index: number) => {
      setManualTabIndex(index);
      const id = schedule.tabs[index]?.id;
      if (id && programIds?.includes(id)) onSelectProgramId?.(id);
    },
    [onSelectProgramId, programIds, schedule.tabs],
  );

  return (
    <section id="nile-schedule" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10`}>
      <h2 className="font-heading text-xl font-bold text-[#0A0909] md:text-2xl">{schedule.title}</h2>
      {schedule.tabs.length > 1 ?
        <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Schedule options">
          {schedule.tabs.map((tab, i) => {
            const selected = i === activeIndex;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => handleTab(i)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2.5 font-heading text-xs font-semibold transition sm:text-sm",
                  selected ? "border-[#0A090926] bg-[#0A09090D] text-[#0A0909]" : "border-transparent bg-white text-[#0A0909] hover:bg-[#0A09090D]",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      : null}

      <div
        className={`rounded-xl bg-[#F3F4F6] px-4 py-4 sm:px-8 sm:py-5 ${schedule.tabs.length > 1 ? "mt-4" : "mt-5"}`}
        role="tabpanel"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-center text-xs sm:text-sm font-bold text-[#0A0909] sm:flex-1 sm:text-left">{activeBar.nights}</p>
          <p className="text-center text-xs sm:text-sm font-normal text-[#0A0909] sm:flex-1">{activeBar.availability}</p>
          <p className="text-center text-xs sm:text-sm font-normal text-[#0A0909] sm:flex-1 sm:text-right">{activeBar.departure}</p>
        </div>
      </div>
    </section>
  );
}
