"use client";

import Link from "next/link";
import { useState } from "react";
import { FormCheckbox } from "@/components/common/FormCheckbox";
import { PillSelect } from "@/components/common/PillSelect";

const countryOptions = [
  "Egypt",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "United Arab Emirates",
  "Saudi Arabia",
  "Canada",
  "Australia",
  "Other",
] as const;

const COUNTRY_SELECT_OPTIONS = [
  { value: "", label: "Enter your country" },
  ...countryOptions.map((c) => ({ value: c, label: c })),
];

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const fieldClass =
  "h-10 sm:h-11 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 text-xs sm:text-sm text-[#0A0909] outline-none transition placeholder:text-[#0A0909]/45 focus:border-[#41736D]";

function Field({
  id,
  name,
  label,
  placeholder,
  type = "text",
  required = true,
}: {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-[#0A0909] md:text-sm">
        {label}
      </label>
      <input id={id} name={name} type={type} required={required} placeholder={placeholder} className={fieldClass} />
    </div>
  );
}

export function TravelAgentRegistrationSection() {
  const [country, setCountry] = useState("");

  return (
    <section className="px-4 sm:px-5 md:scroll-mt-32 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20"
    >
      <div className="mx-auto max-w-[720px]">
        <h2 className="text-center font-bold tracking-tight text-[#0A0909] text-base md:text-xl lg:text-2xl xl:text-4xl">
          Travel Agent Registration
        </h2>

        <div className="mt-6 sm:mt-8 rounded-[20px] border border-[#0A090914] bg-white p-5 sm:p-6 md:mt-10 md:p-8 lg:p-10">
          <form
            className="flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
              <Field id="ta-full-name" name="fullName" label="Full Name" placeholder="Enter your name" />
              <Field id="ta-agency" name="agencyName" label="Agency / Company Name" placeholder="Enter company name" />
              <Field
                id="ta-email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                type="email"
              />
              <Field
                id="ta-mobile"
                name="mobile"
                label="Mobile Number"
                placeholder="Enter contact no."
                type="tel"
              />
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-[#0A0909] md:text-sm">Country</span>
                <PillSelect
                  name="country"
                  value={country}
                  onChange={setCountry}
                  options={COUNTRY_SELECT_OPTIONS}
                  ariaLabel="Country"
                />
              </div>
              <Field
                id="ta-business-id"
                name="businessId"
                label="Business ID / License"
                placeholder="Enter id"
              />
            </div>

            <FormCheckbox name="termsAccepted" required className="text-sm">
              I have read and agree{" "}
              <Link
                href="/terms"
                className="font-medium text-[#41736D] underline underline-offset-2 hover:no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                Terms &amp; Conditions
              </Link>
            </FormCheckbox>

            <button
              type="submit"
              className="flex h-10 sm:h-12 w-full items-center justify-center gap-2 rounded-full bg-[#41736D] font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#365e59]"
            >
              Register a Partner
              <ArrowRight />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
