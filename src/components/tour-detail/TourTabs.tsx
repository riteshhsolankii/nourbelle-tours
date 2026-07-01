import { ScrollableSectionNav } from "@/components/common/ScrollableSectionNav";

/** Tab ids for the redesigned multi-day layout's content-switching tab bar. */
export const MULTI_DAY_TABS: { domId: string; label: string }[] = [
  { domId: "overview", label: "Overview" },
  { domId: "itinerary", label: "Itinerary" },
  { domId: "inclusions", label: "Inclusions" },
  { domId: "exclusions", label: "Exclusions" },
  { domId: "hotels", label: "Hotels" },
  { domId: "map", label: "Map" },
  { domId: "reviews", label: "Reviews" },
  { domId: "faq", label: "FAQ" },
  { domId: "addons", label: "Optional Add-ons" },
];

export type MultiDayTabId = (typeof MULTI_DAY_TABS)[number]["domId"];

type Props = {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
};

export function TourTabs({ activeTab, onSelectTab }: Props) {
  return (
    <ScrollableSectionNav
      items={MULTI_DAY_TABS}
      activeSection={activeTab}
      onNavigate={onSelectTab}
      ariaLabel="Tour detail sections"
      variant="underline"
    />
  );
}
