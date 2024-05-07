import { StatusBar } from "expo-status-bar";
import { Suspense, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { Providers } from "@/Providers";

import "./i18n";
import OnBoardingScreen from "./screens/OnBoardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppNavigator from "./navigation/app";
import AuthNavigator from "./navigation/auth";

import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

type User = {
  id: string;
  name: string;
  email: string;
};

const getUserInfo = async (accessToken: string): Promise<User | null> => {
  return null;
};
const refreshToken = async (
  refreshToken: string
): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  return null;
};

type UnAuthedState = {
  state: "unauthenticated";
  userData: null;
};

type AuthedState = {
  state: "authenticated";
  userData: User;
};

type LoadingState = {
  state: "loading";
  userData: null;
};

type AuthState = UnAuthedState | AuthedState | LoadingState;

const Root = () => {
  const [isOnboarded, setIsOnboarded] = useState<null | boolean>(null);
  const [authState, setAuthState] = useState<AuthState>({
    state: "loading",
    userData: null,
  });

  const isReady = isOnboarded !== null && authState.state !== "loading";

  useEffect(() => {
    const prepare = async () => {
      const isOnboarded = await AsyncStorage.getItem("is_onboarded");
      if (isOnboarded === null) {
        setIsOnboarded(false);
        setAuthState({ state: "unauthenticated", userData: null });
      } else {
        const authData = await AsyncStorage.getItem("auth_data");

        if (!authData) {
          setAuthState({ state: "unauthenticated", userData: null });
          setIsOnboarded(true);
          return;
        }

        const serializedAuthData = JSON.parse(authData || "{}") as {
          accessToken: string;
          refreshToken: string;
        };

        const user = (await getUserInfo(
          serializedAuthData.accessToken
        )) as User | null;

        if (!user) {
          const newAuthData = await refreshToken(
            serializedAuthData.refreshToken
          );

          if (!newAuthData) {
            setAuthState({
              state: "unauthenticated",
              userData: null,
            });
            setIsOnboarded(true);
            return;
          }

          await AsyncStorage.setItem("auth_data", JSON.stringify(newAuthData));

          const user = (await getUserInfo(
            serializedAuthData.accessToken
          )) as User;

          setAuthState({
            state: "authenticated",
            userData: user,
          });

          setIsOnboarded(true);
          return;
        }

        setAuthState({
          state: "authenticated",
          userData: user,
        });
      }
    };
    prepare();
  }, []);

  const onLayoutView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutView} style={styles.container}>
      {!isOnboarded ? (
        <OnBoardingScreen
          setOnboardingComplete={async () => {
            await AsyncStorage.setItem("is_onboarded", "true");
            setIsOnboarded(true);
          }}
        />
      ) : (
        <NavigationContainer>
          {authState.state === "authenticated" ? (
            <AppNavigator />
          ) : (
            <AuthNavigator />
          )}
        </NavigationContainer>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <Providers>
      <Suspense>
        <Root />
      </Suspense>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
