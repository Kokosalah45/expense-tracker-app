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
type CholorScheme = "dark" | "light" | "system";
const Root = () => {
  const [isOnboarded, setIsOnboarded] = useState<null | boolean>(null);
  const [authState, setAuthState] = useState<AuthState>({
    state: "loading",
    userData: null,
  });

  const [userColorScheme, setUserColorScheme] = useState<CholorScheme | null>(
    null
  );

  const isReady =
    isOnboarded !== null &&
    userColorScheme !== null &&
    authState.state !== "loading";

  useEffect(() => {
    const prepare = async () => {
      const defaultIsOnboarded = "false";
      const defaultSavedCholorSchema: CholorScheme = "system";
      const defaultAuthData: AuthState = {
        state: "unauthenticated",
        userData: null,
      };

      const savedIsOnboarded = await AsyncStorage.getItem("is_onboarded");

      if (savedIsOnboarded === null) {
        await Promise.all([
          AsyncStorage.setItem("is_onboarded", defaultIsOnboarded),
          AsyncStorage.setItem("auth_data", JSON.stringify(defaultAuthData)),
          AsyncStorage.setItem("color_scheme", defaultSavedCholorSchema),
        ]);
        setIsOnboarded(false);
        setAuthState(defaultAuthData);
        setUserColorScheme(defaultSavedCholorSchema);
        return;
      }

      /*
        {
          accessToken: "string",
          refreshToken "string"
        }
      */

      const savedAuthTokens = (await AsyncStorage.getItem("auth_tokens")) as
        | string
        | null;

      const savedCholorSchema = (await AsyncStorage.getItem(
        "color_scheme"
      )) as CholorScheme | null;

      let authState: AuthState | null = null;

      let currentColorScheme: CholorScheme | null = null;

      if (!savedCholorSchema) {
        currentColorScheme = defaultSavedCholorSchema;
      } else {
        currentColorScheme = savedCholorSchema as CholorScheme;
      }

      if (!savedAuthTokens) {
        authState = defaultAuthData;
      } else {
        const tokens = JSON.parse(savedAuthTokens) as {
          accessToken: string;
          refreshToken: string;
        };

        // token is not
        const user = (await getUserInfo(tokens.accessToken)) as User | null;

        if (!user) {
          const refreshedTokens = await refreshToken(tokens.refreshToken);

          if (!refreshedTokens) {
            authState = defaultAuthData;
          } else {
            const user = (await getUserInfo(
              refreshedTokens.accessToken
            )) as User;

            authState = {
              state: "authenticated",
              userData: user,
            };
          }
        } else {
          authState = {
            state: "authenticated",
            userData: user,
          };
        }
      }

      await Promise.all([
        AsyncStorage.setItem("is_onboarded", savedIsOnboarded),
        AsyncStorage.setItem("auth_data", JSON.stringify(authState)),
        AsyncStorage.setItem("color_scheme", currentColorScheme),
      ]);

      setIsOnboarded(savedIsOnboarded === "true");
      setAuthState(authState);
      setUserColorScheme(currentColorScheme);
    };

    try {
      prepare();
    } catch (error) {
      console.log({ error });
    }
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
