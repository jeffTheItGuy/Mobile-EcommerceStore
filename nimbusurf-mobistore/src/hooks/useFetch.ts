import { useCallback, useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit,
  enabled = true
) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: enabled,
    error: null,
  });

  const optionsKey = JSON.stringify(options ?? {});

  const fetchData = useCallback(async () => {
    if (!url) {
      return;
    }

    setState((previous) => ({
      ...previous,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "cache-control": "no-cache",
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();

      setState({
        data: json as T,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching data",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, optionsKey]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    fetchData();
  }, [enabled, fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}
