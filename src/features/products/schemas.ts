import { z } from "zod";

/** Параметри GET /api/products та сторінки каталогу (/products?category=...). */
export const productListQuerySchema = z.object({
  category: z.string().min(1).max(64).optional(),
});

export type ProductListQuery = z.infer<typeof productListQuerySchema>;
