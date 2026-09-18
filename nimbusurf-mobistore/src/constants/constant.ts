export const API_CLOTHES =
  process.env.EXPO_PUBLIC_API_CLOTHES_URL ??
  "https://api.npoint.io/968ab3964e88978f2d51";

export const API_AVAILABLE_CLOTHES =
  process.env.EXPO_PUBLIC_API_AVAILABLE_CLOTHES_URL ??
  "https://api.npoint.io/68cb83657d7616957c3f";

export const API_SETTING: RequestInit = {
  method: "GET",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};
