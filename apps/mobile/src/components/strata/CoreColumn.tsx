import React, { useState } from "react";
import { Pressable, View, type LayoutChangeEvent } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { useTheme } from "@/theme/ThemeContext";
import {
  coreBand,
  coreEdge,
  layoutColumn,
  COLUMN_WIDTH,
  type CoreBand,
} from "@/lib/coreColumn";

interface Props {
  bands: CoreBand[];
  /** Room the column has to work with, in points; the layers shrink to fit it. */
  availableHeight?: number;
  showSubtitles?: boolean;
  /** Called with the key of the band that was tapped. */
  onSelect?: (key: string) => void;
  /** Keys of the bands that are currently selected. */
  selectedKeys?: string[];
}

/**
 * The core column: the app's own rock stood upright. Each layer is one area
 * of work; the one you have chosen is dyed with the accent. Every fracture
 * carries a two-point bevel so the column reads as cut rock, not colour fields.
 */
export function CoreColumn({
  bands,
  availableHeight,
  showSubtitles = true,
  onSelect,
  selectedKeys = [],
}: Props) {
  const { colors, dark } = useTheme();
  const [width, setWidth] = useState(0);
  const scale = width ? width / COLUMN_WIDTH : 1;
  const layout = layoutColumn(
    bands.length,
    availableHeight ? availableHeight / scale : undefined,
  );
  const { layer, height, rail, subtitles } = layout;
  const bevelHi = dark ? "rgba(237,243,244,0.16)" : "rgba(255,255,255,0.24)";
  const bevelLo = dark ? "rgba(8,14,19,0.5)" : "rgba(24,44,59,0.2)";
  const onAccent = colors.onPrimary;

  const layers = bands.map((band, index) => ({
    band,
    top: index * layer,
    bottom: (index + 1) * layer,
  }));

  const onLayout = (event: LayoutChangeEvent) =>
    setWidth(event.nativeEvent.layout.width);

  return (
    <View
      onLayout={onLayout}
      style={{ width: "100%" }}
      accessible={onSelect ? undefined : true}
      accessibilityRole={onSelect ? undefined : "image"}
      accessibilityLabel={
        !onSelect
          ? bands.map((b) => `${b.title}. ${b.subtitle ?? ""}`.trim()).join(". ")
          : undefined
      }
    >
      <Svg
        width={width}
        height={height * scale}
        viewBox={`0 0 354 ${height}`}
      >
        {layers.map(({ band, top, bottom }) => (
          <Path key={band.key} d={coreBand(top, bottom)} fill={band.fill} />
        ))}
        {layers.map(({ band, top, bottom }) => (
          <React.Fragment key={`bevel-${band.key}`}>
            <Path
              d={coreEdge(top, -0.6)}
              fill="none"
              stroke={bevelHi}
              strokeWidth={1}
            />
            <Path
              d={coreEdge(bottom, 0.6)}
              fill="none"
              stroke={bevelLo}
              strokeWidth={1}
            />
          </React.Fragment>
        ))}
        {layers.map(({ band, top }) => (
          <React.Fragment key={`label-${band.key}`}>
            <SvgText
              x={22}
              y={top + rail}
              fontFamily="InstrumentSerif"
              fontSize={28}
              fill={band.accent ? onAccent : colors.text}
            >
              {band.title}
            </SvgText>
            {showSubtitles && subtitles && band.subtitle ? (
              <SvgText
                x={22}
                y={top + rail + 21}
                fontSize={13}
                fill={band.accent ? onAccent : colors.text}
                opacity={band.accent ? 0.86 : 1}
              >
                {band.subtitle}
              </SvgText>
            ) : null}
          </React.Fragment>
        ))}
      </Svg>
      {onSelect
        ? layers.map(({ band, top, bottom }) => {
            const selected = selectedKeys.includes(band.key);
            return (
              <Pressable
                key={`hit-${band.key}`}
                onPress={() => onSelect(band.key)}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={`${band.title}. ${band.subtitle ?? ""}`.trim()}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: (26 + top) * scale,
                  height: layer * scale,
                }}
              />
            );
          })
        : null}
    </View>
  );
}
