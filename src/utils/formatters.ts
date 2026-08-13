import { MarvelItem, UserProgress } from '../types';

/**
 * Formats duration in minutes into a readable "Xh YYm" string
 */
export function formatMinutesToHours(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins.toString().padStart(2, '0')}m` : `${hours}h`;
}

/**
 * Formats total minutes into a detailed breakdown of Days, Hours, Minutes
 */
export function formatTotalTime(totalMinutes: number): {
  days: number;
  hours: number;
  mins: number;
  formatted: string;
  formattedShort: string;
} {
  const days = Math.floor(totalMinutes / (24 * 60));
  const remainingMinutesAfterDays = totalMinutes % (24 * 60);
  const hours = Math.floor(remainingMinutesAfterDays / 60);
  const mins = remainingMinutesAfterDays % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} jour${days > 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} heure${hours > 1 ? 's' : ''}`);
  if (mins > 0 || parts.length === 0) parts.push(`${mins} min`);

  const formattedShort = days > 0 
    ? `${days}j ${hours}h ${mins}m`
    : `${hours}h ${mins}m`;

  return {
    days,
    hours,
    mins,
    formatted: parts.join(' '),
    formattedShort,
  };
}

/**
 * Calculates global progress metrics given filtered/unfiltered items and user progress state
 */
export function calculateProgressStats(items: MarvelItem[], progress: UserProgress) {
  const totalItemsCount = items.length;
  let watchedItemsCount = 0;
  let watchingItemsCount = 0;
  let totalDurationMinutes = 0;
  let watchedDurationMinutes = 0;

  items.forEach((item) => {
    totalDurationMinutes += item.durationMinutes;
    const status = progress[item.id]?.status || 'unwatched';

    if (status === 'watched') {
      watchedItemsCount++;
      watchedDurationMinutes += item.durationMinutes;
    } else if (status === 'watching') {
      watchingItemsCount++;
      // Count watching as half for progress estimation if desired, or keep as watching
    }
  });

  const percentageCount = totalItemsCount > 0 ? Math.round((watchedItemsCount / totalItemsCount) * 100) : 0;
  const percentageTime = totalDurationMinutes > 0 ? Math.round((watchedDurationMinutes / totalDurationMinutes) * 100) : 0;
  const remainingDurationMinutes = Math.max(0, totalDurationMinutes - watchedDurationMinutes);

  return {
    totalItemsCount,
    watchedItemsCount,
    watchingItemsCount,
    unwatchedItemsCount: totalItemsCount - watchedItemsCount - watchingItemsCount,
    totalDurationMinutes,
    watchedDurationMinutes,
    remainingDurationMinutes,
    percentageCount,
    percentageTime,
    totalFormatted: formatTotalTime(totalDurationMinutes),
    watchedFormatted: formatTotalTime(watchedDurationMinutes),
    remainingFormatted: formatTotalTime(remainingDurationMinutes),
  };
}
