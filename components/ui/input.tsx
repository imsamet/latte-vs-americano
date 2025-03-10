import { useRef } from "react";
import {
  KeyboardTypeOptions,
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { colors } from "../../theme";
import Text from "./text";
import WeightToFont from "@/utils/weightToFont";

type Props = {
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  isTransparent?: boolean;
  style?: StyleProp<ViewStyle>;
  multiline?: boolean;
  onChangeText?: (text: string) => void;
};
const Input: React.FC<Props> = ({
  label,
  placeholder,
  error,
  isTransparent,
  style,
  keyboardType,
  onChangeText,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);
  const handleChange = (e: string) => {
    const text =
      keyboardType === "decimal-pad"
        ? e
            .replaceAll(",", ".")
            .replaceAll(".", ",")
            .replace(",", ".")
            .replaceAll(",", "") // Bu kadar uzun olmasının sebebi klavyede nokta yerine virgül çıkıyor ve nokta yapmak gerek. Burda tüm virgülleri ve noktaları kaldırıp tek bir nokta bırakıyoruz.
        : e;
    onChangeText && onChangeText(text);
  };
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text size={12} fontWeight="400" color={colors.text}>
          {label}
        </Text>
      )}
      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={[
          styles.inputBox,
          isTransparent && styles.transparentInput,
          !!error && styles.error,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          ref={inputRef}
          onChangeText={handleChange}
          keyboardType={keyboardType}
          {...props}
        />
      </Pressable>
      {!!error && (
        <Text color={colors.teriary} size={10} fontWeight="400">
          {error}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    // height: 48,
    paddingBottom: 12,
    paddingTop: 12,
    paddingLeft: 16,
    paddingRight: 24,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: colors.dark,
  },
  error: {
    borderColor: colors.teriary,
  },
  input: {
    flex: 1,
    fontFamily: WeightToFont("600"),
    fontStyle: "normal",
    letterSpacing: -0.24,
    fontSize: 14,
    fontWeight: "400",
    color: colors.dark,
  },
  transparentInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.dark,
  },
});
export default Input;
