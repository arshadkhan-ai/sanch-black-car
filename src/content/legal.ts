export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = {
  id: string;
  title: string;
  blocks: LegalBlock[];
};

export const privacySections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "p",
        text: "SANCH BLACK CAR arranges chauffeur-driven transportation. This Privacy Policy explains what information this website collects when you browse it, request a quote, or send a message, and how that information is used.",
      },
      {
        type: "p",
        text: "The policy applies to visitors and to people who submit an enquiry. A confirmed ride is also described in the quotation you accept. If that quotation says something different about a particular trip, the quotation controls the trip. This policy controls how the website handles personal information.",
      },
      {
        type: "p",
        text: "SANCH BLACK CAR does not sell personal information. Phone numbers, street addresses, and business-registration details are shown on this site only after they have been published by the business. They are not invented on this page.",
      },
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    blocks: [
      {
        type: "p",
        text: "We collect information you choose to send through the quote form or the contact form, and limited technical information the host records while the site operates.",
      },
      {
        type: "list",
        items: [
          "Identity and contact details you type into a form.",
          "Trip details you provide so a quotation can be prepared.",
          "Technical logs, which may include an IP address, browser type, and the time of a request, used to run the site and to limit repeated submissions.",
        ],
      },
      {
        type: "p",
        text: "This website does not ask you to create an account. It does not ask for a government identity number, and it does not collect payment card numbers.",
      },
    ],
  },
  {
    id: "personal-information",
    title: "Personal Information and Contact Details",
    blocks: [
      {
        type: "p",
        text: "The forms ask for your name, email address, and phone number, and they include a place for a note. You decide what to write in a free-text field.",
      },
      {
        type: "p",
        text: "Do not put payment card numbers, bank account numbers, government identity numbers, or passwords in those fields. If a note includes that kind of information by mistake, tell us through the contact form so it can be removed from the delivered message where we are able to do so.",
      },
    ],
  },
  {
    id: "booking-information",
    title: "Booking and Transportation Information",
    blocks: [
      {
        type: "p",
        text: "A quote enquiry may include pickup and drop-off locations, dates and times, the number of passengers, luggage notes, a vehicle category, and the type of trip, such as one way, round trip, or hourly hire. Some trips also ask for a flight number, an event type, or a short itinerary.",
      },
      {
        type: "p",
        text: "We use those details to prepare a quotation and, if you accept it, to arrange the chauffeur and the vehicle. Passenger names you choose to include are used for that trip, not to build a separate profile.",
      },
    ],
  },
  {
    id: "payment-information",
    title: "Payment Information and Payment Processing",
    blocks: [
      {
        type: "p",
        text: "This website does not take payment. The quote and contact forms are enquiries only. Submitting a form does not charge a card and does not reserve a vehicle.",
      },
      {
        type: "p",
        text: "If you accept a quotation, that quotation states the amount, what it covers, and how and when payment is due. If a bank or a payment company later processes a payment, that company receives only what it needs to complete the payment, under its own terms. Full card numbers are not stored on this website.",
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Customer Information",
    blocks: [
      {
        type: "p",
        text: "We use the information you send for these purposes:",
      },
      {
        type: "list",
        items: [
          "To reply to a quote or contact enquiry.",
          "To prepare a quotation for the trip you described.",
          "To arrange transportation after you accept a quotation, including sharing the trip details needed with the chauffeur assigned to that booking.",
          "To communicate about timing, a flight detail you provided, or a change you request.",
          "To keep records needed for an accepted booking and for accounting or legal duties that apply.",
          "To protect the website, including limiting repeated or automated form submissions.",
        ],
      },
      {
        type: "p",
        text: "We do not use enquiry details for third-party advertising, and we do not sell or rent them.",
      },
    ],
  },
  {
    id: "cookies-and-analytics",
    title: "Cookies and Analytics",
    blocks: [
      {
        type: "p",
        text: "This website does not use advertising cookies, marketing pixels, or a third-party analytics product. It does not show a cookie banner, because those tools are not installed.",
      },
      {
        type: "p",
        text: "The host and the application may keep short-lived server logs, including an IP address, to operate the site and to limit repeated submissions. Those logs are not used to build an advertising profile. If analytics or advertising cookies are added later, this policy will be updated before they are used.",
      },
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    blocks: [
      {
        type: "p",
        text: "When email delivery is configured, the text of your enquiry is passed to an email provider so it can be delivered to the business inbox. The provider is used to send that message. It is not permitted to use the enquiry for its own marketing.",
      },
      {
        type: "p",
        text: "If email delivery is not configured, the form tells you the message was not sent. In that case this website does not keep a copy of the enquiry.",
      },
      {
        type: "p",
        text: "The company that hosts the website processes the technical logs needed to serve the pages. Links to social profiles appear only when those profiles have been published. A social site you open has its own privacy policy.",
      },
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    blocks: [
      {
        type: "p",
        text: "We share personal information only in these situations:",
      },
      {
        type: "list",
        items: [
          "With the chauffeur or operator who needs the trip details to perform a booking you have accepted.",
          "With the email and hosting providers described above, only so they can operate the site and deliver messages.",
          "When the law requires it, or to respond to a valid legal request.",
          "To protect the safety of a passenger, a chauffeur, or the public.",
          "If you ask us to share a detail with someone else, such as a hotel or an event contact you named.",
        ],
      },
      {
        type: "p",
        text: "If the business is later transferred, the information needed to continue accepted bookings may transfer with it. If the law requires notice of that transfer, we will provide it. We do not sell personal information.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    blocks: [
      {
        type: "p",
        text: "We use reasonable administrative and technical measures appropriate to a website that collects enquiries, including transmission over an encrypted connection when the site is served that way. Access to a delivered enquiry is limited to people who need it to reply or to perform a booking.",
      },
      {
        type: "p",
        text: "No method of sending information over the internet is perfectly secure. Do not send card numbers or government identity numbers through the forms.",
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    blocks: [
      {
        type: "p",
        text: "Information in an enquiry that was actually delivered is kept long enough to answer it, to perform an accepted booking, and to meet record-keeping duties that apply to that trip. This page does not state a single number of years, because the period depends on the booking and on those duties.",
      },
      {
        type: "p",
        text: "You may ask us to delete information that is not needed for an open booking or for a legal duty. Messages that the form said were not sent are not stored by this website.",
      },
    ],
  },
  {
    id: "privacy-rights",
    title: "Customer Privacy Rights",
    blocks: [
      {
        type: "p",
        text: "You may ask for a copy of the enquiry information we hold about you, ask us to correct it, or ask us to delete it when it is not required for an open booking or a legal duty. Depending on the US state where you live, you may have additional rights, including a right to appeal a denial. We follow the privacy law that applies to the request.",
      },
      {
        type: "p",
        text: "We will not treat you differently for making a lawful privacy request. To send one, use the contact form and the same email address you used on the enquiry, so the message can be matched. If a published email address is shown on this website, you may use that as well.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    blocks: [
      {
        type: "p",
        text: "The website and the transportation services are directed to adults who arrange travel. We do not knowingly collect personal information from children under 13.",
      },
      {
        type: "p",
        text: "An adult may include a child's name because that child will ride. That name is trip information for the adult's booking. It is not an account for the child. If you believe a child submitted a form, contact us and we will delete what we are not required to keep.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    blocks: [
      {
        type: "p",
        text: "We may update this policy by posting a new version on this page. When an effective date has been confirmed, it is shown at the top of the page. Until then, no effective date is displayed.",
      },
      {
        type: "p",
        text: "Use of the website after an update is posted is subject to the updated policy. A booking you have already accepted keeps the quotation for that ride.",
      },
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "introduction",
    title: "Introduction and Acceptance of Terms",
    blocks: [
      {
        type: "p",
        text: "These Terms & Conditions apply to your use of the SANCH BLACK CAR website and to the way a chauffeur reservation is formed. By using the site, requesting a quote, or accepting a quotation, you agree to these terms. If you do not agree, do not use the forms.",
      },
      {
        type: "p",
        text: "The price, vehicle category, date, route, and any waiting, cancellation, or extra-charge rule for a particular ride are the ones written in the quotation you accept. If this page and an accepted quotation differ on a commercial point, the quotation controls that ride.",
      },
    ],
  },
  {
    id: "services",
    title: "Description of Transportation Services",
    blocks: [
      {
        type: "p",
        text: "SANCH BLACK CAR arranges chauffeur-driven transportation. It is not a self-drive car rental. The services described on the site include airport transfers, city-to-city travel, hourly hire, weddings, corporate travel, special events, roadshows, city tours, limousines, and chauffeur service.",
      },
      {
        type: "p",
        text: "Photographs, airport names, city pairs, and vehicle models on the site are examples for a quotation. They are not a promise that a particular car, airport, or city is available. Coverage and the vehicle offered are confirmed in the reply.",
      },
    ],
  },
  {
    id: "booking",
    title: "Booking and Reservation Process",
    blocks: [
      {
        type: "p",
        text: "Submitting a quote form or a contact form does not reserve a vehicle, a chauffeur, or a price. A reservation exists only when SANCH BLACK CAR sends a quotation and you accept it in the way that quotation describes.",
      },
      {
        type: "p",
        text: "You agree that the details you submit are accurate, including your name, phone number, email address, addresses, dates, times, passenger count, and luggage notes. If email delivery is not connected, the form says the enquiry was not sent, and nothing is booked.",
      },
    ],
  },
  {
    id: "quotes-pricing-payments",
    title: "Quotes, Pricing and Payments",
    blocks: [
      {
        type: "p",
        text: "This website does not publish a rate card. A quotation states the price for the trip you described. Tolls, parking, taxes, or other charges are included only if the quotation says they are included.",
      },
      {
        type: "p",
        text: "Payment is not collected on this website. The quotation states the amount and how and when it is due. Do not send card numbers through the website forms. A ride is not confirmed by filling in the form alone.",
      },
    ],
  },
  {
    id: "cancellation",
    title: "Cancellation and Refund Policy",
    blocks: [
      {
        type: "p",
        text: "Cancellation and any refund follow the quotation you accept. This page does not publish a cancellation window or a refund percentage, because those terms are set for each booking and are not a standing offer on the website.",
      },
      {
        type: "p",
        text: "To cancel an accepted booking, contact us as soon as you can and use the email address on the booking so the trip can be identified. If you have not accepted a quotation, you may decline it. Nothing is reserved until you accept.",
      },
    ],
  },
  {
    id: "no-show",
    title: "No-Show Policy",
    blocks: [
      {
        type: "p",
        text: "If a passenger does not appear at the agreed pickup and does not answer the phone number on the booking, the no-show terms in the accepted quotation apply.",
      },
      {
        type: "p",
        text: "Where the quotation does not set a separate no-show rule, the trip may be treated as cancelled after a reasonable attempt to reach that phone number. Charges written in the quotation may still apply. This page does not add a fee that the quotation does not state.",
      },
    ],
  },
  {
    id: "waiting-time",
    title: "Waiting Time and Additional Charges",
    blocks: [
      {
        type: "p",
        text: "Waiting time after a scheduled pickup, and any charge for extra stops, extra hours, or a route change, applies only as the accepted quotation describes. This page does not publish a free-waiting allowance or a per-minute rate.",
      },
      {
        type: "p",
        text: "If you ask for a change that is outside the accepted booking, we will tell you whether a revised quotation is required before the change is made. Extra charges are not added in silence.",
      },
    ],
  },
  {
    id: "airport-transfers",
    title: "Airport Transfers and Flight Delays",
    blocks: [
      {
        type: "p",
        text: "Airport names on the website are examples. An airport transfer is available only when the quotation confirms it. If you provide a flight number, we use it to understand the arrival you described.",
      },
      {
        type: "p",
        text: "A flight delay does not by itself extend the booking beyond what the quotation allows. Tell us about a delay, a cancellation, or a change of terminal as soon as you can, using the contact details on your quotation. Extra waiting or a changed routing is priced as that quotation provides, or in a revised quote if the change sits outside the original booking.",
      },
    ],
  },
  {
    id: "passenger-responsibilities",
    title: "Passenger Responsibilities",
    blocks: [
      {
        type: "p",
        text: "Passengers must follow the law, wear seat belts where the law requires them, and follow reasonable directions that concern safety. Smoking and illegal conduct are not permitted in the vehicle.",
      },
      {
        type: "p",
        text: "We may refuse or stop a trip if a passenger presents a safety risk, or if the number of people exceeds the vehicle that was booked. A child seat must be requested in the enquiry. Whether one can be provided is confirmed in the quotation, not assumed on this page.",
      },
    ],
  },
  {
    id: "luggage",
    title: "Luggage and Vehicle Capacity",
    blocks: [
      {
        type: "p",
        text: "Tell us the passenger count and the luggage you expect to bring. The vehicle category in the quotation is chosen to match that information. Luggage that does not fit, or a party larger than the booked vehicle, may need a different category and a revised quote.",
      },
      {
        type: "p",
        text: "The quotation confirms a category. It does not promise a particular make or model unless the quotation says so.",
      },
    ],
  },
  {
    id: "vehicle-availability",
    title: "Vehicle Availability and Substitutions",
    blocks: [
      {
        type: "p",
        text: "A photograph on the website may be an illustration. It may not be the vehicle assigned to your trip. Availability is confirmed when you accept a quotation.",
      },
      {
        type: "p",
        text: "If the accepted category becomes unavailable, we will offer another category or a revised quotation before the trip. We will not assign a smaller category than the one you accepted without telling you first.",
      },
    ],
  },
  {
    id: "delays-force-majeure",
    title: "Service Delays and Force Majeure",
    blocks: [
      {
        type: "p",
        text: "Traffic, weather, road closures, accidents, and other events outside reasonable control can delay a pickup or a journey. We will tell you when we are able to do so. We are not liable for a delay caused by those conditions, by incorrect information you provided, or by a flight, train, or event that runs late.",
      },
      {
        type: "p",
        text: "If a booking cannot be performed because of an event of that kind, the accepted quotation explains what happens to any amount already paid. This page does not add a timing guarantee.",
      },
    ],
  },
  {
    id: "damage-cleaning",
    title: "Vehicle Damage and Cleaning Charges",
    blocks: [
      {
        type: "p",
        text: "You are responsible for damage to the vehicle, and for cleaning beyond ordinary use, caused by the passengers in your party. The charge is the reasonable cost of the repair or the cleaning. If a quotation states a cleaning charge for a specific case, that stated charge applies.",
      },
      {
        type: "p",
        text: "This page does not publish a standing damage or cleaning fee. Any charge will be explained by reference to the cost or to the quotation.",
      },
    ],
  },
  {
    id: "liability",
    title: "Liability and Limitations",
    blocks: [
      {
        type: "p",
        text: "To the extent the law allows, SANCH BLACK CAR is not liable for indirect or consequential loss, such as a missed flight or a missed appointment, where the cause is outside the accepted booking or outside reasonable control.",
      },
      {
        type: "p",
        text: "Nothing in these terms limits liability that the law does not allow to be limited, including liability for death or personal injury caused by negligence where a limit is forbidden. Insurance and operating rules that apply to a vehicle are those of the trip that is confirmed. This website does not state a coverage amount.",
      },
    ],
  },
  {
    id: "website-usage",
    title: "Website Usage",
    blocks: [
      {
        type: "p",
        text: "Use the website lawfully. Do not disrupt the forms, send unlawful or misleading messages, or submit automated enquiries. The site may be unavailable during maintenance.",
      },
      {
        type: "p",
        text: "The website is a marketing and enquiry tool. It is not itself a confirmed reservation. If a form reports that a message was not sent, you should not treat the trip as booked.",
      },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "The SANCH BLACK CAR name, logo, page design, and original text on this website belong to the business or are used with permission. You may not copy the site to operate a competing service. You may share a link to a page.",
      },
      {
        type: "p",
        text: "Some vehicle photographs are illustrative stock images. A photograph is not a statement that the pictured car is in the fleet.",
      },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    blocks: [
      {
        type: "p",
        text: "These terms are governed by the laws of the United States and of the state in which SANCH BLACK CAR is organized, without regard to conflict-of-law rules. The state of organization is not published on this website yet, and this page does not name one.",
      },
      {
        type: "p",
        text: "When that state is confirmed, it will be added here. Until then, a dispute about a confirmed booking follows any law and venue written in the quotation. If the quotation names none, the dispute may be brought in a court that has jurisdiction over the parties. These terms do not waive a right that the law says cannot be waived.",
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to Terms",
    blocks: [
      {
        type: "p",
        text: "We may update these terms by posting a new version on this page. The effective date is shown at the top of the page once it has been confirmed. It is not shown before that.",
      },
      {
        type: "p",
        text: "A booking you have already accepted keeps the quotation for that ride. A new enquiry after an update is posted is subject to the terms then on this page.",
      },
    ],
  },
];
