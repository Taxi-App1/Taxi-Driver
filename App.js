import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import SignNav from "./app/Screens/Login/SignNav";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Agrandi-Regular": require("./app/Fonts/Agrandir-Regular.otf"),
    "Agrandi-TextBold": require("./app/Fonts/Agrandir-TextBold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size={"large"} color={colors.primaryYellow} />
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <SignNav />
    </NavigationContainer>
  );
}
