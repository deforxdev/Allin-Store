import type { Product } from "@/types/product";

/** Дані товару, які зберігаються в кошику (знімок на момент додавання). */
export type CartProduct = Pick<Product, "id" | "name" | "price" | "imageUrl">;

/** Позиція кошика: товар + кількість (мін. 1; кількість змінюється степером). */
export type CartItem = CartProduct & { quantity: number };
