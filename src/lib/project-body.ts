import fs from "node:fs";
import path from "node:path";

/** Optional long-form body for a project, from src/content/projects/<slug>.mdx */
export function getProjectBody(slug: string): string | null {
  const file = path.join(process.cwd(), "src/content/projects", `${slug}.mdx`);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
}
