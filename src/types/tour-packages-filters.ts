export type TourPackagesFilterPreset = "multiDay" | "dayTour" | "nileCruise";

export type TourFilterFieldId =
  | "duration"
  | "travelStyle"
  | "destination"
  | "priceRange"
  | "moreFilters"
  | "sort";

export type TourFilterBarField = {
  id: TourFilterFieldId;
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
};
