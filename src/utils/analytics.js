/**
 * Analytics Utility for Google Analytics 4 (GA4)
 * Wraps gtag functions for easier tracking throughout the app
 */

export function initAnalytics() {
  const gaId = import.meta.env.VITE_GA_ID;

  if (!gaId) {
    // GA not configured, skip initialization
    console.debug("GA4 tracking ID not configured");
    return;
  }

  // Inject GA script
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  // Configure gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", gaId, {
    // Optional: Send page view on init (page view is usually sent separately)
    // send_page_view: true
  });
}

/**
 * Track a page view event
 * Call this on route changes
 * @param {string} path - Page path (e.g., "/services")
 * @param {string} title - Page title (e.g., "Services")
 */
export function trackPageView(path, title) {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track a custom event
 * @param {string} eventName - Name of the event (e.g., "contact_form_submit")
 * @param {Object} eventData - Event parameters (e.g., { category: "engagement" })
 */
export function trackEvent(eventName, eventData = {}) {
  if (typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", eventName, eventData);
}

/**
 * Track a button/link click
 * @param {string} label - Button label/description
 * @param {string} category - Optional category
 */
export function trackClick(label, category = "click") {
  trackEvent("click", {
    label,
    category,
  });
}

/**
 * Track form submission
 * @param {string} formName - Name of the form (e.g., "contact_form")
 */
export function trackFormSubmit(formName) {
  trackEvent("form_submit", {
    form_name: formName,
  });
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup() {
  trackEvent("newsletter_signup", {
    category: "engagement",
  });
}

/**
 * Track case study view
 * @param {string} caseStudyId - ID of the case study
 * @param {string} caseStudyTitle - Title of the case study
 */
export function trackCaseStudyView(caseStudyId, caseStudyTitle) {
  trackEvent("case_study_view", {
    case_study_id: caseStudyId,
    case_study_title: caseStudyTitle,
    category: "engagement",
  });
}

/**
 * Track blog post view
 * @param {string} postId - ID of the blog post
 * @param {string} postTitle - Title of the blog post
 */
export function trackBlogPostView(postId, postTitle) {
  trackEvent("blog_post_view", {
    post_id: postId,
    post_title: postTitle,
    category: "engagement",
  });
}

/**
 * Track service page view
 * @param {string} serviceId - ID of the service
 * @param {string} serviceName - Name of the service
 */
export function trackServiceView(serviceId, serviceName) {
  trackEvent("service_view", {
    service_id: serviceId,
    service_name: serviceName,
    category: "engagement",
  });
}

/**
 * Track conversion (e.g., contact form completion)
 * @param {string} conversionType - Type of conversion (e.g., "contact_inquiry")
 */
export function trackConversion(conversionType) {
  trackEvent("conversion", {
    conversion_type: conversionType,
    category: "conversion",
  });
}
