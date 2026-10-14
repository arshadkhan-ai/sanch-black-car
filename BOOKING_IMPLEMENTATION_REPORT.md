# Booking implementation report

The booking workflow lives at `/bookings`. Existing page layouts were left in place. Booking buttons now open this page, and a selected service or vehicle is passed in the query string.

## What was built

The page follows the reference booking flow: ride details, vehicle choice, contact details, and a summary that updates as the form changes.

**Ride details.** Service type is Point to Point, Airport Transfer, Hourly, or City to City. The trip is One Way or Round Trip. Pickup date, pickup time, pickup location, optional extra stops (up to 8), and drop-off are collected. Drop-off is optional only for hourly hire. Round trips ask for a return date and time. Passenger count and suitcase count are required. Hourly hire asks for a duration. Airport transfers ask for a flight number and terminal. Special instructions are optional. Past dates and times are rejected.

**Vehicle.** The cards use the six categories already configured in Our Fleet: Executive Sedan, Luxury SUV, Premium Sprinter, Stretch Limousine, Business Sedan, and Executive SUV. Each card shows the existing photograph, name, passenger capacity, luggage capacity, and category. The selected card is highlighted. There is no published fare, so every card says **Request Quote**.

**Contact.** First name, last name, email, and phone are required. Company name and comments are optional. Meet & Greet and airport parking are optional. Privacy Policy acceptance is required. SMS consent is a separate checkbox and starts unchecked.

**Summary.** On a wide screen the summary stays beside the form. It shows the service, date and time, addresses, stops, vehicle, passengers, luggage, and selected options. The price line stays **Request Quote**. No total is invented.

**Submission.** The browser posts to `POST /api/bookings`. The server validates the same rules, checks the travel date, rejects an unknown vehicle, and ignores a filled honeypot. The send button locks while the request is in flight. Loading, field errors, and a server error are shown on the form. A success panel is shown only after the server accepts the request.

## Confirmation rules

A booking reference is shown only when `BOOKING_WEBHOOK_URL` accepts the request and returns JSON with a `reference` string. That panel still says the ride is not confirmed by this website.

If no webhook is configured, the server tries the existing enquiry email (`RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL`). When that email is accepted, the page says the details were emailed, that no booking was created, and that no reference number was issued.

If email is not configured, the API returns 503 and the form stays on screen with: “Enquiry email is not connected yet, so this message was not sent.” Nothing is presented as a confirmed booking.

## Buttons that open `/bookings`

- Header **Book Now**
- Homepage **Book Your Ride** and **Book Your Ride Now**
- About **Book Your Ride**
- Contact **Get a Quote**
- Footer **Book a Ride**
- Fleet page **Book Now**, each fleet card **Book Now**, and each vehicle page **Book Now**
- Service-page book and quote links, including hourly package links

Prefill examples:

- Airport pages open `/bookings?service=airport`
- Hourly, roadshow, and city-tour pages open the hourly service
- City-to-city pages open `/bookings?service=city-to-city`
- A fleet card opens `/bookings?vehicle=executive-sedan` (or the matching slug)
- Limousine pages also preselect Stretch Limousine

The quote forms already embedded on the homepage, service pages, and vehicle pages were not removed.

## What was tested

Playwright checked the running site:

- Empty ride details show field errors for date, pickup, and, on an airport request, flight number.
- Filling pickup, drop-off, date, time, flight, terminal, and one stop updates the summary immediately, including **Request Quote**.
- Continue reaches vehicle selection. Back returns to the ride step and keeps the typed stops.
- A preselected Luxury SUV is marked selected. Choosing Executive Sedan updates the summary.
- Empty contact details require the name, email, and Privacy Policy. SMS consent stays unchecked.
- Meet & Greet appears in the summary when checked.
- Submit with email delivery unconfigured stays on the form and shows the 503 message. It does not show a reference or a confirmation.
- Header **Book Now** and fleet **Book Now** land on `/bookings`, and the fleet link preselects that vehicle.
- At 390px the form, stepper, and summary fit without horizontal scrolling.
- `npm run build` completed, including `/bookings` and `POST /api/bookings`.

The browser records the 503 response as a failed network request. That is the unconfigured email service, not a JavaScript exception. The form shows the same message.

## Still required before a real reservation

1. Set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, and `QUOTE_FROM_EMAIL` so a request can be emailed.
2. To issue a booking reference, set `BOOKING_WEBHOOK_URL` to a reservation system that stores the booking and responds with `{ "reference": "..." }`. Optional `BOOKING_WEBHOOK_TOKEN` is sent as a bearer token.
3. There is no pricing engine. A total should be added only after that system returns a calculated price.
4. There is no database in this project. Without the webhook, a sent email is an enquiry, not a reserved ride.
