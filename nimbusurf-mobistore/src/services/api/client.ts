export const API_URLS = {
  PRODUCTS:
    process.env.EXPO_PUBLIC_API_CLOTHES_URL ??
    "https://api.npoint.io/968ab3964e88978f2d51",

  AVAILABLE_PRODUCTS:
    process.env.EXPO_PUBLIC_API_AVAILABLE_CLOTHES_URL ??
    "https://api.npoint.io/68cb83657d7616957c3f",
};

const DEFAULT_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "cache-control": "no-cache",
};

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
};

export async function fetchJson<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 10000);

  try {
    const response = await fetch(url, {
      method: options.method ?? "GET",
      headers: {
        ...DEFAULT_HEADERS,
        ...options.headers,
      },
      body: options.body,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export function normalizePrice(value: unknown): number {
  if (typeof value === "number") {
    return Math.round(value);
  }

  if (!value) {
    return 0;
  }

  const cleaned = String(value).replace(/[^\d.]/g, "");
  const parsed = Number(cleaned);

  if (!Number.isFinite(parsed)) {
    return 0;
  }

  return Math.round(parsed);
}

export function toId(value: string | number): string {
  return String(value);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
