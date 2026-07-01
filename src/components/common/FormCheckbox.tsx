import { useId } from "react";

type Props = {
  children: React.ReactNode;
  /** When set, forwarded to the native input (for forms). */
  name?: string;
  required?: boolean;
  /** Extra classes on the outer `<label>` (e.g. `text-sm`). */
  className?: string;
};

/**
 * Themed checkbox: custom box + checkmark, brand green when checked (`#41736D`).
 * Use for all marketing / enquiry forms so checkboxes stay consistent.
 */
export function FormCheckbox({ children, name, required, className }: Props) {
  const autoId = useId();
  const inputId = name ? `${name}-${autoId}` : `checkbox-${autoId}`;

  return (
    <label
      htmlFor={inputId}
      className={[
        "flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#0A0909]/85",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input id={inputId} name={name} type="checkbox" required={required} className="peer sr-only" />
      <span
        className={[
          "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-[#E0E0E0] bg-white transition",
          "peer-checked:border-[#41736D] peer-checked:bg-[#41736D]",
          "peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-[#41736D]/35",
          "[&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100",
        ].join(" ")}
        aria-hidden
      >
        <svg className="h-2.5 w-2.5 text-white transition" viewBox="0 0 12 10" fill="none" aria-hidden>
          <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0">{children}</span>
    </label>
  );
}
