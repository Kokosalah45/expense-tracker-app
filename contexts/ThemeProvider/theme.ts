import { palette, fonts, breakpoints, spacing } from "@/constants";

type BaseTheme = {
  colors: Record<string, string>;
  breakpoints: Record<string, number>;
  fonts: Record<string, string>;
  spacing: Record<string, number>;
};

type Theme = {
  [key: string]: Record<string, string | number>;
} & BaseTheme;

const baseTheme: Theme = {
  colors: {
    background: palette.lightGray,
    text: palette.black,
    success: palette.green,
    error: palette.red,
    danger: palette.red,
  },
  breakpoints,
  fonts,
  spacing,
};

const darkTheme: Theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    background: palette.darkGray,
    text: palette.white,
  },
};

const themes = {
  baseTheme,
  darkTheme,
} as const;

type ThemeKeys = keyof typeof themes;

export default themes;
export { ThemeKeys, Theme };
