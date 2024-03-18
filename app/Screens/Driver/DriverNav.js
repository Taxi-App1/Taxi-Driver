import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { i18nStore } from "../../MobX/I18nStore";
import { colors, fonts } from "../../ReusableTools/css";
import DrawerContent from "../../Components/DrawerContent";
import Map from "./Map";
import HeaderTitle from "../../ReusableTools/HeaderTitle";
import Orders from "./Orders";
import Setting from "./Settings";
import SwitchLang from "./SwitchLang";
import About from "./About";
import Support from "./Support";
import Chat from "./Chat";
import OTP from "./OTP";
import EditProfile from "./EditProfile";
import { useEffect } from "react";
import axios from "axios";
import { authStore } from "../../MobX/AuthStore";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const DriverNav = () => {
  const { i18n } = i18nStore;

  const { userInfo } = authStore;

  useEffect(() => {
    if (userInfo.has_access !== true) {
      const getDriverData = async () => {
        try {
          await axios.get(
            `${process.env.EXPO_PUBLIC_API_URL}driver/getDriverByPhone${userInfo?.phone_number}`
          );
        } catch (error) {
          console.log("Error getting driver data", error.message);
        }
      };

      getDriverData();
    }
  }, [userInfo]);

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

        <Drawer.Screen
          name={i18n.t("driverNav.screens.rides")}
          component={Orders}
        />

        <Drawer.Screen
          name={i18n.t("driverNav.screens.settings")}
          component={Setting}
        />

        <Drawer.Screen
          name={`${i18n.t("driverNav.screens.editProfile")}`}
          component={EditProfile}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: () => {
          return (
            <HeaderTitle
              title={route.name}
              isChat={
                route.name === `${i18n.t("userNav.screens.chat")}`
                  ? true
                  : false
              }
            />
          );
        },
      })}
    >
      <Stack.Screen
        name="Back"
        component={DrawerScreens}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={i18n.t("driverNav.screens.switchLang")}
        component={SwitchLang}
      />

      <Stack.Screen
        name={i18n.t("driverNav.screens.about")}
        component={About}
      />

      <Stack.Screen
        name={i18n.t("driverNav.screens.support")}
        component={Support}
      />

      <Stack.Screen
        name={`${i18n.t("driverNav.screens.chat")}`}
        component={Chat}
      />

      <Stack.Screen
        name={`otp`}
        component={OTP}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default DriverNav;

const styles = StyleSheet.create({});
