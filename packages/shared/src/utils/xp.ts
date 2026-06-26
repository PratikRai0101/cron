const LEVEL_MINUTES = 600; // 10 hours per level

export function getLevel(totalFocusMinutes: number): number {
  return Math.floor(totalFocusMinutes / LEVEL_MINUTES);
}

export function getLevelTitle(level: number): string {
  if (level >= 100) return 'Monolith';
  if (level >= 50) return 'Architect';
  if (level >= 25) return 'Specialist';
  if (level >= 10) return 'Practitioner';
  if (level >= 5) return 'Apprentice';
  return 'Initiate';
}

export function getXpProgress(totalFocusMinutes: number): {
  currentLevel: number;
  currentLevelMinutes: number;
  minutesToNextLevel: number;
  progressPercent: number;
} {
  const currentLevel = getLevel(totalFocusMinutes);
  const currentLevelMinutes = totalFocusMinutes % LEVEL_MINUTES;
  const minutesToNextLevel = LEVEL_MINUTES - currentLevelMinutes;
  const progressPercent = (currentLevelMinutes / LEVEL_MINUTES) * 100;
  
  return {
    currentLevel,
    currentLevelMinutes,
    minutesToNextLevel,
    progressPercent,
  };
}

export function getIdentityLevel(identityTotalMinutes: number): number {
  return Math.floor(identityTotalMinutes / LEVEL_MINUTES);
}

export function getConsistencyScore(daysWithActivity: number, totalDays: number = 30): number {
  return Math.round((daysWithActivity / totalDays) * 100);
}
