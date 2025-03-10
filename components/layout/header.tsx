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
        <Text size={24} color={colors.teriary} style={{ marginBottom: 10 }}>
          {title || "Başlık"}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 6,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    zIndex: 10,
  },
  titleBox: {},
});
export default Header;
