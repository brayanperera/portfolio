import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/blog/post-list";
import { TagLinks } from "@/components/blog/tag-links";
import { Container } from "@/components/ui/container";
import { getAllTags, getPostsByTag } from "@/lib/posts";

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged #${tag}`,
    description: `Posts by Brayan Perera tagged ${tag}.`,
    alternates: { canonical: `/blog/tags/${tag}` },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <main id="main" className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="font-mono text-xs text-accent">{"// blog"}</p>
        <h1 className="mt-3 mb-6 text-4xl font-semibold tracking-tight">#{tag}</h1>
        <div className="mb-8">
          <TagLinks tags={getAllTags()} active={tag} />
        </div>
        <PostList posts={posts} />
      </Container>
    </main>
  );
}
