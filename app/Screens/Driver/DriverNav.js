import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { i18nStore } from "../../MobX/I18nStore";
import { colors, fonts } from "../../ReusableTools/css";
import DrawerContent from "../../Components/DrawerContent";
import Map from "./Map";
import HeaderTitle from "../../ReusableTools/HeaderTitle";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DriverNav = () => {
  const { i18n } = i18nStore;

  const DrawerScreens = ({}) => {
    return (
      <Drawer.Navigator
        initialRouteName="Map"
        screenOptions={({ route }) => ({
          headerTintColor: colors.secondary,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            fontFamily: fonts.regular,
          },
          drawerStyle: {
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "#E3E5EB",
          },
          drawerActiveBackgroundColor: colors.primary,
          header: () => {
            return (
              <HeaderTitle
                title={route.name}
                isDrawer={true}
                isChat={
                  route.name === `${i18n.t("userNav.screens.chat")}`
                    ? true
                    : false
                }
              />
            );
          },
          sceneContainerStyle: {
            backgroundColor: "#FFFFFF",
          },
        })}
        drawerContent={() => <DrawerContent />}
      >
        <Drawer.Screen
          name="Map"
          component={Map}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={DrawerScreens}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DriverNav;

const styles = StyleSheet.create({});
