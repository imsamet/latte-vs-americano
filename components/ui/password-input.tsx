import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../theme";
import Text from "./text";
import WeightToFont from "@/utils/weightToFont";

type Props = {
  placeholder?: string;
  label?: string;
  value?: string;
  error?: string;
  isTransparent?: boolean;
  onChangeText?: (text: string) => void;
};
const PasswordInput: React.FC<Props> = ({
  label,
  placeholder,
  error,
  isTransparent,
  ...props
}) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
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
          secureTextEntry
          ref={inputRef}
          {...props}
        />
      </Pressable>
      {!!error && (
        <Text color={colors.danger} size={10} fontWeight="400">
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
    borderColor: colors.danger,
    backgroundColor: colors.danger20,
  },
  input: {
    flex: 1,
    fontFamily: WeightToFont("600"),
    fontStyle: "normal",
    letterSpacing: -0.24,
    fontSize: 14,
    fontWeight: "400",
    color: colors.grey,
  },
  transparentInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primaryDark,
  },
});
export default PasswordInput;
