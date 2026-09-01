"use client";

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { CartItem, CartProduct } from "./types";

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "add"; product: CartProduct }
  | { type: "remove"; productId: string }
  | { type: "setQuantity"; productId: string; quantity: number }
  | { type: "clear" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existingItem = state.items.find((item) => item.id === action.product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] };
    }
    case "remove":
      return { items: state.items.filter((item) => item.id !== action.productId) };
    case "setQuantity": {
      const quantity = Math.max(1, action.quantity);
      return {
        items: state.items.map((item) =>
          item.id === action.productId ? { ...item, quantity } : item,
        ),
      };
    }
    case "clear":
      return { items: [] };
  }
}

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: CartProduct) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

/**
 * Кошик живе тільки в пам'яті сторінки (без БД і localStorage) — за рішенням Етапу 2.
 * Після перезавантаження сторінки кошик спорожняє.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const value = useMemo<CartContextValue>(() => {
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items: state.items,
      totalItems,
      totalPrice,
      addItem: (product) => dispatch({ type: "add", product }),
      removeItem: (productId) => dispatch({ type: "remove", productId }),
      setQuantity: (productId, quantity) => dispatch({ type: "setQuantity", productId, quantity }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart має використовуватися всередині <CartProvider>.");
  }
  return context;
}
