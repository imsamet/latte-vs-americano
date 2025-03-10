export type FontWeights =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

export type FontFamilys =
  | "Poppins-Black"
  | "Poppins-Bold"
  | "Poppins-ExtraBold"
  | "Poppins-ExtraLight"
  | "Poppins-Light"
  | "Poppins-Medium"
  | "Poppins-Regular"
  | "Poppins-SemiBold"
  | "Poppins-Thin";

export type ErrorType = {
  type: "success" | "info" | "warning" | "danger";
  title: string;
  description?: string;
};
