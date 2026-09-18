import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useAsyncStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function readStorage() {
      try {
        const storedValue = await AsyncStorage.getItem(key);

        if (!active) {
          return;
        }

        if (storedValue !== null) {
          setValue(JSON.parse(storedValue));
        } else {
          setValue(initialValue);
        }
      } catch {
        if (active) {
          setValue(initialValue);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    readStorage();

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setStoredValue = useCallback(
    async (newValue: T) => {
      setValue(newValue);

      try {
        await AsyncStorage.setItem(key, JSON.stringify(newValue));
      } catch (error) {
        console.warn("useAsyncStorage: failed to save value", error);
      }
    },
    [key]
  );

  const removeValue = useCallback(async () => {
    setValue(null);

    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.warn("useAsyncStorage: failed to remove value", error);
    }
  }, [key]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    isLoading,
  };
}
