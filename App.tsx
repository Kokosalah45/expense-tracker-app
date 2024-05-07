import { StatusBar } from "expo-status-bar";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import "./i18n";
import LanguagePicker from "./features/LanguagePicker";

SplashScreen.preventAutoHideAsync();

const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const Main = () => {
  const [isReady, setIsReady] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsReady(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  return isReady ? (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <Text>
        {t("hello")} {t("world")}
      </Text>
      <LanguagePicker />
      <StatusBar style="auto" />
    </View>
  ) : (
    <></>
  );
};

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
