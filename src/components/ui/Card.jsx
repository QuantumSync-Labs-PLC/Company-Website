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
      className={`glass shadow-neon-blue border border-qs-primary/10 rounded-glass flex flex-col items-center p-7 sm:p-8 min-w-[230px] max-w-sm mx-auto transition-all duration-300 hover:border-qs-primary/30 ${className}`}
      aria-label={ariaLabel || title || undefined}
    >
      {icon && (
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-qs-primary/10 border border-qs-primary mb-4 shadow-md" aria-hidden="true">
          <div className="text-4xl sm:text-5xl text-qs-primary">{icon}</div>
        </div>
      )}
      {title && (
        <h3 className="font-headline text-xl sm:text-2xl font-bold text-qs-primary mb-3 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="font-body text-qs-text-section text-base sm:text-lg text-center mb-4 leading-relaxed">
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
