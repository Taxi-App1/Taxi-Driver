import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { colors } from "../../ReusableTools/css";
import { DrawerActions } from "@react-navigation/native";
import { observer } from "mobx-react";
import { authStore } from "../../MobX/AuthStore";
import { i18nStore } from "../../MobX/I18nStore";
import LocationStore from "../../MobX/LocationStore";
import axios from "axios";
import DriverData from "../../Components/UserData";

const { width, height } = Dimensions.get("window");

const Map = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const { userInfo } = authStore;

  const { i18n } = i18nStore;

  const {
    locationNotGranted,
    currentLocation,
    requestLocationPermissions,
    loading,
  } = LocationStore;

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    requestLocationPermissions();
    changeComponentHeight(380);

    // fetchOrder();
  }, []);

  const changeComponentHeight = (height) => {
    Animated.timing(animatedHeightComponent, {
      toValue: height,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeightComponent = useRef(new Animated.Value(height)).current;

  const fetchOrder = async () => {
    const intervalId = setInterval(async () => {
      try {
        const resp = await axios.get(
          `${process.env.EXPO_PUBLIC_API_URL}order/getOrderForDriver/${userInfo?._id}`
        );

        if (resp?.data?.status === 404) {
          return;
        }

        Alert.alert("Your got an order", "Do you want to take it?", [
          {
            text: `${i18n.t("cancel")}`,
            style: "cancel",
            onPress: async () => {
              try {
                await axios.put(
                  `${process.env.EXPO_PUBLIC_API_URL}/order/updateOrder/${resp?.data?._id}`,
                  {
                    status: "Canceled",
                  }
                );
              } catch (error) {
                console.log("error in cancel order", error.message);
              }
            },
          },
          {
            text: `${i18n.t("accept")}`,
            onPress: async () => {
              try {
                await axios.put(
                  `${process.env.EXPO_PUBLIC_API_URL}/order/updateOrder/${resp?.data?._id}`,
                  {
                    status: "Accepted",
                  }
                );

                changeComponentHeight(380);

                setOrderData(resp?.data);

                clearInterval(intervalId);
              } catch (error) {}
            },
          },
        ]);
      } catch (error) {
        console.log("fetchOrderStatus error", error.message);

        clearInterval(intervalId);
      }
    }, 2000); // Check the status every 5 seconds (adjust the interval as needed)
  };

  const mapRef = useRef(MapView);

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.02;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const INITIAL_POSITION = {
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  // Loading state while waiting for location data
  if (loading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color={colors.primaryYellow} />
        <Text>{i18n.t("map.loadingMap")}</Text>
      </View>
    );
  }

  if (locationNotGranted) {
    // Handle the case where location permission is not granted
    return (
      <View style={styles.indicator}>
        <Text>{i18n.t("map.notGranted")}</Text>
      </View>
    );
  }

  if (!currentLocation) {
    // Handle the case where location data is not available
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color={colors.primary} />
        <Text>{i18n.t("map.fetchLocation")}</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginTop: insets.top }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled={false}
    >
      <View style={styles.container}>
        <TouchableOpacity
          className="absolute top-[2%] left-[2%] z-10 bg-lightBlue p-3 rounded-full"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <View>
            <Entypo name="menu" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_POSITION}
          showsUserLocation={true}
          followsUserLocation={true}
          style={styles.map}
          ref={mapRef}
          mapType="standard"
        >
          <Animated.View
            style={[
              styles.destinationContainer,
              { height: animatedHeightComponent },
            ]}
          >
            {orderData && (
              <DriverData
                driver_id={orderData?.driver_id}
                user_id={orderData?.user_id}
                destination={{ name: orderData?.to }}
              />
            )}
          </Animated.View>
        </MapView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default observer(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
    marginTop: 0,
    position: "relative",
  },
  searchContainer: {
    position: "absolute",
    width: "100%",
    backgroundColor: colors.primary,
    top: 0,
    padding: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  input: {
    borderColor: "#888",
    borderWidth: 1,
    position: "absolute",
  },
  destinationContainer: {
    width: "100%",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: "auto",
    backgroundColor: "white",
  },
});
