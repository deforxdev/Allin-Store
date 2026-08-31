import type { Product as PrismaProduct } from "@/generated/prisma/client";

/**
 * Доменна модель товару.
 * Джерело правди — Prisma-схема (prisma/schema.prisma); тип оновлюється разом із нею
 * командою `npm run db:push`.
 */
export type Product = PrismaProduct;
