import { StyleSheet } from "react-native";

const colors = {
  primary: "#ECD19F",
  secondary: "#E5A92C",
  teriary: "#EF7410",
  dark: "#542C15",
  text: "#C1C1C1",
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
