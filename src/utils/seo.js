// Utility functions for SEO metadata

export const getMetaData = (title, description, ogImage, url) => ({
  title: `${title} | QuantumSync Labs`,
  description: description || 'Empowering digital transformation through innovative, secure, and scalable IT solutions.',
  og: {
    title: `${title} | QuantumSync Labs`,
    description: description,
    image: ogImage || `${import.meta.env.VITE_APP_URL}/og-image.png`,
    url: url || import.meta.env.VITE_APP_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | QuantumSync Labs`,
    description: description,
    image: ogImage || `${import.meta.env.VITE_APP_URL}/og-image.png`,
  },
  canonical: url || import.meta.env.VITE_APP_URL,
});

export const defaultMeta = {
  title: 'QuantumSync Labs',
  description: 'Empowering digital transformation through innovative, secure, and scalable IT solutions.',
  url: import.meta.env.VITE_APP_URL || 'https://www.quantumsynclabs.com',
  ogImage: `${import.meta.env.VITE_APP_URL}/og-image.png`,
};
