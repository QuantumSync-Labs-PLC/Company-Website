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
    "inline-flex items-center justify-center font-headline px-6 py-2.5 rounded-glass text-base font-bold transition shadow-neon-blue focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue to-cyan text-white hover:from-cyan hover:to-blue hover:shadow-lg",
    glass:
      "glass text-blue border border-blue hover:bg-blue/10",
    outline:
      "bg-transparent border-2 border-blue text-blue hover:bg-blue/10",
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
