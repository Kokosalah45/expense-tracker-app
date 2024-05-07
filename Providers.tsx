import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = { children: React.ReactNode };

export const Providers = ({ children }: Props) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {children}
    </GestureHandlerRootView>
  );
};

export default Providers;
