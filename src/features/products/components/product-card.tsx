import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { categoryLabel } from "@/features/products/categories";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="h-full gap-0 py-0">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden"
        aria-label={product.name}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
      </Link>
      <CardContent className="flex flex-1 flex-col gap-2 p-4">
        <Badge variant="secondary" className="w-fit">
          {categoryLabel(product.category)}
        </Badge>
        <CardTitle className="line-clamp-2">
          <Link
            href={`/products/${product.id}`}
            className="transition-colors hover:text-muted-foreground"
          >
            {product.name}
          </Link>
        </CardTitle>
        <p className="mt-auto text-lg font-semibold">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-3">
        <AddToCartButton className="w-full" />
      </CardFooter>
    </Card>
  );
}
