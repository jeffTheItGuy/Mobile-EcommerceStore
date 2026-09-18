import type { Product, ProductInput } from "./types";

export function normalizePrice(price: string | number): number {
  if (typeof price === "number") return Number(price.toFixed(2));
  const cleaned = String(price).replace(/[^0-9.]/g, "");
  const parsed = Number(cleaned);
  if (!Number.isFinite(parsed)) return 0;
  return Number(parsed.toFixed(2));
}

export function normalizeProduct(product: ProductInput): Product {
  return {
    ...product,
    id: String(product.id),
    price: normalizePrice(product.price),
  };
}