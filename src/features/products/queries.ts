import { cache } from "react";
import { db } from "@/lib/db";
import type { ProductListQuery } from "./schemas";

// cache() дедуплікує однакові запити в межах одного рендера сторінки.
export const getProducts = cache(async (query: ProductListQuery = {}) => {
  return db.product.findMany({
    where: query.category ? { category: query.category } : undefined,
    orderBy: { createdAt: "asc" },
  });
});

export const getProductById = cache(async (id: string) => {
  return db.product.findUnique({ where: { id } });
});
