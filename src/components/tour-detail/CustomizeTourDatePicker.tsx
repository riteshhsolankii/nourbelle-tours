"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

const POPOVER_WIDTH = 275;
const POPOVER_GAP = 6;
const VIEWPORT_MARGIN = 12;
/** Used for vertical flip before the popover is measured. */
const POPOVER_HEIGHT_ESTIMATE = 340;

type Placement = "left" | "right" | "center";

type PopoverCoords = { top: number; left: number };

function pad2(n: number) {
  return n < 10 ? `0${n}` : String(n);
}

function toIsoDate(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function parseIso(s: string): Date | null {
  if (!s) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const da = Number(m[3]);
  const d = new Date(y, mo, da);
  if (d.getFullYear() !== y || d.getMonth() !== mo || d.getDate() !== da) return null;
  return d;
}

function formatDisplay(iso: string) {
  const d = parseIso(iso);
  if (!d) return "";
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric" }).format(d);
}

function computePopoverPosition(trigger: DOMRect, popoverHeight: number): { placement: Placement; coords: PopoverCoords } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  /** Popover right edge aligned with trigger right edge. */
  const fitsRightAlign = trigger.right - POPOVER_WIDTH >= VIEWPORT_MARGIN;
  /** Popover left edge aligned with trigger left edge. */
  const fitsLeftAlign = trigger.left + POPOVER_WIDTH <= vw - VIEWPORT_MARGIN;

  let placement: Placement;
  let left: number;

  if (fitsRightAlign) {
    placement = "right";
    left = trigger.right - POPOVER_WIDTH;
  } else if (fitsLeftAlign) {
    placement = "left";
    left = trigger.left;
  } else {
    placement = "center";
    left = (vw - POPOVER_WIDTH) / 2;
  }

  left = Math.max(VIEWPORT_MARGIN, Math.min(left, vw - POPOVER_WIDTH - VIEWPORT_MARGIN));

  const height = popoverHeight || POPOVER_HEIGHT_ESTIMATE;
  let top = trigger.bottom + POPOVER_GAP;
  if (top + height > vh - VIEWPORT_MARGIN) {
    const above = trigger.top - POPOVER_GAP - height;
    if (above >= VIEWPORT_MARGIN) top = above;
  }
  top = Math.max(VIEWPORT_MARGIN, Math.min(top, vh - height - VIEWPORT_MARGIN));

  return { placement, coords: { top, left } };
}

type Props = {
  name: string;
  value: string;
  onChange: (iso: string) => void;
  placeholder: string;
  /** Minimum selectable date (YYYY-MM-DD). */
  minDate?: string;
  className?: string;
};

export function CustomizeTourDatePicker({ name, value, onChange, placeholder, minDate, className }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>("left");
  const [coords, setCoords] = useState<PopoverCoords>({ top: 0, left: 0 });
  const [view, setView] = useState(() => {
    const base = parseIso(value) ?? parseIso(minDate ?? "") ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const popoverHeight = popoverRef.current?.offsetHeight ?? POPOVER_HEIGHT_ESTIMATE;
    const next = computePopoverPosition(rect, popoverHeight);
    setPlacement(next.placement);
    setCoords(next.coords);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const frame = requestAnimationFrame(() => updatePosition());
    return () => cancelAnimationFrame(frame);
  }, [open, updatePosition, view]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (rootRef.current?.contains(target) || popoverRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onReposition = () => updatePosition();
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("resize", onReposition);
    window.addEventListener("scroll", onReposition, true);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("resize", onReposition);
      window.removeEventListener("scroll", onReposition, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (open) {
      const base = parseIso(value) ?? parseIso(minDate ?? "") ?? new Date();
      setView(new Date(base.getFullYear(), base.getMonth(), 1));
    }
  }, [open, value, minDate]);

  const minD = useMemo(() => parseIso(minDate ?? "") ?? null, [minDate]);

  const { year, month, cells } = useMemo(() => {
    const y = view.getFullYear();
    const m = view.getMonth();
    const first = new Date(y, m, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const out: ({ date: Date } | null)[] = [];
    for (let i = 0; i < startPad; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) out.push({ date: new Date(y, m, d) });
    while (out.length % 7 !== 0) out.push(null);
    while (out.length < 42) out.push(null);
    return { year: y, month: m, cells: out };
  }, [view]);

  const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(
    new Date(year, month, 1),
  );

  function isDisabled(d: Date) {
    if (!minD) return false;
    const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const t0 = new Date(minD.getFullYear(), minD.getMonth(), minD.getDate()).getTime();
    return t < t0;
  }

  function selectDay(d: Date) {
    if (isDisabled(d)) return;
    onChange(toIsoDate(d));
    setOpen(false);
  }

  const calendarPanel = (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          type="button"
          className="rounded-lg p-1.5 text-[#0A0909] hover:bg-zinc-100"
          aria-label="Previous month"
          onClick={() => setView(new Date(year, month - 1, 1))}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <p className="font-heading text-sm font-semibold text-[#0A0909]">{monthLabel}</p>
        <button
          type="button"
          className="rounded-lg p-1.5 text-[#0A0909] hover:bg-zinc-100"
          aria-label="Next month"
          onClick={() => setView(new Date(year, month + 1, 1))}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M10 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] font-semibold uppercase tracking-wide text-[#0A0909]/50">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-0.5">
        {cells.map((cell, idx) => {
          if (!cell) return <div key={`e-${idx}`} className="aspect-square" />;
          const iso = toIsoDate(cell.date);
          const selected = value === iso;
          const disabled = isDisabled(cell.date);
          return (
            <button
              key={`${iso}-${idx}`}
              type="button"
              disabled={disabled}
              onClick={() => selectDay(cell.date)}
              className={[
                "aspect-square rounded-lg text-xs font-medium transition",
                disabled ? "cursor-not-allowed text-[#0A0909]/25" : "text-[#0A0909] hover:bg-[#E9EFEE]",
                selected ? "bg-[#41736D] text-white hover:bg-[#365e59]" : "",
              ].join(" ")}
            >
              {cell.date.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );

  const popover =
    open ?
      <div
        ref={popoverRef}
        id={`${id}-popover`}
        role="dialog"
        aria-label={`${placeholder} calendar`}
        data-placement={placement}
        style={{ top: coords.top, left: coords.left, width: POPOVER_WIDTH }}
        className="fixed z-[200] min-w-[275px] rounded-xl border border-[#0A090926] bg-white p-3 shadow-[0_8px_30px_rgba(10,9,9,0.12)]"
      >
        {calendarPanel}
      </div>
    : null;

  return (
    <div ref={rootRef} className={["relative", className ?? ""].join(" ")}>
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        type="button"
        id={`${id}-btn`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls={`${id}-popover`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-lg border border-[#E0E0E0] bg-white px-3 text-left text-xs sm:text-sm text-[#0A0909] outline-none transition hover:border-[#0A090926] focus-visible:border-[#41736D] focus-visible:ring-2 focus-visible:ring-[#41736D]/25"
      >
        <span className={value ? "text-[#0A0909]" : "text-[#0A0909]/45"}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[#0A0909]/55" aria-hidden>
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 3v4M16 3v4M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      {typeof document !== "undefined" && popover ? createPortal(popover, document.body) : null}
    </div>
  );
}
