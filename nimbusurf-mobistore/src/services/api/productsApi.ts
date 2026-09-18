import {
  API_URLS,
  delay,
  fetchJson,
  normalizePrice,
  toId,
} from "./client";

import type { Product } from "../types";

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Rangriti Blue Printed A-Line Dress",
    img: "https://img.tatacliq.com/images/i6/437Wx649H/MP000000007288363_437Wx649H_20200716044236.jpeg",
    type: "women",
    price: 1079,
    brand: "Rangriti",
    offer: "40% Off",
  },
  {
    id: "2",
    name: "GAP Purple Full Length Shirt Dress",
    img: "https://img.tatacliq.com/images/i7/437Wx649H/MP000000009096587_437Wx649H_202103170225581.jpeg",
    type: "women",
    price: 2098,
    brand: "GAP",
    offer: "45% Off",
  },
  {
    id: "3",
    name: "PlusS Mustard Floral Print Dress",
    img: "https://img.tatacliq.com/images/i6/437Wx649H/MP000000005559578_437Wx649H_20200122195119.jpeg",
    type: "women",
    price: 809,
    brand: "PlusS",
    offer: "70% Off",
  },
  {
    id: "4",
    name: "PlusS Yellow Printed Below Knee Dress",
    img: "https://img.tatacliq.com/images/i3/437Wx649H/MP000000004774937_437Wx649H_20190512205828.jpeg",
    type: "women",
    price: 689,
    brand: "PlusS",
    offer: "70% Off",
  },
];

function toArray(data: unknown): any[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray((data as any).data)) {
    return (data as any).data;
  }

  return [];
}

function normalizeProduct(raw: any, index: number): Product {
  return {
    id: toId(raw?.id ?? index),
    name: String(raw?.name ?? "Product"),
    img: String(raw?.img ?? raw?.image ?? ""),
    type: raw?.type,
    price: normalizePrice(raw?.price),
    brand: raw?.brand_name ?? raw?.brand,
    offer: raw?.offer,
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    await delay(150);

    const data = await fetchJson<unknown>(API_URLS.PRODUCTS);
    const products = toArray(data).map(normalizeProduct);

    if (products.length > 0) {
      return products;
    }

    return fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getAvailableProducts(): Promise<Product[]> {
  try {
    await delay(150);

    const data = await fetchJson<unknown>(API_URLS.AVAILABLE_PRODUCTS);
    const products = toArray(data).map(normalizeProduct);

    if (products.length > 0) {
      return products;
    }

    return fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getProductById(
  id: string | number
): Promise<Product | null> {
  const products = await getProducts();

  return (
    products.find((product) => product.id === toId(id)) ?? null
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getProducts();
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return products;
  }

  return products.filter((product) => {
    const name = product.name.toLowerCase();
    const brand = product.brand?.toLowerCase() ?? "";
    const type = product.type?.toLowerCase() ?? "";

    return (
      name.includes(normalizedQuery) ||
      brand.includes(normalizedQuery) ||
      type.includes(normalizedQuery)
    );
  });
}
