import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Easing,
  KeyboardAvoidingView,
  Platform,
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
import DriverData from "../../Components/DriverData";
import MapViewDirections from "react-native-maps-directions";
import useFetch from "../../ReusableTools/UseFetch";

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

  const [distance, setDistance] = useState(0);

  const [duration, setDuration] = useState(0);

  const { data: orderNotEnded } = useFetch(
    `${process.env.EXPO_PUBLIC_API_URL}order/getDriverIsNotEndedOrder/${userInfo?._id}`
  );

  const mapRef = useRef(MapView);

  useEffect(() => {
    requestLocationPermissions();

    if (!orderData) {
      // fetchOrder();
    }
  }, []);

  useEffect(() => {
    if (orderData) {
      const traceRoute = () => {
        const userPickup = {
          latitude: USER_INITIAL_POSITION?.latitude,
          longitude: USER_INITIAL_POSITION?.longitude,
        };

        const userDestination = {
          latitude: USER_DESTINATION?.latitude,
          longitude: USER_DESTINATION?.longitude,
        };

        {
          Platform.OS === "android" &&
            mapRef?.current?.fitToCoordinates([userPickup, userDestination], {
              edgePadding,
            });
        }
      };

      traceRoute();

      const moveTo = async (position) => {
        const camera = await mapRef?.current?.getCamera();
        if (camera) {
          camera.center = position;
          mapRef?.current?.animateCamera(camera, { duration: 1000 });
        }
      };
      moveTo();
    }
  }, [orderData]);

  const edgePaddingValue = 70;

  const edgePadding = {
    top: edgePaddingValue,
    right: edgePaddingValue,
    bottom: edgePaddingValue,
    left: edgePaddingValue,
  };

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

        clearInterval(intervalId);

        Alert.alert(`${i18n.t("map.gotOrder")}`, `${i18n.t("map.askAccept")}`, [
          {
            text: `${i18n.t("cancel")}`,
            style: "cancel",
            onPress: async () => {
              try {
                await axios.put(
                  `${process.env.EXPO_PUBLIC_API_URL}order/updateOrder/${resp?.data?._id}`,
                  {
                    status: "Canceled",
                  }
                );

                fetchOrder();
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
                  `${process.env.EXPO_PUBLIC_API_URL}order/updateOrder/${resp?.data?._id}`,
                  {
                    status: "Accepted",
                  }
                );

                changeComponentHeight(380);

                setOrderData(resp?.data);

                clearInterval(intervalId);
              } catch (error) {
                console.log("accept error", error.message);
              }
            },
          },
        ]);
      } catch (error) {
        console.log("fetchOrderStatus error", error.message);
      }
    }, 2000); // Check the status every 2 seconds (adjust the interval as needed)
  };

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

  const USER_INITIAL_POSITION = {
    latitude: orderData?.fromCoordinates?.lat,
    longitude: orderData?.fromCoordinates?.long,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const USER_DESTINATION = {
    latitude: orderData?.toCoordinates?.lat,
    longitude: orderData?.toCoordinates?.long,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const traceRouteOnReady = (args) => {
    if (args) {
      setDistance(args.distance);

      setDuration(args.duration);
    }
  };

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
          {orderData && (
            <MapViewDirections
              origin={USER_INITIAL_POSITION}
              destination={USER_DESTINATION}
              apikey={process.env.EXPO_PUBLIC_MAP_API_KEY}
              strokeColor={colors.primary}
              strokeWidth={8}
              onReady={traceRouteOnReady}
            />
          )}
        </MapView>

        {orderData && (
          <Animated.View
            style={[
              styles.destinationContainer,
              { height: animatedHeightComponent },
            ]}
          >
            {!orderNotEnded?.message === "All orders are ended" ? (
              <DriverData
                driver_id={orderNotEnded?.driver_id}
                user_id={orderNotEnded?.user_id}
                _id={orderNotEnded?._id}
                destination={{ name: orderNotEnded?.to }}
                from={orderData.from}
              />
            ) : (
              <DriverData
                driver_id={orderData?.driver_id}
                user_id={orderData?.user_id}
                _id={orderData?._id}
                destination={{ name: orderData?.to }}
                from={orderData.from}
              />
            )}
          </Animated.View>
        )}
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
    zIndex: 1000,
  },
});
