import { NextResponse } from "next/server";
import { getProducts } from "@/features/products/queries";
import { productListQuerySchema } from "@/features/products/schemas";

/** GET /api/products?category=... — список товарів (за потреби відфільтрований за категорією). */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedQuery = productListQuerySchema.safeParse(Object.fromEntries(searchParams));

  if (!parsedQuery.success) {
    return NextResponse.json(
      { error: "Invalid query parameters.", issues: parsedQuery.error.issues },
      { status: 400 },
    );
  }

  const products = await getProducts(parsedQuery.data);
  return NextResponse.json(products);
}
