import Image from "next/image";
import Link from "next/link";

type ContactCtaButton = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type Props = {
  title: string;
  description: string;
  backgroundImageSrc: string;
  backgroundImageAlt: string;
  buttons: readonly ContactCtaButton[];
};

export function ContactCtaSection({
  title,
  description,
  backgroundImageSrc,
  backgroundImageAlt,
  buttons,
}: Props) {
  return (
    <section className="w-full pt-8 lg:pt-0 pb-8 sm:pb-10 md:pb-12 lg:pb-16 xl:pb-20">
      <div className="mx-auto max-w-[1390px] px-4 sm:px-5">
        <div className="relative overflow-hidden rounded-[10px] sm:rounded-[20px] bg-[linear-gradient(90deg,#ECF0F3_0%,rgba(214,224,230)_100%)]">
          <Image
            src={backgroundImageSrc}
            alt={backgroundImageAlt}
            fill
            className="object-contain object-right opacity-65"
            sizes="(max-width: 1400px) 100vw, 1370px"
          />
          <div className="relative z-10 flex md:min-h-[175px] items-center px-5 sm:px-10 md:px-12 py-5 sm:py-8 md:py-14 lg:px-16">
            <div className="max-w-[520px]">
              <h2 className="font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
                {title}
              </h2>
              <p className="mt-1 md:mt-2 text-[11px] sm:text-xs md:text-base leading-relaxed text-[#0A0909]">
                {description}
              </p>

              <div className="mt-3 md:mt-6 flex flex-wrap gap-1.5 md:gap-3">
                {buttons.map((button) => {
                  const primary = button.variant !== "secondary";
                  return (
                    <Link
                      key={`${button.href}-${button.label}`}
                      href={button.href}
                      className={[
                        "inline-flex items-center font-heading rounded-full px-3 md:px-6 py-2 md:py-4 text-[10px] sm:text-xs md:text-sm font-semibold transition shadow-sm",
                        primary ?
                          "bg-white text-[#0A0909] hover:bg-white/90"
                        : "bg-[#0A0909] text-white hover:bg-black",
                      ].join(" ")}
                    >
                      {button.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
