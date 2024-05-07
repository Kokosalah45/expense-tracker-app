import { createContext, useContext, useEffect, useState } from "react";
import themes, { Theme, ThemeKeys } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ContextProps = {
  currentTheme: Theme;
  changeTheme: (newTheme: ThemeKeys) => void;
} | null;

const themeContext = createContext<ContextProps>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeKeys>("baseTheme");
  const currentTheme = themes[theme];

  const changeTheme = async (newTheme: ThemeKeys) => {
    await AsyncStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    AsyncStorage.getItem("theme").then((storedTheme) => {
      if (storedTheme) {
        setTheme(storedTheme as ThemeKeys);
      }
    });
  }, []);

  return (
    <themeContext.Provider
      value={{
        currentTheme,
        changeTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(themeContext);

  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return theme;
};

export default ThemeProvider;
