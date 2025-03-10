import Calendar from "@/components/icons/Calendar";
import Home from "@/components/icons/Home";
import Setting from "@/components/icons/Setting";
import useSafeArea from "@/hook/useSafeArea";
import { colors } from "@/theme";
import { Pressable, StyleSheet } from "react-native";

type Props = {
  isActive: boolean;
  pathname: string;
  onPress: () => void;
};
const TabItem: React.FC<Props> = ({ isActive, pathname, onPress }) => {
  const insets = useSafeArea();
  const iconSize = 24;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { paddingBottom: insets.bottom }]}
    >
      {pathname &&
        (pathname === "/" ? (
          <Home
            width={iconSize}
            height={iconSize}
            color={isActive ? colors.teriary : colors.dark}
          />
        ) : pathname === "/setting" ? (
          <Setting
            width={iconSize}
            height={iconSize}
            color={isActive ? colors.teriary : colors.dark}
          />
        ) : (
          pathname === "/calendar" && (
            <Calendar
              width={iconSize}
              height={iconSize}
              color={isActive ? colors.teriary : colors.dark}
            />
          )
        ))}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
  },
});
export default TabItem;
