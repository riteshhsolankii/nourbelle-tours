"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Map as LeafletMap } from "leaflet";
import { EGYPT_PLACE_COORDINATES } from "@/data/egypt-place-coordinates";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";

type MapPoint = { name: string; lat: number; lng: number };

function resolvePoints(places: readonly string[] | undefined): MapPoint[] {
  if (!places) return [];
  const seen = new Set<string>();
  const points: MapPoint[] = [];
  for (const place of places) {
    const coord = EGYPT_PLACE_COORDINATES[place];
    if (!coord) continue;
    const key = `${coord[0]},${coord[1]}`;
    if (seen.has(key)) continue;
    seen.add(key);
    points.push({ name: place, lat: coord[0], lng: coord[1] });
  }
  return points;
}

function useLeafletInstance(containerRef: React.RefObject<HTMLDivElement | null>, points: MapPoint[], active: boolean) {
  useEffect(() => {
    if (!active || points.length === 0 || !containerRef.current) return;
    let map: LeafletMap | undefined;
    let cancelled = false;

    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current) return;

      map = L.map(containerRef.current, { scrollWheelZoom: false });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      const icon = L.divIcon({
        html: '<span style="display:block;width:14px;height:14px;border-radius:50%;background:#41736D;border:2px solid #fff;box-shadow:0 0 0 2px rgba(10,9,9,0.15)"></span>',
        className: "",
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });

      points.forEach((p) => {
        L.marker([p.lat, p.lng], { icon }).addTo(map as LeafletMap).bindPopup(p.name);
      });

      if (points.length > 1) {
        L.polyline(
          points.map((p) => [p.lat, p.lng]),
          { color: "#41736D", weight: 2, dashArray: "6 6" },
        ).addTo(map);
      }

      if (points.length === 1) {
        map.setView([points[0].lat, points[0].lng], 8);
      } else {
        map.fitBounds(
          points.map((p) => [p.lat, p.lng]),
          { padding: [28, 28] },
        );
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [containerRef, points, active]);
}

type Props = {
  placesToVisit?: TourPackagePageDetail["placesToVisit"];
  aspectClassName?: string;
};

export function TourMap({ placesToVisit, aspectClassName = "aspect-[4/3]" }: Props) {
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const inlineRef = useRef<HTMLDivElement | null>(null);
  const fullscreenRef = useRef<HTMLDivElement | null>(null);
  const points = resolvePoints(placesToVisit);

  useLeafletInstance(inlineRef, points, true);
  useLeafletInstance(fullscreenRef, points, fullscreenOpen);

  useEffect(() => {
    if (!fullscreenOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreenOpen]);

  if (points.length === 0) {
    return (
      <div className={`flex ${aspectClassName} w-full items-center justify-center rounded-xl bg-[#0A09090D] text-center text-xs text-[#0A0909]/55 lg:rounded-2xl`}>
        Map unavailable for this tour.
      </div>
    );
  }

  return (
    <>
      <div className={`relative ${aspectClassName} w-full overflow-hidden rounded-xl bg-zinc-100 lg:rounded-2xl`}>
        <div ref={inlineRef} className="absolute inset-0 z-0" />
        <button
          type="button"
          onClick={() => setFullscreenOpen(true)}
          className="absolute bottom-3 right-3 z-[1] rounded-full bg-[#0A0909] px-4 py-2 font-heading text-xs font-semibold text-white shadow transition hover:bg-[#0A0909]/85"
        >
          View full map
        </button>
      </div>
      {fullscreenOpen && typeof document !== "undefined" ?
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-black/92 p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Tour route map">
            <div className="flex items-center justify-between gap-4 text-white">
              <p className="text-sm font-medium">Tour route</p>
              <button
                type="button"
                onClick={() => setFullscreenOpen(false)}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <div className="relative mt-4 flex-1 overflow-hidden rounded-xl">
              <div ref={fullscreenRef} className="absolute inset-0" />
            </div>
          </div>,
          document.body,
        )
      : null}
    </>
  );
}
