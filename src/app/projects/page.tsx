import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { getAllProjects } from "@/content";
import { ProjectsIndex } from "./projects-index";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Career case studies in NFV, cloud migration and automation, plus the products Brayan Perera builds and runs under Aakasa Digital.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="py-14 sm:py-20">
      <Container>
        <p className="font-mono text-xs text-accent">{"// projects"}</p>
        <h1 className="mt-3 mb-8 text-4xl font-semibold tracking-tight">Projects and products</h1>
        <ProjectsIndex projects={getAllProjects()} />
      </Container>
    </main>
  );
}
