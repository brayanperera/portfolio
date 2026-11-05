import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductScreenshot } from "@/components/home/product-card";
import { MdxContent } from "@/components/mdx/mdx-content";
import { ButtonAnchor } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge, StatusPill } from "@/components/ui/status-pill";
import { formatPeriod, getAllProjects, getProject } from "@/content";
import { getProjectBody } from "@/lib/project-body";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}` },
  };
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-xs text-muted">{label}</dt>
      <dd className="mt-1 text-sm">{children}</dd>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 mb-3 text-2xl font-semibold tracking-tight">{children}</h2>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const body = getProjectBody(slug);
  const all = getAllProjects();
  const index = all.findIndex((item) => item.slug === slug);
  const prev = all[index - 1];
  const next = all[index + 1];
  const period = project.kind === "career" ? formatPeriod(project.period) : null;

  return (
    <main id="main" className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/projects"
          className="inline-flex min-h-6 items-center gap-1 font-mono text-xs text-muted hover:text-accent"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5" /> projects
        </Link>
        <article>
          <header className="mt-6">
            <p className="font-mono text-xs text-accent">
              {project.kind === "career" ? "// case study" : "// aakasa digital product"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">{project.name}</h1>
            <p className="mt-3 text-lg leading-relaxed text-muted">{project.tagline}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-5 sm:grid-cols-3">
              {project.kind === "career" ? (
                <>
                  <Meta label="role">{project.role}</Meta>
                  {project.company ? <Meta label="company">{project.company}</Meta> : null}
                  {period ? <Meta label="period">{period}</Meta> : null}
                </>
              ) : (
                <>
                  <Meta label="role">Founder, Aakasa Digital</Meta>
                  {project.status ? (
                    <Meta label="status">
                      <StatusPill status={project.status} />
                    </Meta>
                  ) : null}
                </>
              )}
            </dl>
          </header>

          {project.kind === "career" ? (
            <>
              {project.note ? (
                <p className="mt-6 font-mono text-sm text-accent">{project.note}</p>
              ) : null}
              <SectionHeading>Context</SectionHeading>
              <p className="leading-relaxed text-muted">{project.problem}</p>
              <SectionHeading>Approach</SectionHeading>
              <ul className="space-y-2 leading-relaxed text-muted">
                {project.approach.map((step) => (
                  <li key={step} className="flex gap-2">
                    <span aria-hidden="true" className="font-mono text-accent">
                      ›
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <div className="mt-8">
                <ProductScreenshot product={project} sizes="(min-width: 768px) 720px, 100vw" />
              </div>
              {project.highlights.length > 0 ? (
                <>
                  <SectionHeading>Highlights</SectionHeading>
                  <ul className="space-y-2 leading-relaxed text-muted">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span aria-hidden="true" className="font-mono text-accent">
                          ›
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </>
          )}

          {body ? (
            <div className="mt-10">
              <MdxContent source={body} />
            </div>
          ) : null}

          {project.stack.length > 0 ? (
            <>
              <SectionHeading>Stack</SectionHeading>
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Badge>{tech}</Badge>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {project.kind === "product" && project.url ? (
            <div className="mt-8">
              <ButtonAnchor href={project.url} target="_blank" rel="noopener noreferrer">
                Visit {project.name} <ExternalLink aria-hidden="true" className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </ButtonAnchor>
            </div>
          ) : null}
        </article>

        <nav
          aria-label="More projects"
          className="mt-14 grid gap-4 border-t border-border pt-6 sm:grid-cols-2"
        >
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group block py-1">
              <span className="flex items-center gap-1 font-mono text-xs text-muted">
                <ArrowLeft aria-hidden="true" className="size-3.5" /> previous
              </span>
              <span className="mt-1 block font-medium group-hover:text-accent">{prev.name}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="group block py-1 sm:text-right">
              <span className="flex items-center gap-1 font-mono text-xs text-muted sm:justify-end">
                next <ArrowRight aria-hidden="true" className="size-3.5" />
              </span>
              <span className="mt-1 block font-medium group-hover:text-accent">{next.name}</span>
            </Link>
          ) : null}
        </nav>
      </Container>
    </main>
  );
}
