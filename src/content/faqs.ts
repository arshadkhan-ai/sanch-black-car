export type Faq = { q: string; a: string };

const sharedPricing =
  "We do not publish fares on this website. You receive a quotation for the date, vehicle category, and itinerary you request. Nothing is reserved until you accept that quote.";

export const faqs: Record<string, Faq[]> = {
  "airport-transfer": [
    {
      q: "How should I share my flight details?",
      a: "Add the airport, flight number, and scheduled time in the quote form. We use those details to plan the pickup. This site does not connect to a live flight-tracking feed.",
    },
    {
      q: "What if the flight time changes?",
      a: "Send the updated time as soon as you have it. How waiting time is treated is written into the quote you accept, not assumed here.",
    },
    {
      q: "Where does the chauffeur meet arriving passengers?",
      a: "The meeting point — terminal curb, arrivals hall, or another agreed spot — is confirmed with your booking. A name board can be requested in the enquiry.",
    },
    {
      q: "Can I request a child seat?",
      a: "Yes, note the ages in the enquiry. Seats are subject to availability and are confirmed in the reply.",
    },
    {
      q: "Can I book a round trip?",
      a: "Choose round trip and include the return date and time. Both legs are quoted together.",
    },
  ],
  "city-to-city-transfer": [
    {
      q: "Which city pairs can I request?",
      a: "Request the cities you need. The route examples on this page are illustrations, not a confirmed service map.",
    },
    {
      q: "Can the trip be a round trip or include extra cities?",
      a: "Yes. Use round trip or multi-city and describe the stops. We quote the full plan before travel.",
    },
    {
      q: "How far ahead should I enquire?",
      a: "Earlier is easier for vehicle planning, especially for weekends. Same-week requests are still welcome and are confirmed only if a vehicle is free.",
    },
    {
      q: "Is the price fixed?",
      a: sharedPricing,
    },
  ],
  "hourly-chauffeur": [
    {
      q: "What does an hourly booking include?",
      a: "It is a chauffeur and vehicle reserved for the hours you request, with stops inside that window. Waiting, extra distance, and overtime are explained in the quote.",
    },
    {
      q: "Can I add stops during the booking?",
      a: "Yes, within the time reserved. A change that extends the hours is quoted before it is added.",
    },
    {
      q: "How early should I book?",
      a: "Send the date, start time, and city as soon as the plan is known. We confirm only when the vehicle and chauffeur are available.",
    },
    {
      q: "What if I need more hours?",
      a: "Ask before the reserved time ends. An extension is a new quotation, not an automatic change.",
    },
    {
      q: "Which vehicles can be requested?",
      a: "Sedan, SUV, and sprinter categories can be requested. The specific vehicle is confirmed in the reply.",
    },
  ],
  "wedding-service": [
    {
      q: "Can you transport guests as well as the couple?",
      a: "Yes. Describe the number of people, the venues, and whether you need one vehicle or a shuttle plan.",
    },
    {
      q: "Do you decorate the vehicle?",
      a: "Ribbon or simple styling can be requested. What is possible depends on the vehicle and is confirmed in the quote.",
    },
    {
      q: "Can the schedule include photo stops?",
      a: "Yes. List the locations and the order. The chauffeur follows the agreed timeline.",
    },
    {
      q: "What if the ceremony runs late?",
      a: "Build a little flexibility into the hours you request. Extra time beyond the quote is agreed before it is added.",
    },
  ],
  "corporate-transfer": [
    {
      q: "Can a company request repeat travel?",
      a: "Yes. Share the passenger names, dates, and billing contact. Account terms are set in writing with the quote, not on this page.",
    },
    {
      q: "Are chauffeurs briefed for executive travel?",
      a: "The enquiry can include dress notes, greeting instructions, and meeting addresses. Those instructions travel with the confirmed booking.",
    },
    {
      q: "Can one day include several cities?",
      a: "Use the hourly or roadshow forms and attach the stop list. We quote the day as a single plan.",
    },
    {
      q: "Do you invoice a company?",
      a: "Ask for an invoice in the enquiry. Payment terms are part of the quote you accept.",
    },
  ],
  "special-events": [
    {
      q: "Which occasions can I request?",
      a: "Weddings, proms, concerts, sporting events, galas, parties, and nights out. Tell us the venue and the timing.",
    },
    {
      q: "Can you handle a large group?",
      a: "Request a sprinter or more than one vehicle and include the headcount. Capacity is confirmed per vehicle.",
    },
    {
      q: "Can the evening include several pickups?",
      a: "Yes. List each address in the itinerary notes so the quote covers the routing.",
    },
    {
      q: "Which vehicle categories are available?",
      a: "Sedan, SUV, sprinter, and limousine categories can be requested. Availability is confirmed for your date.",
    },
  ],
  roadshows: [
    {
      q: "Can one chauffeur cover a multi-stop day?",
      a: "Yes, when the hours and distances fit a single booking. Send the stop list and we will quote it.",
    },
    {
      q: "Do you provide the same chauffeur for the whole roadshow?",
      a: "You can request continuity. We confirm it when the schedule and staffing allow.",
    },
    {
      q: "Can the itinerary change between cities?",
      a: "Share changes as early as possible. A revised route is re-quoted before it replaces the original plan.",
    },
    {
      q: "What vehicles suit a roadshow?",
      a: "Sedans for individual principals, SUVs for small teams, and sprinters for larger groups. The category is your choice in the form.",
    },
  ],
  "city-tours": [
    {
      q: "Can the itinerary be custom?",
      a: "Yes. Tell us the interests, the start point, and how many hours you want. We do not sell a fixed sightseeing package on this site.",
    },
    {
      q: "Is a guide included?",
      a: "The service is chauffeur-driven transportation. A separate guide is not included unless your quote says so.",
    },
    {
      q: "How long should a city tour be?",
      a: "Half a day is often enough for a few landmarks. A full day suits a longer list. Choose the duration that matches your plan.",
    },
    {
      q: "Can we make photo stops?",
      a: "Yes. Mark them in the notes. Stopping time sits inside the hours you reserve.",
    },
  ],
  "limousine-service": [
    {
      q: "Is a limousine available for every date?",
      a: "No. Limousine requests are confirmed only when a suitable vehicle is free. The photos on this site are illustrative.",
    },
    {
      q: "Can I request a limousine for a wedding or prom?",
      a: "Yes. Include the venue times, passenger count, and whether you want point-to-point or hourly hire.",
    },
    {
      q: "How many passengers fit?",
      a: "Capacity depends on the vehicle that is quoted. Use the passenger count in the form so we do not suggest a vehicle that is too small.",
    },
    {
      q: "Can a limousine do an airport transfer?",
      a: "You may request it. Luggage space and terminal access are confirmed with the vehicle we offer.",
    },
  ],
  "chauffeur-service": [
    {
      q: "What is included in chauffeur service?",
      a: "A professional driver and a vehicle category for the trip or hours you request. Extras are listed in the quote.",
    },
    {
      q: "What is as-directed service?",
      a: "The chauffeur stays with you for a block of time and follows the stops you set that day, within the hours reserved.",
    },
    {
      q: "Can I book several days?",
      a: "Yes. Describe each day in the notes or send a roadshow-style itinerary.",
    },
    {
      q: "Which vehicles can I ask for?",
      a: "Executive sedan, luxury SUV, sprinter, and limousine categories. The exact car is confirmed when we reply.",
    },
  ],
};
