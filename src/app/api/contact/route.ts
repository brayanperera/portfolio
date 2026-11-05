import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  ContactAcknowledgementEmail,
  ContactNotificationEmail,
} from "@/components/email/contact-emails";
import { profile } from "@/content";
import { contactSchema } from "@/lib/contact-schema";
import type { ContactResponse } from "@/lib/contact-types";
import { isRateLimited } from "@/lib/rate-limit";

function respond(body: ContactResponse, status = 200) {
  return NextResponse.json(body, { status });
}

function clientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return respond({ ok: false, error: "Too many messages. Please try again later." }, 429);
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return respond({ ok: false, error: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0] ?? "form");
      fieldErrors[field] ??= issue.message;
    }
    return respond({ ok: false, error: "Please check the form.", fieldErrors }, 400);
  }

  const input = parsed.data;

  // Bots get a normal-looking success so they have no signal to adapt to.
  if (input.website) return respond({ ok: true });

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error(
      "Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL is not set",
    );
    return respond({ ok: false, error: "The contact form is not available right now." }, 503);
  }

  const resend = new Resend(RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: input.email,
    subject: `[${input.engagement}] Enquiry from ${input.name}`,
    react: ContactNotificationEmail({ input }),
  });

  if (error) {
    console.error("Contact form: notification failed", error.name);
    return respond({ ok: false, error: "Your message could not be sent. Please try again." }, 502);
  }

  // The enquiry is already delivered, so a failed acknowledgement is only logged.
  const ack = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: input.email,
    subject: "Thanks for getting in touch",
    react: ContactAcknowledgementEmail({ name: input.name, from: profile.name }),
  });
  if (ack.error) console.error("Contact form: acknowledgement failed", ack.error.name);

  return respond({ ok: true });
}
