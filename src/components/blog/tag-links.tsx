import Link from "next/link";
import { cn } from "@/lib/utils";

export function TagLinks({ tags, active }: { tags: string[]; active?: string }) {
  if (tags.length === 0) return null;
  return (
    <nav aria-label="Filter by tag">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/blog"
            aria-current={active ? undefined : "page"}
            className={chipClass(!active)}
          >
            all
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/blog/tags/${tag}`}
              aria-current={tag === active ? "page" : undefined}
              className={chipClass(tag === active)}
            >
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function chipClass(active: boolean) {
  return cn(
    "inline-flex min-h-9 items-center rounded-full border px-3 font-mono text-xs transition-colors duration-150",
    active
      ? "border-accent bg-accent-muted text-accent"
      : "border-border-strong text-muted hover:text-text",
  );
}
