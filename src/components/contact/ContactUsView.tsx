import Link from "next/link";
import { ScrollRevealSection } from "@/components/common/ScrollRevealSection";
import { ContactSendMessageForm } from "@/components/contact/ContactSendMessageForm";
import { contactUsPage } from "@/data/site-static";

function PhoneIcon() {
  return (
    <svg className="size-5 sm:size-8" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_815_12586)">
        <path d="M16.3054 5.41683C17.3635 5.62328 18.3359 6.14078 19.0983 6.90309C19.8606 7.66541 20.3781 8.63787 20.5845 9.696M16.3054 1.0835C18.5037 1.32772 20.5537 2.31219 22.1188 3.87525C23.6838 5.43832 24.6709 7.48709 24.9179 9.68516M23.8345 18.3302V21.5802C23.8357 21.8819 23.7739 22.1805 23.6531 22.457C23.5322 22.7334 23.3549 22.9816 23.1326 23.1855C22.9103 23.3895 22.6478 23.5448 22.362 23.6414C22.0762 23.7381 21.7733 23.774 21.4729 23.7468C18.1393 23.3846 14.9371 22.2455 12.1237 20.421C9.50617 18.7577 7.28697 16.5385 5.62369 13.921C3.79283 11.0948 2.65345 7.87708 2.29786 4.5285C2.27078 4.22892 2.30639 3.92699 2.4024 3.64192C2.49841 3.35686 2.65272 3.09491 2.85552 2.87275C3.05831 2.6506 3.30514 2.4731 3.5803 2.35156C3.85545 2.23003 4.15289 2.16711 4.45369 2.16683H7.70369C8.22944 2.16166 8.73913 2.34783 9.13776 2.69066C9.5364 3.03348 9.79677 3.50956 9.87036 4.03016C10.0075 5.07024 10.2619 6.09145 10.6287 7.07433C10.7744 7.46208 10.806 7.88349 10.7196 8.28862C10.6332 8.69375 10.4325 9.06562 10.1412 9.36017L8.76536 10.736C10.3075 13.4482 12.5532 15.6938 15.2654 17.236L16.6412 15.8602C16.9357 15.5689 17.3076 15.3682 17.7127 15.2818C18.1179 15.1954 18.5393 15.2269 18.927 15.3727C19.9099 15.7394 20.9311 15.9938 21.9712 16.131C22.4974 16.2052 22.978 16.4703 23.3216 16.8758C23.6652 17.2813 23.8477 17.7989 23.8345 18.3302Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_815_12586">
          <rect width="26" height="26" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="size-5 sm:size-8" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.33464 4.3335H21.668C22.8596 4.3335 23.8346 5.3085 23.8346 6.50016V19.5002C23.8346 20.6918 22.8596 21.6668 21.668 21.6668H4.33464C3.14297 21.6668 2.16797 20.6918 2.16797 19.5002V6.50016C2.16797 5.3085 3.14297 4.3335 4.33464 4.3335Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.8346 6.5L13.0013 14.0833L2.16797 6.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className="size-5 sm:size-8" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.75 10.8335C22.75 18.4168 13 24.9168 13 24.9168C13 24.9168 3.25 18.4168 3.25 10.8335C3.25 8.24764 4.27723 5.76769 6.10571 3.93921C7.93419 2.11073 10.4141 1.0835 13 1.0835C15.5859 1.0835 18.0658 2.11073 19.8943 3.93921C21.7228 5.76769 22.75 8.24764 22.75 10.8335Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 14.0835C14.7949 14.0835 16.25 12.6284 16.25 10.8335C16.25 9.03857 14.7949 7.5835 13 7.5835C11.2051 7.5835 9.75 9.03857 9.75 10.8335C9.75 12.6284 11.2051 14.0835 13 14.0835Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeadsetFeatureIcon() {
  return (
    <span className="flex size-10 sm:size-15 shrink-0 items-center justify-center rounded-full bg-[#0A09090D] text-[#35635E]" aria-hidden>
      <svg className="size-6 sm:size-8" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.25 18.75V15C26.25 13.5226 25.959 12.0597 25.3936 10.6948C24.8283 9.3299 23.9996 8.08971 22.955 7.04505C21.9103 6.00039 20.6701 5.17172 19.3052 4.60636C17.9403 4.04099 16.4774 3.75 15 3.75C13.5226 3.75 12.0597 4.04099 10.6948 4.60636C9.3299 5.17172 8.08971 6.00039 7.04505 7.04505C6.00039 8.08971 5.17172 9.3299 4.60636 10.6948C4.04099 12.0597 3.75 13.5226 3.75 15V18.75" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" />
        <path d="M3.75 18.75V17.8125H2.8125V18.75H3.75ZM3.75 19.6875H7.5V17.8125H3.75V19.6875ZM7.8125 20V23.75H9.6875V20H7.8125ZM4.6875 23.75V18.75H2.8125V23.75H4.6875ZM6.25 25.3125C5.3875 25.3125 4.6875 24.6125 4.6875 23.75H2.8125C2.8125 24.6617 3.17466 25.536 3.81932 26.1807C4.46398 26.8253 5.33832 27.1875 6.25 27.1875V25.3125ZM7.8125 23.75C7.8125 24.6125 7.1125 25.3125 6.25 25.3125V27.1875C7.16168 27.1875 8.03602 26.8253 8.68068 26.1807C9.32534 25.536 9.6875 24.6617 9.6875 23.75H7.8125ZM7.5 19.6875C7.58288 19.6875 7.66237 19.7204 7.72097 19.779C7.77958 19.8376 7.8125 19.9171 7.8125 20H9.6875C9.6875 19.4198 9.45703 18.8634 9.0468 18.4532C8.63656 18.043 8.08016 17.8125 7.5 17.8125V19.6875ZM26.25 18.75H27.1875V17.8125H26.25V18.75ZM22.5 19.6875H26.25V17.8125H22.5V19.6875ZM25.3125 18.75V23.75H27.1875V18.75H25.3125ZM22.1875 23.75V20H20.3125V23.75H22.1875ZM23.75 25.3125C22.8875 25.3125 22.1875 24.6125 22.1875 23.75H20.3125C20.3125 24.6617 20.6747 25.536 21.3193 26.1807C21.964 26.8253 22.8383 27.1875 23.75 27.1875V25.3125ZM25.3125 23.75C25.3125 24.6125 24.6125 25.3125 23.75 25.3125V27.1875C24.6617 27.1875 25.536 26.8253 26.1807 26.1807C26.8253 25.536 27.1875 24.6617 27.1875 23.75H25.3125ZM22.5 17.8125C21.9198 17.8125 21.3634 18.043 20.9532 18.4532C20.543 18.8634 20.3125 19.4198 20.3125 20H22.1875C22.1875 19.9171 22.2204 19.8376 22.279 19.779C22.3376 19.7204 22.4171 19.6875 22.5 19.6875V17.8125Z" fill="#0A0909" />
      </svg>
    </span>
  );
}

function ChatFeatureIcon() {
  return (
    <span className="flex size-10 sm:size-15 shrink-0 items-center justify-center rounded-full bg-[#0A09090D] text-[#35635E]" aria-hidden>
      <svg className="size-6 sm:size-8" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.4375 4.6875H6.5625C5.56794 4.6875 4.61411 5.08259 3.91085 5.78585C3.20759 6.48911 2.8125 7.44294 2.8125 8.4375V17.8125C2.8125 18.8071 3.20759 19.7609 3.91085 20.4641C4.61411 21.1674 5.56794 21.5625 6.5625 21.5625H16.875L22.5 25.3125V21.5625H23.4375C24.4321 21.5625 25.3859 21.1674 26.0891 20.4641C26.7924 19.7609 27.1875 18.8071 27.1875 17.8125V8.4375C27.1875 7.44294 26.7924 6.48911 26.0891 5.78585C25.3859 5.08259 24.4321 4.6875 23.4375 4.6875Z" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.375 14.0625C9.375 14.3111 9.27623 14.5496 9.10041 14.7254C8.9246 14.9012 8.68614 15 8.4375 15C8.18886 15 7.9504 14.9012 7.77459 14.7254C7.59877 14.5496 7.5 14.3111 7.5 14.0625C7.5 13.8139 7.59877 13.5754 7.77459 13.3996C7.9504 13.2238 8.18886 13.125 8.4375 13.125C8.68614 13.125 8.9246 13.2238 9.10041 13.3996C9.27623 13.5754 9.375 13.8139 9.375 14.0625ZM15 14.0625C15 14.3111 14.9012 14.5496 14.7254 14.7254C14.5496 14.9012 14.3111 15 14.0625 15C13.8139 15 13.5754 14.9012 13.3996 14.7254C13.2238 14.5496 13.125 14.3111 13.125 14.0625C13.125 13.8139 13.2238 13.5754 13.3996 13.3996C13.5754 13.2238 13.8139 13.125 14.0625 13.125C14.3111 13.125 14.5496 13.2238 14.7254 13.3996C14.9012 13.5754 15 13.8139 15 14.0625ZM20.625 14.0625C20.625 14.3111 20.5262 14.5496 20.3504 14.7254C20.1746 14.9012 19.9361 15 19.6875 15C19.4389 15 19.2004 14.9012 19.0246 14.7254C18.8488 14.5496 18.75 14.3111 18.75 14.0625C18.75 13.8139 18.8488 13.5754 19.0246 13.3996C19.2004 13.2238 19.4389 13.125 19.6875 13.125C19.9361 13.125 20.1746 13.2238 20.3504 13.3996C20.5262 13.5754 20.625 13.8139 20.625 14.0625Z" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

const cardIcons = {
  phone: PhoneIcon,
  email: EmailIcon,
  address: PinIcon,
} as const;

const featureIcons = [HeadsetFeatureIcon, ChatFeatureIcon] as const;

export function ContactUsView() {
  const { infoCards, getInTouch, map } = contactUsPage;

  return (
    <>
      <ScrollRevealSection>
      <section className="bg-white py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
        <div className="mx-auto grid max-w-[1390px] gap-4 px-4 sm:grid-cols-3 sm:gap-5 sm:px-5">
          {infoCards.map((card) => {
            const Icon = cardIcons[card.id];
            return (
              <Link
                key={card.id}
                href={card.href}
                className="flex flex-col items-center rounded-2xl bg-[#0A09090D] px-4 py-8 text-center transition hover:bg-[#EDEDED] sm:py-10"
              >
                <span className="flex size-10 sm:size-15 items-center justify-center rounded-full bg-[#41736D]">
                  <Icon />
                </span>
                <p className="mt-2.5 sm:mt-4 font-heading text-sm sm:text-base font-medium text-[#0A0909] sm:text-lg">{card.primary}</p>
                <p className="mt-2 max-w-[190px] text-xs sm:text-sm leading-relaxed text-[#0A0909]">{card.secondary}</p>
              </Link>
            );
          })}
        </div>
      </section>
      </ScrollRevealSection>

      <ScrollRevealSection>
      <section id="get-in-touch" className="bg-white pb-8 sm:pb-10 md:pb-12 lg:pb-16 xl:pb-20">
        <div className="mx-auto grid max-w-[1390px] gap-10 px-4 sm:px-5 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-14">
          <div>
            <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
              {getInTouch.title}
            </h2>
            <p className="mt-2 sm:mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-[#0A0909] md:text-base">{getInTouch.intro}</p>
            <ul className="mt-8 space-y-6 md:mt-10 max-w-sm">
              {getInTouch.features.map((f, i) => {
                const FeatureIcon = featureIcons[i] ?? HeadsetFeatureIcon;
                return (
                  <li key={f.id} className="border-b border-[#0A090926] pb-6 last:border-0 last:pb-0">
                    <div className="flex gap-2 sm:gap-4 items-center">
                      <FeatureIcon />
                      <p className="font-heading text-sm sm:text-base lg:text-[20px] font-semibold text-[#0A0909]">{f.title}</p>
                    </div>
                     <p className="pl-[50px] sm:pl-[75px] text-xs sm:text-sm leading-relaxed text-[#0A0909]">{f.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <ContactSendMessageForm />
        </div>
      </section>
      </ScrollRevealSection>

      <ScrollRevealSection>
      <section className="bg-white pb-14 pt-2 md:pb-16 lg:pb-20" aria-labelledby="contact-map-heading">
        <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
          <h2 id="contact-map-heading" className="sr-only">
            {map.title}
          </h2>
          <div className="overflow-hidden rounded-2xl bg-zinc-100 grayscale">
            <iframe
              title="Map — Luxor, Egypt"
              src={map.embedSrc}
              className="block h-[280px] w-full border-0 sm:h-[360px] md:h-[420px] lg:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      </ScrollRevealSection>
    </>
  );
}
