import { useMemo } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { CartItem, ProductInput } from "./types";
import { normalizeProduct } from "./utils";

export type CartState = {
  items: CartItem[];
  addItem: (product: ProductInput, quantity?: number) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

export const CART_STORAGE_KEY = "nimbusurf.cart";

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, quantity = 1) =>
        set((state) => {
          const normalizedProduct = normalizeProduct(product);

          const existingItem = state.items.find(
            (item) => item.id === normalizedProduct.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === normalizedProduct.id
                  ? {
                      ...item,
                      quantity: item.quantity + quantity,
                    }
                  : item
              ),
            };
          }

          return {
            items: [
              {
                ...normalizedProduct,
                quantity,
              },
              ...state.items,
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.max(1, item.quantity - 1),
                }
              : item
          ),
        })),

      clearCart: () =>
        set({
          items: [],
        }),
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const selectCartItems = (state: CartState) => state.items;

export const selectCartCount = (state: CartState) =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export const selectCartDiscount = (state: CartState) =>
  Math.round(selectCartSubtotal(state) * 0.1);

export const selectCartShipping = (state: CartState) =>
  selectCartSubtotal(state) > 0 ? 0 : 0;

export const selectCartTotal = (state: CartState) =>
  Math.max(
    selectCartSubtotal(state) -
      selectCartDiscount(state) +
      selectCartShipping(state),
    0
  );

export function useCartTotals() {
  const items = useCartStore(selectCartItems);

  return useMemo(() => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const discount = Math.round(subtotal * 0.1);
    const shipping = subtotal > 0 ? 0 : 0;
    const total = Math.max(subtotal - discount + shipping, 0);
    const count = items.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return {
      count,
      subtotal,
      discount,
      shipping,
      total,
    };
  }, [items]);
}
