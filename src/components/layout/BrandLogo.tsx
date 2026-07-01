import Link from "next/link";
import { brand } from "@/data/site-static";

export function BrandLogo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <img
        src="/logo.svg"
        alt={brand.name}
        width={223}
        height={45}
        className="h-6 w-auto sm:h-11"
        decoding="async"
      />
    </Link>
  );
}
