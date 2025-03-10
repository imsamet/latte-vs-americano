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
            opacity={isActive ? 1 : 0.4}
            color={colors.primaryDark}
          />
        ) : pathname === "/setting" ? (
          <Setting
            width={iconSize}
            height={iconSize}
            opacity={isActive ? 1 : 0.4}
            color={colors.primaryDark}
          />
        ) : (
          pathname === "/calendar" && (
            <Calendar
              width={iconSize}
              height={iconSize}
              opacity={isActive ? 1 : 0.4}
              color={colors.primaryDark}
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
  qr: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  image: {
    width: 30,
    height: 30,
  },
  notification: {
    position: "absolute",
    top: 5,
    right: 12,
    backgroundColor: colors.danger,
    borderRadius: 999,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default TabItem;
