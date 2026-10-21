// Boundary geometry lifted from the app's own specimen (lib/strata.ts) and stood
// upright: a core section rather than a slab. The same jitter and the same
// irregular fractures, so onboarding and app speak one drawing hand.

const XS = [0, 70, 141, 212, 283, 354];
const JIT = [0, -6, -3, -15, -11, -23];

export const COLUMN_WIDTH = 354;
/** Gap above the first fracture. */
export const COLUMN_TOP = 26;
/** The whole core is this many minutes deep: 60 is exactly half of it. */
export const CORE_MINUTES = 120;
/** Height of one layer before the column has to shrink or grow. */
export const LAYER_HEIGHT = 116;
export const LAYER_MIN = 44;
export const LAYER_MAX = 140;

export interface CoreBand {
  key: string;
  title: string;
  subtitle?: string;
  fill: string;
  /** The label sits in on-accent ink on this band. */
  accent?: boolean;
}

const points = (depth: number, dy = 0) =>
  XS.map((x, j) => [x, COLUMN_TOP + depth + JIT[j] + dy] as [number, number]);

/** The fracture line at a depth, optionally nudged for a bevel. */
export const coreEdge = (depth: number, dy = 0) =>
  "M" + points(depth, dy).map((p) => p.join(",")).join("L");

/** A closed band between two depths. */
export const coreBand = (top: number, bottom: number) => {
  const a = points(top);
  const b = points(bottom).reverse();
  return "M" + [...a, ...b].map((p) => p.join(",")).join("L") + "Z";
};

export interface ColumnLayout {
  /** Height of each layer. */
  layer: number;
  /** Total height of the drawing, including the gap above it. */
  height: number;
  /** Baseline of the name inside a layer. */
  rail: number;
  /** Whether a layer is tall enough to hold its description. */
  subtitles: boolean;
}

/**
 * One rail: every name sits the same distance below the top of its layer, and
 * never so low that it touches the fracture below it.
 */
export function layoutColumn(
  layers: number,
  availableHeight?: number,
): ColumnLayout {
  const natural = layers * LAYER_HEIGHT;
  const total = availableHeight
    ? Math.min(
        layers * LAYER_MAX,
        Math.max(layers * LAYER_MIN, availableHeight - COLUMN_TOP),
      )
    : natural;
  const layer = total / layers;
  return {
    layer,
    height: total + COLUMN_TOP,
    rail: Math.min(layer / 2 + 8, layer - 35),
    subtitles: layer >= 56,
  };
}

/**
 * The ramp the uncut layers run through. In daylight it is the app's own
 * rock values; on basalt it is the dark end of the grid ramp, so the column
 * keeps its depth instead of turning pale.
 */
export function layerRamp(
  colors: {
    rockSide: string;
    rockPale: string;
    rockTop: string;
    grid: string[];
  },
  dark: boolean,
): string[] {
  return dark
    ? [colors.grid[2], colors.grid[1], colors.grid[0]]
    : [colors.rockSide, colors.rockPale, colors.rockTop];
}
