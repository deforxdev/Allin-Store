"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "../cart-context";

export function CartView() {
  const { items, totalItems, totalPrice, removeItem, setQuantity, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="font-heading text-2xl font-semibold">Кошик порожній</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          Додайте техніку або софт із каталогу — вони з’являться тут.
        </p>
        <Button asChild className="mt-8">
          <Link href="/products">До каталогу</Link>
        </Button>
      </div>
    );
  }

  return (
    <FadeIn className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">Кошик</h1>
          <p className="mt-1 text-muted-foreground">Товарів: {totalItems}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={clear}>
          <Trash2 aria-hidden />
          Очистити
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-4 rounded-xl p-3 ring-1 ring-foreground/10 sm:flex-row sm:items-center sm:p-4"
            >
              <Link
                href={`/products/${item.id}`}
                className="relative block h-24 w-full shrink-0 overflow-hidden rounded-lg sm:w-32"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${item.id}`}
                  className="line-clamp-2 leading-snug font-medium transition-colors hover:text-muted-foreground"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatPrice(item.price)} / шт.
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="inline-flex items-center rounded-lg border">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={item.quantity <= 1}
                    onClick={() => setQuantity(item.id, item.quantity - 1)}
                    aria-label={`Зменшити кількість: ${item.name}`}
                  >
                    <Minus aria-hidden />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium" aria-live="polite">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    aria-label={`Збільшити кількість: ${item.name}`}
                  >
                    <Plus aria-hidden />
                  </Button>
                </div>
                <p className="w-24 text-right font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Видалити: ${item.name}`}
                >
                  <Trash2 aria-hidden />
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl p-6 ring-1 ring-foreground/10 lg:sticky lg:top-20">
          <h2 className="font-heading text-lg font-semibold">Разом</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Позицій</dt>
              <dd>{items.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Товарів</dt>
              <dd>{totalItems}</dd>
            </div>
            <div className="flex justify-between border-t pt-3 text-base font-semibold">
              <dt>До сплати</dt>
              <dd>{formatPrice(totalPrice)}</dd>
            </div>
          </dl>
          <Button size="lg" className="mt-6 h-11 w-full" disabled>
            Оформити замовлення
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Оформлення та оплата з’являться на наступних етапах.
          </p>
        </aside>
      </div>
    </FadeIn>
  );
}
