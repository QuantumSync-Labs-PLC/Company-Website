import PropTypes from 'prop-types';
import { SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, absoluteUrl } from '@/constants/site';

// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree into <head> automatically,
// so no provider/portal library (react-helmet-async) is needed and no nesting issues can occur.
export default function PageMeta({
  title = SITE_NAME,
  description = SITE_DESCRIPTION,
  ogImage = DEFAULT_OG_IMAGE,
  url = '/',
  children
}) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = absoluteUrl(ogImage);
  const canonicalUrl = absoluteUrl(url);

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Additional Meta Tags */}
      <meta name="keywords" content="IT solutions, cloud services, AI, software engineering, digital transformation" />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="IE=edge" />

      {/* Additional children meta tags */}
      {children}
    </>
  );
}

PageMeta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  url: PropTypes.string,
  children: PropTypes.node,
};
