import { Link } from "react-router-dom";
import PageMeta from "@/components/seo/PageMeta";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-qs-bg px-4 relative overflow-hidden transition-colors duration-300">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-qs-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-qs-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <PageMeta
        title="404 - Page Not Found"
        description="The page you are looking for could not be found on QuantumSync Labs."
        url="/404"
      />

      <main className="glass rounded-glass shadow-neon-blue px-6 py-12 sm:px-10 sm:py-16 md:px-14 md:py-20 flex flex-col items-center max-w-2xl w-full relative z-10 border border-qs-primary/10" role="main">
        {/* Decorative gradient line */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-qs-gradient-primary rounded-full opacity-60 shadow-lg"></div>

        {/* 404 Number with enhanced styling */}
        <div className="relative mb-8">
          <h1 className="text-[7rem] sm:text-[9rem] md:text-[11rem] leading-none font-headline font-black holo-text drop-shadow-2xl select-none">
            404
          </h1>
          <div className="absolute inset-0 text-[7rem] sm:text-[9rem] md:text-[11rem] font-headline font-black text-qs-primary blur-xl opacity-20 -z-10">
            404
          </div>
        </div>

        {/* Main heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-qs-primary mb-3 font-headline text-center">
          Page Not Found
        </h2>

        {/* Subheading */}
        <p className="text-qs-text-muted text-lg sm:text-xl md:text-2xl mb-4 font-headline text-center font-light">
          Lost in the quantum realm?
        </p>

        {/* Description */}
        <p className="text-qs-text-section text-base sm:text-lg mb-10 text-center font-body max-w-lg leading-relaxed">
          The page you&apos;re searching for seems to have drifted into another dimension. Let&apos;s get you back on track.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link
            to="/"
            className="bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold px-10 py-4 rounded-glass shadow-neon-blue transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-base font-body text-center"
          >
            Go Home
          </Link>
          <Link
            to="/services"
            className="glass border border-qs-primary text-qs-primary hover:bg-qs-primary hover:text-qs-on-primary font-bold px-10 py-4 rounded-glass transition-all duration-300 transform hover:scale-105 text-base font-body text-center"
          >
            Explore Services
          </Link>
        </div>

        {/* Contact hint */}
        <div className="mt-12 pt-8 border-t border-qs-primary/20 w-full">
          <p className="text-qs-text-muted text-sm sm:text-base text-center font-body">
            Still need help?{" "}
            <Link to="/contact" className="text-qs-primary hover:text-qs-accent font-semibold transition-colors duration-200 underline decoration-2 underline-offset-4">
              Contact us
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
