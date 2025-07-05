/**
 * Format a date string or Date object to human-readable text.
 * @param {string|Date} date        - The date input (string or Date object)
 * @param {Object} options          - Formatting options (optional)
 * @param {'short'|'long'|'date'|'time'|'iso'} options.style - Predefined style (default: 'long')
 * @param {string} options.locale   - Locale string (default: 'en-US')
 * @returns {string}                - Formatted date string, or empty string if invalid
 */
export default function formatDate(
  date,
  { style = "long", locale = "en-US" } = {}
) {
  if (!date) return "";

  let d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return "";

  switch (style) {
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
}
