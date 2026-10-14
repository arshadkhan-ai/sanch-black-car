import { contactSchema } from "@/lib/quote";
import { sendEnquiry } from "@/lib/mail";
import { clientKey, isRateLimited } from "@/lib/rate-limit";

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (isRateLimited(`contact:${clientKey(request)}`)) {
    return json({ ok: false, message: "Too many messages were sent just now. Wait a minute and try again." }, 429);
  }

  const raw = await request.text();
  if (raw.length > 20000) return json({ ok: false, message: "This message is too long to send." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, message: "The message could not be read." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return json({ ok: false, message: "Some details need correcting.", fieldErrors }, 400);
  }

  const value = parsed.data;
  const sent = await sendEnquiry(
    `Contact — ${value.service}`,
    [`Name: ${value.name}`, `Email: ${value.email}`, `Phone: ${value.phone}`, `Service: ${value.service}`, "", value.message].join("\n"),
  );
  if (!sent.ok) return json({ ok: false, message: sent.message }, sent.status);
  return json({ ok: true });
}
