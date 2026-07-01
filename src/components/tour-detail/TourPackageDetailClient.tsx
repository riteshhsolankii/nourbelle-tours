import { DayTourDetailLayout } from "@/components/tour-detail/DayTourDetailLayout";
import { MultiDayTourDetailLayout } from "@/components/tour-detail/MultiDayTourDetailLayout";
import type { TourPackagePageDetail } from "@/types/tour-package-detail";

type Props = {
  detail: TourPackagePageDetail;
};

export function TourPackageDetailClient({ detail }: Props) {
  if (detail.listPath === "/multi-day-egypt-tours") {
    return <MultiDayTourDetailLayout detail={detail} />;
  }
  return <DayTourDetailLayout detail={detail} />;
}
