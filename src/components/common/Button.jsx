// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-headline font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-qs-primary focus-visible:ring-offset-2";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm rounded-qs-md",
    md: "px-8 py-3 text-base rounded-qs-lg",
    lg: "px-12 py-4 text-lg rounded-qs-xl",
  };

  const variantStyles = {
    primary:
      "bg-qs-primary text-qs-bg hover:bg-qs-primary-hover hover:shadow-qs-neon",
    signal:
      "bg-qs-signal text-qs-bg hover:brightness-110 hover:shadow-qs-neon",
    glass:
      "glass text-qs-primary border border-qs-hairline hover:border-qs-primary/40 hover:bg-qs-primary-soft",
    ghost:
      "bg-transparent text-qs-primary border border-qs-hairline hover:bg-qs-primary-soft hover:border-qs-primary/40",
    outline:
      "bg-transparent border border-qs-primary text-qs-primary hover:bg-qs-primary hover:text-qs-bg",
    holo:
      "bg-qs-gradient-primary text-white hover:shadow-qs-neon-accent",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || ""} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'signal', 'glass', 'ghost', 'outline', 'holo']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};
