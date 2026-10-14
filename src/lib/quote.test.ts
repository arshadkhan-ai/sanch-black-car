import assert from "node:assert/strict";
import test from "node:test";
import { collectQuoteIssues, quoteSchema } from "./quote.ts";

const base = {
  mode: "one-way" as const,
  service: "Airport transfer",
  pickup: "Hotel",
  dropoff: "Terminal",
  airport: "",
  date: "2026-12-01",
  time: "10:00",
  returnDate: "",
  returnTime: "",
  hours: "",
  passengers: 2,
  luggage: "",
  vehicle: "",
  flightNumber: "",
  eventType: "",
  itinerary: "",
  name: "Amina Cole",
  email: "amina@example.com",
  phone: "+1 555 010 0199",
  notes: "",
  consent: true,
  company: "",
  clientToday: "2026-10-14",
  clientNow: "09:00",
};

test("accepts a complete one-way enquiry", () => {
  const parsed = quoteSchema.safeParse(base);
  assert.equal(parsed.success, true);
});

test("blocks a one-way trip without a drop-off", () => {
  const issues = collectQuoteIssues({ ...base, dropoff: "" }, "trip");
  assert.ok(issues.some((issue) => issue.path === "dropoff"));
});

test("requires consent before a full enquiry is valid", () => {
  const parsed = quoteSchema.safeParse({ ...base, consent: false });
  assert.equal(parsed.success, false);
});

test("rejects a return date before departure", () => {
  const issues = collectQuoteIssues(
    { ...base, mode: "round-trip", returnDate: "2026-11-01", returnTime: "12:00" },
    "trip",
  );
  assert.ok(issues.some((issue) => issue.path === "returnDate"));
});
