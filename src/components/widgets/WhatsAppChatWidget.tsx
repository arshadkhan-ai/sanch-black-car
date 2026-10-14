"use client";

import { X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/layout/logo";
import { siteConfig } from "@/config/site";

const greeting = "Hi there! Welcome to SANCH BLACK CAR. How can we assist with your luxury ride?";
const enquiry = "Hello SANCH BLACK CAR, I would like to enquire about your luxury chauffeur services.";

function whatsappDigits(value: string) {
  return value.replace(/\D/g, "");
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsAppChatWidget() {
  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const number = whatsappDigits(siteConfig.whatsappNumber);
  const configured = number.length >= 8;

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    panel?.querySelector<HTMLElement>("button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusable = [...panel.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])")];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  function close() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  function startChat() {
    if (!configured) {
      const message =
        process.env.NODE_ENV === "development"
          ? "WhatsApp is not connected. Set NEXT_PUBLIC_WHATSAPP_NUMBER to the country code and number. No chat link was opened."
          : "WhatsApp chat is not available yet.";
      setWarning(message);
      if (process.env.NODE_ENV === "development") console.warn(message);
      return;
    }
    const url = `https://wa.me/${number}?text=${encodeURIComponent(enquiry)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      ref={rootRef}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-40"
    >
      {open ? (
        <div
          ref={panelRef}
          id="whatsapp-chat"
          role="dialog"
          aria-labelledby={titleId}
          className="sanch-pop absolute bottom-[calc(100%+0.75rem)] right-0 w-[min(340px,calc(100vw-2.5rem-env(safe-area-inset-left)-env(safe-area-inset-right)))] overflow-hidden rounded-2xl bg-white text-charcoal shadow-[0_18px_50px_rgba(8,10,11,0.28)]"
        >
          <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-white">
            <div id={titleId}>
              <Logo className="h-9 max-w-[200px] lg:h-9 lg:max-w-[200px]" />
            </div>
            <button
              type="button"
              className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-gold"
              aria-label="Close WhatsApp chat"
              onClick={close}
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
          <div className="space-y-4 px-4 py-4">
            <p className="rounded-2xl rounded-tl-md bg-ivory px-4 py-3 text-sm leading-6 text-charcoal">{greeting}</p>
            <p className="text-xs leading-5 text-muted">This opens WhatsApp with a written enquiry. It does not connect you to someone on this page.</p>
            {warning ? (
              <p role="status" className="text-xs leading-5 text-gold-ink">
                {warning}
              </p>
            ) : null}
            <button
              type="button"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-gold px-4 text-sm font-medium text-ink hover:bg-gold-deep"
              onClick={startChat}
            >
              Start WhatsApp Chat
            </button>
          </div>
        </div>
      ) : null}
      <button
        ref={launcherRef}
        type="button"
        className="inline-flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#1ebe5d]"
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        aria-expanded={open}
        aria-controls={open ? "whatsapp-chat" : undefined}
        onClick={() => setOpen((value) => !value)}
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
}
