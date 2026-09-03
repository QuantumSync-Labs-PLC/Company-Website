/**
 * Shared options for the contact/enquiry forms.
 *
 * Budget and timeline exist so enquiries can be triaged before the first call,
 * and so GA4 reports which services actually generate demand. Both are
 * optional on the form — asking is useful, requiring it costs conversions.
 */

export const SUBJECTS = [
  "Project Inquiry",
  "Support",
  "Partnership",
  "General Question",
  "Other",
];

export const BUDGET_BANDS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

export const TIMELINES = [
  "As soon as possible",
  "Within 1–3 months",
  "In 3–6 months",
  "Just exploring",
];

/** Value used when a visitor leaves an optional field untouched. */
export const UNSPECIFIED = "Not specified";
