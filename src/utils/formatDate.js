/**
 * Format a date string or Date object to human-readable text
 * Provides multiple format styles with full error handling
 * @param {string|Date} date - The date input (string, Date object, or timestamp)
 * @param {Object} options - Formatting options (optional)
 * @param {'short'|'long'|'date'|'time'|'iso'|'relative'} options.style - Predefined style (default: 'long')
 * @param {string} options.locale - Locale string (default: 'en-US')
 * @returns {string} - Formatted date string, or empty string if invalid
 * @example
 * formatDate('2025-01-15') // 'January 15, 2025, 12:00 AM'
 * formatDate('2025-01-15', { style: 'short' }) // 'Jan 15, 25'
 * formatDate('2025-01-15', { style: 'relative' }) // '2 months ago'
 */
export default function formatDate(
  date,
  { style = "long", locale = "en-US" } = {}
) {
  if (!date) return "";

  try {
    let d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return "";

    switch (style) {
      case "relative": {
        const now = new Date();
        const diff = now - d;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
        if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
        if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (minutes > 0)
          return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        return "Just now";
      }
      case "short":
        return d.toLocaleDateString(locale, {
          year: "2-digit",
          month: "short",
          day: "numeric",
        });
      case "date":
        return d.toLocaleDateString(locale, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      case "time":
        return d.toLocaleTimeString(locale, {
          hour: "2-digit",
          minute: "2-digit",
        });
      case "iso":
        return d.toISOString();
      case "long":
      default:
        return d.toLocaleString(locale, {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}
