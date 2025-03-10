import { StyleProp, Text as T, TextStyle } from "react-native";
import { colors } from "../../theme";
import { FontWeights } from "../../core/_model";
import WeightToFont from "../../utils/weightToFont";
import { ReactNode } from "react";

type Props = {
  size?: number;
  color?: string;
  align?: "left" | "right" | "center";
  fontWeight?: FontWeights;

  children?: ReactNode;
  style?: StyleProp<TextStyle>;
};
const Text: React.FC<Props> = ({
  align = "left",
  color = colors.dark,
  fontWeight = "700",
  size = 24,
  style,
  children,
}) => {
  return (
    <T
      style={[
        {
          fontSize: size,
          color: color,
          textAlign: align,
          fontFamily: WeightToFont(fontWeight),
        },
        style,
      ]}
    >
      {children}
    </T>
  );
};
export default Text;
