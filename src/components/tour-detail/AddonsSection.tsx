import Image from "next/image";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";
import { formatUsd } from "@/components/tour-detail/helpers";

type Props = {
  addons?: TourPackagePageDetail["addons"];
};

export function AddonsSection({ addons }: Props) {
  if (!addons || addons.length === 0) return null;

  return (
    <div>
      <h3 className="font-heading text-sm font-bold text-[#0A0909] md:text-base">Optional Add-ons</h3>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {addons.map((addon) => (
          <div key={addon.title} className="flex items-center gap-3 rounded-xl border border-[#0A09091A] bg-white p-3">
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image src={addon.imageSrc} alt={addon.imageAlt} fill className="object-cover" sizes="80px" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#0A0909] sm:text-sm">{addon.title}</p>
              <p className="mt-0.5 text-xs text-[#0A0909]/60">From {formatUsd(addon.priceFrom)} per person</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
