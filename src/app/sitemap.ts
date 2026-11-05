import type { MetadataRoute } from "next";
import { getAllProjects, profile } from "@/content";
import { getAllPosts, getAllTags } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (pathname: string) => `${profile.url}${pathname}`;
  return [
    { url: url("/"), priority: 1 },
    { url: url("/projects"), priority: 0.8 },
    { url: url("/blog"), priority: 0.7 },
    ...getAllProjects().map(({ slug }) => ({ url: url(`/projects/${slug}`), priority: 0.7 })),
    ...getAllPosts().map(({ slug, date }) => ({
      url: url(`/blog/${slug}`),
      lastModified: date,
      priority: 0.6,
    })),
    ...getAllTags().map((tag) => ({ url: url(`/blog/tags/${tag}`), priority: 0.3 })),
  ];
}
