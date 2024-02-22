import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ReusableInput } from "../../ReusableTools/ReusableInput";
import { Button } from "../../ReusableTools/Button";
import Toast from "react-native-toast-message";
import { i18nStore } from "../../MobX/I18nStore";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../ReusableTools/css";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";

const SignUp = ({ navigation }) => {
  const { i18n } = i18nStore;

  const [imageData, setImageData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    car_type: "",
    car_color: "",
    password: "",
    confirm_password: "",
    image: "",
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    car_type: "",
    car_color: "",
    phone: "",
    password: "",
    confirm_password: "",
    image: "",
  });

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const carTypeRef = useRef();
  const carColorRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const inputFields = [
    {
      label: `${i18n.t("signUpDriver.input.first_name.label")}`,
      placeholder: `${i18n.t("signUpDriver.input.first_name.placeholder")}`,
      value: data.first_name,
      key: "first_name",
      error: error.first_name,
      ref: firstNameRef,
      onSubmitEditing: () => lastNameRef.current.focus(),
    },
    {
      label: `${i18n.t("signUpDriver.input.last_name.label")}`,
      placeholder: `${i18n.t("signUpDriver.input.last_name.placeholder")}`,
      value: data.last_name,
      key: "last_name",
      error: error.last_name,
      ref: lastNameRef,
      onSubmitEditing: () => phoneRef.current.focus(),
    },
    {
      label: `${i18n.t("signUpDriver.input.phone.label")}`,
      placeholder: `${i18n.t("signUpDriver.input.phone.placeholder")}`,
      value: data.phone,
      key: "phone",
      error: error.phone,
      keyboardType: "numeric",
      ref: phoneRef,
      onSubmitEditing: () => carTypeRef.current.focus(),
    },
    {
      label: `${i18n.t("signUpDriver.input.car_type.label")}`,
      placeholder: `${i18n.t("signUpDriver.input.car_type.placeholder")}`,
      value: data.car_type,
      key: "car_type",
      error: error.car_type,
      ref: carTypeRef,
      onSubmitEditing: () => carColorRef.current.focus(),
    },
    {
      label: `${i18n.t("signUpDriver.input.car_color.label")}`,
      placeholder: `${i18n.t("signUpDriver.input.car_color.placeholder")}`,
      value: data.car_color,
      key: "car_color",
      error: error.car_color,
      ref: carColorRef,
      onSubmitEditing: () => passwordRef.current.focus(),
    },
    {
      label: `${i18n.t("signUpDriver.input.password.label")}`,
      placeholder: `${i18n.t("signUpDriver.input.password.placeholder")}`,
      secureTextEntry: true,
      value: data.password,
      key: "password",
      error: error.password,
      ref: passwordRef,
      onSubmitEditing: () => confirmPasswordRef.current.focus(),
    },
    {
      label: `${i18n.t("signUpDriver.input.confirm_password.label")}`,
      placeholder: `${i18n.t(
        "signUpDriver.input.confirm_password.placeholder"
      )}`,
      secureTextEntry: true,
      value: data.confirm_password,
      key: "confirm_password",
      error: error.confirm_password,
      ref: confirmPasswordRef,
      onSubmitEditing: () => handleSubmit(),
      returnKeyType: "done",
    },
  ];

  const handleInputChange = (label, value) => {
    setData((prevData) => ({
      ...prevData,
      [label]: value,
    }));

    setError((prevErrors) => ({
      ...prevErrors,
      [label]: "", // Clear the error when the user starts typing again
    }));
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      title: "Select an image",
      allowsMultipleSelection: true,
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled) {
      setImageData(result.assets);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      if (
        !data.first_name &&
        !data.last_name &&
        !data.phone &&
        !data.car_type &&
        !data.car_color &&
        !data.password &&
        !data.confirm_password
      ) {
        Toast.show({
          type: "error",
          text1: `${i18n.t("toast.error.emptyFields")}`,
        });
        setSubmitting(false);
        return;
      }

      const emptyFields = [];

      if (!data.first_name) {
        setError((prevErrors) => ({
          ...prevErrors,
          first_name: `${i18n.t("signUpDriver.error.first_name.empty")}`,
        }));
        emptyFields.push("First Name");
      } else if (data.first_name.length < 3) {
        setError((prevErrors) => ({
          ...prevErrors,
          first_name: `${i18n.t("signUpDriver.error.first_name.length")}`,
        }));
        emptyFields.push("First Name");
      }

      if (!data.last_name) {
        setError((prevErrors) => ({
          ...prevErrors,
          last_name: `${i18n.t("signUpDriver.error.last_name.empty")}`,
        }));
        emptyFields.push("Last Name");
      } else if (data.last_name.length < 3) {
        setError((prevErrors) => ({
          ...prevErrors,
          last_name: `${i18n.t("signUpDriver.error.last_name.length")}`,
        }));
        emptyFields.push("First Name");
      }

      if (!data.car_type) {
        setError((prevErrors) => ({
          ...prevErrors,
          car_type: `${i18n.t("signUpDriver.error.car_type.empty")}`,
        }));
        emptyFields.push("Car Type");
      } else if (data.car_type.length < 3) {
        setError((prevErrors) => ({
          ...prevErrors,
          car_type: `${i18n.t("signUpDriver.error.car_type.length")}`,
        }));
        emptyFields.push("Car Type");
      }

      if (!data.car_color) {
        setError((prevErrors) => ({
          ...prevErrors,
          car_color: `${i18n.t("signUpDriver.error.car_color.empty")}`,
        }));
        emptyFields.push("Car Color");
      } else if (data.car_color.length < 3) {
        setError((prevErrors) => ({
          ...prevErrors,
          car_color: `${i18n.t("signUpDriver.error.car_color.length")}`,
        }));
        emptyFields.push("Car Color");
      }

      if (!data.password) {
        setError((prevErrors) => ({
          ...prevErrors,
          password: `${i18n.t("signUpDriver.error.password.emtpy")}`,
        }));

        emptyFields.push("Password");
      } else if (data.password.trim() !== "") {
        // Validate password format
        const passwordRegex = /^(?=.*[A-Za-z\d]).{8,}$/;
        if (!passwordRegex.test(data.password)) {
          setError((prevErrors) => ({
            ...prevErrors,
            password: `${i18n.t("signUpDriver.error.password.invalid")}`,
          }));
          emptyFields.push("Password");
        }
      }

      if (data.password !== data.confirm_password) {
        setError((prevErrors) => ({
          ...prevErrors,
          confirm_password: `${i18n.t(
            "signUpDriver.error.confirm_password.notMatch"
          )}`,
        }));
        emptyFields.push("Confirm Password");
      }

      if (!data.phone) {
        setError((prevErrors) => ({
          ...prevErrors,
          phone: `${i18n.t("signUpDriver.error.phone.empty")}`,
        }));
        emptyFields.push("Phone Number");
      } else if (data.phone.trim() !== "") {
        const phoneRegex = /^(70|71|76|78|79|81|03)[0-9]{6}$/;
        if (!phoneRegex.test(data.phone)) {
          setError((prevErrors) => ({
            ...prevErrors,
            phone: `${i18n.t("signUpDriver.error.phone.invalid")}`,
          }));
          emptyFields.push("Phone Number");
        }
      }

      if (emptyFields.length > 0) {
        Toast.show({
          type: "error",
          text1: `${i18n.t("toast.error.submissionFailedTitle")}`,
          text2: `${i18n.t("toast.error.submissionFailedSubTitle")}`,
        });
        setSubmitting(false);
        return;
      }

      const requestData = new FormData();

      requestData.append("first_name", data.first_name.trim());
      requestData.append("last_name", data.last_name.trim());
      requestData.append("phone_number", data.phone.trim());
      requestData.append("car_type", data.car_type.trim());
      requestData.append("car_color", data.car_color.trim());
      requestData.append("password", data.password.trim());

      if (imageData) {
        requestData.append(`image`, {
          uri: imageData[0].uri,
          type: "image/jpeg",
          name: `image.jpeg`,
        });
      }
      console.log(`${process.env.EXPO_PUBLIC_API_URL}driver/registerDriver`);
      const resp = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}driver/registerDriver`,
        requestData
      );

      navigation.navigate(`${i18n.t("signNav.signIn")}`, {
        phone: data.phone,
        password: data.password,
      });

      setData({
        first_name: "",
        last_name: "",
        phone: "",
        car_type: "",
        car_color: "",
        password: "",
        confirm_password: "",
      });

      Toast.show({
        type: "success",
        text1: `${i18n.t("toast.success.registered")}`,
      });

      setSubmitting(false);
    } catch (error) {
      console.log("handel submit sign up error", error);
      Toast.show({
        type: "error",
        text1: error.message,
      });
      setSubmitting(false);
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        className="my-4"
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
      >
        {inputFields.map((input, index) => {
          return (
            <ReusableInput
              key={index}
              label={input.label}
              placeholder={input.placeholder}
              ref={input.ref}
              value={input.value}
              onChangeText={(value) => handleInputChange(input.key, value)}
              secureTextEntry={input.secureTextEntry}
              keyboardType={input.keyboardType}
              error={input.error}
              onSubmitEditing={input.onSubmitEditing}
              returnKeyType={input.returnKeyType}
              autoCapitalize={input.autoCapitalize}
            />
          );
        })}

        <View className="grid grid-flow-row auto-rows-max items-center my-3 gap-3">
          <Text className="text-base">{`${i18n.t(
            "signUpDriver.addImage.text"
          )}`}</Text>

          <TouchableOpacity onPress={handleSelectImage} diasbled={submitting}>
            <View className="p-2" style={styles.selectButton}>
              <Text className="text-base font-regular">{`${i18n.t(
                "signUpDriver.addImage.textButton"
              )}`}</Text>
            </View>
          </TouchableOpacity>

          {imageData && (
            <View style={styles.imageContainer}>
              <Image
                key={imageData.uri}
                source={{ uri: imageData[0].uri }}
                style={styles.image}
              />
              <TouchableOpacity
                onPress={() => setImageData(null)}
                style={styles.removeIconContainer}
                disabled={submitting}
              >
                <MaterialIcons name="clear" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Button
          text={
            submitting
              ? `${i18n.t("signUpDriver.button.submitting")}`
              : `${i18n.t("signUpDriver.button.signup")}`
          }
          onPress={handleSubmit}
          disabled={submitting}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  selectButton: {
    borderRadius: 8,
    backgroundColor: colors.secondaryYellow,
  },
  imageContainer: {
    position: "relative",
    zIndex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  removeIconContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#Fa8072",
    borderRadius: 50,
    padding: 5,
  },
});
