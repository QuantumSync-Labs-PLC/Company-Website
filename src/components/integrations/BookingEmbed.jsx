import { useState } from "react";
import PropTypes from "prop-types";
import { CalendarClock, ExternalLink } from "lucide-react";
import { trackClick } from "@/utils/analytics";

/**
 * Google Appointment Schedule embed.
 *
 * Set VITE_BOOKING_URL to the schedule's public link, e.g.
 *   https://calendar.google.com/calendar/appointments/schedules/AcZssZ.../
 * The embed adds ?gv=true itself.
 *
 * With no URL configured the component renders nothing, so a half-set-up
 * booking flow never shows visitors an empty iframe.
 */
export const BOOKING_URL = import.meta.env.VITE_BOOKING_URL || "";

/** True when booking is live, so CTAs can promise a call rather than a form. */
export const bookingEnabled = Boolean(BOOKING_URL);

function embedSrc(url) {
  return url.includes("gv=true")
    ? url
    : `${url}${url.includes("?") ? "&" : "?"}gv=true`;
}

export default function BookingEmbed({
  title = "Book a 30-minute consultation",
  description = "Pick a time that suits you. You'll get a calendar invite with a video link straight away.",
  height = 620,
  className = "",
}) {
  const [loaded, setLoaded] = useState(false);

  if (!bookingEnabled) return null;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col items-center text-center mb-6">
        <span className="eyebrow mb-3">Book a call</span>
        <h2 className="font-headline text-2xl sm:text-3xl font-bold holo-text mb-3">
          {title}
        </h2>
        <p className="font-body text-qs-text-section max-w-xl">{description}</p>
      </div>

      <div className="glass rounded-glass border border-qs-hairline overflow-hidden relative">
        {!loaded && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-qs-surface"
            aria-hidden="true"
          >
            <CalendarClock className="text-qs-primary animate-pulse" size={32} />
            <p className="font-body text-sm text-qs-text-muted">Loading available times…</p>
          </div>
        )}
        <iframe
          src={embedSrc(BOOKING_URL)}
          title="Schedule a consultation with QuantumSync Labs"
          width="100%"
          height={height}
          frameBorder="0"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          style={{ border: 0, display: "block" }}
        />
      </div>

      {/* Google's embed can be blocked by strict privacy settings or extensions. */}
      <p className="font-body text-sm text-qs-text-muted text-center mt-4">
        Calendar not loading?{" "}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackClick("Open booking page", "booking")}
          className="text-qs-primary hover:underline inline-flex items-center gap-1"
        >
          Open it in a new tab <ExternalLink size={14} />
        </a>
      </p>
    </div>
  );
}

BookingEmbed.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  height: PropTypes.number,
  className: PropTypes.string,
};
