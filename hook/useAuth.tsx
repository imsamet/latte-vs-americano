import { useAppContext } from "@/context/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";

const useAuth = (): {
  login: (data: { username: string; password: string }) => void;
} => {
  const { state, dispatch } = useAppContext();

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
  return { login };
};

export default useAuth;
