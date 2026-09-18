import {
  getJsonItem,
  removeItem,
  setJsonItem,
} from "../storage/asyncStorage";

import type { CartItem, Product } from "../types";

const CART_STORAGE_KEY = "nimbusurf.cart";

export async function getCart(): Promise<CartItem[]> {
  const cart = await getJsonItem<CartItem[]>(CART_STORAGE_KEY);

  return cart ?? [];
}

export async function saveCart(items: CartItem[]): Promise<void> {
  await setJsonItem(CART_STORAGE_KEY, items);
}

export async function addToCart(
  product: Product,
  quantity = 1
): Promise<CartItem[]> {
  const cart = await getCart();

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
          }
        : item
    );

    await saveCart(updatedCart);

    return updatedCart;
  }

  const newItem: CartItem = {
    id: product.id,
    name: product.name,
    img: product.img,
    type: product.type,
    price: product.price,
    quantity,
  };

  const updatedCart = [...cart, newItem];

  await saveCart(updatedCart);

  return updatedCart;
}

export async function updateCartItemQuantity(
  productId: string,
  quantity: number
): Promise<CartItem[]> {
  const cart = await getCart();

  const updatedCart = cart
    .map((item) =>
      item.id === productId
        ? {
            ...item,
            quantity,
          }
        : item
    )
    .filter((item) => item.quantity > 0);

  await saveCart(updatedCart);

  return updatedCart;
}

export async function removeFromCart(
  productId: string
): Promise<CartItem[]> {
  const cart = await getCart();

  const updatedCart = cart.filter((item) => item.id !== productId);

  await saveCart(updatedCart);

  return updatedCart;
}

export async function clearCart(): Promise<void> {
  await removeItem(CART_STORAGE_KEY);
}
