import { topBar } from "@/data/site-static";
import { IconEnvelope, IconPhone } from "@/components/layout/icons";
import { TopBarCurrency } from "@/components/layout/TopBarCurrency";

export function TopBar() {
  return (
    <div className="hidden border-b border-[#0A09091A] bg-white text-sm text-[#0A0909] lg:block">
      <div className="mx-auto flex max-w-[1390px] flex-col gap-2 px-4 sm:px-5 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p className="text-center text-[#0A0909CC] text-xs sm:text-left">{topBar.tagline}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end">
          <TopBarCurrency />
          <a
            href={topBar.phoneHref}
            className="inline-flex items-center gap-1.5 font-normal text-[#0A0909] transition-colors duration-200 hover:text-[#41736D]"
          >
            <IconPhone className="size-4 shrink-0 text-current transition-colors duration-200" />
            {topBar.phone}
          </a>
          <a
            href={topBar.emailHref}
            className="inline-flex items-center gap-1.5 font-normal text-[#0A0909] transition-colors duration-200 hover:text-[#41736D]"
          >
            <IconEnvelope className="size-4 shrink-0 text-current transition-colors duration-200" />
            <span className="hidden sm:inline">{topBar.email}</span>
            <span className="sm:hidden">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
