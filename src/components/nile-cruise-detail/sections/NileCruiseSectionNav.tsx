"use client";

import { ScrollableSectionNav } from "@/components/common/ScrollableSectionNav";
import { scrollToSection } from "@/components/nile-cruise-detail/nile-detail-utils";

type NavItem = { domId: string; label: string };

type Props = {
  items: readonly NavItem[];
  activeSection: string;
};

export function NileCruiseSectionNav({ items, activeSection }: Props) {
  return (
    <ScrollableSectionNav
      items={items}
      activeSection={activeSection}
      onNavigate={scrollToSection}
      ariaLabel="Nile cruise page sections"
    />
  );
}
