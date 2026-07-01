import { travelAgentsDesignedFor } from "@/data/travel-agents-page";

type IconId = (typeof travelAgentsDesignedFor.items)[number]["icon"];

const stroke = "#0A0909";

function DesignedForIcon({ kind }: { kind: IconId }) {
  switch (kind) {
    case "calendarCheck":
      return (
       <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#0A0909" fillOpacity="0.05"/>
<path d="M35.625 21.25V18.75M24.375 21.25V18.75M19.0625 25H40.9375M27.8225 32.8025L29.115 34.2788C29.2337 34.415 29.4475 34.4037 29.5525 34.2587L32.1775 30.625" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.75 27.555C18.75 24.9112 18.75 23.5888 19.295 22.5788C19.7878 21.6779 20.5525 20.9556 21.48 20.515C22.55 20 23.95 20 26.75 20H33.25C36.05 20 37.45 20 38.52 20.515C39.4613 20.9675 40.225 21.69 40.705 22.5775C41.25 23.59 41.25 24.9125 41.25 27.5563V33.6962C41.25 36.34 41.25 37.6625 40.705 38.6725C40.2122 39.5734 39.4475 40.2956 38.52 40.7363C37.45 41.25 36.05 41.25 33.25 41.25H26.75C23.95 41.25 22.55 41.25 21.48 40.735C20.5527 40.2947 19.788 39.5729 19.295 38.6725C18.75 37.66 18.75 36.3375 18.75 33.6937V27.555Z" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
    case "globe":
      return (
       <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#0A0909" fillOpacity="0.05"/>
<path d="M30 42.5C36.9036 42.5 42.5 36.9036 42.5 30C42.5 23.0964 36.9036 17.5 30 17.5C23.0964 17.5 17.5 23.0964 17.5 30C17.5 36.9036 23.0964 42.5 30 42.5Z" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 30H42.5M30 17.5C26.7903 20.8702 25 25.3459 25 30C25 34.6541 26.7903 39.1298 30 42.5C33.2097 39.1298 35 34.6541 35 30C35 25.3459 33.2097 20.8702 30 17.5Z" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
    case "handshake":
      return (
       <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#0A0909" fillOpacity="0.05"/>
<path d="M28.75 36.25L31.25 38.75C31.4962 38.9962 31.7885 39.1915 32.1103 39.3248C32.432 39.4581 32.7768 39.5267 33.125 39.5267C33.4732 39.5267 33.818 39.4581 34.1397 39.3248C34.4615 39.1915 34.7538 38.9962 35 38.75C35.2462 38.5038 35.4415 38.2115 35.5748 37.8897C35.7081 37.568 35.7767 37.2232 35.7767 36.875C35.7767 36.5268 35.7081 36.182 35.5748 35.8603C35.4415 35.5385 35.2462 35.2462 35 35" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M32.4993 32.4999L35.6243 35.6249C36.1216 36.1222 36.796 36.4015 37.4993 36.4015C38.2026 36.4015 38.877 36.1222 39.3743 35.6249C39.8716 35.1276 40.151 34.4532 40.151 33.7499C40.151 33.0466 39.8716 32.3722 39.3743 31.8749L34.5243 27.0249C33.8212 26.3226 32.8681 25.9282 31.8743 25.9282C30.8806 25.9282 29.9274 26.3226 29.2243 27.0249L28.1243 28.1249C27.627 28.6222 26.9526 28.9015 26.2493 28.9015C25.546 28.9015 24.8716 28.6222 24.3743 28.1249C23.877 27.6276 23.5977 26.9532 23.5977 26.2499C23.5977 25.5466 23.877 24.8722 24.3743 24.3749L27.8868 20.8624C29.0271 19.7251 30.5142 19.0006 32.1126 18.8036C33.711 18.6066 35.3295 18.9484 36.7118 19.7749L37.2993 20.1249C37.8315 20.4461 38.4644 20.5575 39.0743 20.4374L41.2493 19.9999" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M41.25 18.7498L42.5 32.4998H40M18.75 18.7498L17.5 32.4998L25.625 40.6248C26.1223 41.122 26.7967 41.4014 27.5 41.4014C28.2033 41.4014 28.8777 41.122 29.375 40.6248C29.8723 40.1275 30.1517 39.453 30.1517 38.7498C30.1517 38.0465 29.8723 37.372 29.375 36.8748M18.75 19.9998H28.75" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
    case "clipboardList":
      return (
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#0A0909" fillOpacity="0.05"/>
<path d="M35 20.0024C37.7187 20.0174 39.1913 20.1387 40.1513 21.0987C41.25 22.1974 41.25 23.9649 41.25 27.4999V34.9999C41.25 38.5362 41.25 40.3037 40.1513 41.4024C39.0538 42.4999 37.285 42.4999 33.75 42.4999H26.25C22.715 42.4999 20.9462 42.4999 19.8487 41.4024C18.75 40.3024 18.75 38.5362 18.75 34.9999V27.4999C18.75 23.9649 18.75 22.1974 19.8487 21.0987C20.8087 20.1387 22.2813 20.0174 25 20.0024" stroke="#0A0909" strokeWidth="2"/>
<path d="M28.125 32.5H36.25M23.75 32.5H24.375M23.75 28.125H24.375M23.75 36.875H24.375M28.125 28.125H36.25M28.125 36.875H36.25" stroke="#0A0909" strokeWidth="2" strokeLinecap="round"/>
<path d="M25 19.375C25 18.8777 25.1975 18.4008 25.5492 18.0492C25.9008 17.6975 26.3777 17.5 26.875 17.5H33.125C33.6223 17.5 34.0992 17.6975 34.4508 18.0492C34.8025 18.4008 35 18.8777 35 19.375V20.625C35 21.1223 34.8025 21.5992 34.4508 21.9508C34.0992 22.3025 33.6223 22.5 33.125 22.5H26.875C26.3777 22.5 25.9008 22.3025 25.5492 21.9508C25.1975 21.5992 25 21.1223 25 20.625V19.375Z" stroke="#0A0909" strokeWidth="2"/>
</svg>
      );
    case "priceTag":
      return (
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#0A0909" fillOpacity="0.05"/>
<path d="M23.125 24.375C23.125 24.7065 23.2567 25.0245 23.4911 25.2589C23.7255 25.4933 24.0435 25.625 24.375 25.625C24.7065 25.625 25.0245 25.4933 25.2589 25.2589C25.4933 25.0245 25.625 24.7065 25.625 24.375C25.625 24.0435 25.4933 23.7255 25.2589 23.4911C25.0245 23.2567 24.7065 23.125 24.375 23.125C24.0435 23.125 23.7255 23.2567 23.4911 23.4911C23.2567 23.7255 23.125 24.0435 23.125 24.375Z" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.75 22.5V28.965C18.7501 29.628 19.0136 30.2638 19.4825 30.7325L29.12 40.37C29.6849 40.9349 30.4511 41.2522 31.25 41.2522C32.0489 41.2522 32.8151 40.9349 33.38 40.37L40.37 33.38C40.9349 32.8151 41.2522 32.0489 41.2522 31.25C41.2522 30.4511 40.9349 29.6849 40.37 29.12L30.7325 19.4825C30.2638 19.0136 29.628 18.7501 28.965 18.75H22.5C21.5054 18.75 20.5516 19.1451 19.8483 19.8483C19.1451 20.5516 18.75 21.5054 18.75 22.5Z" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
    case "shieldCheck":
      return (
      <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="60" height="60" rx="30" fill="#0A0909" fillOpacity="0.05"/>
<path d="M18.75 28.0212C18.75 24.0237 18.75 22.025 19.2225 21.3525C19.6938 20.6812 21.5725 20.0375 25.3313 18.7512L26.0475 18.5063C28.0063 17.835 28.985 17.5 30 17.5C31.015 17.5 31.9937 17.835 33.9525 18.5063L34.6687 18.7512C38.4275 20.0375 40.3062 20.6812 40.7775 21.3525C41.25 22.025 41.25 24.025 41.25 28.0212V29.9888C41.25 37.0363 35.9512 40.4575 32.6262 41.9088C31.725 42.3025 31.275 42.5 30 42.5C28.725 42.5 28.275 42.3025 27.3738 41.9088C24.0488 40.4563 18.75 37.0375 18.75 29.9888V28.0212Z" stroke="#0A0909" strokeWidth="2"/>
<path d="M26.875 30.5L28.6612 32.5L33.125 27.5" stroke="#0A0909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      );
    default:
      return null;
  }
}

export function TravelAgentsDesignedForSection() {
  const { title, items } = travelAgentsDesignedFor;

  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="px-4 sm:px-5 mx-auto max-w-[1390px]">
        <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>
        <ul className="mt-6 sm:mt-8 grid gap-x-6 gap-y-2 sm:gap-y-3 md:gap-y-6 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-8">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 md:gap-4">
              <span className="flex size-10 sm:size-12 shrink-0 md:size-15" aria-hidden>
                <DesignedForIcon kind={item.icon} />
              </span>
              <h4 className="font-heading text-xs sm:text-sm font-semibold leading-snug text-[#0A0909] md:text-lg lg:text-xl">
                {item.label}
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
