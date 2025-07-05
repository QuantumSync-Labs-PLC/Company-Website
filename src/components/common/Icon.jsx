import PropTypes from "prop-types";

/**
 * Universal Icon wrapper for consistent color, size, and accessibility.
 *
 * @param {React.ElementType|React.ReactNode} icon - Icon component reference (e.g., FaCloud) or JSX element.
 * @param {string} color   - Tailwind text color class or hex string (default: "text-blue").
 * @param {string|number} size - Font size class (e.g., "text-3xl") or px/rem.
 * @param {string} className - Extra CSS classes.
 * @param {string} ariaLabel - Accessible label.
 * @param {object} props     - Extra props passed to icon.
 */
export default function Icon({
  icon,
  color = "text-blue",
  size = "text-3xl",
  className = "",
  ariaLabel = "",
  ...props
}) {
  // If passed an icon component (not JSX), instantiate it
  const RenderIcon =
    typeof icon === "function"
      ? icon({ className: `${color} ${size} ${className}`, "aria-label": ariaLabel, ...props })
      : icon // already JSX

  return (
    <span
      aria-label={ariaLabel}
      className="inline-flex items-center justify-center align-middle"
    >
      {RenderIcon}
    </span>
  );
}

Icon.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
};
