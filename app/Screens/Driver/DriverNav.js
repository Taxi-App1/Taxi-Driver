import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DriverBottomTabs from "./DriverBottomTabs";

const DriverNav = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={DriverBottomTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DriverNav;

const styles = StyleSheet.create({});
