import { useCallback } from "react";

export function usePriceFormatter() {
  const parsePrice = useCallback((price?: number | string): number => {
    if (typeof price === "number") {
      return Math.round(price);
    }

    if (!price) {
      return 0;
    }

    const cleaned = String(price)
      .replace(/[₹$,\s]/g, "")
      .replace(/[^\d.]/g, "");

    const parsed = Number(cleaned);

    if (!Number.isFinite(parsed)) {
      return 0;
    }

    return Math.round(parsed);
  }, []);

  const formatNumber = useCallback((value: number): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }, []);

  const formatPrice = useCallback(
    (price?: number | string): string => {
      const parsed = parsePrice(price);

      return `₹${formatNumber(parsed)}`;
    },
    [parsePrice, formatNumber]
  );

  return {
    parsePrice,
    formatPrice,
  };
}
