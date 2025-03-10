import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import * as Haptics from "expo-haptics";

import Text from "./text";
import { colors } from "@/theme";

type Props = {
  label?: string;
  type?: "primary" | "secondary";
  size?: "large" | "small";
  style?: StyleProp<ViewStyle> | false;
  isCenter?: boolean;
  color?: string;
  disabled?: boolean;
  onPress?: () => void;
};
const Button: React.FC<Props> = ({
  style,
  label,
  size = "large",
  type = "primary",
  isCenter,
  color,
  disabled,
  onPress,
}) => {
  const btnColor = color
    ? color
    : type === "primary"
    ? colors.dark
    : type === "secondary"
    ? colors.teriary
    : "";
  const styles = [
    buttonStyle.button,
    type === "primary"
      ? buttonStyle.primary
      : type === "secondary" && buttonStyle.secondary,
    size === "large"
      ? buttonStyle.large
      : size === "small" && buttonStyle.small,
    size === "large" && !label && buttonStyle.largeIcon,
    size === "small" && !label && buttonStyle.smallIcon,
    isCenter && buttonStyle.center,
    disabled && buttonStyle.disabled,
    style,
  ];
  const handlePress = () => {
    Haptics.selectionAsync();
    onPress && onPress();
  };
  return (
    <Pressable disabled={disabled} style={styles} onPress={handlePress}>
      {label && (
        <Text
          color={btnColor}
          size={size === "large" ? 14 : size === "small" ? 10 : 14}
          fontWeight="600"
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};
const buttonStyle = StyleSheet.create({
  button: {
    borderRadius: 999,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  center: {
    justifyContent: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  disabled: {
    opacity: 0.25,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    borderColor: colors.teriary,
    borderWidth: 1,
  },
  large: {
    height: 48,
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
    paddingRight: 16,
  },
  largeIcon: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    height: 24,
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 8,
  },
  smallIcon: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 0,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Button;
