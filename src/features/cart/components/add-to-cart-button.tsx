"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../cart-context";
import type { CartProduct } from "../types";

type AddToCartButtonProps = Omit<ComponentProps<typeof Button>, "onClick" | "type"> & {
  product: CartProduct;
};

/** Додає товар до кошика (в пам'яті). Повторний клік збільшує кількість. */
export function AddToCartButton({ product, children, ...props }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  return (
    <Button
      type="button"
      {...props}
      onClick={() => {
        addItem(product);
        setJustAdded(true);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setJustAdded(false), 1500);
      }}
    >
      {justAdded ? <Check aria-hidden /> : <ShoppingCart aria-hidden />}
      {children ?? (justAdded ? "Додано" : "В кошик")}
    </Button>
  );
}
