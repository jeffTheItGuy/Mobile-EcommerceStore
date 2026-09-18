import { useCallback } from "react";

export function usePriceFormatter() {
  const parsePrice = useCallback((price?: number | string): number => {
    if (!price) return 0;
    const cleaned = String(price)
      .replace(/[$₹,\s]/g, "")
      .replace(/[^\d.]/g, "");
    const parsed = Number(cleaned);
    if (!Number.isFinite(parsed)) return 0;
    return Number(parsed.toFixed(2));
  }, []);

  const formatNumber = useCallback((value: number): string => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }, []);

  const formatPrice = useCallback(
    (price?: number | string): string => {
      const parsed = parsePrice(price);
      return `$${formatNumber(parsed)}`;
    },
    [parsePrice, formatNumber]
  );

  return { parsePrice, formatPrice };
}