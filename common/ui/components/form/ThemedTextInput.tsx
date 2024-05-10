import { useTheme } from "@/common/contexts/ThemeProvider";

import { TextInput } from "react-native";

type Props = {};

const ThemedTextInput = (props: Props) => {
  const { currentTheme } = useTheme();
  return (
    <TextInput
      style={{
        backgroundColor: currentTheme.colors.background,
        color: currentTheme.colors.text,
        padding: currentTheme.spacing.sm,
        borderRadius: currentTheme.spacing.sm,
        marginBottom: currentTheme.spacing.sm,
        marginStart: currentTheme.spacing.sm,
        marginEnd: currentTheme.spacing.sm,
      }}
      {...props}
    />
  );
};
