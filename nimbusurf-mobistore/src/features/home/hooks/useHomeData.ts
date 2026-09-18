import { useCallback, useEffect, useState } from "react";

import {
  API_CLOTHES,
  API_AVAILABLE_CLOTHES,
  API_SETTING,
} from "../../../constants";

import { TrendingDummyData } from "../../../data";

export type TrendingShoe = {
  id: number;
  name: string;
  img: any;
  bgColor: string;
  type: string;
  price: string;
  sizes: number[];
};

export type HomeProduct = {
  id: number;
  name: string;
  img: string;
  type?: string;
  price?: number | string;
};

type HomeDataState = {
  trending: TrendingShoe[];
  trendingClothes: HomeProduct[];
  recentlyViewed: HomeProduct[];
  isLoading: boolean;
  error: string | null;
};

const toArray = (data: unknown): HomeProduct[] => {
  if (Array.isArray(data)) {
    return data as HomeProduct[];
  }

  return [];
};

export function useHomeData() {
  const [state, setState] = useState<HomeDataState>({
    trending: TrendingDummyData as TrendingShoe[],
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
      const [trendingClothesResponse, recentlyViewedResponse] =
        await Promise.all([
          fetch(API_CLOTHES, API_SETTING).then((response) => {
            if (!response.ok) {
              throw new Error("Failed to load trending clothes");
            }

            return response.json();
          }),

          fetch(API_AVAILABLE_CLOTHES, API_SETTING).then((response) => {
            if (!response.ok) {
              throw new Error("Failed to load recently viewed items");
            }

            return response.json();
          }),
        ]);

      setState({
        trending: TrendingDummyData as TrendingShoe[],
        trendingClothes: toArray(trendingClothesResponse),
        recentlyViewed: toArray(recentlyViewedResponse),
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
