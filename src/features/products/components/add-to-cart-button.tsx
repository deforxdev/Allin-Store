import type { ComponentProps } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

type AddToCartButtonProps = ComponentProps<typeof Button>;

// TODO(cart): логіка додавання в кошик з'явиться на наступному етапі.
export function AddToCartButton({ children, ...props }: AddToCartButtonProps) {
  return (
    <Button type="button" {...props}>
      <ShoppingCart aria-hidden />
      {children ?? "В кошик"}
    </Button>
  );
}
