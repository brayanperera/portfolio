import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/status-pill";
import { getFeaturedProjects } from "@/content";

export function CaseStudies() {
  return (
    <Section id="projects" index="03" eyebrow="case studies" title="Platforms I designed and built">
      <div className="grid gap-5 md:grid-cols-2">
        {getFeaturedProjects().map((project, index) => (
          <Reveal key={project.slug} index={index}>
            <Card className="relative flex h-full flex-col">
              <h3 className="text-lg font-semibold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] hover:text-accent"
                >
                  {project.name}
                </Link>
              </h3>
              <p className="mt-1 font-mono text-xs text-muted">{project.role}</p>
              <dl className="mt-4 flex-1 space-y-4 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-xs text-accent">problem</dt>
                  <dd className="mt-1 text-muted">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs text-accent">what I did</dt>
                  <dd className="mt-1 text-muted">{project.approach[0]}</dd>
                </div>
              </dl>
              {project.stack.length > 0 ? (
                <ul aria-label="Stack" className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-5 flex items-center gap-1 font-mono text-xs text-accent">
                Read case study <ArrowRight aria-hidden="true" className="size-3.5" />
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/projects" variant="ghost">
          All projects
        </ButtonLink>
      </div>
    </Section>
  );
}
