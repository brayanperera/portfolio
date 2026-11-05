import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");
const WORDS_PER_MINUTE = 200;

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  tags: string[];
  draft: boolean;
  cover?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { body: string };

export type TocEntry = { id: string; title: string; level: 2 | 3 };

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.mdx$/, ""),
    title: String(data.title),
    description: String(data.description ?? ""),
    date: new Date(data.date).toISOString().slice(0, 10),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    cover: data.cover ? String(data.cover) : undefined,
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    body: content,
  };
}

/** Newest first. Drafts appear in development only. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPost)
    .filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.tags))].sort();
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

/** Uses the same slugger as rehype-slug, so ids line up with the rendered headings. */
export function getToc(body: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const withoutCode = body.replace(/```[\s\S]*?```/g, "");
  return [...withoutCode.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => {
    const title = (match[2] ?? "").trim();
    return { id: slugger.slug(title), title, level: match[1]?.length === 2 ? 2 : 3 };
  });
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
