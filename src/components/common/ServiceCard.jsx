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
  whileHover = { y: -8, boxShadow: "0 6px 32px #0073FF44" },
  containerClassName = "card-primary-elevated glass flex flex-col items-center p-6 sm:p-7 md:p-8 h-full min-h-[320px] sm:min-h-[370px] max-w-md mx-auto",
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
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
      whileHover={whileHover}
      className="transition-transform"
    >
      <div className={containerClassName}>
        {/* Icon */}
        <div className="mb-5 text-5xl text-qs-primary flex justify-center items-center">
          {Icon && <Icon className="text-qs-primary text-4xl" />}
        </div>
        {/* Title */}
        <h3 className="font-headline text-lg sm:text-xl font-bold text-qs-primary mb-2 sm:mb-3 text-center">
          {service.title}
        </h3>
        {/* Excerpt */}
        <p className="font-body text-sm sm:text-base text-section text-center mb-3 sm:mb-4">
          {service.excerpt}
        </p>
        {/* Features */}
        {features.length > 0 && (
          <ul className="mb-5 sm:mb-6 space-y-1 text-xs sm:text-sm font-body text-section list-disc list-inside text-left">
            {features.map((feat) => (
              <li key={feat}>{feat}</li>
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
