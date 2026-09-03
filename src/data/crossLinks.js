/**
 * Cross-references between services and case studies.
 *
 * caseStudies.js tags each project with serviceIds. Those IDs previously
 * matched nothing in services.js, so the highest-intent internal link on the
 * site — proof next to the service that sold it — resolved to nothing.
 * These helpers are the only place that relationship is read.
 */
import services from "@/data/services";
import caseStudies from "@/data/caseStudies";

const serviceIndex = new Map(services.map((s) => [s.id, s]));

/**
 * IDs referenced by a case study that don't exist in services.js.
 * Surfaced loudly in development so a typo can't silently break the links again.
 */
if (import.meta.env.DEV) {
  const unknown = caseStudies.flatMap((study) =>
    (study.serviceIds || [])
      .filter((id) => !serviceIndex.has(id))
      .map((id) => `${study.id} -> "${id}"`)
  );
  if (unknown.length) {
    console.error(
      "[crossLinks] Case studies reference unknown service IDs:\n  " +
        unknown.join("\n  ") +
        `\nValid IDs: ${[...serviceIndex.keys()].join(", ")}`
    );
  }
}

/** Services a given case study used, in the order the case study lists them. */
export function servicesForCaseStudy(caseStudy) {
  if (!caseStudy?.serviceIds) return [];
  return caseStudy.serviceIds.map((id) => serviceIndex.get(id)).filter(Boolean);
}

/**
 * Case studies that used a given service — the proof to show on a service page.
 * Featured studies come first so the strongest work leads.
 */
export function caseStudiesForService(serviceId, limit = 2) {
  return caseStudies
    .filter((study) => study.serviceIds?.includes(serviceId))
    .sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))
    .slice(0, limit);
}
