import Svg, { Path, Rect, Circle } from "react-native-svg";
interface IconProps {
  name:
    | "grid"
    | "focus"
    | "identity"
    | "profile"
    | "back"
    | "play"
    | "more"
    | "check";
  color: string;
  size?: number;
}
export function Icon({ name, color, size = 22 }: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "grid" && (
        <>
          {[
            [4, 4],
            [14, 4],
            [4, 14],
            [14, 14],
          ].map(([x, y]) => (
            <Rect key={`${x}-${y}`} x={x} y={y} width={6} height={6} rx={1} />
          ))}
        </>
      )}
      {name === "focus" && (
        <>
          <Circle cx={12} cy={12} r={8} />
          <Path d="M12 7v5l3 2" />
        </>
      )}
      {name === "identity" && (
        <>
          <Path d="M5 19V9l7-5 7 5v10ZM9 19v-7h6v7" />
        </>
      )}
      {name === "profile" && (
        <>
          <Circle cx={12} cy={8} r={3} />
          <Path d="M5 20v-2a7 7 0 0 1 14 0v2" />
        </>
      )}
      {name === "back" && <Path d="m14 6-6 6 6 6" />}
      {name === "play" && <Path d="M7 4v16l13-8Z" fill={color} stroke="none" />}
      {name === "more" && (
        <>
          {[5, 12, 19].map((x) => (
            <Circle key={x} cx={x} cy={12} r={1.3} fill={color} />
          ))}
        </>
      )}
      {name === "check" && <Path d="m5 12 4 4 10-10" />}
    </Svg>
  );
}
