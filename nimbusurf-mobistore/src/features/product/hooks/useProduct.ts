import { useMemo } from "react";
import type { ProductDetailParams } from "../../../types/product";

type UseProductReturn = {
  product: ProductDetailParams;
  discountValue: number;
  discountedPrice: number;
  originalPrice: number;
};

export function useProduct(params: ProductDetailParams): UseProductReturn {
  return useMemo(() => {
    const price = typeof params.price === "string"
      ? Math.round(Number(params.price.replace(/[^0-9.]/g, "")))
      : params.price;

    const discountValue = Math.round(price / 40);
    const discountedPrice = Math.round(price - discountValue);

    return {
      product: params,
      discountValue,
      discountedPrice,
      originalPrice: price,
    };
  }, [params]);
}
