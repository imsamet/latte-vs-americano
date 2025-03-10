import React from "react";
import { StyleSheet, View } from "react-native";
import useSafeArea from "@/hook/useSafeArea";
import Text from "../ui/text";
import { colors } from "@/theme";

type Props = {
  title?: string;
};

const Header: React.FC<Props> = ({ title }) => {
  // Hooks
  const insets = useSafeArea();

  return (
    <View style={[styles.headerContainer, { marginTop: insets.top }]}>
      <View style={styles.titleBox}>
        <Text size={24} color={colors.grey} style={{ marginBottom: 10 }}>
          {title || "Başlık"}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 4,
    paddingHorizontal: 20,

    flexDirection: "row",
    height: 65,
    alignItems: "flex-end",
    justifyContent: "space-between",
    zIndex: 10,
  },
  titleBox: {},
});
export default Header;
