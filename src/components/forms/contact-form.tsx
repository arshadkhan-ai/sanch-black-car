"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services } from "@/content/services";
import { contactSchema } from "@/lib/quote";

const inputClass = "h-11 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none";

export function ContactForm({ defaultService = "General enquiry" }: { defaultService?: string }) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      company: String(formData.get("company") ?? ""),
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setFormError("Check the highlighted fields.");
      const first = Object.keys(next)[0];
      if (first) {
        window.requestAnimationFrame(() => {
          const field = document.querySelector(`#contact-form [name="${first}"]`);
          if (field instanceof HTMLElement) {
            field.focus();
            field.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });
      }
      return;
    }
    setPending(true);
    setFormError("");
    setErrors({});
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string; fieldErrors?: Record<string, string> };
      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {});
        setFormError(data.message || "The message was not sent.");
        setPending(false);
        return;
      }
      router.push("/thank-you");
    } catch {
      setFormError("The message could not be sent because the network request failed.");
      setPending(false);
    }
  }

  return (
    <form id="contact-form" onSubmit={onSubmit} className="scroll-mt-28 space-y-4" noValidate>
      <p className="absolute -left-[9999px]" aria-hidden>
        <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          Full name
          <input name="name" className={`${inputClass} mt-1`} autoComplete="name" />
          {errors.name ? <span className="mt-1 block text-xs text-red-600">{errors.name}</span> : null}
        </label>
        <label className="block text-sm">
          Email
          <input name="email" type="email" className={`${inputClass} mt-1`} autoComplete="email" />
          {errors.email ? <span className="mt-1 block text-xs text-red-600">{errors.email}</span> : null}
        </label>
        <label className="block text-sm">
          Phone
          <input name="phone" className={`${inputClass} mt-1`} autoComplete="tel" />
          {errors.phone ? <span className="mt-1 block text-xs text-red-600">{errors.phone}</span> : null}
        </label>
        <label className="block text-sm">
          Service
          <select name="service" defaultValue={defaultService} className={`${inputClass} mt-1`}>
            <option>General enquiry</option>
            {services.map((service) => (
              <option key={service.slug}>{service.title}</option>
            ))}
            <option>Newsletter</option>
          </select>
        </label>
      </div>
      <label className="block text-sm">
        Message
        <textarea name="message" className="mt-1 h-36 w-full rounded-lg border border-black/10 px-3 py-2 text-sm" />
        {errors.message ? <span className="mt-1 block text-xs text-red-600">{errors.message}</span> : null}
      </label>
      <label className="flex items-start gap-2 text-sm text-muted">
        <input name="consent" type="checkbox" className="mt-1" />
        I agree to be contacted about this message. Sending it does not reserve a vehicle.
      </label>
      {errors.consent ? <span className="block text-xs text-red-600">{errors.consent}</span> : null}
      {formError ? <p className="text-sm text-red-600" role="alert">{formError}</p> : null}
      <button type="submit" disabled={pending} className="h-11 rounded-full bg-gold px-6 text-sm font-medium text-ink hover:bg-gold-deep disabled:opacity-60">
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
