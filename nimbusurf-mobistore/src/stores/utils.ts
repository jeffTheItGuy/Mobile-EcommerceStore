import type { Product, ProductInput } from "./types";

export function normalizePrice(price: string | number): number {
  if (typeof price === "number") {
    return Math.round(price);
  }

  const cleaned = String(price).replace(/[^0-9.]/g, "");
  const parsed = Number(cleaned);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.round(parsed);
}

export function normalizeProduct(product: ProductInput): Product {
  return {
    ...product,
    id: String(product.id),
    price: normalizePrice(product.price),
  };
}
