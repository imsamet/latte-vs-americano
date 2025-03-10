import { StyleSheet } from "react-native";

const colors = {
  primary: "#ECD19F",
  primaryDark: "#C89D4C",
  black: "#000000",
  white: "#ffffff",
  primary80: "#aced28",
  primary60: "#b8ed4e",
  primary40: "#c6ed77",
  primary20: "#d3ed9f",
  danger: "#ed2600",
  danger20: "#2F0800",
  danger60: "#771300",
  info: "#004eed",
  text: "#C1C1C1",
  dark: "#242424",
  yellow: "#f7da00",
  grey: "#505050",
  bg: "#FFFAF0",
} as const;

const layout = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    backgroundColor: colors.bg,
    paddingLeft: 24,
    paddingRight: 24,
  },
});

export { colors, layout };
