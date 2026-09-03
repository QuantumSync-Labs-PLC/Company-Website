/**
 * Lead delivery.
 *
 * A contact form that only emails an inbox loses threads and gives the sender
 * no acknowledgement. sendLead() does three things instead:
 *   1. delivers the enquiry to the team (EmailJS, required)
 *   2. sends the enquirer an instant acknowledgement (EmailJS, optional)
 *   3. posts the lead to a webhook for the CRM (optional)
 *
 * Only step 1 can fail the submission. If the acknowledgement or the CRM copy
 * fails, the enquiry still reached the team, so the visitor is told it worked.
 */
import emailjs from "@emailjs/browser";
import { UNSPECIFIED } from "@/constants/leadForm";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const LEAD_WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL;

/** Read the enquiry fields out of a form element. */
export function readLead(formEl) {
  const data = new FormData(formEl);
  const get = (name) => (data.get(name) || "").toString().trim();

  return {
    name: get("user_name"),
    email: get("user_email"),
    phone: get("user_phone") || UNSPECIFIED,
    subject: get("subject") || UNSPECIFIED,
    service: get("service") || UNSPECIFIED,
    budget: get("budget") || UNSPECIFIED,
    timeline: get("timeline") || UNSPECIFIED,
    message: get("message"),
  };
}

/** Fire-and-forget copy to a CRM via webhook (Zapier, Make, Sheets, HubSpot…). */
async function postToCrm(lead, source) {
  if (!LEAD_WEBHOOK_URL) return;

  try {
    await fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        source,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
      }),
      keepalive: true,
    });
  } catch (error) {
    // The team already has the enquiry by email; never fail the form on this.
    console.error("[leads] CRM webhook failed:", error);
  }
}

/** Instant acknowledgement to the person who enquired. */
async function sendAcknowledgement(lead) {
  if (!AUTOREPLY_TEMPLATE_ID) return;

  try {
    await emailjs.send(
      SERVICE_ID,
      AUTOREPLY_TEMPLATE_ID,
      {
        to_name: lead.name,
        to_email: lead.email,
        subject: lead.subject,
        service: lead.service,
        message: lead.message,
      },
      PUBLIC_KEY
    );
  } catch (error) {
    console.error("[leads] Auto-reply failed:", error);
  }
}

/**
 * Deliver an enquiry. Resolves with the parsed lead on success.
 * Rejects only when the enquiry failed to reach the team.
 *
 * @param {HTMLFormElement} formEl - the submitted form
 * @param {string} source - which form this came from, for reporting
 */
export async function sendLead(formEl, source) {
  const lead = readLead(formEl);

  // Must succeed: this is the copy the team acts on.
  await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formEl, PUBLIC_KEY);

  // Best effort, in parallel, never blocking the success state on a failure.
  await Promise.allSettled([sendAcknowledgement(lead), postToCrm(lead, source)]);

  return lead;
}

/** True when the acknowledgement email is configured, so the UI can promise it. */
export const hasAutoReply = Boolean(AUTOREPLY_TEMPLATE_ID);
