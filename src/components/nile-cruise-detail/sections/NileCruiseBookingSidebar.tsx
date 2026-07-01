"use client";

import { RequestCustomTourForm } from "@/components/common/RequestCustomTourForm";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";

type Props = {
  detail: TourPackagePageDetail;
  customizeMinFrom: string;
};

export function NileCruiseBookingSidebar({ detail, customizeMinFrom }: Props) {
  return (
    <aside className="w-full min-w-0">
      <RequestCustomTourForm
        customizeMinFrom={customizeMinFrom}
        contextField={{ name: "cruiseSlug", value: detail.slug }}
      />
    </aside>
  );
}
