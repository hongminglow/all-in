/**
 * Small time formatting helpers for durations represented in seconds.
 */

type FormatOptions = {
  /** Use compact units (e.g. "1h 2m" vs "1 hour 2 minutes") */
  compact?: boolean;
};

/**
 * Format a duration (seconds) into a readable string.
 * - < 60 -> "45s"
 * - >= 60 and < 3600 -> "2m 30s" (or "2m" if exact)
 * - >= 3600 -> "1h 2m" (shows hours and minutes)
 */
export function formatDuration(
  secondsInput: number,
  opts: FormatOptions = {}
): string {
  const compact = opts.compact ?? true;
  const seconds = Math.max(0, Math.floor(Number(secondsInput) || 0));

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    if (minutes === 0)
      return compact ? `${hours}h` : `${hours} hour${hours > 1 ? "s" : ""}`;
    return compact
      ? `${hours}h ${minutes}m`
      : `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
          minutes > 1 ? "s" : ""
        }`;
  }

  // hours === 0, show minutes and maybe seconds
  if (secs === 0) {
    return compact
      ? `${minutes}m`
      : `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  return compact
    ? `${minutes}m ${secs}s`
    : `${minutes} minute${minutes > 1 ? "s" : ""} ${secs} second${
        secs > 1 ? "s" : ""
      }`;
}
