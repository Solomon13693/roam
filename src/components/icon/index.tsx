import Svg, { Path } from "react-native-svg";
import { colors, type ColorToken } from "@/constants/colors";
import { icons, type IconName, type IconPath } from "./icons.generated";

export type { IconName };

export interface IconProps {
  name: IconName;
  size?: number;
  /** A Roam colour token ("forest") or any raw colour ("#fff"). */
  color?: ColorToken | (string & {});
  strokeWidth?: number;
}

// Matches the Figma icon library: 24px grid, 1.75 rounded stroke, ink by default.
export function Icon({ name, size = 24, color = "ink", strokeWidth = 1.75 }: IconProps) {
  const paths: IconPath[] = icons[name];
  const resolved = color in colors ? colors[color as ColorToken] : color;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" color={resolved}>
      {paths.map((p, i) => (
        <Path
          key={i}
          d={p.d}
          transform={p.transform}
          fill={p.fill === true ? "currentColor" : (p.fill ?? "none")}
          stroke={p.stroke === true ? "currentColor" : p.stroke}
          strokeWidth={p.stroke ? strokeWidth : undefined}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </Svg>
  );
}
