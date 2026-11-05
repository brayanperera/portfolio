import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md font-mono text-sm transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent px-4 py-2 font-semibold text-accent-contrast hover:bg-accent/85",
  ghost:
    "border border-border-strong px-4 py-2 text-text hover:border-accent/60 hover:bg-accent-muted",
  link: "text-accent underline-offset-4 hover:underline",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** For external URLs and file downloads, where client-side navigation must not apply. */
export function ButtonAnchor({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: Variant }) {
  return <a className={buttonClass(variant, className)} {...props} />;
}
