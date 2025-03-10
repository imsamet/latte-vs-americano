import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const Home = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.color}
      d="M19.78 7.47 14.71 3A4 4 0 0 0 9.4 3L4.29 7.4a6.62 6.62 0 0 0-2.3 5L2 18a4 4 0 0 0 4 4h12a4 4 0 0 0 4-3.92v-5.62a6.58 6.58 0 0 0-2.22-4.99M16 19.17H8a.75.75 0 1 1 0-1.5h8a.75.75 0 1 1 0 1.5"
    />
  </Svg>
);
export default Home;
