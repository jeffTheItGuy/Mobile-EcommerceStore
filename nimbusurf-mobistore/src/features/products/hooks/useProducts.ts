import { useCallback, useEffect, useState } from "react";
import { ProductsData } from "../../../data";
import type { Product } from "../../../types/product";

/**
 * Maps category display names to product `type` values.
 */
const CATEGORY_TYPE_MAP: Record<string, string> = {
  "Electronics": "electronics",
  "Apparel & Fashion": "apparel",
  "Home & Living": "home-living",
  "Health & Beauty": "health-beauty",
  "Sports & Outdoors": "sports-outdoors",
  "Deals & Clearance": "deals",
};

type UseProductsReturn = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useProducts(categoryType?: string): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (!categoryType) {
        // No category selected → return all products
        setProducts(ProductsData);
      } else {
        // Map the display name to the internal type key
        const typeKey =
          CATEGORY_TYPE_MAP[categoryType] ??
          categoryType.toLowerCase().replace(/[^a-z-]/g, "-");

        const filtered = ProductsData.filter(
          (product) => product.type === typeKey
        );
        setProducts(filtered);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load products"
      );
    } finally {
      setIsLoading(false);
    }
  }, [categoryType]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
}