import useSafeArea from "@/hook/useSafeArea";
import { layout } from "@/theme";
import { PropsWithChildren } from "react";
import { Text, View } from "react-native";

export default function Layout({ children }: PropsWithChildren) {
  const unsets = useSafeArea();
  return (
    <View
      style={[
        layout.container,
        { paddingTop: 65 + unsets.top, paddingBottom: unsets.bottom },
      ]}
    >
      {children}
    </View>
  );
}
