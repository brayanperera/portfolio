import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx/mdx-content";
import { Container } from "@/components/ui/container";
import { formatDate, getAllPosts, getPost, getToc } from "@/lib/posts";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", publishedTime: post.date, tags: post.tags },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = getToc(post.body);

  return (
    <main id="main" className="py-14 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
          <article className="max-w-3xl min-w-0">
            <Link
              href="/blog"
              className="inline-flex min-h-6 items-center gap-1 font-mono text-xs text-muted hover:text-accent"
            >
              <ArrowLeft aria-hidden="true" className="size-3.5" /> blog
            </Link>
            <header className="mt-6 mb-10">
              <p className="font-mono text-xs text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes}{" "}
                min read
                {post.draft ? <span className="text-warning"> · draft</span> : null}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
              <p className="mt-3 text-lg leading-relaxed text-muted">{post.description}</p>
              <ul className="mt-4 flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/blog/tags/${tag}`}
                      className="font-mono text-xs text-accent hover:underline"
                    >
                      #{tag}
                    </Link>
                  </li>
                ))}
              </ul>
              {post.cover ? (
                <Image
                  src={post.cover}
                  alt=""
                  width={1200}
                  height={630}
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="mt-8 h-auto w-full rounded-lg border border-border"
                />
              ) : null}
            </header>
            <MdxContent source={post.body} />
          </article>

          {toc.length > 0 ? (
            <nav aria-label="On this page" className="order-first lg:order-last">
              <div className="lg:sticky lg:top-24">
                <p className="mb-2 font-mono text-xs text-accent">$ toc</p>
                <ul className="space-y-1 border-l border-border text-sm">
                  {toc.map((entry) => (
                    <li key={entry.id}>
                      <a
                        href={`#${entry.id}`}
                        className={cn(
                          "block py-1 text-muted hover:text-text",
                          entry.level === 2 ? "pl-3" : "pl-6",
                        )}
                      >
                        {entry.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          ) : null}
        </div>
      </Container>
    </main>
  );
}
