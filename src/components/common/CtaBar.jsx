import { Link } from "react-router-dom";

export default function CtaBar() {
  return (
    <aside className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 z-40">
      <div className="glass shadow-neon-blue border border-qs-primary/20 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-5 py-4 rounded-glass max-w-2xl mx-auto backdrop-blur-xl">
        <div className="flex-1 text-center sm:text-left">
          <p className="font-headline text-sm sm:text-base text-qs-primary font-bold mb-1">
            Ready to start your next project?
          </p>
          <p className="font-body text-xs sm:text-sm text-qs-text-section">
            Schedule a quick consultation with QuantumSync Labs today.
          </p>
        </div>
        <Link
          to="/contact"
          className="bg-qs-primary hover:bg-qs-primary-hover text-white font-bold px-6 py-3 rounded-glass shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm font-body whitespace-nowrap"
        >
          Schedule a call
        </Link>
      </div>
    </aside>
  );
}
