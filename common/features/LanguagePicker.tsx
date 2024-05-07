import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Pressable, Text } from "react-native";
import * as Updates from "expo-updates";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LanguagePicker = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.on("languageChanged", async (locale) => {
      await AsyncStorage.setItem("locale", locale);
      I18nManager.allowRTL(locale === "ar");
      I18nManager.forceRTL(locale === "ar");
      await Updates.reloadAsync();
    });
  }, []);

  return (
    <Pressable
      onPress={() => {
        i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
      }}
    >
      <Text>Toggle language</Text>
    </Pressable>
  );
};

export default LanguagePicker;
