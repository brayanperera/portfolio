import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { profile } from "@/content";

export function About() {
  return (
    <Section id="about" index="01" eyebrow="about" title="From onsite telecom engineer to founder">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 leading-relaxed text-muted">
          {profile.narrative.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>
        <Reveal index={1}>
          <Card>
            <h3 className="font-mono text-xs text-accent">$ cat ./currently</h3>
            <p className="mt-3 leading-relaxed">{profile.currently}</p>
            {profile.availability.open ? (
              <p className="mt-5 flex gap-2 border-t border-border pt-4 font-mono text-xs leading-relaxed text-success">
                <span aria-hidden="true">●</span>
                {profile.availability.label}
              </p>
            ) : null}
            <p className="mt-4 font-mono text-xs leading-relaxed text-muted">
              {profile.location} · {profile.locationNote}
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
