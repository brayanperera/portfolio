import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { TagLinks } from "@/components/blog/tag-links";
import { Container } from "@/components/ui/container";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on cloud architecture, SRE and building SaaS products by Brayan Perera.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main id="main" className="py-14 sm:py-20">
      <Container className="max-w-3xl">
        <p className="font-mono text-xs text-accent">{"// blog"}</p>
        <h1 className="mt-3 mb-6 text-4xl font-semibold tracking-tight">Writing</h1>
        <div className="mb-8">
          <TagLinks tags={getAllTags()} />
        </div>
        <PostList posts={getAllPosts()} />
      </Container>
    </main>
  );
}
