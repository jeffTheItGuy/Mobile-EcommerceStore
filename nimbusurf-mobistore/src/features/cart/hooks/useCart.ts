import { useMemo } from "react";
import { useCartStore } from "../../../stores/cartStore";
import type { CartItem, ProductInput } from "../../../stores/types";

export type AddToCartProduct = {
  id: string | number;
  name: string;
  img: string;
  type?: string;
  price: number | string;
  quantity?: number;
};

const parsePrice = (price: number | string): number => {
  if (typeof price === "number") return Number(price.toFixed(2));
  const cleaned = String(price).replace(/[^0-9.]/g, "");
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) return 0;
  return Number(parsed.toFixed(2));
};

export const formatCurrency = (value: number): string => {
  return `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export function useCart() {
  const {
    items,
    addItem: storeAddItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCartStore();

  const addItem = (product: AddToCartProduct) => {
    const productInput: ProductInput = {
      id: product.id,
      name: product.name,
      img: product.img,
      type: product.type,
      price: parsePrice(product.price),
    };
    storeAddItem(productInput, product.quantity || 1);
  };

  const count = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [items]);

  const discount = Number((subtotal * 0.1).toFixed(2));
  const shipping = subtotal > 0 ? 0 : 0;
  const total = Math.max(subtotal - discount + shipping, 0);

  return {
    items,
    count,
    subtotal,
    discount,
    shipping,
    total,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  };
}