/**
 * SEO metadata utility functions
 * Generates comprehensive meta tags for pages with Open Graph and Twitter Card support
 */

/**
 * Generate complete metadata object for a page
 * @param {string} title - Page title
 * @param {string} description - Page description (max 160 characters recommended)
 * @param {string} ogImage - Open Graph image URL (1200x630px recommended)
 * @param {string} url - Canonical URL
 * @returns {Object} Complete metadata object for react-helmet-async
 */
export const getMetaData = (title, description, ogImage, url) => {
  const baseUrl =
    import.meta.env.VITE_APP_URL || "https://www.quantumsynclabs.com";
  const defaultDescription =
    "Empowering digital transformation through innovative, secure, and scalable IT solutions.";

  return {
    title: `${title} | QuantumSync Labs`,
    description: description?.slice(0, 160) || defaultDescription,
    og: {
      title: `${title} | QuantumSync Labs`,
      description: description?.slice(0, 160) || defaultDescription,
      image: ogImage || `${baseUrl}/og-image.png`,
      url: url || baseUrl,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | QuantumSync Labs`,
      description: description?.slice(0, 160) || defaultDescription,
      image: ogImage || `${baseUrl}/og-image.png`,
    },
    canonical: url || baseUrl,
  };
};

export const defaultMeta = {
  title: "QuantumSync Labs",
  description:
    "Empowering digital transformation through innovative, secure, and scalable IT solutions.",
  url: import.meta.env.VITE_APP_URL || "https://www.quantumsynclabs.com",
  ogImage: `${import.meta.env.VITE_APP_URL}/og-image.png`,
};
