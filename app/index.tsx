import EmailLogin from "@/components/auth/login";
import { Image, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../assets/images/login.png")}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }} />
      <EmailLogin />
    </View>
  );
}
