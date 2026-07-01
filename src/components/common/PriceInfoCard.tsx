import Link from "next/link";
import type { PriceInfoCardContent } from "@/types/site";

type Props = PriceInfoCardContent;

function ArrowRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 7.09961H9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 3.59961L9.5 7.09961L6 10.5996"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PriceInfoCard({
  startingFrom,
  price,
  duration,
  groupType,
  buttonText,
  buttonLink,
}: Props) {
  return (
    <aside className="w-full max-w-[300px] rounded-[20px] bg-white p-6 sm:p-8 text-[#0A0909]">
      <p className="text-xs sm:text-sm font-light text-[#0A0909E5]">{startingFrom}</p>
      <h4 className="mt-1 text-2xl md:text-[30px] leading-none font-extrabold">{price}</h4>
      <div className="my-4 sm:my-5 rounded-2xl sm:rounded-xl border border-[#0A090926] bg-white py-3.5 px-5 sm:py-5 sm:px-7 text-center">
        <h5 className="text-base sm:text-[20px] leading-tight font-semibold">{duration}</h5>
        <p className="mt-1 text-sm sm:text-base font-regular text-[#0A0909]">{groupType}</p>
      </div>
      <Link
        href={buttonLink}
        className="inline-flex items-center gap-2 font-heading rounded-full bg-[#0A0909] px-3 text-xs sm:px-4 py-2.5 sm:text-sm font-semibold text-white lg:px-6 lg:py-4 lg:text-sm lg:text-white lg:ring-0 lg:shadow-none hover:bg-black"
      >
        {buttonText}
           <span className="hidden lg:inline-flex">
                  <ArrowRight />
                </span>
      </Link>
    </aside>
  );
}
