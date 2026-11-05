import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge, StatusPill } from "@/components/ui/status-pill";
import type { Product } from "@/content";

export function ProductScreenshot({ product, sizes }: { product: Product; sizes: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded border border-border bg-surface-2">
      {product.screenshot ? (
        <Image
          src={product.screenshot}
          alt={`${product.name} screenshot`}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      ) : (
        <div aria-hidden="true" className="flex h-full items-center justify-center p-4">
          <p className="truncate font-mono text-sm text-muted">
            <span className="text-accent">$</span> open {product.slug}
          </p>
        </div>
      )}
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex h-full flex-col">
      <ProductScreenshot
        product={product}
        sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">
          <Link href={`/projects/${product.slug}`} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        {product.status ? <StatusPill status={product.status} /> : null}
      </div>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.tagline}</p>
      {product.stack.length > 0 ? (
        <ul aria-label="Stack" className="mt-4 flex flex-wrap gap-1.5">
          {product.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      ) : null}
      {product.url ? (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex min-h-6 items-center gap-1.5 font-mono text-xs text-accent hover:underline"
        >
          {product.url.replace("https://", "")}
          <ExternalLink aria-hidden="true" className="size-3.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : null}
    </Card>
  );
}
