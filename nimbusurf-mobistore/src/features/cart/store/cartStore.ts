import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type CartItem = {
  id: string;
  name: string;
  img: string;
  type?: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

const toItemId = (id: string | number) => String(id);

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const id = toItemId(item.id);

          const existingItem = state.items.find(
            (cartItem) => cartItem.id === id
          );

          if (existingItem) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.id === id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + (item.quantity || 1),
                    }
                  : cartItem
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                id,
                quantity: item.quantity || 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== toItemId(id)),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === toItemId(id)
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
            item.id === toItemId(id)
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
      name: "nimbusurf-cart-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
