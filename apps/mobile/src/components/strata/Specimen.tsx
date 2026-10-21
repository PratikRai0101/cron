import * as Haptics from "expo-haptics";
import Svg, { G, Path } from "react-native-svg";
import { Animated, AccessibilityInfo } from "react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import { useColors } from "@/theme/ThemeContext";
import { buildStrata, layerPaths, type Stratum } from "@/lib/strata";
interface SpecimenProps {
  onSelectLayer?: (id: string) => void;
  selectedLayerId?: string | null;
  height?: number;
  empty?: boolean;
  records?: readonly Stratum[];
  previewMinutes?: number;
  animatedLayerId?: string | null;
}
const AnimatedG = Animated.createAnimatedComponent(G);
const NO_RECORDS: readonly Stratum[] = [];
export function Specimen({
  onSelectLayer,
  selectedLayerId = null,
  height = 100,
  empty = false,
  records = NO_RECORDS,
  previewMinutes = 0,
  animatedLayerId = null,
}: SpecimenProps) {
  const c = useColors();
  const rock = useMemo(
    () => buildStrata(empty ? NO_RECORDS : records, previewMinutes),
    [empty, records, previewMinutes],
  );
  const newest = rock.layers.at(-1);
  const animates = !!animatedLayerId && newest?.id === animatedLayerId;
  const [opacity] = useState(() => new Animated.Value(1));
  const [y] = useState(() => new Animated.Value(0));
  const lastAnimatedId = useRef<string | null>(null);
  // Replay only for a newly saved record, never a timer tick or a theme change.
  useEffect(() => {
    if (!animates || lastAnimatedId.current === animatedLayerId) return;
    let active = true;
    y.setValue(-32);
    opacity.setValue(0);
    AccessibilityInfo.isReduceMotionEnabled().then((reduced) => {
      if (!active) return;
      lastAnimatedId.current = animatedLayerId;
      y.setValue(reduced ? 0 : -32);
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: reduced ? 120 : 100,
          useNativeDriver: false,
        }),
        ...(reduced
          ? []
          : [
              Animated.spring(y, {
                toValue: 0,
                stiffness: 230,
                damping: 25,
                mass: 1,
                restDisplacementThreshold: 0.2,
                restSpeedThreshold: 0.2,
                useNativeDriver: false,
              }),
            ]),
      ]).start(({ finished }) => {
        if (active && finished && !reduced)
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(
            () => {},
          );
      });
    });
    return () => {
      active = false;
      y.stopAnimation();
      opacity.stopAnimation();
    };
  }, [animates, animatedLayerId, y, opacity]);
  const palette = [c.rockMain, c.rockPale, c.rockMid, c.rockSide];
  const outline = rock.recordCount === 0 && !rock.preview;
  const emptyPaths = layerPaths({ top: 70, bottom: 0 });
  const label = outline
    ? "No effort recorded yet"
    : `${rock.recordCount} recorded layers, ${rock.totalMinutes} minutes of saved effort${rock.earlierCount ? `, ${rock.earlierCount} older records compressed into the base` : ""}${rock.preview ? `, ${Math.floor(previewMinutes)} minutes in the unsaved layer` : ""}`;
  return (
    <Svg
      width="100%"
      height={height}
      viewBox="0 -44 354 188"
      accessibilityRole={onSelectLayer ? undefined : "image"}
      accessibilityLabel={label}
    >
      {outline && (
        <G fill="none" stroke={c.rockSide} strokeWidth={1} opacity={0.6}>
          <Path d={emptyPaths.front} />
          <Path d={emptyPaths.side} />
          <Path d={emptyPaths.cap} />
        </G>
      )}
      {rock.layers.map((layer, i) => {
        const paths = layerPaths(layer);
        const isTop = i === rock.layers.length - 1;
        const faces = (
          <>
            <Path fill={c.rockSide} d={paths.side} />
            <Path
              fill={isTop ? c.primary : palette[i % palette.length]}
              d={paths.front}
            />
            {isTop && <Path fill={c.rockTop} d={paths.cap} />}
          </>
        );
        return layer.id === animatedLayerId && animates ? (
          <AnimatedG
            key={layer.id}
            y={y}
            opacity={opacity}
            stroke={c.background}
            strokeWidth={0.8}
          >
            {faces}
          </AnimatedG>
        ) : (
          <G
            key={layer.id}
            onPress={onSelectLayer ? () => onSelectLayer(layer.id) : undefined}
            opacity={selectedLayerId && selectedLayerId !== layer.id ? 0.35 : 1}
            stroke={selectedLayerId === layer.id ? c.primary : c.background}
            strokeWidth={selectedLayerId === layer.id ? 1.8 : 0.8}
          >
            {faces}
          </G>
        );
      })}
      {rock.preview && (
        <G fill="none" stroke={c.primary} strokeWidth={1} opacity={0.65}>
          <Path d={layerPaths(rock.preview).front} />
          <Path d={layerPaths(rock.preview).side} />
          <Path d={layerPaths(rock.preview).cap} />
        </G>
      )}
    </Svg>
  );
}
