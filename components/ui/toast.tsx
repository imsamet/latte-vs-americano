import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, View } from "react-native";
import { useAppContext } from "@/context/app";
import { ErrorType } from "@/core/_model";
import useSafeArea from "@/hook/useSafeArea";
import { colors } from "@/theme";
import Text from "./text";

const Toast = () => {
  const { state, dispatch } = useAppContext();
  const { toastList } = state;

  const [currentError, setCurrentError] = useState<ErrorType | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const progressAnim = useState(new Animated.Value(0))[0]; // Progress bar animasyonu için
  const insets = useSafeArea();
  const variables = {
    ping: 500,
    duration: 3000,
    progresDuration: 2500,
  };

  useEffect(() => {
    if (toastList.length > 0) {
      setCurrentError(toastList[0]);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: variables.ping,
        useNativeDriver: true,
      }).start();

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: variables.progresDuration, // 3 saniyede tamamlanan progress bar animasyonu
        useNativeDriver: false,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: variables.ping,
          useNativeDriver: true,
        }).start(() => {
          dispatch({ type: "REMOVE_TOAST", payload: toastList[0] });
          fadeAnim.setValue(0);
          progressAnim.setValue(0); // Progress bar animasyonunu sıfırlamak
        });
      }, variables.duration); // 3 saniye gösterim süresi

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastList, fadeAnim, progressAnim, dispatch]);

  if (!currentError) {
    return null;
  }
  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"], // Progress bar genişliği
  });
  const getProgressColor = (): string =>
    currentError.type === "success"
      ? colors.primaryDark
      : currentError.type === "info"
      ? colors.info
      : currentError.type === "warning"
      ? colors.yellow
      : currentError.type === "danger"
      ? colors.danger
      : colors.primaryDark;

  return (
    toastList.length > 0 && (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <Animated.View
            style={[
              styles.progressBar,
              { backgroundColor: getProgressColor(), width: progressBarWidth },
            ]}
          />
          <View style={styles.content}>
            <View style={styles.textBox}>
              <Text color={colors.primaryDark} size={16}>
                {currentError.title}
              </Text>
              {currentError.description && (
                <Text size={11} fontWeight="400" color={colors.grey}>
                  {currentError.description}
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  toast: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: colors.white,
    margin: 10,
    width: 300,
    overflow: "hidden",
    position: "relative",
  },
  content: {
    flex: 1,
    padding: 1,
  },
  textBox: {
    flex: 1,
    gap: 5,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 15,
    paddingTop: 15,
  },
  progressBar: {
    height: "100%",
    width: 300,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default Toast;
