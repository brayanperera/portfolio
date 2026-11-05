import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = {
  id?: string;
  /** Rendered as "// 02 — experience" */
  index?: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, eyebrow, title, intro, children, className }: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-t border-border py-16 sm:py-24", className)}
    >
      <Container>
        <header className="mb-10 max-w-2xl">
          <p className="font-mono text-xs tracking-wide text-accent">
            {"// "}
            {index ? `${index} — ` : ""}
            {eyebrow}
          </p>
          <h2 id={headingId} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {intro ? <p className="mt-4 leading-relaxed text-muted">{intro}</p> : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
