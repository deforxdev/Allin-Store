"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "../cart-context";

/** Іконка кошика в шапці з живим лічильником позицій. */
export function CartLink() {
  const { totalItems } = useCart();

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      title="Кошик"
      aria-label={totalItems > 0 ? `Кошик, товарів: ${totalItems}` : "Кошик"}
    >
      <Link href="/cart" className="relative">
        <ShoppingCart aria-hidden />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
            >
              {totalItems > 9 ? "9+" : totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </Button>
  );
}
