"use client";

import Link from "next/link";
import { FormCheckbox } from "@/components/common/FormCheckbox";

function ArrowRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2.5 7.09961H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 3.59961L9.5 7.09961L6 10.5996" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ContactSendMessageForm() {
  return (
    <div
      id="send-message"
      className="rounded-2xl border border-[#0A090926] bg-white p-5 shadow-sm sm:p-6 md:p-8"
    >
      <h3 className="font-heading text-lg font-bold text-[#0A0909] md:text-xl">Send Us a Message</h3>
      <form
        className="mt-5 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          required
          name="name"
          placeholder="Name"
          className="h-10 sm:h-11 w-full rounded-lg border border-[#E0E0E0] px-3 text-xs sm:text-sm outline-none transition focus:border-[#41736D]"
        />
        <input
          required
          name="phone"
          type="tel"
          placeholder="Phone number"
          className="h-10 sm:h-11 w-full rounded-lg border border-[#E0E0E0] px-3 text-xs sm:text-sm outline-none transition focus:border-[#41736D]"
        />
        <input
          required
          type="email"
          name="email"
          placeholder="E-mail"
          className="h-10 sm:h-11 w-full rounded-lg border border-[#E0E0E0] px-3 text-xs sm:text-sm outline-none transition focus:border-[#41736D]"
        />
        <textarea
          name="message"
          rows={4}
          placeholder="Type message"
          className="w-full resize-y rounded-lg border border-[#E0E0E0] px-3 py-2.5 text-xs sm:text-sm outline-none transition focus:border-[#41736D]"
        />
        <FormCheckbox name="termsAccepted" required>
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
          Enquire Now
          <ArrowRight />
        </button>
      </form>
    </div>
  );
}
