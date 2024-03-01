import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { authStore } from "../../MobX/AuthStore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { i18nStore } from "../../MobX/I18nStore";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import profile from "../../Images/Icons/profilee.png";
import * as ImagePicker from "expo-image-picker";
import { ReusableInput } from "../../ReusableTools/ReusableInput";
import { Button } from "../../ReusableTools/Button";
import Toast from "react-native-toast-message";
import axios from "axios";

const EditProfile = () => {
  const { i18n } = i18nStore;

  const { userInfo, setUserInfo } = authStore;

  const [data, setData] = useState({
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    phone: userInfo?.phone_number,
    password: "",
    car_model: userInfo?.car_model,
    car_year: userInfo?.car_year,
    plate_number: userInfo?.plate_number,
    car_type: userInfo?.car_type,
    car_color: userInfo?.car_color,
  });

  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    image: "",
    car_model: "",
    car_year: "",
    plate_number: "",
    car_type: "",
    car_color: "",
  });

  const [saving, setSaving] = useState(false);

  const [imageData, setImageData] = useState(null);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const carModelRef = useRef();
  const carYearRef = useRef();
  const carColorRef = useRef();
  const carTypeRef = useRef();
  const plateNumberRef = useRef();

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

  const handleRemoveImage = () => {
    setImageData(null);
  };

  const inputFields = [
    {
      placeholder: `${i18n.t("signUpDriver.input.first_name.placeholder")}`,
      value: data.first_name,
      key: "first_name",
      error: error.first_name,
      ref: firstNameRef,
      onSubmitEditing: () => lastNameRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.last_name.placeholder")}`,
      value: data.last_name,
      key: "last_name",
      error: error.last_name,
      ref: lastNameRef,
      onSubmitEditing: () => emailRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.phone.placeholder")}`,
      value: data.phone,
      key: "phone",
      error: error.phone,
      keyboardType: "numeric",
      ref: phoneRef,
      onSubmitEditing: () => passwordRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.password.placeholder")}`,
      secureTextEntry: true,
      value: data.password,
      key: "password",
      error: error.password,
      ref: passwordRef,
      onSubmitEditing: () => carTypeRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.car_type.placeholder")}`,
      value: data.car_type,
      key: "car_type",
      error: error.car_type,
      ref: carTypeRef,
      onSubmitEditing: () => carModelRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.model.placeholder")}`,
      value: data.car_model,
      key: "car_model",
      error: error.car_model,
      ref: carModelRef,
      onSubmitEditing: () => carYearRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.year.placeholder")}`,
      value: data.car_year,
      key: "car_year",
      error: error.car_year,
      ref: carYearRef,
      onSubmitEditing: () => carColorRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.car_color.placeholder")}`,
      value: data.car_color,
      key: "car_color",
      error: error.car_color,
      ref: carColorRef,
      onSubmitEditing: () => plateNumberRef.current.focus(),
    },
    {
      placeholder: `${i18n.t("signUpDriver.input.plate_number.placeholder")}`,
      value: data.plate_number,
      key: "plate_number",
      error: error.plate_number,
      ref: plateNumberRef,
      onSubmitEditing: () => handleEdit(),
    },
  ];

  const handleEdit = async () => {
    const emptyFields = [];

    if (!data.first_name) {
      setError((prevErrors) => ({
        ...prevErrors,
        first_name: `${i18n.t("signUpUser.error.first_name.empty")}`,
      }));
      emptyFields.push("First Name");
    } else if (data.first_name.length < 3) {
      setError((prevErrors) => ({
        ...prevErrors,
        first_name: `${i18n.t("signUpUser.error.first_name.length")}`,
      }));
      emptyFields.push("First Name");
    }

    if (!data.last_name) {
      setError((prevErrors) => ({
        ...prevErrors,
        last_name: `${i18n.t("signUpUser.error.last_name.empty")}`,
      }));
      emptyFields.push("Last Name");
    } else if (data.last_name.length < 3) {
      setError((prevErrors) => ({
        ...prevErrors,
        last_name: `${i18n.t("signUpUser.error.last_name.length")}`,
      }));
      emptyFields.push("First Name");
    }

    if (!data.phone) {
      setError((prevErrors) => ({
        ...prevErrors,
        phone: `${i18n.t("signUpUser.error.phone.empty")}`,
      }));
      emptyFields.push("Phone Number");
    } else if (data.phone.trim() !== "") {
      const phoneRegex = /^(70|71|76|78|79|81|03)[0-9]{6}$/;
      if (!phoneRegex.test(data.phone)) {
        setError((prevErrors) => ({
          ...prevErrors,
          phone: `${i18n.t("signUpUser.error.phone.invalid")}`,
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

      setSaving(false);
      return;
    }

    try {
      setSaving(true);

      const requestData = new FormData();

      requestData.append("first_name", data.first_name.trim());

      requestData.append("last_name", data.last_name.trim());

      requestData.append("phone_number", data.phone.trim());

      requestData.append("password", data.password.trim());

      requestData.append("car_type", data.car_type.trim());

      requestData.append("car_color", data.car_color.trim());

      requestData.append("car_color", data.car_model.trim());

      requestData.append("car_color", data.car_year.trim());

      requestData.append("car_color", data.plate_number.trim());

      if (imageData) {
        const currentDate = new Date();

        const timestamp = currentDate.getTime(); // Get current timestamp in milliseconds

        const fileName = `image_${timestamp}.jpg`;

        requestData.append(`image`, {
          uri: imageData[0].uri,
          type: "image/jpeg",
          name: fileName,
        });
      } else if (!userInfo?.image && !imageData) {
        requestData.append(`image`, null);
      }

      const resp = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}driver/updateDriver/${userInfo?._id}`,
        requestData
      );

      setSaving(false);

      Toast.show({
        type: "success",
        text1: `${i18n.t("editProfile.dataSaved")}`,
      });

      setUserInfo(resp.data);
    } catch (error) {
      console.log("handel edit error", error);
      Toast.show({
        type: "error",
        text1: error.message,
      });
      setSaving(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
    >
      <View className="m-4">
        <View className="flex-row items-center justify-center gap-5 mb-3">
          {userInfo.image?.includes("uploads") || imageData ? (
            <View style={styles.imageBorder}>
              <Image
                source={{
                  uri: !imageData
                    ? `${process.env.EXPO_PUBLIC_API_URL}${userInfo?.image}`
                    : imageData[0]?.uri,
                }}
                style={styles.image}
              />

              <TouchableOpacity
                onPress={handleRemoveImage}
                style={styles.removeIconContainer}
                disabled={saving}
              >
                <MaterialIcons name="clear" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageBorder} className="bg-F2F2F2">
              <TouchableOpacity
                onPress={handleSelectImage}
                style={styles.removeIconContainer}
                disabled={saving}
              >
                <AntDesign name="plus" size={24} color="white" />
              </TouchableOpacity>

              <Image
                source={profile}
                className="w-[50px] h-[50px]"
                style={{ resizeMode: "contain" }}
              />
            </View>
          )}
        </View>

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
              isBlue={true}
            />
          );
        })}
      </View>

      <Button
        text={
          saving
            ? `${i18n.t("editProfile.saving")}`
            : `${i18n.t("editProfile.save")}`
        }
        onPress={handleEdit}
      />
    </KeyboardAwareScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 100,
  },
  removeIconContainer: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#3D89F0",
    borderRadius: 50,
    padding: 5,
  },
  imageBorder: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 10,
    borderColor: "#99C1F7",
    alignItems: "center",
    justifyContent: "center",
  },
});
