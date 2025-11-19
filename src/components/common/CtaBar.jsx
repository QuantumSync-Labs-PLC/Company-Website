import { Link } from "react-router-dom";

export default function CtaBar() {
  return (
    <aside className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 z-40">
      <div className="glass shadow-neon flex flex-col sm:flex-row items-center gap-3 px-4 py-3 rounded-glass max-w-xl mx-auto">
        <div className="flex-1 text-center sm:text-left">
          <p className="font-headline text-sm sm:text-base text-qs-primary font-semibold">
            Ready to start your next project?
          </p>
          <p className="font-body text-xs sm:text-sm text-qs-text-section">
            Schedule a quick consultation with QuantumSync Labs today.
          </p>
        </div>
        <Link
          to="/contact"
          className="bg-qs-primary text-qs-text font-bold px-5 py-2 rounded-glass shadow-neon hover:bg-qs-accent transition text-xs sm:text-sm font-body"
        >
          Schedule a call
        </Link>
      </div>
    </aside>
  );
}
