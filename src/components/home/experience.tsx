import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/status-pill";
import { experience, formatPeriod, groupRoles, type Role } from "@/content";

function RoleEntry({ role, open = false }: { role: Role; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-border last:border-b-0">
      <summary className="flex min-h-12 list-none items-start gap-2 py-3 font-mono text-sm hover:text-accent">
        <ChevronRight
          aria-hidden="true"
          className="chevron mt-0.5 size-4 shrink-0 text-muted transition-transform duration-150"
        />
        <span>
          <span className="text-accent">[{formatPeriod(role.period) ?? "—"}]</span> {role.title}{" "}
          <span className="text-muted">@ {role.company}</span>
        </span>
      </summary>
      <div className="pb-5 pl-6">
        {role.summary ? (
          <p className="max-w-3xl text-sm leading-relaxed text-muted">{role.summary}</p>
        ) : null}
        {role.bullets.length > 0 ? (
          <ul className="max-w-3xl space-y-2 text-sm leading-relaxed text-muted">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2">
                <span aria-hidden="true" className="font-mono text-accent">
                  ›
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {role.tech.length > 0 ? (
          <ul aria-label="Technologies" className="mt-4 flex flex-wrap gap-1.5">
            {role.tech.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </details>
  );
}

export function Experience() {
  const blocks = groupRoles(experience);

  return (
    <Section id="experience" index="02" eyebrow="experience" title="Career log">
      <div className="rounded-lg border border-border bg-surface px-4 sm:px-5">
        {blocks.map((block, index) => {
          if (block.type === "single") {
            return (
              <Reveal key={block.role.slug} index={index}>
                <div className="border-b border-border">
                  <RoleEntry role={block.role} open={index === 0} />
                </div>
              </Reveal>
            );
          }

          const years = block.roles.flatMap((role) =>
            [role.period.start, role.period.end].filter((y): y is number => typeof y === "number"),
          );
          return (
            <Reveal key={block.name} index={index}>
              <div className="py-4">
                <p className="mb-1 font-mono text-xs text-muted">
                  {"# "}
                  {block.name} · {Math.min(...years)}–{Math.max(...years)} · implementation engineer
                  to systems architect
                </p>
                <div className="border-l-2 border-accent/40 pl-3 sm:pl-4">
                  {block.roles.map((role) => (
                    <RoleEntry key={role.slug} role={role} />
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
