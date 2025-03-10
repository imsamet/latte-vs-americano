import useSafeArea from "@/hook/useSafeArea";
import { layout } from "@/theme";
import { PropsWithChildren } from "react";
import { View } from "react-native";
import KeyboardHandle from "../expo-config/keyboard-handle";

export default function Layout({ children }: PropsWithChildren) {
  const unsets = useSafeArea();
  return (
    <KeyboardHandle>
      <View style={[layout.container, { paddingBottom: unsets.bottom }]}>
        {children}
      </View>
    </KeyboardHandle>
  );
}
