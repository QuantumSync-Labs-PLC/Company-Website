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
    "inline-flex items-center justify-center font-headline px-8 py-3 rounded-glass text-base font-bold transition-all duration-300 shadow-neon-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-qs-primary focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-qs-primary text-white hover:bg-qs-primary-hover hover:shadow-xl",
    glass:
      "glass text-qs-primary border-2 border-qs-primary hover:bg-qs-primary hover:text-white",
    outline:
      "bg-transparent border-2 border-qs-primary text-qs-primary hover:bg-qs-primary hover:text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 12px 40px #0073FF66" }}
      whileTap={{ scale: 0.97 }}
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
