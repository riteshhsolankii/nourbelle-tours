"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FormCheckbox } from "@/components/common/FormCheckbox";
import { IconChevronDown } from "@/components/layout/icons";
import { CustomizeTourDatePicker } from "@/components/tour-detail/CustomizeTourDatePicker";

const COUNTRY_OPTIONS = [
  { value: "US", label: "USA" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "EG", label: "Egypt" },
  { value: "OTHER", label: "Other" },
] as const;

const NATIONALITY_OPTIONS = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Egypt",
  "Other",
] as const;

const PHONE_CODE_OPTIONS = ["+1", "+44", "+20", "+61", "+49", "+33"] as const;

const inputClass =
  "h-11 w-full rounded-lg border border-[#E0E0E0] px-3 text-xs sm:text-sm text-[#0A0909] outline-none transition placeholder:text-[#0A0909]/45 focus:border-[#41736D]";
const selectClass =
  "h-11 appearance-none rounded-lg border border-[#E0E0E0] bg-white px-3 pr-9 text-xs sm:text-sm text-[#0A0909] outline-none transition focus:border-[#41736D]";

export type RequestCustomTourFormProps = {
  customizeMinFrom: string;
  /** Optional hidden input (e.g. cruise slug or destination key). */
  contextField?: { name: string; value: string };
  className?: string;
  /** Hide the default form heading (e.g. when wrapped in a sidebar panel title). */
  hideTitle?: boolean;
  /** `blog` matches the tour inquiry layout; `default` is the Nile cruise sidebar form. */
  variant?: "default" | "blog";
};

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AdultsStepper({
  adults,
  setAdults,
}: {
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center justify-between gap-3 pt-0.5">
      <span className="text-xs sm:text-sm font-semibold text-[#0A0909]">How many adults?</span>
      <div className="flex h-11 w-[9.75rem] shrink-0 items-center justify-between rounded-lg border border-[#E0E0E0] bg-white px-1.5">
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F3F4F6] text-lg font-medium leading-none text-[#0A0909] transition hover:bg-[#E8E8E8]"
          aria-label="Decrease adults"
          onClick={() => setAdults((n) => Math.max(1, n - 1))}
        >
          −
        </button>
        <span className="min-w-[1.25rem] text-center text-sm font-semibold text-[#0A0909]">{adults}</span>
        <input type="hidden" name="adults" value={adults} readOnly />
        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#41736D] text-lg font-medium leading-none text-white transition hover:bg-[#365e59]"
          aria-label="Increase adults"
          onClick={() => setAdults((n) => Math.min(20, n + 1))}
        >
          +
        </button>
      </div>
    </div>
  );
}

function BlogTourForm({
  customizeMinFrom,
  contextField,
}: {
  customizeMinFrom: string;
  contextField?: { name: string; value: string };
}) {
  const [nationality, setNationality] = useState("");
  const [phoneCode, setPhoneCode] = useState("+1");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [adults, setAdults] = useState(2);

  const minTo = fromDate || customizeMinFrom;

  useEffect(() => {
    if (fromDate && toDate && toDate < fromDate) {
      setToDate("");
    }
  }, [fromDate, toDate]);

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {contextField ?
        <input type="hidden" name={contextField.name} value={contextField.value} readOnly />
      : null}
      <input required name="name" placeholder="Name" className={inputClass} />
      <input required type="email" name="email" placeholder="E-mail" className={inputClass} />
      <div className="relative">
        <select
          name="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          className={`${selectClass} w-full`}
          aria-label="Nationality"
          required
        >
          <option value="">Select your nationality</option>
          {NATIONALITY_OPTIONS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 size-2.5 -translate-y-1/2 text-[#0A0909]/50" />
      </div>
      <div className="flex gap-2">
        <div className="relative w-[40%] shrink-0">
          <select
            name="phoneCode"
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
            className={`${selectClass} w-full`}
            aria-label="Country code"
          >
            <option value="">Country Code</option>
            {PHONE_CODE_OPTIONS.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 size-2.5 -translate-y-1/2 text-[#0A0909]/50" />
        </div>
        <input name="phone" type="tel" placeholder="Mobile" className={`${inputClass} min-w-0 flex-1`} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <CustomizeTourDatePicker
          name="dateFrom"
          value={fromDate}
          onChange={setFromDate}
          placeholder="From"
          minDate={customizeMinFrom}
        />
        <CustomizeTourDatePicker
          name="dateTo"
          value={toDate}
          onChange={setToDate}
          placeholder="To"
          minDate={minTo}
        />
      </div>
      <AdultsStepper adults={adults} setAdults={setAdults} />
      <textarea
        name="message"
        rows={5}
        placeholder="Please advise your tour requirement"
        className="w-full resize-y rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-xs sm:text-sm text-[#0A0909] outline-none transition placeholder:text-[#0A0909]/45 focus:border-[#41736D]"
      />
      <FormCheckbox name="termsAccepted" required>
        I have read and agree{" "}
        <Link
          href="/terms"
          className="font-medium text-[#0A0909] underline underline-offset-2 hover:text-[#41736D]"
          onClick={(e) => e.stopPropagation()}
        >
          Terms &amp; Conditions
        </Link>
      </FormCheckbox>
      <button
        type="submit"
        className="flex h-9 sm:h-11 w-full items-center justify-center gap-2 rounded-full bg-[#41736D] font-heading text-xs sm:text-sm font-semibold text-white transition hover:bg-[#365e59]"
      >
        Submit
        <ArrowRight />
      </button>
    </form>
  );
}

export function RequestCustomTourForm({
  customizeMinFrom,
  contextField,
  className,
  hideTitle = false,
  variant = "default",
}: RequestCustomTourFormProps) {
  const [country, setCountry] = useState("US");
  const [sailDate, setSailDate] = useState("");
  const [cabin, setCabin] = useState("");
  const [adults, setAdults] = useState(2);

  return (
    <div className={["rounded-[15px] sm:rounded-[20px] border border-[#0A090926] bg-white p-4 md:p-6", className].filter(Boolean).join(" ")}>
      {hideTitle ? null : (
        <h2 className="font-heading text-lg font-bold text-[#0A0909]">Request a Custom Tour</h2>
      )}
      {variant === "blog" ?
        <div className={hideTitle ? undefined : "mt-5"}>
          <BlogTourForm customizeMinFrom={customizeMinFrom} contextField={contextField} />
        </div>
      : <form
          className={hideTitle ? "space-y-3" : "mt-3 sm:mt-5 space-y-3"}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {contextField ?
            <input type="hidden" name={contextField.name} value={contextField.value} readOnly />
          : null}
          <input required name="name" placeholder="Name" className={inputClass} />
          <input required type="email" name="email" placeholder="E-mail" className={inputClass} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="relative min-w-0">
              <span className="sr-only">Country</span>
              <select
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={`${selectClass} w-full`}
                aria-label="Country"
              >
                {COUNTRY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 size-2.5 -translate-y-1/2 text-[#0A0909]/50" />
            </label>
            <input
              name="phone"
              type="tel"
              placeholder="Phone number"
              className={`${inputClass} min-w-0`}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <CustomizeTourDatePicker
              name="sailDate"
              value={sailDate}
              onChange={setSailDate}
              placeholder="Selected date"
              minDate={customizeMinFrom}
            />
            <label className="relative min-w-0">
              <span className="sr-only">Cabin number</span>
              <select
                name="cabin"
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className={`${selectClass} w-full`}
                aria-label="Cabin number"
              >
                <option value="">Cabin number</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={String(i + 1)}>
                    Cabin {i + 1}
                  </option>
                ))}
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 size-2.5 -translate-y-1/2 text-[#0A0909]/50" />
            </label>
          </div>
          <AdultsStepper adults={adults} setAdults={setAdults} />
          <textarea
            name="message"
            rows={4}
            placeholder="Type message"
            className="w-full resize-y rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-xs sm:text-sm outline-none focus:border-[#41736D]"
          />
          <FormCheckbox name="termsAccepted" required>
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-[#41736D] underline underline-offset-2 hover:no-underline"
              onClick={(e) => e.stopPropagation()}
            >
              Terms &amp; Conditions, Payment, and Cancellation Policies
            </Link>
            .
          </FormCheckbox>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full px-3 py-2.5 font-heading text-xs font-semibold ring-1 ring-[#0A090926] transition sm:px-4 sm:py-3 sm:text-sm bg-[#41736D] lg:px-6 lg:py-4 lg:text-sm text-white lg:hover:bg-[#365e59]"
          >
            Speak to a Cruise Expert
            <span className="hidden lg:inline-flex">
              <ArrowRight />
            </span>
          </button>
        </form>
      }
    </div>
  );
}
