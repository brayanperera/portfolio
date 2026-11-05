import { getAllProjects, getProject, profile } from "@/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Project by ${profile.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllProjects().map(({ slug }) => ({ slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project?.kind === "product" ? "aakasa digital" : "case study",
    title: project?.name ?? profile.name,
    subtitle: project?.tagline ?? profile.title,
  });
}
