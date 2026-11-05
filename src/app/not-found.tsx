import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { TerminalWindow } from "@/components/ui/terminal-window";

export const metadata: Metadata = {
  title: "404: command not found",
  robots: { index: false },
};

const suggestions = [
  { href: "/", label: "cd ~", note: "home" },
  { href: "/projects", label: "ls projects", note: "case studies and products" },
  { href: "/blog", label: "ls blog", note: "writing" },
  { href: "/#contact", label: "./contact", note: "get in touch" },
];

export default function NotFound() {
  return (
    <main id="main" className="py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="mb-6 font-mono text-3xl font-bold tracking-tight sm:text-4xl">
          404: command not found
        </h1>
        <TerminalWindow title="brayan@perera: ~">
          <p className="text-muted">That page does not exist. Did you mean:</p>
          <ul className="mt-3 space-y-1">
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-8 flex-wrap items-center gap-x-2 hover:text-accent"
                >
                  <span>
                    <span aria-hidden="true" className="text-accent">
                      ${" "}
                    </span>
                    {item.label}
                  </span>
                  <span className="text-muted">{`# ${item.note}`}</span>
                </Link>
              </li>
            ))}
          </ul>
        </TerminalWindow>
      </Container>
    </main>
  );
}
