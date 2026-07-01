"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "@/components/nile-cruise-detail/NileCruiseDetailIcons";
import { getNileItineraryPrograms } from "@/components/nile-cruise-detail/nile-itinerary-programs";
import { formatUsd } from "@/components/nile-cruise-detail/nile-detail-utils";

type Props = {
  sectionScrollClass: string;
  programs: ReturnType<typeof getNileItineraryPrograms>;
  selectedProgramId: string;
  onSelectProgram: (id: string) => void;
};

export function NileCruiseItinerariesSection({
  sectionScrollClass,
  programs,
  selectedProgramId,
  onSelectProgram,
}: Props) {
  const [openDayIndexes, setOpenDayIndexes] = useState<Set<number>>(new Set());

  const selected = useMemo(
    () => programs.find((p) => p.id === selectedProgramId) ?? programs[0],
    [programs, selectedProgramId],
  );

  useEffect(() => {
    const sel = programs.find((p) => p.id === selectedProgramId) ?? programs[0];
    if (!sel) return;
    setOpenDayIndexes(new Set(sel.days.map((_, index) => index)));
  }, [programs, selectedProgramId]);

  if (!selected) return null;

  return (
    <section id="nile-itinerary" className={`${sectionScrollClass} mt-8 sm:mt-10 border-t border-[#0A09091A] pt-8 sm:pt-10`}>
      <h2 className="font-heading text-xl font-bold text-[#0A0909] md:text-2xl">Itineraries</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 md:gap-6">
        {programs.map((program) => {
          const isSelected = program.id === selectedProgramId;
          return (
            <article key={program.id} className="overflow-hidden rounded-[10px] sm:rounded-[20px] border border-[#0A090926] bg-white">
              <div className="sm:p-3.5">
                <div className="relative rounded-[10px] sm:rounded-[20px]">
                  <div className="overflow-hidden aspect-[3/2] w-full rounded-[10px] sm:rounded-2xl bg-zinc-100">
                    <Image src={program.imageSrc} alt={program.imageAlt} fill className="object-cover transition duration-300 rounded-[10px] sm:rounded-[20px]" sizes="(max-width:768px) 100vw, 50vw" />
                  </div>
                  <span className="absolute -bottom-2.5 left-2.5 rounded-full bg-[#E9EFEE] px-3 py-1.5 text-[10px] font-semibold text-[#0A0909] sm:text-xs">
                    {program.nightsDaysBadge}
                  </span>
                </div>
                <div className="p-4 sm:p-0 sm:pt-4 lg:pt-6">
                  <h3 className="font-heading text-sm sm:text-base font-bold leading-snug text-[#0A0909] md:text-lg">{program.routeTitle}</h3>
                </div>
              </div>
              <div
                className={[
                  "flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4 border-t",
                  isSelected ? "bg-[#41736D] border-[#41736D]" : "bg-[#F3F4F6] border-[#0A090926]",
                ].join(" ")}
              >
                <p className={`text-sm font-normal ${isSelected ? "text-white" : "text-[#0A0909]/75"}`}>
                  Start from{" "} <br />
                  <span className={`font-heading font-bold text-[20px] ${isSelected ? "text-white" : "text-[#0A0909]"}`}>{formatUsd(program.priceFrom)}</span>
                </p>
                <button
                  type="button"
                  onClick={() => onSelectProgram(program.id)}
                  className={[
                    "inline-flex h-10 shrink-0 items-center justify-center rounded-full border px-5 font-heading text-xs font-semibold transition sm:text-sm",
                    isSelected ? "border-white text-white hover:bg-white/10" : "border-[#0A090926] bg-white text-[#0A0909] hover:bg-zinc-50",
                  ].join(" ")}
                >
                  {isSelected ? "Selected" : "Select"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-3 md:mt-10">
        {selected.days.map((d, index) => {
          const open = openDayIndexes.has(index);
          const panelId = `nile-day-panel-${selected.id}-${index}`;
          const headerId = `nile-day-header-${selected.id}-${index}`;
          return (
            <div
              key={`${selected.id}-${d.label}-${d.title}`}
              className={[
                "overflow-hidden rounded-xl border border-[#0A090926] bg-white transition-shadow duration-200",
                open ? "shadow-[0_8px_20px_rgba(10,9,9,0.08)]" : "shadow-none",
              ].join(" ")}
            >
              <button
                type="button"
                id={headerId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => {
                  setOpenDayIndexes((prev) => {
                    const next = new Set(prev);
                    if (next.has(index)) {
                      next.delete(index);
                    } else {
                      next.add(index);
                    }
                    return next;
                  });
                }}
                className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 text-left transition hover:bg-zinc-50/60 sm:gap-4 sm:px-5 sm:py-5"
              >
                <span className="sm:min-w-[4.25rem] shrink-0 rounded-full bg-[#F3F4F6] px-3 py-1 text-center text-xs font-semibold text-[#0A0909] sm:text-sm">
                  {d.label}
                </span>
                <span className="min-w-0 flex-1 font-heading text-sm sm:text-base font-bold leading-snug text-[#0A0909] lg:text-lg">{d.title}</span>
                <ChevronDownIcon open={open} />
              </button>
              {open ?
                <div id={panelId} role="region" aria-labelledby={headerId} className="px-4 pb-5 sm:px-5 sm:pb-6">
                  <div className="ml-[4rem] sm:ml-[5rem] border-t border-[#0A09091A] pt-4 md:ml-[5.25rem]">
                    <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-[#0A0909]/85">
                      {d.bullets.map((b, bi) => (
                        <p key={bi}>
                          {b.lead ? <span className="font-semibold text-[#0A0909]">{b.lead} </span> : null}
                          {b.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
