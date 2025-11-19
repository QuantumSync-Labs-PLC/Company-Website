import PropTypes from "prop-types";

export default function ResponsiveImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      sizes={sizes}
      className={className}
      draggable={false}
    />
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  sizes: PropTypes.string,
};
