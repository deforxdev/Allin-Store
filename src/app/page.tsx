import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/features/products/components/product-grid";
import { getProducts } from "@/features/products/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      <Hero />
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
        <FadeIn className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
              Популярні товари
            </h2>
            <p className="mt-1 text-muted-foreground">
              Техніка та софт, який частіше за все купують у Allin-Store.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/products">Усі товари</Link>
          </Button>
        </FadeIn>
        <FadeIn delay={0.1} className="mt-8">
          <ProductGrid products={featuredProducts} />
        </FadeIn>
      </section>
    </>
  );
}
