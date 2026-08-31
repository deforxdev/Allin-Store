import { NextResponse } from "next/server";
import { getProductById } from "@/features/products/queries";

/** GET /api/products/[id] — один товар за id або 404. */
export async function GET(_request: Request, ctx: RouteContext<"/api/products/[id]">) {
  const { id } = await ctx.params;
  const product = await getProductById(id);

  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  return NextResponse.json(product);
}
