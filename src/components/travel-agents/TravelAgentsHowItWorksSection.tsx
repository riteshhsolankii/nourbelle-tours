import { Fragment } from "react";
import { travelAgentsHowItWorks } from "@/data/travel-agents-page";

type StepIcon = (typeof travelAgentsHowItWorks.steps)[number]["icon"];
type StepVariant = (typeof travelAgentsHowItWorks.steps)[number]["variant"];

function StepCircleIcon({ icon, variant }: { icon: StepIcon; variant: StepVariant }) {
  const isPrimary = variant === "primary";
  const circle = isPrimary ? "bg-[#41736D] text-white" : "bg-[#0A09090D] text-[#0A0909]";

  return (
    <span className={`flex size-12 sm:size-14 items-center justify-center rounded-full md:size-16 ${circle}`} aria-hidden>
      {icon === "cursor" ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13 13L19 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      ) : null}
      {icon === "check" ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 11.0801V12.0001C21.9988 14.1565 21.3005 16.2548 20.0093 17.9819C18.7182 19.7091 16.9033 20.9726 14.8354 21.584C12.7674 22.1954 10.5573 22.122 8.53447 21.3747C6.51168 20.6274 4.78465 19.2462 3.61096 17.4372C2.43727 15.6281 1.87979 13.4882 2.02168 11.3364C2.16356 9.18467 2.99721 7.13643 4.39828 5.49718C5.79935 3.85793 7.69279 2.71549 9.79619 2.24025C11.8996 1.76502 14.1003 1.98245 16.07 2.86011" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M22 4L12 14.01L9 11.01" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      ) : null}
      {icon === "command" ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 3C17.2044 3 16.4413 3.31607 15.8787 3.87868C15.3161 4.44129 15 5.20435 15 6V18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15H6C5.20435 15 4.44129 15.3161 3.87868 15.8787C3.31607 16.4413 3 17.2044 3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21C6.79565 21 7.55871 20.6839 8.12132 20.1213C8.68393 19.5587 9 18.7956 9 18V6C9 5.20435 8.68393 4.44129 8.12132 3.87868C7.55871 3.31607 6.79565 3 6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6C3 6.79565 3.31607 7.55871 3.87868 8.12132C4.44129 8.68393 5.20435 9 6 9H18C18.7956 9 19.5587 8.68393 20.1213 8.12132C20.6839 7.55871 21 6.79565 21 6C21 5.20435 20.6839 4.44129 20.1213 3.87868C19.5587 3.31607 18.7956 3 18 3Z" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      ) : null}
      {icon === "thumbsUp" ? (
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 11L11 2C11.7956 2 12.5587 2.31607 13.1213 2.87868C13.6839 3.44129 14 4.20435 14 5V9H19.66C19.9499 8.99672 20.2371 9.0565 20.5016 9.17522C20.7661 9.29393 21.0016 9.46873 21.1919 9.68751C21.3821 9.90629 21.5225 10.1638 21.6033 10.4423C21.6842 10.7207 21.7035 11.0134 21.66 11.3L20.28 20.3C20.2077 20.7769 19.9654 21.2116 19.5979 21.524C19.2304 21.8364 18.7623 22.0055 18.28 22H7M7 11V22M7 11H4C3.46957 11 2.96086 11.2107 2.58579 11.5858C2.21071 11.9609 2 12.4696 2 13V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H7" stroke="currentcolor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      ) : null}
    </span>
  );
}

function StepConnector({ label }: { label: string }) {
  return (
    <>
      <div className="flex flex-col items-center py-1 lg:hidden" aria-hidden>
        <div className="h-5 w-px border-l-2 border-dashed border-[#41736D]/45" />
        <span className="my-2 shrink-0 rounded-full bg-[#41736D] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          {label}
        </span>
        <div className="h-5 w-px border-l-2 border-dashed border-[#41736D]/45" />
      </div>
      <div className="hidden min-w-0 flex-1 items-center gap-0 lg:flex" aria-hidden>
        <div className="h-0 min-w-[0.5rem] flex-1 border-t-2 border-dashed border-[#41736D]/45" />
        <span className="shrink-0 rounded-full bg-[#41736D] px-2.5 py-1 text-[10px] font-semiold uppercase tracking-wide text-white md:px-3 md:text-[11px]">
          {label}
        </span>
        <div className="h-0 min-w-[0.5rem] flex-1 border-t-2 border-dashed border-[#41736D]/45" />
      </div>
    </>
  );
}

function StepCard({
  label,
  icon,
  variant,
}: {
  label: string;
  icon: StepIcon;
  variant: StepVariant;
}) {
  return (
    <article className="flex min-w-[9.5rem] flex-1 flex-col items-center rounded-2xl border border-[#0000001A] bg-white p-[30px] sm:min-w-[10rem] xl:min-w-[11rem]">
      <StepCircleIcon icon={icon} variant={variant} />
      <p className="mt-1.5 sm:mt-3 text-center font-heading text-sm font-bold text-[#0A0909] xl:text-base">{label}</p>
    </article>
  );
}

export function TravelAgentsHowItWorksSection() {
  const { title, steps } = travelAgentsHowItWorks;

  return (
    <section className="bg-[#FAFAFA] py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
      <div className="px-4 sm:px-5 mx-auto max-w-[1390px]">
        <h2 className="text-center font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          {title}
        </h2>

        <div className="mx-auto mt-6 sm:mt-8 flex max-w-sm flex-col items-stretch md:mt-10 lg:mt-12 lg:max-w-none lg:flex-row lg:items-center lg:justify-center lg:gap-0">
          {steps.map((step, index) => (
            <Fragment key={step.id}>
              <StepCard label={step.label} icon={step.icon} variant={step.variant} />
              {index < steps.length - 1 ? <StepConnector label={`STEP ${index + 1}`} /> : null}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
