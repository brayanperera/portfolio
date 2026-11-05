import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import type { ComponentProps } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { Diagram } from "./diagram";

function MdxImage({ src, alt, width, height }: ComponentProps<"img">) {
  if (typeof src !== "string") return null;
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={Number(width) || 1200}
      height={Number(height) || 675}
      sizes="(min-width: 768px) 720px, 100vw"
      className="my-6 h-auto w-full rounded-lg border border-border"
    />
  );
}

const components = { Callout, Diagram, img: MdxImage, pre: CodeBlock };

export async function MdxContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: false }],
        ],
      },
    },
  });
  return <div className="prose-body">{content}</div>;
}
