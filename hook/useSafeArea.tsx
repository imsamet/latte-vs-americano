import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

const useSafeArea = (): EdgeInsets => {
  // Hooks
  const insets = useSafeAreaInsets();

  return {
    top: insets.top > 0 ? insets.top : 20,
    bottom: insets.bottom > 0 ? insets.bottom : 20,
    left: insets.left,
    right: insets.right,
  };
};

export default useSafeArea;
