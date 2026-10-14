"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ArrowRight, Calendar, Clock, MapPin, Plane, Repeat, Users, type LucideIcon } from "lucide-react";
import { exampleAirports } from "@/content/places";
import { fleet } from "@/content/fleet";
import {
  collectQuoteIssues,
  fieldsForMode,
  issuesToMap,
  quoteSchema,
  zodIssuesToMap,
  type QuoteMode,
  type QuoteValues,
} from "@/lib/quote";
import { cn, localDate, localTime } from "@/lib/utils";

function QuoteField({
  name,
  label,
  labelClass,
  errors,
  children,
}: {
  name: string;
  label: string;
  labelClass: string;
  errors: Record<string, string>;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className={labelClass}>{label}</span>
      {children}
      {errors[name] ? <span className="mt-1 block text-xs text-red-400">{errors[name]}</span> : null}
    </label>
  );
}

const fieldClass =
  "h-11 w-full rounded-lg border border-black/10 bg-ivory px-3 text-sm text-charcoal outline-none placeholder:text-muted";
const darkFieldClass =
  "h-12 w-full rounded-md border border-white/10 bg-black/45 pl-9 pr-3 text-sm text-white outline-none placeholder:text-white/45 [color-scheme:dark]";

const barTabIcon: Partial<Record<QuoteMode, LucideIcon>> = {
  "one-way": ArrowRight,
  "round-trip": Repeat,
  hourly: Clock,
};

export function QuoteForm({
  id = "quote",
  appearance,
  title,
  service,
  modes,
  blurb,
}: {
  id?: string;
  appearance: "bar" | "card";
  title?: string;
  service: string;
  modes: { id: QuoteMode; label: string }[];
  blurb?: string;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<QuoteMode>(modes[0]?.id ?? "one-way");
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [dateSet, setDateSet] = useState(false);
  const [timeSet, setTimeSet] = useState(false);
  const [travelDate, setTravelDate] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(localDate());
  }, []);
  const dark = appearance === "bar";

  const form = useForm<QuoteValues>({
    defaultValues: {
      mode: modes[0]?.id ?? "one-way",
      service,
      pickup: "",
      dropoff: "",
      airport: "",
      date: "",
      time: "",
      returnDate: "",
      returnTime: "",
      hours: "",
      passengers: 1,
      luggage: "",
      vehicle: "",
      flightNumber: "",
      eventType: "",
      itinerary: "",
      name: "",
      email: "",
      phone: "",
      notes: "",
      consent: false,
      company: "",
      clientToday: "",
      clientNow: "",
    },
  });

  const fields = fieldsForMode(mode);
  const inputClass = dark ? darkFieldClass : fieldClass;

  function stamp(values: QuoteValues) {
    return { ...values, service, clientToday: localDate(), clientNow: localTime(), passengers: Number(values.passengers) };
  }

  function focusField(name: string) {
    window.requestAnimationFrame(() => {
      const field = document.querySelector(`#${id} [name="${name}"]`);
      if (!(field instanceof HTMLElement)) return;
      field.focus();
      field.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function continueToContact() {
    const issues = collectQuoteIssues(stamp(form.getValues()), "trip");
    const map = issuesToMap(issues);
    setErrors(map);
    setFormError("");
    const first = Object.keys(map)[0];
    if (first) {
      focusField(first);
      return;
    }
    setStep(2);
    focusField("name");
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const values = stamp(form.getValues());
    const parsed = quoteSchema.safeParse(values);
    if (!parsed.success) {
      const map = zodIssuesToMap(parsed.error);
      setErrors(map);
      setFormError("Check the highlighted fields and try again.");
      const first = Object.keys(map)[0];
      if (first) focusField(first);
      return;
    }
    setPending(true);
    setFormError("");
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await response.json()) as { ok?: boolean; message?: string; fieldErrors?: Record<string, string> };
      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {});
        setFormError(data.message || "The enquiry was not sent.");
        setPending(false);
        window.requestAnimationFrame(() => {
          document.querySelector(`#${id} [role="alert"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
        return;
      }
      router.push("/thank-you");
    } catch {
      setFormError("The enquiry could not be sent because the network request failed.");
      setPending(false);
    }
  }

  const labelClass = dark ? "mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-white/55" : "mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted";

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={cn(
        "scroll-mt-28",
        dark
          ? "quote-bar rounded-xl border border-white/10 bg-[#121417] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.35)] md:p-5"
          : "rounded-2xl bg-white p-5 text-charcoal shadow-2xl md:p-6",
      )}
      noValidate
    >
      <p className="absolute -left-[9999px]" aria-hidden>
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" {...form.register("company")} />
        </label>
      </p>
      {title ? <h2 className={cn("font-serif text-2xl", dark ? "text-white" : "text-charcoal")}>{title}</h2> : null}
      {blurb ? <p className={cn("mt-1 text-sm", dark ? "text-white/60" : "text-muted")}>{blurb}</p> : null}

      <div className={cn(dark ? "flex flex-wrap gap-6 border-b border-white/10" : "flex flex-wrap gap-2", title ? "mt-4" : "")} role="tablist" aria-label="Trip type">
        {modes.map((item) => {
          const TabIcon = barTabIcon[item.id];
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={mode === item.id}
              onClick={() => {
                setMode(item.id);
                form.setValue("mode", item.id);
                setStep(1);
                setErrors({});
              }}
              className={cn(
                dark
                  ? "inline-flex items-center gap-2 border-b-2 px-1 pb-3 text-sm"
                  : "rounded-full px-3.5 py-1.5 text-sm",
                mode === item.id
                  ? dark
                    ? "border-gold text-gold"
                    : "bg-gold text-ink"
                  : dark
                    ? "border-transparent text-white/70 hover:text-white"
                    : "bg-ivory text-charcoal",
              )}
            >
              {dark && TabIcon ? <TabIcon className="size-4" aria-hidden /> : null}
              {item.label}
            </button>
          );
        })}
      </div>

      {step === 1 ? (
        <div className={cn("mt-4 grid gap-3", dark ? "md:grid-cols-2 xl:grid-cols-[1.15fr_1.15fr_0.85fr_0.85fr_0.95fr_auto]" : "sm:grid-cols-2")}>
          {fields.airport ? (
            <QuoteField labelClass={labelClass} errors={errors} name="airport" label="Airport">
              <span className="relative block">
                {!dark ? <Plane className="pointer-events-none absolute left-3 top-3 size-4 text-gold-ink" aria-hidden /> : null}
                <select className={cn(inputClass, !dark && "pl-9")} {...form.register("airport")}>
                  <option value="">Select airport</option>
                  {exampleAirports.map((airport) => (
                    <option key={airport.code} value={`${airport.code} — ${airport.name}`}>
                      {airport.code} — {airport.name}
                    </option>
                  ))}
                  <option value="Other / not listed">Other / not listed</option>
                </select>
              </span>
            </QuoteField>
          ) : null}
          {fields.eventType ? (
            <QuoteField labelClass={labelClass} errors={errors} name="eventType" label={mode === "roadshow" ? "Roadshow type" : "Occasion"}>
              <input className={inputClass} placeholder="Describe the occasion" {...form.register("eventType")} />
            </QuoteField>
          ) : null}
          {fields.pickup ? (
            <QuoteField labelClass={labelClass} errors={errors} name="pickup" label={mode === "city-tour" ? "Start location" : mode === "multi-city" ? "From" : "Pickup Location"}>
              <span className="relative block">
                <MapPin className={cn("pointer-events-none absolute left-3 top-3.5 size-4", dark ? "text-gold" : "text-gold-ink")} aria-hidden />
                <input className={cn(inputClass, "pl-9")} placeholder={dark ? "Enter pickup location" : "Enter pickup"} {...form.register("pickup")} />
              </span>
            </QuoteField>
          ) : null}
          {fields.dropoff ? (
            <QuoteField labelClass={labelClass} errors={errors} name="dropoff" label={mode.startsWith("airport") && mode === "airport-pickup" ? "Destination" : mode === "multi-city" ? "To" : "Drop-off Location"}>
              <span className="relative block">
                {dark ? <MapPin className="pointer-events-none absolute left-3 top-3.5 size-4 text-gold" aria-hidden /> : null}
                <input className={cn(inputClass, dark && "pl-9")} placeholder={dark ? "Enter drop-off location" : "Enter drop-off"} {...form.register("dropoff")} />
              </span>
            </QuoteField>
          ) : null}
          <QuoteField labelClass={labelClass} errors={errors} name="date" label="Date">
            <span className="relative block">
              <Calendar className={cn("pointer-events-none absolute left-3 top-3.5 size-4", dark ? "text-gold" : "text-gold-ink")} aria-hidden />
              <input
                type="date"
                min={today || undefined}
                className={cn(inputClass, "pl-9", dark && !dateSet && "text-transparent")}
                onClick={(event) => {
                  if (typeof event.currentTarget.showPicker === "function") {
                    try { event.currentTarget.showPicker(); } catch { /* The picker is already open. */ }
                  }
                }}
                {...form.register("date", {
                  onChange: (event) => {
                    setDateSet(Boolean(event.target.value));
                    setTravelDate(event.target.value);
                  },
                })}
              />
              {dark && !dateSet ? <span className="pointer-events-none absolute left-9 top-3.5 text-sm text-white/45">Select date</span> : null}
            </span>
          </QuoteField>
          {fields.time ? (
            <QuoteField labelClass={labelClass} errors={errors} name="time" label="Time">
              <span className="relative block">
                <Clock className={cn("pointer-events-none absolute left-3 top-3.5 size-4", dark ? "text-gold" : "text-gold-ink")} aria-hidden />
                <input
                  type="time"
                  className={cn(inputClass, "pl-9", dark && !timeSet && "text-transparent")}
                  onClick={(event) => {
                    if (typeof event.currentTarget.showPicker === "function") {
                      try { event.currentTarget.showPicker(); } catch { /* The picker is already open. */ }
                    }
                  }}
                  {...form.register("time", { onChange: (event) => setTimeSet(Boolean(event.target.value)) })}
                />
                {dark && !timeSet ? <span className="pointer-events-none absolute left-9 top-3.5 text-sm text-white/45">Select time</span> : null}
              </span>
            </QuoteField>
          ) : null}
          {fields.returnTrip ? (
            <>
              <QuoteField labelClass={labelClass} errors={errors} name="returnDate" label="Return date">
                <input type="date" min={travelDate || today || undefined} className={inputClass} {...form.register("returnDate")} />
              </QuoteField>
              <QuoteField labelClass={labelClass} errors={errors} name="returnTime" label="Return time">
                <input type="time" className={inputClass} {...form.register("returnTime")} />
              </QuoteField>
            </>
          ) : null}
          {fields.hours ? (
            <QuoteField labelClass={labelClass} errors={errors} name="hours" label="Hours">
              <select className={inputClass} {...form.register("hours")}>
                <option value="">Select duration</option>
                {["2 hours", "3 hours", "4 hours", "6 hours", "8 hours", "10 hours", "12 hours", "Custom"].map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </QuoteField>
          ) : null}
          <QuoteField labelClass={labelClass} errors={errors} name="passengers" label="Passengers">
            <span className="relative block">
              <Users className={cn("pointer-events-none absolute left-3 top-3.5 size-4", dark ? "text-gold" : "text-gold-ink")} aria-hidden />
              <select className={cn(inputClass, "pl-9")} {...form.register("passengers", { valueAsNumber: true })}>
                {Array.from({ length: 14 }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={count}>
                    {dark ? `${count} ${count === 1 ? "Passenger" : "Passengers"}` : count}
                  </option>
                ))}
              </select>
            </span>
          </QuoteField>
          {fields.itinerary ? (
            <label className={cn("block", dark ? "xl:col-span-6" : "sm:col-span-2")}>
              <span className={labelClass}>Itinerary</span>
              <textarea className={cn(inputClass, "h-24 py-2")} placeholder="List the stops, cities, or venues." {...form.register("itinerary")} />
              {errors.itinerary ? <span className="mt-1 block text-xs text-red-400">{errors.itinerary}</span> : null}
            </label>
          ) : null}
          <div className={cn("flex items-end", dark ? "xl:col-span-1" : "sm:col-span-2")}>
            <button type="button" onClick={continueToContact} className={cn("w-full bg-gold text-sm font-medium text-ink hover:bg-gold-deep", dark ? "h-12 rounded-md px-5" : "h-11 rounded-full px-5")}>
              {dark ? <span className="inline-flex items-center justify-center gap-2">Search Ride <ArrowRight className="size-4" aria-hidden /></span> : "Get a Quote"}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <QuoteField labelClass={labelClass} errors={errors} name="name" label="Full name">
            <input className={inputClass} autoComplete="name" {...form.register("name")} />
          </QuoteField>
          <QuoteField labelClass={labelClass} errors={errors} name="email" label="Email">
            <input type="email" className={inputClass} autoComplete="email" {...form.register("email")} />
          </QuoteField>
          <QuoteField labelClass={labelClass} errors={errors} name="phone" label="Phone">
            <input className={inputClass} autoComplete="tel" {...form.register("phone")} />
          </QuoteField>
          <QuoteField labelClass={labelClass} errors={errors} name="vehicle" label="Vehicle category">
            <select className={inputClass} {...form.register("vehicle")}>
              <option value="">No preference yet</option>
              {fleet.map((vehicle) => (
                <option key={vehicle.slug} value={vehicle.name}>{vehicle.name}</option>
              ))}
            </select>
          </QuoteField>
          <QuoteField labelClass={labelClass} errors={errors} name="luggage" label="Luggage">
            <select className={inputClass} {...form.register("luggage")}>
              <option value="">Not specified</option>
              <option value="Carry-on only">Carry-on only</option>
              <option value="1-3 bags">1-3 bags</option>
              <option value="4 or more bags">4 or more bags</option>
            </select>
          </QuoteField>
          {fields.flight ? (
            <QuoteField labelClass={labelClass} errors={errors} name="flightNumber" label="Flight number">
              <input className={inputClass} placeholder="Optional" {...form.register("flightNumber")} />
            </QuoteField>
          ) : null}
          <label className="block sm:col-span-2">
            <span className={labelClass}>Notes</span>
            <textarea className={cn(inputClass, "h-24 py-2")} placeholder="Child seats, meeting names, or timing notes." {...form.register("notes")} />
          </label>
          <label className="flex items-start gap-2 text-sm sm:col-span-2">
            <input type="checkbox" className="mt-1" {...form.register("consent")} />
            <span className={dark ? "text-white/75" : "text-muted"}>
              I agree to be contacted about this quote request. This form does not confirm a reservation or take payment.
            </span>
          </label>
          {errors.consent ? <span className="text-xs text-red-400 sm:col-span-2">{errors.consent}</span> : null}
          <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row">
            <button type="button" className={cn("h-11 rounded-full px-5 text-sm", dark ? "border border-white/20 text-white" : "border border-black/10")} onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" disabled={pending} className="h-11 flex-1 rounded-full bg-gold px-5 text-sm font-medium text-ink hover:bg-gold-deep disabled:opacity-60">
              {pending ? "Sending…" : "Send enquiry"}
            </button>
          </div>
        </div>
      )}
      {formError ? <p className="mt-3 text-sm text-red-400" role="alert">{formError}</p> : null}
      {dark && step === 1 ? null : (
        <p className={cn("mt-3 text-xs", dark ? "text-white/45" : "text-muted")}>
          A successful send delivers the enquiry by email. It is not a confirmed booking.
        </p>
      )}
    </form>
  );
}
