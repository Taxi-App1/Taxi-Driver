import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../ReusableTools/css";
import { Button } from "../../ReusableTools/Button";
import { i18nStore } from "../../MobX/I18nStore";
import Toast from "react-native-toast-message";
import { useEffect, useRef, useState } from "react";
import { authStore } from "../../MobX/AuthStore";
import { ReusableInput } from "../../ReusableTools/ReusableInput";
import { observer } from "mobx-react";

const SignIn = ({ navigation, route }) => {
  const { login, loginResponse, loading } = authStore;
  const { i18n, changeLocale, locale } = i18nStore;

  useEffect(() => {
    // Check if there are route.params for phone and password and set them as initial values.
    if (route.params) {
      const { phone, password } = route.params;
      setData({
        phone_number: phone || "",
        password: password || "",
      });
    }
  }, [route.params]);

  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    phone_number: "",
    password: "",
  });

  const passwordRef = useRef();

  const handleInputChange = (label, value) => {
    setData((prevData) => ({
      ...prevData,
      [label]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      if (!data.phone_number && !data.password) {
        Toast.show({
          type: "error",
          text1: `${i18n.t("toast.error.emptyFields")}`,
        });
        return;
      }

      setSubmitting(true);

      // Remove spaces and other non-digit characters from the phone number
      function removeSpaces(numberWithSpaces) {
        // Split the number by spaces and join them without spaces
        return numberWithSpaces.trim().split(" ").join("");
      }

      const numberWithoutSpaces = removeSpaces(data?.phone_number);

      await login({
        phone_number: numberWithoutSpaces,
        password: data.password,
      });

      setSubmitting(false);

      if (loginResponse && loginResponse.findDriver.has_access === false) {
        navigation.navigate(`otp`, {
          phone: data.phone_number,
          user_id: loginResponse.findDriver._id,
          login: true,
        });
      }
    } catch (error) {
      setSubmitting(false);

      console.log("handel submit sign up error", error.message);
      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled={false}
      >
        <View style={styles.contentView}>
          <View style={styles.roundedLogo}>
            <Image
              source={require("../../Images/Icons/Untitled-6.png")}
              style={styles.image}
              accessibilityLabel="Logo of the app"
            />
          </View>
          <View>
            <ReusableInput
              value={data.phone_number}
              label={`${i18n.t("signUpDriver.input.phone.label")}`}
              placeholder={`${i18n.t("signUpDriver.input.phone.placeholder")}`}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange("phone_number", value)}
              onSubmitEditing={() => passwordRef.current.focus()}
              isBlue={true}
            />

            <ReusableInput
              value={data.password}
              label={`${i18n.t("signUpDriver.input.password.label")}`}
              placeholder={`${i18n.t(
                "signUpDriver.input.password.placeholder"
              )}`}
              onChangeText={(value) => handleInputChange("password", value)}
              secureTextEntry={true}
              ref={passwordRef}
              onSubmitEditing={handleLogin}
              returnKeyType={"done"}
              isBlue={true}
            />
          </View>

          <View>
            <View className="flex-1 items-center mb-1 justify-center flex-row">
              <View className="h-[2px] bg-Primary w-[100px]" />

              <View className="bg-Primary w-[5px] h-[5px] rounded-full mx-2" />

              <View className="h-[2px] bg-Primary w-[100px]" />
            </View>

            <Button
              text={
                submitting
                  ? `${i18n.t("signUpDriver.button.submitting")}`
                  : `${i18n.t("signInDriver.signIn")}`
              }
              onPress={handleLogin}
              loading={loading}
              disabled={submitting}
            />

            <Button
              text={`${i18n.t("signInDriver.signUp")}`}
              onPress={() => navigation.navigate(`${i18n.t("signNav.signUp")}`)}
              disabled={submitting}
              isTransparent={true}
            />

            <TouchableOpacity onPress={() => navigation.navigate("recovery")}>
              <Text className="text-black text-center my-2 text-base">
                {`${i18n.t("signInDriver.forgotPass")}`}
              </Text>
            </TouchableOpacity>

            <View className="flex-row gap-1 items-center justify-center mt-1">
              <TouchableOpacity onPress={() => changeLocale("en")}>
                <Text
                  style={[locale.includes("en") && styles.activeLanguageButton]}
                >
                  English
                </Text>
              </TouchableOpacity>

              <Text>|</Text>

              <TouchableOpacity onPress={() => changeLocale("ar")}>
                <Text
                  style={[locale.includes("ar") && styles.activeLanguageButton]}
                >
                  العربية
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundView: {
    backgroundColor: "transparent",
    flex: 1,
  },
  contentView: {
    flex: 5,
    justifyContent: "space-evenly",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  roundedLogo: {
    width: 200,
    height: 100,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  activeLanguageButton: {
    color: colors.primary,
  },
});

export default observer(SignIn);
