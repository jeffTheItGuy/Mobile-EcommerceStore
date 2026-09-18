import { useCallback, useEffect, useState } from "react";
import { CategoriesData } from "../../../data";
import type { Category } from "../../../types/category";

/**
 * ─── SWAP TO REAL API ───────────────────────────────────
 * When your server is ready, replace the sample-data block
 * inside `fetchCategories` with:
 *
 *   const response = await fetch("https://your-api.com/categories");
 *   const data = await response.json();
 *   setCategories(data);
 *
 * ─────────────────────────────────────────────────────────
 */

type UseCategoriesReturn = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // ── SAMPLE DATA (simulates a 300 ms network call) ──
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCategories(CategoriesData);

      // ── REAL API (uncomment when ready) ────────────────
      // const response = await fetch("https://your-api.com/categories");
      // if (!response.ok) throw new Error("Failed to load categories");
      // const data = await response.json();
      // setCategories(data);
      // ────────────────────────────────────────────────────
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    isLoading,
    error,
    refetch: fetchCategories,
  };
}
