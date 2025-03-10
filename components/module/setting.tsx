import React from "react";
import { View, StyleSheet, Image, Pressable } from "react-native";
import Text from "../ui/text";
import { colors } from "@/theme";
import { useEventContext } from "@/context/event";
import useAuth from "@/hook/useAuth";

const Setting = () => {
  const { getUserMe } = useEventContext();
  const { logout } = useAuth();
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={{
          aspectRatio: 1,
          flex: 1,
        }}
        resizeMode="center"
      />
      <View style={styles.box}>
        <Text align="center">{getUserMe()}</Text>
      </View>
      <View style={styles.box}>
        <Pressable style={styles.item} onPress={logout}>
          <Text size={18} fontWeight="400" color={colors.teriary}>
            Çıkış Yap
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  box: {
    flex: 1,
    width: "100%",
  },
  item: {
    paddingVertical: 12,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    marginBottom: 24,
    marginTop: "auto",
  },
});

export default Setting;
