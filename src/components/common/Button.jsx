// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Button({
  children,
  className = "",
  variant = "primary", // for future variants if you want
  ...props
}) {
  // You can extend this for more variants in the future
  const baseStyles =
    "inline-flex items-center justify-center font-headline px-6 py-2.5 rounded-glass text-base font-bold transition shadow-neon-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-qs-accent focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-qs-gradient-primary text-white hover:opacity-90 hover:shadow-qs-medium",
    glass:
      "glass text-qs-primary border border-qs-primary hover:bg-qs-primary-soft hover:border-qs-primary-hover",
    outline:
      "bg-transparent border-2 border-qs-primary text-qs-primary hover:bg-qs-primary-soft hover:border-qs-primary-hover",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.04, boxShadow: "0 0 32px #0073FF66" }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'glass', 'outline']),
};
