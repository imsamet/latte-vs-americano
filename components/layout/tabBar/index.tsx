import { router, usePathname } from "expo-router";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import TabItem from "./item";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useMemo } from "react";
import { colors } from "@/theme";

type Props = {
  prop: BottomTabBarProps;
};
const TabBar: React.FC<Props> = ({ prop }) => {
  // Hooks
  const pathname = usePathname();
  const list = [
    {
      pathname: "/",
      onPress: () => {
        router.push("/(app)");
      },
    },
    {
      pathname: "/calendar",
      onPress: () => {
        router.push("/(app)");
      },
    },
    {
      pathname: "/setting",
      onPress: () => {
        router.push("/(app)");
      },
    },
  ];
  const style: StyleProp<ViewStyle> = useMemo(() => {
    const key = prop.state.history[prop.state.history.length - 1].key;
    const style = prop.descriptors[key].options?.tabBarStyle;
    return style as StyleProp<ViewStyle>;
  }, [prop]);

  return (
    <View style={[{ paddingHorizontal: 24 }, styles.container, style]}>
      <View style={styles.content}>
        {list.map((i) => (
          <TabItem
            key={i.pathname}
            pathname={i.pathname}
            onPress={i.onPress}
            isActive={pathname === i.pathname}
          />
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: "#00000033",
    backgroundColor: colors.primaryDark,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default TabBar;
