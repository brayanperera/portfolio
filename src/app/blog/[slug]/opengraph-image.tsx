import { profile } from "@/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { formatDate, getAllPosts, getPost } from "@/lib/posts";

export const alt = `Post by ${profile.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getAllPosts().map(({ slug }) => ({ slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgImage({
    eyebrow: "blog",
    title: post?.title ?? profile.name,
    subtitle: post ? `${profile.name} · ${formatDate(post.date)}` : profile.title,
  });
}
