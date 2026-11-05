import type { Metadata } from "next";
import { Button, ButtonAnchor } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Kbd } from "@/components/ui/kbd";
import { Section } from "@/components/ui/section";
import { Badge, StatusPill } from "@/components/ui/status-pill";
import { TerminalWindow } from "@/components/ui/terminal-window";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const tokens = [
  ["bg", "bg-bg"],
  ["surface", "bg-surface"],
  ["surface-2", "bg-surface-2"],
  ["accent", "bg-accent"],
  ["accent-muted", "bg-accent-muted"],
  ["success", "bg-success"],
  ["warning", "bg-warning"],
] as const;

export default function StyleguidePage() {
  return (
    <main id="main">
      <Container className="pt-16">
        <h1 className="text-4xl font-semibold tracking-tight">Styleguide</h1>
      </Container>

      <Section index="01" eyebrow="tokens" title="Colour tokens">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tokens.map(([name, swatch]) => (
            <li key={name} className="rounded-lg border border-border p-3">
              <div className={`h-12 rounded border border-border ${swatch}`} />
              <p className="mt-2 font-mono text-xs text-muted">--{name}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section index="02" eyebrow="actions" title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <ButtonAnchor variant="link" href="#main">
            Link
          </ButtonAnchor>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section index="03" eyebrow="status" title="Status pills and badges">
        <div className="flex flex-wrap items-center gap-3">
          <StatusPill status="running" />
          <StatusPill status="beta" />
          <StatusPill status="building" />
          <StatusPill status="archived" />
          <Badge>terraform</Badge>
          <Kbd>Ctrl K</Kbd>
        </div>
      </Section>

      <Section index="04" eyebrow="surfaces" title="Card and terminal">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <h3 className="font-semibold">Card</h3>
            <p className="mt-2 text-sm text-muted">Hairline border with an accent glow on hover.</p>
          </Card>
          <TerminalWindow title="brayan@perera: ~">
            <p>
              <span className="text-accent">$</span> whoami
            </p>
            <p className="text-muted">terminal body in mono</p>
          </TerminalWindow>
        </div>
      </Section>
    </main>
  );
}
