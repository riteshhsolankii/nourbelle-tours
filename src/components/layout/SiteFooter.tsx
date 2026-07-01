import Link from "next/link";
import {
  brand,
  footerAbout,
  footerMainMenu,
  footerQuickLinks,
  footerSocial,
  topBar,
} from "@/data/site-static";
import { FooterCopyright } from "@/components/layout/FooterCopyright";
import { IconEnvelope, IconPhone } from "@/components/layout/icons";
import { ScrollRevealSection } from "../common/ScrollRevealSection";

function SocialGlyph({ kind }: { kind: (typeof footerSocial)[number]["kind"] }) {
  const cls = "size-[18px] shrink-0";
  switch (kind) {
    case "facebook":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="currentcolor" />
          <path d="M17.7586 27.6H20.9586V21.192H23.8418L24.1586 18.008H20.9586V16.4C20.9586 16.1878 21.0429 15.9843 21.1929 15.8343C21.3429 15.6843 21.5464 15.6 21.7586 15.6H24.1586V12.4H21.7586C20.6977 12.4 19.6803 12.8214 18.9302 13.5716C18.18 14.3217 17.7586 15.3391 17.7586 16.4V18.008H16.1586L15.8418 21.192H17.7586V27.6Z" fill="#0A0909" />
        </svg>
      );
    case "instagram":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="currentcolor" />
          <path d="M23.2008 12.8004C24.2616 12.8004 25.2791 13.2218 26.0292 13.9719C26.7794 14.7221 27.2008 15.7395 27.2008 16.8004V23.2004C27.2008 24.2612 26.7794 25.2787 26.0292 26.0288C25.2791 26.7789 24.2616 27.2004 23.2008 27.2004H16.8008C15.7399 27.2004 14.7225 26.7789 13.9724 26.0288C13.2222 25.2787 12.8008 24.2612 12.8008 23.2004V16.8004C12.8008 15.7395 13.2222 14.7221 13.9724 13.9719C14.7225 13.2218 15.7399 12.8004 16.8008 12.8004H23.2008ZM20.0008 16.8004C19.1521 16.8004 18.3382 17.1375 17.738 17.7376C17.1379 18.3377 16.8008 19.1517 16.8008 20.0004C16.8008 20.8491 17.1379 21.663 17.738 22.2631C18.3382 22.8632 19.1521 23.2004 20.0008 23.2004C20.8495 23.2004 21.6634 22.8632 22.2635 22.2631C22.8636 21.663 23.2008 20.8491 23.2008 20.0004C23.2008 19.1517 22.8636 18.3377 22.2635 17.7376C21.6634 17.1375 20.8495 16.8004 20.0008 16.8004ZM20.0008 18.4004C20.4251 18.4004 20.8321 18.5689 21.1322 18.869C21.4322 19.1691 21.6008 19.576 21.6008 20.0004C21.6008 20.4247 21.4322 20.8317 21.1322 21.1317C20.8321 21.4318 20.4251 21.6004 20.0008 21.6004C19.5764 21.6004 19.1695 21.4318 18.8694 21.1317C18.5694 20.8317 18.4008 20.4247 18.4008 20.0004C18.4008 19.576 18.5694 19.1691 18.8694 18.869C19.1695 18.5689 19.5764 18.4004 20.0008 18.4004ZM23.6008 15.6004C23.3886 15.6004 23.1851 15.6847 23.0351 15.8347C22.8851 15.9847 22.8008 16.1882 22.8008 16.4004C22.8008 16.6125 22.8851 16.816 23.0351 16.9661C23.1851 17.1161 23.3886 17.2004 23.6008 17.2004C23.813 17.2004 24.0164 17.1161 24.1665 16.9661C24.3165 16.816 24.4008 16.6125 24.4008 16.4004C24.4008 16.1882 24.3165 15.9847 24.1665 15.8347C24.0164 15.6847 23.813 15.6004 23.6008 15.6004Z" fill="#0A0909" />
        </svg>
      );
    case "tripadvisor":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="currentcolor" />
          <path d="M30.2019 17.0776L32 15.1386H28.0126C26.0164 13.7871 23.6056 13 20.9983 13C18.3944 13 15.9903 13.7888 13.9974 15.1386H10L11.7981 17.0776C10.6959 18.0743 10.005 19.5099 10.005 21.104C10.005 24.1122 12.4658 26.5512 15.5009 26.5512C16.9427 26.5512 18.2563 26 19.2369 25.099L20.9984 27L22.7598 25.1007C23.7405 26.0017 25.0524 26.5512 26.4942 26.5512C29.5293 26.5512 31.9934 24.1122 31.9934 21.104C31.995 19.5083 31.3041 18.0726 30.2019 17.0776ZM15.5025 24.7904C13.448 24.7904 11.7831 23.1403 11.7831 21.104C11.7831 19.0677 13.448 17.4175 15.5025 17.4175C17.557 17.4175 19.2219 19.0677 19.2219 21.104C19.2219 23.1403 17.557 24.7904 15.5025 24.7904ZM21 20.9967C21 18.571 19.2202 16.4885 16.8711 15.599C18.1414 15.0726 19.5349 14.7805 20.9983 14.7805C22.4618 14.7805 23.8569 15.0726 25.1273 15.599C22.7798 16.4901 21 18.571 21 20.9967ZM26.4959 24.7904C24.4414 24.7904 22.7765 23.1403 22.7765 21.104C22.7765 19.0677 24.4414 17.4175 26.4959 17.4175C28.5504 17.4175 30.2152 19.0677 30.2152 21.104C30.2152 23.1403 28.5503 24.7904 26.4959 24.7904ZM26.4959 19.17C25.4187 19.17 24.5462 20.0347 24.5462 21.1023C24.5462 22.17 25.4187 23.0347 26.4959 23.0347C27.573 23.0347 28.4455 22.17 28.4455 21.1023C28.4454 20.0363 27.573 19.17 26.4959 19.17ZM17.4521 21.104C17.4521 22.1716 16.5797 23.0363 15.5025 23.0363C14.4253 23.0363 13.5529 22.1716 13.5529 21.104C13.5529 20.0363 14.4253 19.1716 15.5025 19.1716C16.5797 19.17 17.4521 20.0363 17.4521 21.104Z" fill="#0A0909" />
        </svg>
      );
    case "youtube":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="currentcolor" />
          <path d="M17.9996 22L22.1516 19.6L17.9996 17.2V22ZM27.2476 15.736C27.3516 16.112 27.4236 16.616 27.4716 17.256C27.5276 17.896 27.5516 18.448 27.5516 18.928L27.5996 19.6C27.5996 21.352 27.4716 22.64 27.2476 23.464C27.0476 24.184 26.5836 24.648 25.8636 24.848C25.4876 24.952 24.7996 25.024 23.7436 25.072C22.7036 25.128 21.7516 25.152 20.8716 25.152L19.5996 25.2C16.2476 25.2 14.1596 25.072 13.3356 24.848C12.6156 24.648 12.1516 24.184 11.9516 23.464C11.8476 23.088 11.7756 22.584 11.7276 21.944C11.6716 21.304 11.6476 20.752 11.6476 20.272L11.5996 19.6C11.5996 17.848 11.7276 16.56 11.9516 15.736C12.1516 15.016 12.6156 14.552 13.3356 14.352C13.7116 14.248 14.3996 14.176 15.4556 14.128C16.4956 14.072 17.4476 14.048 18.3276 14.048L19.5996 14C22.9516 14 25.0396 14.128 25.8636 14.352C26.5836 14.552 27.0476 15.016 27.2476 15.736Z" fill="#0A0909" />
        </svg>
      );
    case "pinterest":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="currentcolor" />
          <path d="M19.5996 27.6C24.018 27.6 27.5996 24.0184 27.5996 19.6C27.5996 15.1816 24.018 11.6 19.5996 11.6C15.1812 11.6 11.5996 15.1816 11.5996 19.6C11.5996 22.8048 13.4844 25.5696 16.206 26.8464L18.038 18.2336C18.0849 18.0289 18.2105 17.8509 18.3875 17.738C18.5645 17.6251 18.7788 17.5862 18.9842 17.6299C19.1896 17.6736 19.3695 17.7963 19.4853 17.9715C19.601 18.1467 19.6432 18.3604 19.6028 18.5664C19.3836 19.6 19.1916 20 19.2004 20.48C19.214 21.232 19.4188 21.6336 19.6172 21.8416C19.8196 22.0536 20.1116 22.168 20.4932 22.1616C20.8828 22.1536 21.3236 22.0168 21.714 21.7704C22.4732 21.2936 22.7996 20.476 22.7996 19.6C22.7991 19.1246 22.6926 18.6553 22.488 18.2262C22.2834 17.7971 21.9857 17.419 21.6167 17.1193C21.2476 16.8197 20.8165 16.606 20.3545 16.4939C19.8925 16.3817 19.4113 16.3739 18.946 16.471C18.4806 16.5681 18.0427 16.7677 17.6641 17.0552C17.2856 17.3428 16.9758 17.711 16.7574 18.1333C16.539 18.5555 16.4174 19.0211 16.4014 19.4962C16.3855 19.9714 16.4756 20.4441 16.6652 20.88C16.7425 21.073 16.7417 21.2885 16.6628 21.4809C16.5839 21.6733 16.4333 21.8274 16.2427 21.9106C16.0522 21.9938 15.8367 21.9996 15.642 21.9267C15.4473 21.8538 15.2886 21.7079 15.1996 21.52C14.8811 20.7896 14.7495 19.9913 14.8167 19.1973C14.8838 18.4033 15.1476 17.6385 15.5841 16.9718C16.0207 16.3052 16.6164 15.7578 17.3174 15.3789C18.0184 15.0001 18.8028 14.8017 19.5996 14.8017C20.3965 14.8017 21.1808 15.0001 21.8818 15.3789C22.5828 15.7578 23.1785 16.3052 23.6151 16.9718C24.0517 17.6385 24.3154 18.4033 24.3825 19.1973C24.4497 19.9913 24.3181 20.7896 23.9996 21.52C23.7052 22.1984 23.1676 22.7472 22.566 23.1256C21.962 23.5056 21.2404 23.7488 20.522 23.7616C19.8668 23.7736 19.1844 23.592 18.6348 23.1152L17.7276 27.3808C18.3276 27.5248 18.9548 27.6008 19.5988 27.6008L19.5996 27.6Z" fill="#0A0909" />
        </svg>

      );
    default:
      return null;
  }
}

const footerLinkClass =
  "text-xs md:text-sm text-white/80 font-regular transition-colors hover:text-[#8cb9b0]";
const footerHeadingClass = "text-base lg:text-xl font-semibold text-white";

function FooterChevron({ open }: { open?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={["text-white transition-transform", open ? "rotate-180" : ""].join(" ")}
      aria-hidden
    >
      <path
        d="M5.83325 7.91699L9.99992 12.0837L14.1666 7.91699"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FooterSection({
  title,
  defaultOpen,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border-b border-white/10 py-4 lg:border-0 lg:py-0 last:border-b-0 last:pb-0"
    >
      <summary className="flex list-none items-center justify-between gap-3 lg:pointer-events-none">
        <h4 className={footerHeadingClass}>{title}</h4>
        <span className="transition-transform group-open:rotate-180 lg:hidden">
          <FooterChevron />
        </span>
      </summary>
      <div className="mt-4 border-t border-white/10 pt-4 lg:mt-5 lg:border-0 lg:pt-0">{children}</div>
    </details>
  );
}

export function SiteFooter() {
  return (
    <>
      <ScrollRevealSection>
        <footer className="bg-[#0A0909] text-white">
          <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
            <div className="border-b border-white/10">
              <div className="flex flex-col items-center py-6 md:py-8 lg:py-12 xl:py-14">
                <img
                  src="/footer/brands-logo.svg"
                  alt="ASTA, EgyptAir, IATA, Ministry of Tourism, ETAA, Verified by Visa, and MasterCard SecureCode"
                  className="h-auto w-full object-contain lg:max-w-5xl"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="border-b border-white/10">
              <div className="py-10 lg:py-14">
                <div className="grid gap-0 lg:grid-cols-4 lg:gap-10">
                  <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-none">
                    <Link href="/" className="inline-flex w-full flex-col items-center gap-3 lg:w-auto lg:items-start">
                      <img
                        src="/footer-logo.svg"
                        alt={brand.logoAlt}
                        width={223}
                        height={100}
                        className="h-28 w-auto max-w-[174px] lg:h-32"
                        decoding="async"
                      />
                    </Link>
                    <p className="mx-auto mt-5 max-w-md text-center text-[11px] sm:text-xs md:text-sm lg:mx-0 lg:max-w-sm lg:text-left font-regular leading-relaxed text-white/80">
                      {footerAbout.blurb}
                    </p>
                  </div>

                  <FooterSection title={footerMainMenu.title} defaultOpen>
                    <ul className="space-y-3 lg:space-y-2.5">
                      {footerMainMenu.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className={footerLinkClass}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </FooterSection>

                  <FooterSection title={footerQuickLinks.title} defaultOpen>
                    <ul className="space-y-3 lg:space-y-2.5">
                      {footerQuickLinks.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className={footerLinkClass}>
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </FooterSection>

                  <FooterSection title="Location" defaultOpen>
                    <div className="space-y-4">
                      <a
                        href={topBar.phoneHref}
                        className="flex items-center gap-2 text-xs sm:text-sm text-white transition-colors hover:text-[#8cb9b0]"
                      >
                        <IconPhone className="size-4 shrink-0 text-current" />
                        {topBar.phone}
                      </a>
                      <a
                        href={topBar.emailHref}
                        className="flex items-center gap-2 text-xs sm:text-sm text-white transition-colors hover:text-[#8cb9b0]"
                      >
                        <IconEnvelope className="size-4 shrink-0 text-current" />
                        {topBar.email}
                      </a>
                    </div>
                    <h4 className={`${footerHeadingClass} mt-8`}>Let&apos;s Connect</h4>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {footerSocial.map((s) => (
                        <a
                          key={s.kind}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="inline-flex size-10 items-center justify-center rounded-full text-white transition hover:text-white/90"
                        >
                          <SocialGlyph kind={s.kind} />
                        </a>
                      ))}
                    </div>
                  </FooterSection>
                </div>
              </div>
            </div>

            <div className="py-5">
              <FooterCopyright />
            </div>
          </div>
        </footer>
      </ScrollRevealSection>
    </>
  );
}
