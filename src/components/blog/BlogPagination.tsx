import Link from "next/link";
import type { BlogCategoryId } from "@/data/blog-page";
import { buildBlogPageHref } from "@/lib/blog";

type Props = {
  currentPage: number;
  totalPages: number;
  category: BlogCategoryId;
};

function pageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, "ellipsis", total];
  }
  if (current >= total - 2) {
    return [1, "ellipsis", total - 2, total - 1, total];
  }
  return [1, "ellipsis", current, "ellipsis", total];
}

export function BlogPagination({ currentPage, totalPages, category }: Props) {
  if (totalPages <= 1) return null;

  const pages = pageNumbers(currentPage, totalPages);
  const prevHref = currentPage > 1 ? buildBlogPageHref(currentPage - 1, category) : undefined;
  const nextHref = currentPage < totalPages ? buildBlogPageHref(currentPage + 1, category) : undefined;

  const linkClass = (active: boolean) =>
    [
      "flex h-7 min-w-7 sm:h-9 sm:min-w-9 items-center justify-center rounded-md font-heading text-xs sm:text-sm border border-[#0A09091A] font-semibold transition",
      active ? "bg-[#41736D] border-[#41736D] text-white" : "text-[#0A0909] hover:bg-zinc-100",
    ].join(" ");

  const navBtnClass =
    "rounded-lg px-3 py-2 font-heading text-xs sm:text-sm font-semibold text-[#0A0909] transition hover:text-[#41736D] disabled:pointer-events-none disabled:opacity-40";

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Blog pagination">
      {prevHref ?
        <Link href={prevHref} className={navBtnClass} rel={currentPage === 2 ? undefined : "prev"}>
          Prev
        </Link>
      : <span className={`${navBtnClass} opacity-40`} aria-disabled>
          Prev
        </span>}
      {pages.map((page, idx) =>
        page === "ellipsis" ?
          <span key={`ellipsis-${idx}`} className="px-1 text-sm text-zinc-500" aria-hidden>
            …
          </span>
        : <Link
            key={page}
            href={buildBlogPageHref(page, category)}
            aria-current={page === currentPage ? "page" : undefined}
            className={linkClass(page === currentPage)}
          >
            {page}
          </Link>,
      )}
      {nextHref ?
        <Link href={nextHref} className={navBtnClass} rel="next">
          Next
        </Link>
      : <span className={`${navBtnClass} opacity-40`} aria-disabled>
          Next
        </span>}
    </nav>
  );
}
