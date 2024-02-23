import { StatusBar } from "expo-status-bar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import SignNav from "./app/Screens/Login/SignNav";
import DriverNav from "./app/Screens/Driver/DriverNav";
import { authStore } from "./app/MobX/AuthStore";
import { colors } from "./app/ReusableTools/css";
import { ActivityIndicatorBase, View } from "react-native";
import { observer } from "mobx-react";

export default App = observer(() => {
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
        <ActivityIndicatorBase size={"large"} color={colors.primaryYellow} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      {token ? <DriverNav /> : <SignNav />}
      <Toast />
    </NavigationContainer>
  );
});
