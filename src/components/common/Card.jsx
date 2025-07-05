import PropTypes from 'prop-types';

/**
 * A glassmorphic card for services, team, or feature blocks.
 * @param {string} title         - Card heading/title
 * @param {React.ReactNode} icon - Icon JSX or image
 * @param {string} description   - Short description text
 * @param {React.ReactNode} children - For action buttons, links, etc.
 * @param {string} className     - Extra CSS classes
 * @param {string} ariaLabel     - Optional aria-label for accessibility
 */
export default function Card({
  title,
  icon,
  description,
  children,
  className = "",
  ariaLabel = ""
}) {
  return (
    <section
      className={`glass shadow-neon-blue flex flex-col items-center p-7 min-w-[230px] max-w-sm mx-auto ${className}`}
      aria-label={ariaLabel || title || undefined}
    >
      {icon && (
        <div className="mb-3 text-5xl text-blue flex justify-center items-center" aria-hidden="true">
          {icon}
        </div>
      )}
      {title && (
        <h3 className="font-headline text-xl font-bold text-blue mb-2 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="font-body text-section text-center mb-3">
          {description}
        </p>
      )}
      {children}
    </section>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,      // Accepts React element, image, or SVG
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  ariaLabel: PropTypes.string
};

Card.defaultProps = {
  className: "",
  ariaLabel: "",
};
