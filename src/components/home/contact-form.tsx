"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { engagementTypes, type ContactResponse } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type FormState =
  { status: "idle" | "submitting" | "success" } | { status: "error"; message: string };

const inputClass =
  "mt-1.5 block min-h-11 w-full rounded-md border border-border-strong bg-surface-2 px-3 py-2 text-base outline-none transition-colors duration-150 focus:border-accent focus-visible:outline-2 focus-visible:outline-accent aria-invalid:border-danger sm:text-sm";

function Field({
  name,
  label,
  error,
  optional,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`contact-${name}`} className="font-mono text-xs text-muted">
        {label}
        {optional ? " (optional)" : ""}
      </label>
      {children}
      {error ? (
        <p id={`contact-${name}-error`} className="mt-1 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setState({ status: "submitting" });
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json()) as ContactResponse;

      if (result.ok) {
        form.reset();
        setState({ status: "success" });
      } else {
        setErrors(result.fieldErrors ?? {});
        setState({ status: "error", message: result.error });
      }
    } catch {
      setState({ status: "error", message: "Network error. Please try again." });
    }
  };

  const fieldProps = (name: string) => ({
    id: `contact-${name}`,
    name,
    className: inputClass,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const submitting = state.status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label="name" error={errors.name}>
          <input {...fieldProps("name")} type="text" autoComplete="name" required />
        </Field>
        <Field name="email" label="email" error={errors.email}>
          <input {...fieldProps("email")} type="email" autoComplete="email" required />
        </Field>
        <Field name="company" label="company" optional error={errors.company}>
          <input {...fieldProps("company")} type="text" autoComplete="organization" />
        </Field>
        <Field name="engagement" label="engagement type" error={errors.engagement}>
          <select {...fieldProps("engagement")} required defaultValue={engagementTypes[0]}>
            {engagementTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="message" label="message" error={errors.message}>
        <textarea {...fieldProps("message")} rows={6} required />
      </Field>

      {/* Honeypot: off-screen, unreachable by keyboard, ignored by screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "font-mono text-sm",
            state.status === "success" && "text-success",
            state.status === "error" && "text-danger",
            state.status === "submitting" && "text-muted",
          )}
        >
          {state.status === "submitting" ? "$ sending…" : null}
          {state.status === "success" ? "✓ message delivered" : null}
          {state.status === "error" ? `✗ ${state.message}` : null}
        </p>
      </div>
    </form>
  );
}
