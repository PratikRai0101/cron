import { addDays, formatDate, isSameDay, startOfWeek } from '../../../../packages/shared/src/utils/date';
import { getGridIntensity } from '../../../../packages/shared/src/utils/grid';

test('date-only arithmetic stays on the local calendar day', () => {
  expect(formatDate(addDays('2026-09-25', 1))).toBe('2026-09-26');
  expect(isSameDay('2026-09-25', new Date(2026, 8, 25, 12))).toBe(true);
});

test('week starts on Sunday using the local calendar date', () => {
  expect(formatDate(startOfWeek('2026-09-25'))).toBe('2026-09-20');
});

describe('contribution intensity', () => {
  test.each([
    [0, 60, 0],
    [1, 60, 1],
    [15, 60, 2],
    [30, 60, 3],
    [45, 60, 4],
    [60, 60, 5],
    [120, 60, 5],
  ] as const)('%i of %i goal minutes maps to level %i', (minutes, goal, level) => {
    expect(getGridIntensity(minutes, goal)).toBe(level);
  });
});
