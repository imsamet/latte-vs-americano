// Package
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import useLoader from "@/hook/useLoader";
import { AppProvider } from "@/context";
import Loading from "@/components/ui/loading";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { appIsReady } = useLoader();

  if (!appIsReady) {
    return null;
  }

  return (
    <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Loading />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </GestureHandlerRootView>
    </AppProvider>
  );
}
