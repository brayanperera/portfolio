import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { certifications } from "@/content";

export function Certifications() {
  return (
    <Section
      id="certifications"
      index="06"
      eyebrow="certifications"
      title={`${certifications.length} certifications`}
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, index) => (
          <li key={cert.name}>
            <Reveal index={index} className="h-full">
              <div className="flex h-full gap-3 rounded-lg border border-border bg-surface p-4">
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded border border-border-strong font-mono text-xs font-bold text-accent"
                >
                  {cert.monogram}
                </span>
                <div>
                  <p className="text-sm leading-snug">{cert.name}</p>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {cert.issuer} · {cert.date}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
