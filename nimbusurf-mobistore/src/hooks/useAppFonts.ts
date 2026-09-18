import {
  useFonts,
  Rubik_400Regular,
  Rubik_500Medium,
  Rubik_600SemiBold,
  Rubik_700Bold,
} from "@expo-google-fonts/rubik";

export function useAppFonts() {
  const [fontsLoaded, error] = useFonts({
    "Rubik-Regular": Rubik_400Regular,
    "Rubik-Medium": Rubik_500Medium,
    "Rubik-SemiBold": Rubik_600SemiBold,
    "Rubik-Bold": Rubik_700Bold,
  });

  return {
    fontsLoaded,
    error,
  };
}
