import { makeObservable, observable, action } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager, NativeModules, Platform } from "react-native";
import { I18n } from "i18n-js";
import * as Updates from "expo-updates";
import { translations } from "../Localization.js";

class I18nStore {
  i18n = null;
  locale = null;

  constructor() {
    makeObservable(this, {
      i18n: observable,
      locale: observable,
      loadInitialLocale: action.bound,
      changeLocale: action.bound,
      setLocale: action.bound,
    });

    this.loadInitialLocale();
  }

  setLocale(locale) {
    this.locale = locale;
  }

  setI18n(i18n) {
    this.i18n = i18n;
  }

  async loadInitialLocale() {
    const storedLang = await AsyncStorage.getItem("pickmuLang");

    const i18nInstance = new I18n(translations);

    const systemLanguage = (
      (Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
        : NativeModules.I18nManager.localeIdentifier) || ""
    ).substring(0, 2);

    if (storedLang) {
      i18nInstance.locale = storedLang;
      this.locale = storedLang;

      if (storedLang.includes("ar") && I18nManager.isRTL === false) {
        // Enable right-to-left layout for Arabic
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
        // Reload the app to apply the layout changes
      } else if (storedLang.includes("en") && I18nManager.isRTL === true) {
        // Disable right-to-left layout for English
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        // Reload the app to apply the layout changes
      }
    } else {
      i18nInstance.locale = systemLanguage;
      this.locale = systemLanguage;
    }

    i18nInstance.enableFallback = true;
    this.i18n = i18nInstance;
  }

  async changeLocale(locale) {
    if (this.i18n) {
      this.setLocale(locale);
    }

    if (locale.includes("ar")) {
      await AsyncStorage.setItem("pickmuLang", "ar");
      if (I18nManager.isRTL === false) {
        Updates.reloadAsync();
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(true);
      }
    }
    if (locale.includes("en")) {
      await AsyncStorage.setItem("pickmuLang", "en");
      if (I18nManager.isRTL === true) {
        Updates.reloadAsync();
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
      }
    }

    this.setLocale(locale);
  }
}

export const i18nStore = new I18nStore();
