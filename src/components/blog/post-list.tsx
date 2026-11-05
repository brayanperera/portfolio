import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return (
      <p className="font-mono text-sm text-muted">
        <span className="text-accent">$</span> ls posts/
        <br />
        total 0. First posts are on the way.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {posts.map((post) => (
        <li key={post.slug} className="py-5">
          <p className="font-mono text-xs text-muted">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min
            read
            {post.draft ? <span className="text-warning"> · draft</span> : null}
          </p>
          <h3 className="mt-2 text-lg font-semibold">
            <Link href={`/blog/${post.slug}`} className="hover:text-accent">
              {post.title}
            </Link>
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
