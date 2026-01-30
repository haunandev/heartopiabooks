/**
 * Format growth time in minutes to a human-readable string
 * Examples:
 * - 30 minutes → "30 minutes"
 * - 60 minutes → "1 hour"
 * - 90 minutes → "1 hour 30 minutes"
 * - 1440 minutes → "1 day"
 * - 1500 minutes → "1 day 1 hour"
 */
export function formatGrowthTime(minutes: number): string {
  if (!minutes || minutes === 0) return "-";

  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  const parts: string[] = [];

  if (days > 0) {
    parts.push(`${days} day${days > 1 ? "s" : ""}`);
  }

  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  }

  if (mins > 0) {
    parts.push(`${mins} minute${mins > 1 ? "s" : ""}`);
  }

  return parts.join(" ");
}
