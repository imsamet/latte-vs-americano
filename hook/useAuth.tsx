import { useAppContext } from "@/context/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuth = (): {
  login: (data: { username: string; password: string }) => void;
  logout: () => Promise<void>;
} => {
  const { state, dispatch } = useAppContext();

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {}
  };

  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await signInWithEmailAndPassword(auth, username, password);
      if (!auth.currentUser?.uid) return;
      router.replace("/(app)");
    } catch (error) {
      dispatch({
        type: "ADD_TOAST",
        payload: {
          type: "danger",
          title: "login-error-title",
          description: "login-error-description",
        },
      });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const logout = async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await auth.signOut();
      await clearAsyncStorage();

      router.replace("/login");
    } catch (error) {}
    dispatch({ type: "SET_LOADING", payload: false });
  };

  return { login, logout };
};

export default useAuth;
