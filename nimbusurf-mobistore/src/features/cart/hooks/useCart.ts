import { useMemo } from "react";

import {
  useCartStore,
  type CartItem,
} from "../store/cartStore";

export type AddToCartProduct = {
  id: string | number;
  name: string;
  img: string;
  type?: string;
  price: number | string;
  quantity?: number;
};

const parsePrice = (price: number | string): number => {
  if (typeof price === "number") {
    return Math.round(price);
  }

  const cleaned = String(price).replace(/[^0-9.]/g, "");
  const parsed = Number(cleaned);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.round(parsed);
};

export const formatCurrency = (value: number): string => {
  return `₹${value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
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
    storeAddItem({
      id: String(product.id),
      name: product.name,
      img: product.img,
      type: product.type,
      price: parsePrice(product.price),
      quantity: product.quantity || 1,
    });
  };

  const count = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }, [items]);

  /**
   * Sample discount logic.
   * Replace this with your real coupon/pricing logic later.
   */
  const discount = Math.round(subtotal * 0.1);

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
