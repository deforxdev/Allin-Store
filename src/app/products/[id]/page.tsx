import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryLabel } from "@/features/products/categories";
import { AddToCartButton } from "@/features/products/components/add-to-cart-button";
import { getProductById } from "@/features/products/queries";
import { formatPrice } from "@/lib/format-price";

export const dynamic = "force-dynamic";

const PRODUCT_PERKS = [
  "Гарантія 12 місяців",
  "Доставка 1–2 дні по Україні",
  "Офіційні поставки та ліцензії",
] as const;

export async function generateMetadata(props: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const product = await getProductById(id);
  return { title: product?.name ?? "Товар не знайдено" };
}

export default async function ProductPage(props: PageProps<"/products/[id]">) {
  const { id } = await props.params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <FadeIn className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
        <Link href="/products">
          <ArrowLeft aria-hidden />
          До каталогу
        </Link>
      </Button>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-foreground/10">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit">
            {categoryLabel(product.category)}
          </Badge>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-8">
            <AddToCartButton size="lg" className="h-11 px-6" />
          </div>

          <ul className="mt-8 space-y-2 border-t pt-6 text-sm text-muted-foreground">
            {PRODUCT_PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-2">
                <span aria-hidden className="size-1.5 rounded-full bg-foreground/30" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeIn>
  );
}
