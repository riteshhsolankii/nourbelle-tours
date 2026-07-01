import Link from "next/link";

export type TourPromoTwinCard = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
  icon: "uTurn" | "plane";
};

type Props = {
  cards: readonly [TourPromoTwinCard, TourPromoTwinCard] | readonly TourPromoTwinCard[];
};

function IconCircle({ icon }: { icon: TourPromoTwinCard["icon"] }) {
  return (
    <div
      className="flex size-12 shrink-0 items-center justify-center md:size-15"
      aria-hidden
    >
      {icon === "uTurn" ? (
       <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z" fill="#41736D"/>
<path d="M26.25 34.5L20 28.25L26.25 22" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M40 42V33.25C40 31.9239 39.4732 30.6521 38.5355 29.7145C37.5979 28.7768 36.3261 28.25 35 28.25H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M34.1246 9.93143C36.4255 9.41343 38.1922 8.54648 39.3481 7.86491C39.3481 7.86491 34.5935 4.75694 29.8279 4.96414C25.0679 5.17134 20.8203 7.86491 20.8203 7.86491C21.2674 8.14299 21.9054 8.50831 22.7069 8.86272C23.2249 9.09718 25.4986 10.0841 28.7156 10.3186C31.3383 10.5094 33.3667 10.1059 34.1246 9.93143ZM30.0842 9.50613C25.7767 9.36436 23.7156 7.79947 23.7156 7.79947C23.7156 7.79947 26.6327 5.9456 29.9097 5.80929C33.1813 5.66752 36.4474 7.79947 36.4474 7.79947C36.4474 7.79947 34.3917 9.65335 30.0788 9.50613H30.0842Z" fill="white"/>
<path d="M28.7324 7.65766C28.7324 6.91065 29.3377 6.30542 30.0847 6.30542C30.8317 6.30542 31.4369 6.91065 31.4369 7.65766C31.4369 8.40466 30.8317 9.00989 30.0847 9.00989C29.3377 9.00989 28.7324 8.40466 28.7324 7.65766Z" fill="white"/>
<path d="M13.8756 50.3895C9.95518 46.938 6.71635 42.5324 5.18964 37.4942C3.66837 32.4887 4.06095 27.2107 6.10567 22.4124C7.82868 18.3721 10.604 14.8933 13.881 11.998C14.4753 11.4746 13.6029 10.6076 13.0141 11.1311C7.8832 15.6676 4.03914 21.6981 3.17764 28.5738C2.41973 34.6207 4.3772 40.673 7.8723 45.5804C9.35539 47.6632 11.0839 49.5716 13.0032 51.2565C13.592 51.7745 14.4644 50.913 13.8701 50.3895H13.8756Z" fill="white"/>
<path d="M46.1202 12.0032C50.0406 15.4547 53.2794 19.8603 54.8061 24.8985C56.3274 29.904 55.9348 35.182 53.8901 39.9803C52.1671 44.0206 49.3917 47.4994 46.1147 50.3947C45.5204 50.9181 46.3928 51.7851 46.9817 51.2617C52.1071 46.7251 55.9457 40.6946 56.8072 33.8244C57.5651 27.7775 55.6076 21.7251 52.1126 16.8178C50.6295 14.7349 48.901 12.8265 46.9817 11.1417C46.3928 10.6237 45.5204 11.4852 46.1147 12.0087L46.1202 12.0032Z" fill="white"/>
</svg>
      ) : (
     <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60Z" fill="#41736D"/>
<path d="M37.25 39L35 28.75L39.375 24.375C41.25 22.5 41.875 20 41.25 18.75C40 18.125 37.5 18.75 35.625 20.625L31.25 25L21 22.75C20.375 22.625 19.875 22.875 19.625 23.375L19.25 24C19 24.625 19.125 25.25 19.625 25.625L26.25 30L23.75 33.75H20L18.75 35L22.5 37.5L25 41.25L26.25 40V36.25L30 33.75L34.375 40.375C34.75 40.875 35.375 41 36 40.75L36.625 40.5C37.125 40.125 37.375 39.625 37.25 39Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M34.1246 9.93143C36.4255 9.41343 38.1922 8.54648 39.3481 7.86491C39.3481 7.86491 34.5935 4.75694 29.8279 4.96414C25.0679 5.17134 20.8203 7.86491 20.8203 7.86491C21.2674 8.14299 21.9054 8.50831 22.7069 8.86272C23.2249 9.09718 25.4986 10.0841 28.7156 10.3186C31.3383 10.5094 33.3667 10.1059 34.1246 9.93143ZM30.0842 9.50613C25.7767 9.36436 23.7156 7.79947 23.7156 7.79947C23.7156 7.79947 26.6327 5.9456 29.9097 5.80929C33.1813 5.66752 36.4474 7.79947 36.4474 7.79947C36.4474 7.79947 34.3917 9.65335 30.0788 9.50613H30.0842Z" fill="white"/>
<path d="M28.7324 7.65766C28.7324 6.91065 29.3377 6.30542 30.0847 6.30542C30.8317 6.30542 31.4369 6.91065 31.4369 7.65766C31.4369 8.40466 30.8317 9.00989 30.0847 9.00989C29.3377 9.00989 28.7324 8.40466 28.7324 7.65766Z" fill="white"/>
<path d="M13.8756 50.3895C9.95518 46.938 6.71635 42.5324 5.18964 37.4942C3.66837 32.4887 4.06095 27.2107 6.10567 22.4124C7.82868 18.3721 10.604 14.8933 13.881 11.998C14.4753 11.4746 13.6029 10.6076 13.0141 11.1311C7.8832 15.6676 4.03914 21.6981 3.17764 28.5738C2.41973 34.6207 4.3772 40.673 7.8723 45.5804C9.35539 47.6632 11.0839 49.5716 13.0032 51.2565C13.592 51.7745 14.4644 50.913 13.8701 50.3895H13.8756Z" fill="white"/>
<path d="M46.1202 12.0032C50.0406 15.4547 53.2794 19.8603 54.8061 24.8985C56.3274 29.904 55.9348 35.182 53.8901 39.9803C52.1671 44.0206 49.3917 47.4994 46.1147 50.3947C45.5204 50.9181 46.3928 51.7851 46.9817 51.2617C52.1071 46.7251 55.9457 40.6946 56.8072 33.8244C57.5651 27.7775 55.6076 21.7251 52.1126 16.8178C50.6295 14.7349 48.901 12.8265 46.9817 11.1417C46.3928 10.6237 45.5204 11.4852 46.1147 12.0087L46.1202 12.0032Z" fill="white"/>
</svg>
      )}
    </div>
  );
}

function ButtonArrow() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TourPromoTwinCardsSection({ cards }: Props) {
  const list = cards.slice(0, 2);
  return (
    <section className="mx-auto w-full max-w-[1390px] px-4 sm:px-5 py-8 sm:py-10 md:py-14 lg:py-20">
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
        {list.map((card) => (
          <li
            key={card.title}
            className="rounded-[10px] sm:rounded-[15px] border border-[#0A090926] bg-white p-4 md:rounded-[20px] md:p-6 lg:p-[30px] transition hover:bg-[#E9EFEE] hover:border-[#E9EFEE]"
          >
            <div className="flex gap-3.5 md:gap-5">
              <IconCircle icon={card.icon} />
              <div className="flex min-w-0 flex-1 flex-col gap-2 md:gap-3">
                <h3 className="font-heading text-sm sm:text-base font-bold leading-snug text-[#0A0909] md:text-lg lg:text-xl">
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#0A0909] md:text-sm">{card.description}</p>
                <Link
                  href={card.href}
                  className="mt-0 md:mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#41736D] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#365e59] md:px-5 md:text-sm"
                >
                  {card.buttonLabel}
                  <ButtonArrow />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
