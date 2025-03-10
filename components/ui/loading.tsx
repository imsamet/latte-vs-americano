import { useAppContext } from "@/context/app";
import { colors } from "@/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loading: React.FC = () => {
  const { state } = useAppContext();

  return (
    state.isLoading && (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4);",
    zIndex: 10,
  },
});
export default Loading;
