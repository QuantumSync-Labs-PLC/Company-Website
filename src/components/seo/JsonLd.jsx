import { SITE_URL, SITE_NAME, CONTACT, SOCIAL_PROFILES, absoluteUrl } from "@/constants/site";

// Must be a file that actually ships in public/. The previous value pointed at
// /assets/images/Logo%203.1.webp, which only exists under src/ and 404s in prod.
const LOGO_URL = absoluteUrl("/assets/images/og-logo.webp");

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
    name: SITE_NAME,
    description: "Modern IT solutions for digital transformation",
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: SOCIAL_PROFILES,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: CONTACT.email,
      telephone: CONTACT.phone,
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
      name: SITE_NAME,
      url: SITE_URL,
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
    image: absoluteUrl(article.cover),
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${article.id}`),
    },
  };
}

export function createCaseStudySchema(caseStudy) {
  // "CaseStudy" is not a schema.org type — Google discarded the old markup
  // entirely. Article is the closest valid type for a written case study.
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.summary,
    image: absoluteUrl(caseStudy.cover),
    articleSection: caseStudy.industry,
    keywords: [caseStudy.industry, "case study", SITE_NAME].join(", "),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    about: caseStudy.solution,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/work/${caseStudy.id}`),
    },
  };
}

/**
 * ProfessionalService — the local-business type for an agency. Pairs with a
 * Google Business Profile; for a services company that pairing is usually the
 * largest single source of qualified local enquiries.
 *
 * Deliberately no aggregateRating: Google's guidelines disallow self-serving
 * reviews on Organization and LocalBusiness markup, so the testimonials in
 * reviews.js must not be expressed here. Reviews collected on Google or Clutch
 * are the ones that earn stars.
 */
export function createProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description:
      "Software, cloud and AI engineering for teams building secure, scalable systems.",
    url: SITE_URL,
    logo: LOGO_URL,
    image: absoluteUrl("/og-image.webp"),
    email: CONTACT.email,
    telephone: CONTACT.phone,
    sameAs: SOCIAL_PROFILES,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    knowsAbout: [
      "Custom software development",
      "Cloud architecture",
      "Mobile and web applications",
      "Data analytics and AI",
      "Cybersecurity",
      "UI/UX design",
    ],
  };
}

/**
 * FAQPage schema. Google can surface these as expandable results, which takes
 * more space on the results page than a plain listing.
 * @param {{question: string, answer: string}[]} faqs
 */
export function createFaqSchema(faqs = []) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList. Google renders these in place of the raw URL in results,
 * which reads better and makes deep pages look like part of a real site.
 * @param {{name: string, path: string}[]} items - ordered, root first
 */
export function createBreadcrumbSchema(items = []) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path || item.url),
    })),
  };
}

/** Combine several schemas into one <script> via @graph. */
export function createGraph(...schemas) {
  return {
    "@context": "https://schema.org",
    // The shared @context moves to the top level; each entry drops its own.
    "@graph": schemas.map((schema) => {
      const entry = { ...schema };
      delete entry["@context"];
      return entry;
    }),
  };
}
