# SANCH BLACK CAR

Luxury chauffeur transportation website built with Next.js App Router, TypeScript, and Tailwind CSS.

The site is a quote enquiry experience. Sending a form does not reserve a vehicle or take payment.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript
- `npm test` — quote validation tests
- `npm run build` — production build
- `npm start` — run the production server

## Email delivery

Quote and contact forms post to `/api/quote` and `/api/contact`. Messages are sent with [Resend](https://resend.com) only when all three variables are set:

- `RESEND_API_KEY`
- `QUOTE_TO_EMAIL` — inbox that should receive enquiries
- `QUOTE_FROM_EMAIL` — a sender address on a domain verified in Resend

If any of them is missing, or Resend rejects the message, the form shows an error and does not send the visitor to the thank-you page.

Optional public details, shown only when set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PHONE`
- `NEXT_PUBLIC_EMAIL`
- `NEXT_PUBLIC_ADDRESS`
- `NEXT_PUBLIC_HOURS`
- social URLs in `.env.example`

## Production

```bash
npm run build
npm start
```

Set the environment variables on the host (Vercel or a Node LTS server behind a reverse proxy). No Docker setup is included.

## Photographs

Vehicle and editorial images in `public/images` are Unsplash photographs used under the [Unsplash License](https://unsplash.com/license). They illustrate categories. They are not a claim that SANCH BLACK CAR operates those exact vehicles.

Design references live in `refrences/` and are not used as page backgrounds.
