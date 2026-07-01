import Image from "next/image";
import Link from "next/link";

type Category = {
  label: string;
  href: string;
  icon: "packages" | "cruises" | "dayTours" | "shore";
};

const CATEGORY_ICON_SRC: Record<Category["icon"], string> = {
  packages: "/tourPackages.svg",
  cruises: "/nileCruises.svg",
  dayTours: "/dayTours.svg",
  shore: "/shoreExcursions.svg",
};

type Props = {
  title: string;
  categories: readonly Category[];
};

export function FindPerfectTourSection({ title, categories }: Props) {
  return (
    <section className="w-full bg-[#FAFAFA] sm:bg-transparent sm:bg-[linear-gradient(180deg,#FAFAFA_0%,rgba(250,250,250,0)_100%)]">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5 pb-8 sm:pb-0 pt-8 sm:pt-10 md:pt-12 lg:pt-16 xl:pt-20">
        <h2 className="text-left sm:text-center font-heading font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>
        <ul className="mt-4 md:mt-6 lg:mt-8 xl:mt-10 grid gap-2.5 sm:gap-4 grid-cols-4 md:gap-6">
          {categories.map((cat) => (
            <li key={cat.href}>
              <Link
                href={cat.href}
                className="flex h-full flex-col items-center rounded-[10px] md:rounded-[20px] border border-[#0A090926] bg-white px-3.5 sm:px-4 md:px-6 py-2.5 md:py-4 text-center transition hover:border-[#41736D]/35 hover:shadow-[0_4px_20px_rgba(65,115,109,0.12)]"
              >
                <div className="relative flex shrink-0 items-center justify-center md:size-24">
                  <Image
                    src={CATEGORY_ICON_SRC[cat.icon]}
                    alt=""
                    width={100}
                    height={100}
                    className="shrink-0 size-10 sm:size-12 md:size-16 lg:size-20 xl:size-24"
                  />
                </div>
                <h3 className="mt-1.5 sm:mt-3 md:mt-4 lg:mt-5 font-heading text-[10px] sm:text-xs md:text-base lg:text-lg xl:text-xl font-bold leading-snug text-[#0A0909]">
                  {cat.label}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
