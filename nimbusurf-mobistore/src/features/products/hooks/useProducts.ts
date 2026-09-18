import { useCallback, useEffect, useState } from "react";

import { ProductsDummyData } from "../../../data";
import type { Product } from "../../../types/product";

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
      // Simulate API call — replace with real fetch later
      await new Promise((resolve) => setTimeout(resolve, 300));

      let result: Product[] = ProductsDummyData as Product[];

      if (categoryType) {
        result = result.filter(
          (item) =>
            item.type.toLowerCase() === categoryType.toLowerCase() ||
            categoryType.toLowerCase().includes(item.type.toLowerCase())
        );
      }

      setProducts(result);
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
