export interface Stratum {
  id: string;
  minutes: number;
  date: string;
  identityId: string;
  recordedAt?: number;
}

export interface RockLayer {
  id: string;
  minutes: number;
  records: number;
  bottom: number;
  top: number;
}

// Keep the most recent records distinct. The base retains all earlier effort.
export function buildStrata(records: readonly Stratum[], previewMinutes = 0) {
  const valid = records.filter(
    (r) => Number.isFinite(r.minutes) && r.minutes > 0,
  );
  const sorted = [...valid].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      (a.recordedAt ?? 0) - (b.recordedAt ?? 0) ||
      a.id.localeCompare(b.id),
  );
  const older = sorted.slice(0, Math.max(0, sorted.length - 7));
  const recent = sorted.slice(-7);
  const entries = [
    ...(older.length
      ? [
          {
            id: "earlier-work",
            minutes: older.reduce((sum, r) => sum + r.minutes, 0),
            records: older.length,
          },
        ]
      : []),
    ...recent.map((r) => ({ id: r.id, minutes: r.minutes, records: 1 })),
  ];
  const thickness = (minutes: number) =>
    Math.min(30, Math.max(6, Math.sqrt(minutes) * 3));
  const draft = Math.max(
    0,
    Number.isFinite(previewMinutes) ? previewMinutes : 0,
  );
  const raw = entries.map((r) => thickness(r.minutes));
  // The draft grows continuously from zero; it never counts as recorded work.
  const draftHeight = draft > 0 ? Math.min(30, Math.sqrt(draft) * 3) : 0;
  const scale = Math.min(
    1,
    96 / (raw.reduce((sum, h) => sum + h, 0) + draftHeight || 1),
  );
  let depth = 0;
  const layers: RockLayer[] = entries.map((r, i) => {
    const bottom = depth;
    depth += raw[i] * scale;
    return { ...r, bottom, top: depth };
  });
  return {
    layers,
    preview:
      draft > 0
        ? {
            id: "current-layer",
            minutes: draft,
            records: 0,
            bottom: depth,
            top: depth + draftHeight * scale,
          }
        : null,
    totalMinutes: valid.reduce((sum, r) => sum + r.minutes, 0),
    recordCount: valid.length,
    earlierCount: older.length,
  };
}

// Shared irregular boundaries keep neighbouring strata joined without gaps.
function boundary(depth: number) {
  return [
    [70, 130 - depth],
    [124, 125 - depth],
    [173, 128 - depth],
    [224, 118 - depth],
    [287, 121 - depth],
    [339, 111 - depth],
  ];
}
function polygon(points: number[][]) {
  return `M${points.map((p) => p.join(",")).join("L")}Z`;
}
export function layerPaths(layer: Pick<RockLayer, "top" | "bottom">) {
  return {
    front: polygon([
      ...boundary(layer.top),
      ...boundary(layer.bottom).reverse(),
    ]),
    side: polygon([
      [18, 102 - layer.top],
      [70, 130 - layer.top],
      [70, 130 - layer.bottom],
      [18, 102 - layer.bottom],
    ]),
    cap: polygon([
      [18, 102 - layer.top],
      [284, 87 - layer.top],
      [339, 111 - layer.top],
      ...boundary(layer.top).slice().reverse(),
    ]),
  };
}
