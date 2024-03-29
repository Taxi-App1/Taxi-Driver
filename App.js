import { StatusBar } from "expo-status-bar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import SignNav from "./app/Screens/Login/SignNav";
import DriverNav from "./app/Screens/Driver/DriverNav";
import { authStore } from "./app/MobX/AuthStore";

export default function App() {
  const { token, loading } = authStore;

  const [fontsLoaded] = useFonts({
    "Agrandi-Regular": require("./app/Fonts/Agrandir-Regular.otf"),
    "Agrandi-TextBold": require("./app/Fonts/Agrandir-TextBold.otf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={colors.primaryYellow} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      {token ? <DriverNav /> : <SignNav />}
      <Toast />
    </NavigationContainer>
  );
}
