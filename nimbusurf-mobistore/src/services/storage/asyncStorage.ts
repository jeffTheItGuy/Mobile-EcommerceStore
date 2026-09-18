import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.warn("AsyncStorage getItem failed:", error);
    return null;
  }
}

export async function setItem(
  key: string,
  value: string
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.warn("AsyncStorage setItem failed:", error);
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn("AsyncStorage removeItem failed:", error);
  }
}

export async function clearStorage(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.warn("AsyncStorage clear failed:", error);
  }
}

export async function getJsonItem<T>(
  key: string
): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn("AsyncStorage getJsonItem failed:", error);
    return null;
  }
}

export async function setJsonItem<T>(
  key: string,
  value: T
): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn("AsyncStorage setJsonItem failed:", error);
  }
}
