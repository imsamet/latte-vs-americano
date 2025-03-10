import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

const useLoader = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
          "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
          "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
          "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
          "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
          "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
          "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
          "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
        });
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  return { appIsReady };
};

export default useLoader;
