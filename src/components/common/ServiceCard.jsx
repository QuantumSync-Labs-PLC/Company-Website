// Shared animated card used for services on home and services pages.
// Wraps content in a motion.div with configurable variants/hover.
// Keep the layout responsive by tuning containerClassName.
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "./Button";

const defaultVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, type: "spring", stiffness: 120, damping: 18 },
  }),
};

export default function ServiceCard({
  service,
  index = 0,
  variants = defaultVariants,
  whileHover = { y: -10, scale: 1.02, boxShadow: "0 12px 48px #0073FF55" },
  containerClassName = "card-primary-elevated glass shadow-neon-blue border border-qs-primary/10 rounded-glass flex flex-col items-center p-7 sm:p-8 md:p-9 h-full min-h-[340px] sm:min-h-[390px] max-w-md mx-auto transition-all duration-300",
  showFeaturesCount = 3,
  buttonFullWidth = true,
}) {
  const Icon = service.icon;
  const features = (service.features || []).slice(0, showFeaturesCount);

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      whileHover={whileHover}
      className="transition-all duration-300"
    >
      <div className={containerClassName}>
        {/* Icon */}
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-qs-primary/10 border-2 border-qs-primary mb-5 shadow-md">
          {Icon && <Icon className="text-qs-primary text-4xl sm:text-5xl" />}
        </div>
        {/* Title */}
        <h3 className="font-headline text-xl sm:text-2xl font-bold text-qs-primary mb-3 text-center">
          {service.title}
        </h3>
        {/* Excerpt */}
        <p className="font-body text-sm sm:text-base text-qs-text-section text-center mb-4 leading-relaxed">
          {service.excerpt}
        </p>
        {/* Features */}
        {features.length > 0 && (
          <ul className="mb-6 space-y-2 text-xs sm:text-sm font-body text-qs-text-section list-disc list-inside text-left">
            {features.map((feat) => (
              <li key={feat} className="leading-relaxed">{feat}</li>
            ))}
          </ul>
        )}
        {/* Learn More Button */}
        <Link
          to={service.link}
          aria-label={`Learn more about ${service.title}`}
          className="mt-auto w-full"
        >
          <Button className={buttonFullWidth ? "w-full text-sm font-semibold" : "text-sm font-semibold"}>
            Learn More
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
