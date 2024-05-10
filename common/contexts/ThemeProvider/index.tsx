import { createContext, useContext, useState } from "react";
import defaultTheme, { Theme, ThemeKeys } from "./theme";

type ContextProps = {
  currentTheme: Theme;
  changeTheme: (newTheme: ThemeKeys) => void;
} | null;

const themeContext = createContext<ContextProps>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: Record<string, Theme>;
};

const ThemeProvider = ({
  children,
  theme = defaultTheme,
}: ThemeProviderProps) => {
  const [currenTheme, setTheme] = useState<ThemeKeys>("baseTheme");
  const currentTheme = theme[currenTheme];

  console.log({ currenTheme });
  const changeTheme = async (newTheme: ThemeKeys) => {
    setTheme(newTheme);
  };

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
