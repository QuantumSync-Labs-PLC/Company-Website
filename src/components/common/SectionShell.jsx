// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Generic layout wrapper for marketing-style sections.
// Use this when you need a full-width section with a
// mono eyebrow label, centered title, optional description,
// and main content wrapped in a max-width container.
export default function SectionShell({
  id,
  eyebrow,
  title,
  description,
  sectionClassName = "relative py-20 sm:py-24 lg:py-28 px-4 md:px-6 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300",
  containerClassName = "relative max-w-7xl mx-auto section-center z-10",
  titleClassName = "font-headline text-4xl md:text-5xl font-bold holo-text text-center mb-5",
  descriptionClassName = "font-body text-qs-text-section text-lg sm:text-xl text-center mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed",
  ariaLabelledBy,
  children,
}) {
  const headingId = ariaLabelledBy || (id ? `${id}-heading` : undefined);

  return (
    <section
      id={id}
      className={sectionClassName}
      aria-labelledby={headingId}
    >
      <div className={containerClassName}>
        {eyebrow && (
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <span className="eyebrow">{eyebrow}</span>
          </motion.div>
        )}
        {title && (
          <motion.h2
            id={headingId}
            className={titleClassName}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
        )}
        {description && (
          <p className={descriptionClassName}>
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
