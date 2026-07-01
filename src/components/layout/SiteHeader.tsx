import Link from "next/link";
import { headerCta, mainNav } from "@/data/site-static";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { HeaderSearch } from "@/components/layout/HeaderSearch";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { MainNav } from "@/components/layout/MainNav";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 shrink-0 overflow-visible border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-[1390px] items-center justify-between gap-3 overflow-visible px-3 sm:px-4 py-2.5 md:px-5 sm:py-4 md:gap-4 md:py-5">
        <BrandLogo />
        <MainNav items={mainNav} />
        <div className="flex items-center gap-1 overflow-visible md:gap-2">
          <HeaderSearch />
          <span
            className="hidden h-6 w-px shrink-0 bg-zinc-200 xl:block"
            aria-hidden
          />
          <div className="hidden xl:block">
            <LanguageSwitcher />
          </div>
          <Link
            href={headerCta.href}
            className="inline-flex rounded-full bg-[#41736D] px-3 sm:px-4 py-2 text-[11px] sm:text-sm font-semibold text-white transition hover:bg-[#365e59] sm:py-2.5 md:py-3 md:font-heading md:tracking-[-0.03em]"
          >
            {headerCta.label}
          </Link>
          <MobileMenu items={mainNav} />
        </div>
      </div>
    </header>
  );
}
