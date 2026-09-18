import { useCallback } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Product, ProductInput } from "./types";
import { normalizeProduct } from "./utils";

export type WishlistState = {
  items: Product[];

  toggleItem: (product: ProductInput) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
};

export const WISHLIST_STORAGE_KEY = "nimbusurf.wishlist";

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set) => ({
      items: [],

      toggleItem: (product) =>
        set((state) => {
          const normalizedProduct = normalizeProduct(product);

          const exists = state.items.some(
            (item) => item.id === normalizedProduct.id
          );

          if (exists) {
            return {
              items: state.items.filter(
                (item) => item.id !== normalizedProduct.id
              ),
            };
          }

          return {
            items: [normalizedProduct, ...state.items],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      clearWishlist: () =>
        set({
          items: [],
        }),
    }),
    {
      name: WISHLIST_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const selectWishlistItems = (state: WishlistState) => state.items;

export function useIsWishlisted(id: string) {
  return useWishlistStore(
    useCallback(
      (state) => state.items.some((item) => item.id === id),
      [id]
    )
  );
}
