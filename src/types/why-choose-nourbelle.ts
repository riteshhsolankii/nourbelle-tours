export type WhyChooseNourbelleIconId =
  | "mapPin"
  | "hotel"
  | "flight"
  | "customize"
  | "lock"
  | "leaf";

export type WhyChooseNourbelleSectionContent = {
  title: string;
  items: readonly { label: string; icon: WhyChooseNourbelleIconId }[];
};
