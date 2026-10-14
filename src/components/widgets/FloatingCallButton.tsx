"use client";

import { Phone } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

function callHref(value: string) {
  const compact = value.trim().replace(/[^\d+]/g, "");
  if (compact.replace(/\D/g, "").length < 7) return "";
  return `tel:${compact}`;
}

export function FloatingCallButton() {
  const [warning, setWarning] = useState("");
  const href = callHref(siteConfig.businessPhone);

  function call() {
    if (!href) {
      const message =
        process.env.NODE_ENV === "development"
          ? "No call was started. Set NEXT_PUBLIC_BUSINESS_PHONE to the verified business number."
          : "A phone number has not been published yet.";
      setWarning(message);
      if (process.env.NODE_ENV === "development") console.warn(message);
      return;
    }
    window.location.href = href;
  }

  return (
    <div className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5.5rem))] right-[max(1.25rem,env(safe-area-inset-right))] z-40 sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] sm:right-[max(5.5rem,calc(env(safe-area-inset-right)+5.5rem))]">
      {warning ? (
        <p
          role="status"
          className="sanch-pop absolute bottom-[calc(100%+0.75rem)] right-0 w-56 rounded-xl bg-ink px-3 py-2 text-xs leading-5 text-white shadow-lg"
        >
          {warning}
        </p>
      ) : null}
      <div className="group relative">
        <button
          type="button"
          className="inline-flex size-14 items-center justify-center rounded-full bg-gold text-white shadow-lg transition hover:scale-105 hover:bg-gold-deep"
          aria-label="Call SANCH BLACK CAR"
          onClick={call}
        >
          <Phone className="size-6" aria-hidden />
        </button>
        {warning ? null : (
          <span
            role="tooltip"
            className="pointer-events-none invisible absolute bottom-[calc(100%+0.5rem)] right-0 whitespace-nowrap rounded-md bg-ink px-2.5 py-1 text-xs text-white group-hover:visible group-focus-within:visible"
          >
            Call SANCH BLACK CAR
          </span>
        )}
      </div>
    </div>
  );
}
