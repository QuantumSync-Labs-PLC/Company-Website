import PropTypes from "prop-types";

/**
 * Spinner: A simple animated loader.
 * @param {string} size - Tailwind size class or px/rem (default: "w-7 h-7")
 * @param {string} color - Tailwind text color (default: "text-qs-primary")
 * @param {string} className - Extra classes
 * @param {string} ariaLabel - Accessibility label
 */
export default function Spinner({
  size = "w-7 h-7",
  color = "text-qs-primary",
  className = "",
  ariaLabel = "Loading...",
  ...props
}) {
  return (
    <output
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center ${className}`}
      {...props}
    >
      <svg
        className={`animate-spin ${size} ${color} drop-shadow-lg`}
        fill="none"
        viewBox="0 0 24 24"
        style={{ filter: 'drop-shadow(0 0 8px currentColor)' }}
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    </output>
  );
}

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};
