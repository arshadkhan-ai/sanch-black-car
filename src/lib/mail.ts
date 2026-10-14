import { Resend } from "resend";

type MailResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

export async function sendEnquiry(subject: string, text: string): Promise<MailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return {
      ok: false,
      status: 503,
      message:
        "Enquiry email is not connected yet, so this message was not sent. Add the email settings and try again.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({ from, to, subject, text });

  if (error) {
    return {
      ok: false,
      status: 502,
      message:
        "The email service did not accept this enquiry, so it was not delivered. Please try again later.",
    };
  }

  return { ok: true };
}
