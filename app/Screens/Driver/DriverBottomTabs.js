import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

// import components
import Orders from "./Orders";
import Profile from "./Profile";
import { colors } from "../../ReusableTools/css";

const DriverBottomTabs = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator
      initialRouteName="Orders"
      screenOptions={() => ({
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: colors.primary,
        },
      })}
    >
      <BottomTab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="reorder" size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "gray",
        }}
      />
    </BottomTab.Navigator>
  );
};

export default DriverBottomTabs;

const styles = StyleSheet.create({});
