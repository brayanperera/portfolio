import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { products } from "@/content";
import { ProductCard } from "./product-card";

export function Products() {
  return (
    <Section
      id="products"
      index="04"
      eyebrow="products · aakasa digital"
      title="Aakasa Digital"
      intro="Things I build and run myself."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={product.slug} index={index}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
