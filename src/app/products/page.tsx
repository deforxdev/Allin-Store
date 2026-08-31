import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/features/products/categories";
import { ProductGrid } from "@/features/products/components/product-grid";
import { getProducts } from "@/features/products/queries";
import { productListQuerySchema } from "@/features/products/schemas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Каталог",
};

export default async function CatalogPage(props: PageProps<"/products">) {
  const searchParams = await props.searchParams;
  const parsedQuery = productListQuerySchema.safeParse(searchParams);
  const activeCategory = parsedQuery.success ? parsedQuery.data.category : undefined;
  const products = await getProducts({ category: activeCategory });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <header>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Каталог</h1>
        <p className="mt-1 text-muted-foreground">Товарів: {products.length}</p>
      </header>

      <nav aria-label="Категорії" className="mt-6 flex flex-wrap gap-2">
        <CategoryPill href="/products" active={!activeCategory}>
          Всі
        </CategoryPill>
        {CATEGORIES.map((category) => (
          <CategoryPill
            key={category.slug}
            href={`/products?category=${category.slug}`}
            active={activeCategory === category.slug}
          >
            {category.label}
          </CategoryPill>
        ))}
      </nav>

      <FadeIn delay={0.05} className="mt-8">
        <ProductGrid products={products} />
      </FadeIn>
    </div>
  );
}

function CategoryPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Button asChild size="sm" variant={active ? "default" : "outline"} className="rounded-full">
      <Link href={href}>{children}</Link>
    </Button>
  );
}
