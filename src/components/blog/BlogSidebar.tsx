import Link from "next/link";
import { RequestCustomTourForm } from "@/components/common/RequestCustomTourForm";
import {
  blogCategoryTags,
  blogPopularArticles,
  blogQuoteCta,
} from "@/data/blog-page";

function CheckBullet() {
  return (
    <svg className="mt-0.5 size-4 shrink-0 text-[#41736D]" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M13.5 4.5L6.5 11.5L3 8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = {
  customizeMinFrom: string;
};

export function BlogSidebar({ customizeMinFrom }: Props) {
  return (
    <aside className="flex w-full min-w-0 flex-col gap-8 lg:max-w-none">
      <RequestCustomTourForm
        customizeMinFrom={customizeMinFrom}
        contextField={{ name: "sourcePage", value: "blog" }}
      />

      <section>
        <h3 className="font-heading text-base lg:text-lg font-bold text-[#0A0909] border-b border-[#0A09091A] pb-4">Popular Articles</h3>
        <ul className="mt-5 space-y-2 sm:space-y-4">
          {blogPopularArticles.map((article) => (
            <li key={article.slug}>
              <Link href={article.href} className="group flex items-start gap-1.5 sm:gap-2.5">
                <CheckBullet />
                <span className="text-xs sm:text-sm leading-snug text-[#0A0909] transition group-hover:text-[#41736D]">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-heading text-base lg:text-lg font-bold text-[#0A0909] border-b border-[#0A09091A] pb-4">Categories</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {blogCategoryTags.map((tag) => (
            <Link
              key={tag.label}
              href={tag.href}
              className="rounded-full bg-[#0A09090D] px-3 py-1.5 font-heading text-xs font-medium text-[#0A0909] transition hover:border-[#41736D] hover:text-[#41736D]"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(90deg,#ECF0F3_0%,rgba(214,224,230)_100%)] p-5 sm:p-6">
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-[url('/insights/blog-cta-bg.svg')] bg-contain bg-[center_107%] bg-no-repeat"
          aria-hidden
        />
        <div className="relative z-10">
          <h3 className="font-heading text-sm sm:text-base font-bold leading-snug text-[#0A0909] md:text-lg">
            {blogQuoteCta.title}
          </h3>
          <ul className="mt-4 space-y-2">
            {blogQuoteCta.bullets.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-[#0A0909]">
                <CheckBullet />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href={blogQuoteCta.buttonHref}
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#0A0909] px-5 py-3 font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-black"
          >
            {blogQuoteCta.buttonLabel}
          </Link>
        </div>
      </section>
    </aside>
  );
}
