import PropTypes from "prop-types";

export default function ResponsiveImage({
  src,
  alt,
  sources = [],
  imgSrcSet,
  className = "",
  loading = "eager",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  decoding = "async",
  fetchPriority,
}) {
  const hasSources = Array.isArray(sources) && sources.length > 0;

  const imageElement = (
    <img
      src={src}
      srcSet={imgSrcSet}
      alt={alt}
      loading={loading}
      sizes={sizes}
      decoding={decoding}
      fetchPriority={fetchPriority}
      className={className}
      draggable={false}
    />
  );

  if (!hasSources) {
    return imageElement;
  }

  return (
    <picture>
      {sources.map((source) => (
        <source
          key={`${source.type || "default"}-${source.media || "all"}-${source.srcSet}`}
          srcSet={source.srcSet}
          type={source.type}
          media={source.media}
          sizes={source.sizes || sizes}
        />
      ))}
      {imageElement}
    </picture>
  );
}

ResponsiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      srcSet: PropTypes.string.isRequired,
      type: PropTypes.string,
      media: PropTypes.string,
      sizes: PropTypes.string,
    })
  ),
  imgSrcSet: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.oneOf(["lazy", "eager"]),
  sizes: PropTypes.string,
  decoding: PropTypes.oneOf(["sync", "async", "auto"]),
  fetchPriority: PropTypes.oneOf(["high", "low", "auto"]),
};
