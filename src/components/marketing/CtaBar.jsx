import { Link } from "react-router-dom";
import { bookingEnabled } from "@/components/integrations/BookingEmbed";
import { trackClick } from "@/utils/analytics";

export default function CtaBar() {
  // Only promise a call when there's a calendar to book into; otherwise the
  // button said "Schedule a call" and opened a contact form.
  const label = bookingEnabled ? "Schedule a call" : "Send a brief";
  const to = bookingEnabled ? "/contact#book" : "/contact";

  return (
    <aside className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 z-40">
      <div className="glass shadow-qs-neon border border-qs-hairline flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-5 py-4 rounded-glass max-w-2xl mx-auto backdrop-blur-xl">
        <div className="flex-1 text-center sm:text-left">
          <p className="font-headline text-sm sm:text-base text-qs-primary font-bold mb-1">
            Ready to start your next project?
          </p>
          <p className="font-body text-xs sm:text-sm text-qs-text-section">
            {bookingEnabled
              ? "Book a free 30-minute consultation with QuantumSync Labs."
              : "Tell us what you're building — we reply within one working day."}
          </p>
        </div>
        <Link
          to={to}
          onClick={() => trackClick(label, "cta_bar")}
          className="bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold px-6 py-3 rounded-glass shadow-md hover:shadow-qs-neon transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-body whitespace-nowrap"
        >
          {label}
        </Link>
      </div>
    </aside>
  );
}
