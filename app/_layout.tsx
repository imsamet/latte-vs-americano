// Package
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import useLoader from "@/hook/useLoader";
import { AppProvider } from "@/context/app";
import Loading from "@/components/ui/loading";
import Toast from "@/components/ui/toast";
import { EventProvider } from "@/context/event";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { appIsReady } = useLoader();

  if (!appIsReady) {
    return null;
  }

  return (
    <EventProvider>
      <AppProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Loading />
          <Toast />
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </AppProvider>
    </EventProvider>
  );
}
