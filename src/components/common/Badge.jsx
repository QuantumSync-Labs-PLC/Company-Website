import PropTypes from "prop-types";

/**
 * Badge component for status, tags, feature highlights, etc.
 * @param {string} color       - Tailwind bg color (default: "bg-qs-primary")
 * @param {string} textColor   - Tailwind text color (default: "text-white")
 * @param {boolean} outline    - Show as outline badge
 * @param {boolean} pill       - Fully rounded (pill) badge
 * @param {React.ReactNode} icon - Optional icon (React Icon, SVG, etc.)
 * @param {string} className   - Extra utility classes
 * @param {string} ariaLabel   - Accessibility label
 * @param {React.ReactNode} children - Badge text/content
 */
export default function Badge({
  color = "bg-qs-primary",
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
        inline-flex items-center gap-1.5 px-3 py-1.5
        text-xs font-bold uppercase tracking-wide
        ${pill ? "rounded-full" : "rounded-glass"}
        ${outline ? `border-2 ${color} border-current bg-transparent ${textColor}` : `${color} ${textColor}`}
        shadow-md transition-all duration-200 hover:scale-105 ${className}
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
