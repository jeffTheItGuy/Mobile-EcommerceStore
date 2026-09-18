import { useFonts } from "expo-font";

export function useAppFonts() {
  const [fontsLoaded, error] = useFonts({
    "CarmenSans-Thin": require("../../assets/fonts/CarmenSans-Thin.ttf"),
    "CarmenSans-Regular": require("../../assets/fonts/CarmenSans-Regular.ttf"),
    "CarmenSans-SemiBold": require("../../assets/fonts/CarmenSans-SemiBold.ttf"),

    "Rubik-Regular": require("../../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Medium": require("../../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-SemiBold": require("../../assets/fonts/Rubik-SemiBold.ttf"),
    "Rubik-Bold": require("../../assets/fonts/Rubik-Bold.ttf"),
  });

  return {
    fontsLoaded,
    error,
  };
}
