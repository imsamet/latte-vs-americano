import EmailLogin from "@/components/auth/login";
import KeyboardHandle from "@/components/expo-config/keyboard-handle";
import { Image, View } from "react-native";

export default function Index() {
  return (
    <KeyboardHandle>
      <View style={{ flex: 1 }}>
        <Image
          source={require("../assets/images/login.png")}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }} />
        <EmailLogin />
      </View>
    </KeyboardHandle>
  );
}
