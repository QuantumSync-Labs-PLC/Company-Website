// Generic layout wrapper for marketing-style sections.
// Use this when you need a full-width section with a
// centered title, optional description, and main content
// wrapped in a max-width container.
export default function SectionShell({
  id,
  title,
  description,
  sectionClassName = "relative py-20 sm:py-24 lg:py-28 px-4 md:px-6 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300",
  containerClassName = "relative max-w-7xl mx-auto section-center z-10",
  titleClassName = "font-headline text-4xl md:text-5xl font-bold bg-qs-gradient-primary bg-clip-text text-transparent text-center mb-5",
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
        {title && (
          <h2 id={headingId} className={titleClassName}>
            {title}
          </h2>
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
