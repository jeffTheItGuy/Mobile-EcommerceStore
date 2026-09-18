import * as SecureStore from "expo-secure-store";

export async function getSecureItem(
  key: string
): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.warn("SecureStore getItem failed:", error);
    return null;
  }
}

export async function setSecureItem(
  key: string,
  value: string
): Promise<void> {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.warn("SecureStore setItem failed:", error);
  }
}

export async function removeSecureItem(key: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.warn("SecureStore deleteItem failed:", error);
  }
}
