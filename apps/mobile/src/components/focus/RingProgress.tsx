import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface RingProgressProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  trackColor?: string;
  fillColor?: string;
  children?: React.ReactNode;
}

export function RingProgress({
  progress,
  size = 120,
  strokeWidth = 8,
  trackColor = '#1a1a1a',
  fillColor = '#ffffff',
  children,
}: RingProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={fillColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {children && (
        <View className="absolute items-center justify-center" style={{ width: size, height: size }}>
          {children}
        </View>
      )}
    </View>
  );
}
