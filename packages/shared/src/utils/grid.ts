export type GridIntensity = 0 | 1 | 2 | 3 | 4 | 5;

export function getGridIntensity(minutes: number, dailyGoal: number): GridIntensity {
  if (minutes === 0) return 0;
  const ratio = minutes / dailyGoal;
  if (ratio < 0.25) return 1;
  if (ratio < 0.50) return 2;
  if (ratio < 0.75) return 3;
  if (ratio < 1.00) return 4;
  return 5;
}

export const GRID_COLORS = [
  '#141414',
  '#2a2a2a',
  '#4a4a4a',
  '#6a6a6a',
  '#8a8a8a',
  '#ffffff',
] as const;

export function getGridColor(intensity: GridIntensity): string {
  return GRID_COLORS[intensity];
}

export function getIntensityLabel(intensity: GridIntensity): string {
  const labels = ['No activity', 'Light', 'Moderate', 'Good', 'Strong', 'Complete'];
  return labels[intensity];
}
