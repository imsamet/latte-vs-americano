import { ErrorType } from "@/core/_model";
import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Uygulama durumu tipi
type AppState = {
  isLoading: boolean;
  toastList: ErrorType[];
};

// Başlangıç durumu
const initialState: AppState = {
  isLoading: false,
  toastList: [],
};

// Eylem tipleri
type Action =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "ADD_TOAST"; payload: ErrorType }
  | { type: "REMOVE_TOAST"; payload: ErrorType };

// Reducer fonksiyonu
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "ADD_TOAST":
      return { ...state, toastList: [...state.toastList, action.payload] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toastList: state.toastList.filter(
          (toastItem) =>
            !(
              toastItem.type === action.payload.type &&
              toastItem.title === action.payload.title &&
              toastItem.description === action.payload.description
            )
        ),
      };
    default:
      return state;
  }
};

// Context oluştur
const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

// Sağlayıcı bileşeni
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
