import { ArrowRight, Download } from "lucide-react";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { heroProducts, profile, sectors, stats } from "@/content";
import { HeroTerminal, type TerminalLine } from "./hero-terminal";
import { StatCounters } from "./stat-counters";

function buildSession(): TerminalLine[] {
  const nameWidth = Math.max(4, ...heroProducts.map((product) => product.name.length)) + 3;
  const years = stats[0];
  return [
    { kind: "command", text: "whoami" },
    { kind: "output", text: "brayan perera — systems architect / sre" },
    { kind: "command", text: "uptime" },
    { kind: "output", text: `${years?.value}${years?.suffix} years · ${sectors.join(" · ")}` },
    { kind: "command", text: "kubectl get products -n aakasa" },
    { kind: "output", text: `${"NAME".padEnd(nameWidth)}STATUS` },
    ...heroProducts.map((product): TerminalLine => ({
      kind: "output",
      text: `${product.name.padEnd(nameWidth)}${product.status ?? "unknown"}`,
    })),
  ];
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-14 pb-16 sm:pt-20 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="font-mono text-xs tracking-wide text-accent">
              {"// systems architect · sre · founder"}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl"
            >
              {profile.name}
            </h1>
            <p className="mt-5 text-xl leading-snug font-medium sm:text-2xl">{profile.valueProp}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">{profile.shortBio}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/#contact">
                Hire me <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
              <ButtonAnchor href="/cv.pdf" variant="ghost">
                <Download aria-hidden="true" className="size-4" /> Download CV
              </ButtonAnchor>
            </div>
          </div>
          <HeroTerminal title="brayan@perera: ~" lines={buildSession()} />
        </div>
        <div className="mt-14">
          <StatCounters stats={stats} />
        </div>
      </Container>
    </section>
  );
}
