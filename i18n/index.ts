import i18next, { Modules } from "i18next";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

const languageDetectorOptions: Modules["languageDetector"] = {
  type: "languageDetector",
  detect: async () => {
    let locale = getLocales()[0].languageCode || "en";
    const storedLocale = await AsyncStorage.getItem("locale");

    if (storedLocale) {
      locale = storedLocale;
    }

    return locale;
  },
  async: true,
};

const languageDetector = () => languageDetectorOptions;

i18next
  .use(initReactI18next)
  .use(languageDetector())
  .init({
    fallbackLng: "en",
    compatibilityJSON: "v3",
    resources: {
      en: {
        translation: {
          hello: "Hello",
          world: "World",
        },
      },
      ar: {
        translation: {
          hello: "مرحبا",
          world: "العالم",
        },
      },
    },
  });

export default i18next;
