import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function PageMeta({ 
  title = 'QuantumSync Labs', 
  description = 'Empowering digital transformation through innovative, secure, and scalable IT solutions.',
  ogImage = '/og-image.png',
  url = 'https://www.quantumsynclabs.com',
  children
}) {
  const fullTitle = title === 'QuantumSync Labs' ? title : `${title} | QuantumSync Labs`;
  const appUrl = import.meta.env.VITE_APP_URL || 'https://www.quantumsynclabs.com';
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${appUrl}${ogImage}`;
  const canonicalUrl = url.startsWith('http') ? url : `${appUrl}${url}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="QuantumSync Labs" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Additional Meta Tags */}
      <meta name="keywords" content="IT solutions, cloud services, AI, software engineering, digital transformation" />
      <meta name="author" content="QuantumSync Labs" />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="IE=edge" />
      
      {/* Additional children meta tags */}
      {children}
    </Helmet>
  );
}

PageMeta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ogImage: PropTypes.string,
  url: PropTypes.string,
  children: PropTypes.node,
};
