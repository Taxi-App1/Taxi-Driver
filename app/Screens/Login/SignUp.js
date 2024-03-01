import { useState, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ReusableInput } from "../../ReusableTools/ReusableInput";
import { Button } from "../../ReusableTools/Button";
import Toast from "react-native-toast-message";
import { i18nStore } from "../../MobX/I18nStore";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../ReusableTools/css";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";

const SignUp = ({ navigation }) => {
  const { i18n } = i18nStore;

  const [imageData, setImageData] = useState(null);

  const [paymentImage, setPaymentImage] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [nextPhase, setNextPhase] = useState(1);

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    car_type: "",
    car_color: "",
    password: "",
    confirm_password: "",
    image: "",
    car_model: "",
    car_year: "",
    plate_number: "",
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
    car_model: "",
    car_year: "",
    plate_number: "",
  });

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const carTypeRef = useRef();
  const carColorRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  let inputFields = [];

  if (nextPhase === 1) {
    inputFields.push(
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
        onSubmitEditing: () => phoneRef.current.focus(),
      },
      {
        placeholder: `${i18n.t("signUpDriver.input.phone.placeholder")}`,
        value: data.phone,
        key: "phone",
        error: error.phone,
        keyboardType: "numeric",
        ref: phoneRef,
        onSubmitEditing: () => carTypeRef.current.focus(),
      },
      {
        placeholder: `${i18n.t("signUpDriver.input.password.placeholder")}`,
        secureTextEntry: true,
        value: data.password,
        key: "password",
        error: error.password,
        ref: passwordRef,
        onSubmitEditing: () => confirmPasswordRef.current.focus(),
      },
      {
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
      }
    );
  }

  if (nextPhase === 2) {
    inputFields = [
      {
        placeholder: `${i18n.t("signUpDriver.input.car_type.placeholder")}`,
        value: data.car_type,
        key: "car_type",
        error: error.car_type,
        ref: carTypeRef,
        onSubmitEditing: () => carColorRef.current.focus(),
      },
      {
        placeholder: `${i18n.t("signUpDriver.input.model.placeholder")}`,
        value: data.car_model,
        key: "car_type",
        error: error.car_model,
        ref: carTypeRef,
        onSubmitEditing: () => carColorRef.current.focus(),
      },
      {
        placeholder: `${i18n.t("signUpDriver.input.year.placeholder")}`,
        value: data.car_year,
        key: "car_type",
        error: error.car_year,
        ref: carTypeRef,
        onSubmitEditing: () => carColorRef.current.focus(),
      },
      {
        placeholder: `${i18n.t("signUpDriver.input.car_color.placeholder")}`,
        value: data.car_color,
        key: "car_color",
        error: error.car_color,
        ref: carColorRef,
        onSubmitEditing: () => passwordRef.current.focus(),
      },
      {
        placeholder: `${i18n.t("signUpDriver.input.plate_number.placeholder")}`,
        value: data.plate_number,
        key: "car_type",
        error: error.plate_number,
        ref: carTypeRef,
        onSubmitEditing: () => carColorRef.current.focus(),
      },
    ];
  }

  if (nextPhase === 3) {
    inputFields.push();
  }

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

  const handleSelectImage = async (type, method) => {
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
      if (type === "payment") {
        setPaymentImage(result.assets);

        setPaymentMethod(method);
        return;
      }
      setImageData(result.assets);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const requestData = new FormData();

      requestData.append("first_name", data.first_name.trim());

      requestData.append("last_name", data.last_name.trim());

      requestData.append("phone_number", data.phone.trim());

      requestData.append("password", data.password.trim());

      requestData.append("car_type", data.car_type.trim());

      requestData.append("car_color", data.car_color.trim());

      requestData.append("car_model", data.car_model.trim());

      requestData.append("car_year", data.car_year.trim());

      requestData.append("plate_number", data.plate_number.trim());

      if (imageData) {
        requestData.append(`image`, {
          uri: imageData[0].uri,
          type: "image/jpeg",
          name: `image.jpeg`,
        });
      }

      if (paymentImage) {
        requestData.append(`payment_image`, {
          uri: paymentImage[0].uri,
          type: "image/jpeg",
          name: `image.jpeg`,
        });

        requestData.append(`payment_method`, paymentMethod);

        requestData.append(`expire_date`, new Date.now());

        requestData.append(`has_access`, true);
      }

      await axios.post(
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

  const goToNextPhase = (num) => {
    if (nextPhase === 1) {
      if (
        !data.first_name ||
        !data.last_name ||
        !data.phone ||
        !data.password ||
        !data.confirm_password
      ) {
        Toast.show({
          type: "error",
          text1: `${i18n.t("toast.error.emptyFields")}`,
        });

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

      setNextPhase(2);
    }

    if (nextPhase == 2) {
      if (
        !data.car_type ||
        !data.car_model ||
        !data.car_year ||
        !data.plate_number ||
        !data.car_color
      ) {
        Toast.show({
          type: "error",
          text1: `${i18n.t("toast.error.emptyFields")}`,
        });

        const types = ["Car", "Bicycle", "Moto", "TukTuk"];

        if (!types.includes(data.car_type)) {
          setError((prevErrors) => ({
            ...prevErrors,
            car_type: `${i18n.t("signUpDriver.error.car_type.type")}`,
          }));
        }

        return;
      }

      setNextPhase(3);
    }
  };

  const paymentsMethods = [
    {
      image: require("../../Images/OMT.png"),
      color: "#F5DB77",
      method: "OMT",
    },
    {
      image: require("../../Images/Whish.png"),
      color: "#f96969",
      method: "WHISH",
    },
    {
      image: require("../../Images/MoneyGram.png"),
      color: "#F92A2A",
      method: "MONEYGRAM",
    },
    {
      image: require("../../Images/ria.jpg"),
      color: "#FF9429",
      method: "RIA",
    },
  ];

  return (
    <>
      <KeyboardAwareScrollView
        className="my-4"
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={20}
      >
        {nextPhase !== 3 && (
          <View className="bg-secondary p-2 w-[120px] h-[120px] mb-5 self-center rounded-full mt-4">
            <Image
              source={require("../../Images/Icons/129881051-open-bank-account-concept-icon-savings-idea-thin-line-illustration-striking-deal-signing-agreement.png")}
              style={styles.imageLogo}
              accessibilityLabel="image access"
            />
          </View>
        )}

        {inputFields?.map((input, index) => {
          return (
            <ReusableInput
              key={index}
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
              isBlue={true}
            />
          );
        })}

        {nextPhase === 1 && (
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
        )}

        {nextPhase == 3 && (
          <View className="items-center mx-10">
            <View className="w-full items-center pb-5 mb-2 border-b-2">
              <Text className="font-regular text-[25px] text-accent ">
                Payment
              </Text>
            </View>

            <Text className="font-regular text-[15px]">
              For Wobble service activation, pay $20 to the name Ibrahem Abou
              Heit, and phone number 81/ 076 395.
            </Text>

            {!paymentImage &&
              paymentsMethods.map((pay, index) => {
                return (
                  <View
                    key={index}
                    className={`my-2 flex-row items-center py-2 px-5
                  rounded-2xl`}
                    style={{ backgroundColor: `${pay.color}` }}
                  >
                    <Image
                      source={pay.image}
                      style={{ resizeMode: "contain" }}
                      className="w-[70px] h-[70px] rounded-full"
                    />

                    <TouchableOpacity
                      onPress={() => handleSelectImage("payment", pay.method)}
                      className="flex-row bg-white p-1 ml-5 rounded-full items-center"
                    >
                      <Text className="font-regulartext-[12px]">
                        Upload your receipt here
                      </Text>

                      <AntDesign name="caretdown" size={14} color="red" />
                    </TouchableOpacity>
                  </View>
                );
              })}

            {paymentImage && (
              <View style={styles.imageContainer}>
                <Image
                  key={paymentImage.uri}
                  source={{ uri: paymentImage[0].uri }}
                  style={styles.image}
                />
                <TouchableOpacity
                  onPress={() => setPaymentImage(null)}
                  style={styles.removeIconContainer}
                  disabled={submitting}
                >
                  <MaterialIcons name="clear" size={20} color="black" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {nextPhase !== 1 && nextPhase !== 3 && (
          <TouchableOpacity onPress={() => setNextPhase(nextPhase - 1)}>
            <View className="flex-row justify-center items-center">
              <AntDesign name="arrowleft" size={18} color="black" />

              <Text className="text-[18px] font-regular ml-2">Go Back</Text>
            </View>
          </TouchableOpacity>
        )}

        {nextPhase !== 3 && (
          <Button text={i18n.t("next")} onPress={() => goToNextPhase()} />
        )}

        {nextPhase === 3 && (
          <>
            <TouchableOpacity onPress={handleSubmit}>
              <View className="flex-row justify-center items-center">
                <AntDesign
                  name="arrowleft"
                  size={18}
                  color="black"
                  style={{ transform: [{ rotate: "180deg" }] }}
                />

                <Text className="text-[18px] font-regular ml-2">Skip</Text>
              </View>
            </TouchableOpacity>

            <Button
              text={
                submitting
                  ? `${i18n.t("signUpDriver.button.submitting")}`
                  : `${i18n.t("signUpDriver.button.signup")}`
              }
              onPress={handleSubmit}
              disabled={submitting}
            />
          </>
        )}
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
  imageLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
