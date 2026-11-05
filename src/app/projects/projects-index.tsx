"use client";

import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge, StatusPill } from "@/components/ui/status-pill";
import type { Project } from "@/content/types";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "All" },
  { id: "career", label: "Career" },
  { id: "product", label: "Products" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function ProjectsIndex({ projects }: { projects: Project[] }) {
  const [tab, setTab] = useState<TabId>("all");
  const visible = projects.filter((project) => tab === "all" || project.kind === tab);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
            className={cn(
              "min-h-10 rounded-full border px-4 font-mono text-xs transition-colors duration-150",
              tab === id
                ? "border-accent bg-accent-muted text-accent"
                : "border-border-strong text-muted hover:text-text",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <Card className="relative flex h-full flex-col">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs text-muted">
                  {project.kind === "career" ? "career" : "aakasa digital"}
                </p>
                {project.kind === "product" && project.status ? (
                  <StatusPill status={project.status} />
                ) : null}
              </div>
              <h2 className="mt-3 text-lg font-semibold">
                <Link
                  href={`/projects/${project.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] hover:text-accent"
                >
                  {project.name}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
              {project.stack.length > 0 ? (
                <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
