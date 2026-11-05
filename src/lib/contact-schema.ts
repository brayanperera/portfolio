import { z } from "zod";

export const engagementTypes = ["Architecture", "SRE-DevOps", "Product build", "Other"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(200),
  company: z.string().trim().max(120).optional().default(""),
  engagement: z.enum(engagementTypes, { error: "Please choose an engagement type." }),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (10 characters minimum).")
    .max(5000, "Please keep your message under 5000 characters."),
  /** Honeypot. Hidden from people, so only bots fill it in. */
  website: z.string().optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResponse =
  { ok: true } | { ok: false; error: string; fieldErrors?: Record<string, string> };
