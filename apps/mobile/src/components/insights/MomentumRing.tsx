import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface DaySegment {
  filled: boolean;
  isRestDay: boolean;
  dayLabel: string;
}

interface MomentumRingProps {
  segments: DaySegment[];
  size?: number;
  strokeWidth?: number;
  centerContent?: React.ReactNode;
  children?: React.ReactNode;
}

export function MomentumRing({
  segments,
  size = 120,
  strokeWidth = 8,
  centerContent,
  children,
}: MomentumRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const segmentArc = circumference / segments.length;

  return (
    <View className="items-center justify-center">
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment, index) => {
          const offset = circumference - segmentArc * index;
          const rotation = -90 + (360 / segments.length) * index;
          const trackColor = segment.isRestDay ? '#737373' : '#1a1a1a';
          const fillColor = segment.filled ? '#ffffff' : trackColor;

          return (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={segment.filled || segment.isRestDay ? fillColor : trackColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={`${segmentArc - 4} ${circumference}`}
              strokeDashoffset={-segmentArc * index}
              strokeLinecap="butt"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          );
        })}
      </Svg>
      {(centerContent || children) && (
        <View className="absolute items-center justify-center" style={{ width: size, height: size }}>
          {centerContent || children}
        </View>
      )}
    </View>
  );
}
