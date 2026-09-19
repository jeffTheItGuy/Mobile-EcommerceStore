// src/features/home/hooks/useHomeData.ts
import { useCallback, useEffect, useState } from "react";
import { ProductsData, TrendingData } from "../../../data";
import type { Product } from "../../../types/product";

export type TrendingProduct = {
  id: number;
  name: string;
  img: any;
  bgColor: string;
  type: string;
  price: string;
  discount?: string;
};

export type HomeProduct = {
  id: number | string;
  name: string;
  img: string;
  type?: string;
  price?: number | string;
  brand?: string;
  offer?: string;
};

type HomeDataState = {
  trending: TrendingProduct[];
  trendingClothes: HomeProduct[];
  recentlyViewed: HomeProduct[];
  isLoading: boolean;
  error: string | null;
};

const toHomeProduct = (product: Product): HomeProduct => ({
  id: product.id,
  name: product.name,
  img: product.img,
  type: product.type,
  price: product.price,
  brand: product.brand_name ?? product.brand,
  offer: product.offer,
});

export function useHomeData() {
  const [state, setState] = useState<HomeDataState>({
    trending: TrendingData as TrendingProduct[],
    trendingClothes: [],
    recentlyViewed: [],
    isLoading: true,
    error: null,
  });

  const loadHomeData = useCallback(async () => {
    setState((previous) => ({
      ...previous,
      isLoading: true,
      error: null,
    }));

    try {
      // Small delay keeps the existing loading UX; no network calls anymore.
      await new Promise((resolve) => setTimeout(resolve, 250));

      setState({
        trending: TrendingData as TrendingProduct[],
        trendingClothes: ProductsData.filter(
          (product) => product.type === "apparel"
        ).map(toHomeProduct),
        recentlyViewed: ProductsData.filter(
          (product) =>
            product.type === "home-living" || product.type === "deals"
        ).map(toHomeProduct),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((previous) => ({
        ...previous,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while loading home data",
      }));
    }
  }, []);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  return {
    ...state,
    refetch: loadHomeData,
  };
}