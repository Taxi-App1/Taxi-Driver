import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import LocationStore from "../../MobX/LocationStore";
import { colors } from "../../ReusableTools/css";
import { DrawerActions } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Map = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const {
    locationNotGranted,
    currentLocation,
    requestLocationPermissions,
    loading,
  } = LocationStore;

  useEffect(() => {
    requestLocationPermissions();
  }, []);

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

  if (loading) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color={colors.primaryYellow} />
        <Text>Loading map...</Text>
      </View>
    );
  }

  if (locationNotGranted) {
    // Handle the case where location permission is not granted
    return (
      <View style={styles.indicator}>
        <Text>Location permission not granted</Text>
      </View>
    );
  }

  if (!currentLocation) {
    // Handle the case where location data is not available
    return (
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color={colors.primary} />
        <Text>Fetching location</Text>
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
        ></MapView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Map;

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
