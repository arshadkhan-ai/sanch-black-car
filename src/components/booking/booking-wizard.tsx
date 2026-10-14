"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase, Check, Plus, Trash2, Users } from "lucide-react";
import { useRef, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { fleet, type FleetVehicle } from "@/content/fleet";
import {
  bookingIssuesToMap,
  bookingServices,
  collectBookingIssues,
  hourlyDurations,
  needsFlight,
  needsHours,
  serviceLabel,
  type BookingFormValues,
  type BookingServiceId,
  type BookingTrip,
} from "@/lib/booking";
import { localDate, localTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Ride details" },
  { id: 2, label: "Vehicle" },
  { id: 3, label: "Contact" },
] as const;

const inputClass =
  "h-11 w-full rounded-lg border border-line bg-white px-3 text-sm text-charcoal outline-none focus:border-gold";

type InitialBooking = {
  serviceType: BookingServiceId;
  trip: BookingTrip;
  vehicle: string;
  instructions: string;
};

type SubmitResult = {
  enquirySent?: boolean;
  reference?: string | null;
  confirmed?: boolean;
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? <span className="mt-1 block text-xs text-red-700">{error}</span> : null}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-2.5 text-sm last:border-0">
      <dt className="text-muted">{label}</dt>
      <dd className="max-w-[14rem] text-right text-ink">{value}</dd>
    </div>
  );
}

export function BookingWizard({ initial }: { initial: InitialBooking }) {
  const [step, setStep] = useState(1);
  const [snapshot, setSnapshot] = useState<BookingFormValues | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const lock = useRef(false);

  const form = useForm<BookingFormValues>({
    defaultValues: {
      serviceType: initial.serviceType,
      trip: initial.trip,
      date: "",
      time: "",
      pickup: "",
      stops: [],
      dropoff: "",
      returnDate: "",
      returnTime: "",
      passengers: 1,
      suitcases: 0,
      hours: "",
      flightNumber: "",
      terminal: "",
      instructions: initial.instructions,
      vehicle: initial.vehicle,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      comments: "",
      meetAndGreet: false,
      airportParking: false,
      privacyAccepted: false,
      smsConsent: false,
      website: "",
      clientToday: "",
      clientNow: "",
    },
  });
  const values = snapshot ?? form.getValues();
  const errors = form.formState.errors;

  function bindDate(name: "date" | "returnDate", min?: string) {
    const field = form.register(name);
    return {
      ...field,
      min: min || undefined,
      ref: (node: HTMLInputElement | null) => {
        field.ref(node);
        if (node) node.min = min || localDate();
      },
    };
  }

  function sync() {
    setSnapshot({ ...form.getValues() });
  }

  function stamp() {
    const clientToday = localDate();
    const clientNow = localTime();
    form.setValue("clientToday", clientToday);
    form.setValue("clientNow", clientNow);
    return { clientToday, clientNow };
  }

  function showIssues(issues: { path: string; message: string }[]) {
    form.clearErrors();
    const map = bookingIssuesToMap(issues);
    for (const [path, message] of Object.entries(map)) {
      form.setError(path as FieldPath<BookingFormValues>, { message });
    }
    const first = issues[0]?.path;
    if (!first) return;
    const field = document.querySelector<HTMLElement>(`[name="${first}"], #vehicle-picker`);
    field?.scrollIntoView({ behavior: "smooth", block: "center" });
    field?.focus();
  }

  function continueTo(next: number) {
    const phase = step === 1 ? "ride" : "vehicle";
    const stamped = stamp();
    const issues = collectBookingIssues({ ...form.getValues(), ...stamped }, phase);
    if (issues.length) {
      showIssues(issues);
      return;
    }
    setFormError("");
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitRequest() {
    if (lock.current) return;
    const stamped = stamp();
    const current = { ...form.getValues(), ...stamped, stops: form.getValues("stops").map((stop) => stop.trim()).filter(Boolean) };
    form.setValue("stops", current.stops);
    const issues = collectBookingIssues(current, "full");
    if (issues.length) {
      showIssues(issues);
      const ride = collectBookingIssues(current, "ride");
      const vehicle = collectBookingIssues(current, "vehicle");
      setStep(ride.length ? 1 : vehicle.length ? 2 : 3);
      return;
    }

    lock.current = true;
    setSubmitting(true);
    setFormError("");
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(current),
      });
      const body = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; fieldErrors?: Record<string, string>; reference?: string | null; enquirySent?: boolean; confirmed?: boolean }
        | null;
      if (!response.ok || !body?.ok) {
        if (body?.fieldErrors) {
          showIssues(Object.entries(body.fieldErrors).map(([path, message]) => ({ path, message })));
        }
        setFormError(body?.message || "The request was not sent.");
        return;
      }
      setResult({
        enquirySent: body.enquirySent,
        reference: body.reference,
        confirmed: body.confirmed === true,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFormError("The request could not be sent. Check your connection and try again.");
    } finally {
      lock.current = false;
      setSubmitting(false);
    }
  }

  const selected = fleet.find((vehicle) => vehicle.slug === values.vehicle);
  const stopList = (values.stops ?? []).map((stop) => stop?.trim()).filter(Boolean);
  const options = [
    values.meetAndGreet ? "Meet & Greet" : "",
    values.airportParking ? "Airport parking" : "",
    values.smsConsent ? "SMS updates requested" : "",
  ].filter(Boolean);

  if (result) {
    return (
      <section className="rounded-3xl border border-line bg-white p-8 shadow-sm" aria-live="polite">
        <p className="text-[11px] uppercase tracking-[0.28em] text-gold-ink">Request status</p>
        <h2 className="mt-3 font-serif text-4xl text-ink">Your request was delivered</h2>
        {result.reference ? (
          <p className="mt-4 leading-7 text-charcoal">
            The reservation system returned reference <strong>{result.reference}</strong>. This page does not mark the ride confirmed.
            {result.confirmed ? " The reservation system marked it confirmed." : " Treat it as confirmed only after SANCH BLACK CAR or that system says so."}
          </p>
        ) : (
          <p className="mt-4 leading-7 text-charcoal">
            The details were emailed to the business inbox. No booking was created, and no reference number was issued. Nothing is reserved until SANCH BLACK CAR replies and you accept.
          </p>
        )}
        <p className="mt-3 text-sm text-muted">A reply will use {values.email || "the email address you entered"}.</p>
      </section>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <form
        className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-8"
        onChange={sync}
        onSubmit={(event) => {
          event.preventDefault();
          if (step < 3) continueTo(step + 1);
          else void submitRequest();
        }}
        noValidate
      >
        <ol className="grid grid-cols-3 gap-2" aria-label="Booking steps">
          {steps.map((item) => {
            const active = step === item.id;
            const done = step > item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full flex-col items-center gap-2 text-center sm:flex-row sm:text-left"
                  aria-current={active ? "step" : undefined}
                  onClick={() => {
                    if (item.id < step) setStep(item.id);
                  }}
                  disabled={item.id > step}
                >
                  <span
                    className={cn(
                      "inline-flex size-8 items-center justify-center rounded-full text-sm",
                      active || done ? "bg-gold text-ink" : "bg-ivory text-muted",
                    )}
                  >
                    {done ? <Check className="size-4" aria-hidden /> : item.id}
                  </span>
                  <span className={cn("text-xs sm:text-sm", active ? "font-medium text-ink" : "text-muted")}>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {step === 1 ? (
          <div className="mt-8 grid gap-5">
            <h2 className="font-serif text-3xl text-ink">Enter ride details</h2>
            <Field label="Service type" error={errors.serviceType?.message}>
              <select className={inputClass} {...form.register("serviceType")}>
                {bookingServices.map((service) => (
                  <option key={service.id} value={service.id}>{service.label}</option>
                ))}
              </select>
            </Field>
            <fieldset>
              <legend className="text-sm font-medium text-ink">Transfer type</legend>
              <div className="mt-2 flex gap-2">
                {(["one-way", "round-trip"] as const).map((trip) => (
                  <button
                    key={trip}
                    type="button"
                    className={cn(
                      "h-10 rounded-full px-4 text-sm",
                      values.trip === trip ? "bg-ink text-white" : "border border-line text-charcoal",
                    )}
                    aria-pressed={values.trip === trip}
                    onClick={() => {
                      form.setValue("trip", trip, { shouldDirty: true });
                      sync();
                    }}
                  >
                    {trip === "one-way" ? "One Way" : "Round Trip"}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Pickup date" error={errors.date?.message}>
                <input type="date" className={inputClass} {...bindDate("date")} />
              </Field>
              <Field label="Pickup time" error={errors.time?.message}>
                <input type="time" className={inputClass} {...form.register("time")} />
              </Field>
            </div>
            <Field label="Pickup location" error={errors.pickup?.message}>
              <input className={inputClass} placeholder="Enter pickup" {...form.register("pickup")} />
            </Field>
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink">Additional stops</p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm text-gold-ink"
                  onClick={() => {
                    form.setValue("stops", [...form.getValues("stops"), ""], { shouldDirty: true });
                    sync();
                  }}
                  disabled={(values.stops?.length ?? 0) >= 8}
                >
                  <Plus className="size-4" aria-hidden /> Add stop
                </button>
              </div>
              <ul className="mt-2 space-y-2">
                {(values.stops ?? []).map((_, index) => (
                  <li key={index} className="flex gap-2">
                    <input
                      className={inputClass}
                      placeholder={`Stop ${index + 1}`}
                      aria-label={`Stop ${index + 1}`}
                      {...form.register(`stops.${index}`)}
                    />
                    <button
                      type="button"
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg border border-line"
                      aria-label={`Remove stop ${index + 1}`}
                      onClick={() => {
                        form.setValue("stops", form.getValues("stops").filter((__, stopIndex) => stopIndex !== index), { shouldDirty: true });
                        sync();
                      }}
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
              {typeof errors.stops?.message === "string" ? <p className="mt-1 text-xs text-red-700">{errors.stops.message}</p> : null}
            </div>
            <Field label={needsHours(values.serviceType) ? "Drop-off location (optional)" : "Drop-off location"} error={errors.dropoff?.message}>
              <input className={inputClass} placeholder="Enter drop-off" {...form.register("dropoff")} />
            </Field>
            {values.trip === "round-trip" ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Return date" error={errors.returnDate?.message}>
                  <input type="date" className={inputClass} {...bindDate("returnDate", values.date)} />
                </Field>
                <Field label="Return time" error={errors.returnTime?.message}>
                  <input type="time" className={inputClass} {...form.register("returnTime")} />
                </Field>
              </div>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Passengers" error={errors.passengers?.message}>
                <input type="number" min={1} max={14} className={inputClass} {...form.register("passengers", { valueAsNumber: true })} />
              </Field>
              <Field label="Suitcases" error={errors.suitcases?.message}>
                <input type="number" min={0} max={20} className={inputClass} {...form.register("suitcases", { valueAsNumber: true })} />
              </Field>
            </div>
            {needsHours(values.serviceType) ? (
              <Field label="Hourly duration" error={errors.hours?.message}>
                <select className={inputClass} {...form.register("hours")}>
                  <option value="">Select duration</option>
                  {hourlyDurations.map((hours) => (
                    <option key={hours} value={hours}>{hours} hours</option>
                  ))}
                </select>
              </Field>
            ) : null}
            {needsFlight(values.serviceType) ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Flight number" error={errors.flightNumber?.message}>
                  <input className={inputClass} placeholder="BA178" {...form.register("flightNumber")} />
                </Field>
                <Field label="Airport terminal" error={errors.terminal?.message}>
                  <input className={inputClass} placeholder="Terminal 4" {...form.register("terminal")} />
                </Field>
              </div>
            ) : null}
            <Field label="Special instructions" error={errors.instructions?.message}>
              <textarea rows={4} className={`${inputClass} h-auto py-3`} {...form.register("instructions")} />
            </Field>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="mt-8" id="vehicle-picker" tabIndex={-1}>
            <h2 className="font-serif text-3xl text-ink">Choose a vehicle</h2>
            <p className="mt-2 text-sm leading-6 text-muted">These are the categories configured on this site. Photographs are illustrative. Fares are not published, so each card is a quote request.</p>
            {errors.vehicle?.message ? <p className="mt-3 text-sm text-red-700">{errors.vehicle.message}</p> : null}
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {fleet.map((vehicle) => (
                <VehicleChoice
                  key={vehicle.slug}
                  vehicle={vehicle}
                  selected={values.vehicle === vehicle.slug}
                  onSelect={() => {
                    form.setValue("vehicle", vehicle.slug, { shouldDirty: true });
                    sync();
                  }}
                />
              ))}
            </ul>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="mt-8 grid gap-5">
            <h2 className="font-serif text-3xl text-ink">Contact details</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" error={errors.firstName?.message}>
                <input className={inputClass} autoComplete="given-name" {...form.register("firstName")} />
              </Field>
              <Field label="Last name" error={errors.lastName?.message}>
                <input className={inputClass} autoComplete="family-name" {...form.register("lastName")} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email" error={errors.email?.message}>
                <input type="email" className={inputClass} autoComplete="email" {...form.register("email")} />
              </Field>
              <Field label="Phone number" error={errors.phone?.message}>
                <input className={inputClass} autoComplete="tel" {...form.register("phone")} />
              </Field>
            </div>
            <Field label="Company name (optional)" error={errors.companyName?.message}>
              <input className={inputClass} autoComplete="organization" {...form.register("companyName")} />
            </Field>
            <Field label="Additional comments" error={errors.comments?.message}>
              <textarea rows={4} className={`${inputClass} h-auto py-3`} {...form.register("comments")} />
            </Field>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" {...form.register("meetAndGreet")} />
              <span>Meet &amp; Greet (optional)</span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" {...form.register("airportParking")} />
              <span>Airport parking (optional)</span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" {...form.register("privacyAccepted")} />
              <span>
                I have read the <Link href="/privacy-policy" className="text-gold-ink underline">Privacy Policy</Link> and agree that SANCH BLACK CAR may use these details to reply to this request.
                {errors.privacyAccepted?.message ? <span className="mt-1 block text-xs text-red-700">{errors.privacyAccepted.message}</span> : null}
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-1" {...form.register("smsConsent")} />
              <span>Send me optional SMS updates about this request. Leave this unchecked if you do not want texts.</span>
            </label>
            <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
              Website
              <input tabIndex={-1} autoComplete="off" {...form.register("website")} />
            </label>
          </div>
        ) : null}

        {formError ? <p role="alert" className="mt-6 text-sm text-red-700">{formError}</p> : null}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          {step > 1 ? (
            <button type="button" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm" onClick={() => setStep((value) => value - 1)}>
              Back
            </button>
          ) : <span />}
          <button type="submit" className="inline-flex h-11 items-center rounded-full bg-gold px-6 text-sm font-medium text-ink hover:bg-gold-deep disabled:opacity-60" disabled={submitting}>
            {step < 3 ? "Continue" : submitting ? "Sending request..." : "Send booking request"}
          </button>
        </div>
      </form>

      <aside className="h-fit rounded-3xl border border-line bg-white p-5 shadow-sm lg:sticky lg:top-32" aria-live="polite">
        <h2 className="font-serif text-2xl text-ink">Booking summary</h2>
        <dl className="mt-3">
          <SummaryRow label="Service" value={serviceLabel(values.serviceType)} />
          <SummaryRow label="Trip" value={values.trip === "round-trip" ? "Round trip" : "One way"} />
          <SummaryRow label="Pickup" value={[values.date, values.time].filter(Boolean).join(" ") || "—"} />
          <SummaryRow label="Pickup address" value={values.pickup || "—"} />
          <SummaryRow label="Stops" value={stopList.length ? stopList.join(", ") : "None"} />
          <SummaryRow label="Drop-off" value={values.dropoff || "—"} />
          {values.trip === "round-trip" ? <SummaryRow label="Return" value={[values.returnDate, values.returnTime].filter(Boolean).join(" ") || "—"} /> : null}
          {needsHours(values.serviceType) ? <SummaryRow label="Duration" value={values.hours ? `${values.hours} hours` : "—"} /> : null}
          {needsFlight(values.serviceType) ? <SummaryRow label="Flight" value={[values.flightNumber, values.terminal].filter(Boolean).join(" · ") || "—"} /> : null}
          <SummaryRow label="Vehicle" value={selected?.name || "Not selected"} />
          <SummaryRow label="Passengers" value={Number.isFinite(values.passengers) ? String(values.passengers) : "—"} />
          <SummaryRow label="Luggage" value={Number.isFinite(values.suitcases) ? String(values.suitcases) : "—"} />
          <SummaryRow label="Options" value={options.length ? options.join(", ") : "None"} />
          <SummaryRow label="Price" value="Request Quote" />
        </dl>
        <p className="mt-3 text-xs leading-5 text-muted">No fare is calculated on this page. A total is shown only when a pricing system is connected.</p>
      </aside>
    </div>
  );
}

function VehicleChoice({
  vehicle,
  selected,
  onSelect,
}: {
  vehicle: FleetVehicle;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <li className={cn("overflow-hidden rounded-2xl border bg-white", selected ? "border-gold ring-2 ring-gold" : "border-line")}>
      <div className="relative aspect-[16/10]">
        <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
      </div>
      <div className="p-4">
        <h3 className="font-serif text-2xl text-ink">{vehicle.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{vehicle.categories.join(" · ")}</p>
        <p className="mt-3 flex flex-wrap gap-4 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5"><Users className="size-4 text-gold" aria-hidden />{vehicle.passengers}</span>
          <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4 text-gold" aria-hidden />{vehicle.bags}</span>
        </p>
        <p className="mt-3 text-sm font-medium text-ink">Request Quote</p>
        <button
          type="button"
          className={cn(
            "mt-4 inline-flex h-10 items-center rounded-full px-4 text-sm",
            selected ? "bg-ink text-white" : "bg-gold text-ink hover:bg-gold-deep",
          )}
          aria-pressed={selected}
          onClick={onSelect}
        >
          {selected ? "Selected" : "Select Vehicle"}
        </button>
      </div>
    </li>
  );
}
