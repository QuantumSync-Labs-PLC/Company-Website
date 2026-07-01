export default function JsonLd({ schema = {} }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Helper functions to create common schema types

export function createOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "QuantumSync Labs",
    description: "Modern IT solutions for digital transformation",
    url: "https://quantumsynclabs.com",
    logo: "https://quantumsynclabs.com/assets/images/Logo%203.1.webp",
    sameAs: [
      "https://www.linkedin.com/company/quantumsync-labs",
      "https://github.com/QuantumSync-Labs-PLC/",
      "https://www.facebook.com/quantumsynclabs",
      "https://www.instagram.com/quantumsync_labs",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "labsquantumsync@gmail.com",
      telephone: "+94741240337",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
  };
}

export function createServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.excerpt || service.text,
    provider: {
      "@type": "Organization",
      name: "QuantumSync Labs",
      url: "https://quantumsynclabs.com",
    },
    areaServed: "Worldwide",
    serviceType: service.title,
  };
}

export function createArticleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    image: article.cover,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "QuantumSync Labs",
      logo: {
        "@type": "ImageObject",
        url: "https://quantumsynclabs.com/assets/images/Logo%203.1.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://quantumsynclabs.com/blog/${article.id}`,
    },
  };
}

export function createCaseStudySchema(caseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: caseStudy.title,
    description: caseStudy.summary,
    image: caseStudy.cover,
    client: {
      "@type": "Organization",
      name: caseStudy.client,
    },
    provider: {
      "@type": "Organization",
      name: "QuantumSync Labs",
    },
    about: {
      "@type": "Text",
      text: caseStudy.solution,
    },
    result: {
      "@type": "Text",
      text: caseStudy.results,
    },
    keywords: caseStudy.industry,
  };
}

export function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
