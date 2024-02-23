import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { colors, fonts } from "../../ReusableTools/css";
import { i18nStore } from "../../MobX/I18nStore";
import AccountRecovery from "./AccountRecovery";
import ChangePassword from "./ChangePassword";

const Stack = createStackNavigator();

const SignNav = () => {
  const { i18n } = i18nStore;

  return (
    <Stack.Navigator
      initialRouteName={`${i18n.t("signNav.signIn")}`}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.secondaryYellow,
        },
        headerTitleStyle: {
          fontFamily: fonts.regular,
        },
        cardStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "black",
      }}
    >
      <Stack.Screen
        name={`${i18n.t("signNav.signIn")}`}
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={`${i18n.t("signNav.signUp")}`}
        component={SignUp}
        options={{ headerShown: true }}
      />

      <Stack.Screen
        name="recovery"
        component={AccountRecovery}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />

      <Stack.Screen
        name={`changePass`}
        component={ChangePassword}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: "white",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SignNav;
