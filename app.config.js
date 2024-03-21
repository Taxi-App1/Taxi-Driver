export default {
  expo: {
    name: "Wobble Driver",
    slug: "Wobble-Driver",
    version: "1.0.3",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "cover",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.pickmeup01.WobbleDriver",
      infoPlist: {
        ExpoLocalization_supportsRTL: true,
      },
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_MAP_API_KEY,
      },
      buildNumber: "4",
    },
    android: {
      package: "com.pickmeup01.WobbleDriver",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_MAP_API_KEY,
        },
      },
      versionCode: 1,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-localization"],
    extra: {
      supportsRTL: true,
      eas: {
        projectId: "d4b9a07a-0ef0-40db-8d56-42c41c8dfaa9",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    updates: {
      url: "https://u.expo.dev/d4b9a07a-0ef0-40db-8d56-42c41c8dfaa9",
    },
  },
};
