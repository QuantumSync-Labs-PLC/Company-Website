import PropTypes from "prop-types";

/**
 * Badge component for status, tags, feature highlights, etc.
 * @param {string} color       - Tailwind bg color (default: "bg-blue")
 * @param {string} textColor   - Tailwind text color (default: "text-white")
 * @param {boolean} outline    - Show as outline badge
 * @param {boolean} pill       - Fully rounded (pill) badge
 * @param {React.ReactNode} icon - Optional icon (React Icon, SVG, etc.)
 * @param {string} className   - Extra utility classes
 * @param {string} ariaLabel   - Accessibility label
 * @param {React.ReactNode} children - Badge text/content
 */
export default function Badge({
  color = "bg-blue",
  textColor = "text-white",
  outline = false,
  pill = false,
  icon = null,
  className = "",
  ariaLabel = "",
  children,
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-3 py-1
        text-xs font-semibold uppercase tracking-wide
        ${pill ? "rounded-full" : "rounded-glass"}
        ${outline ? `border ${color} border-current bg-transparent ${textColor}` : `${color} ${textColor}`}
        shadow-sm ${className}
      `}
      aria-label={ariaLabel}
      {...props}
    >
      {icon && <span className="mr-1 text-base">{icon}</span>}
      {children}
    </span>
  );
}

Badge.propTypes = {
  color: PropTypes.string,
  textColor: PropTypes.string,
  outline: PropTypes.bool,
  pill: PropTypes.bool,
  icon: PropTypes.node,
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node.isRequired,
};
