import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeProvider from "./common/contexts/ThemeProvider";

type Props = { children: React.ReactNode };

export const Providers = ({ children }: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>{children}</ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default Providers;
