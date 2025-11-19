import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import heroImg from "../assets/images/heroImage1.jpg";
import ResponsiveImage from "../components/common/ResponsiveImage";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-32 bg-main-gradient min-h-[60vh] sm:min-h-[70vh] flex items-center transition-colors duration-300">
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 z-10">
        {/* Left: Main Content */}
        <div className="relative flex-1 w-full max-w-xl lg:max-w-2xl flex flex-col justify-center items-start md:items-start z-20 py-8 sm:py-10 md:py-0">
          {/* Glass Panel behind text */}
          <div className="absolute inset-0 -left-6 -right-6 md:-top-6 md:-bottom-6 glass shadow-neon-blue -z-10"></div>
          <motion.h1
            className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-qs-text mb-4 sm:mb-5 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            Modern IT Solutions<br className="hidden md:block" />
            for Your Digital Future
          </motion.h1>
          <motion.p
            className="font-body text-base sm:text-lg text-qs-text/90 mb-6 sm:mb-8 drop-shadow max-w-xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            QuantumSync Labs empowers forward-thinking organizations with secure, scalable, and innovative software, cloud, and AI solutions.
            <br className="hidden md:block" /> Let’s accelerate your success.
          </motion.p>
          <motion.div
            className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-qs-gradient-primary text-white font-bold rounded-glass shadow-qs-neon px-7 py-3 flex items-center justify-center gap-2 hover:opacity-90 hover:shadow-qs-medium transition text-sm sm:text-base">
                Get Started <ArrowRight size={20} />
              </button>
            </Link>
            <Link to="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-qs-surface text-qs-primary font-bold rounded-glass px-6 py-3 border-2 border-qs-primary hover:bg-qs-primary-soft hover:border-qs-primary-hover transition text-sm sm:text-base">
                View Services
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right: Hero Image */}
        <motion.div
          className="flex-1 flex justify-center items-center mb-8 sm:mb-10 md:mb-0 md:pl-10 z-20 w-full"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.9, type: "spring" }}
        >
          <ResponsiveImage
            src={heroImg}
            alt="Futuristic technology illustration"
            className="w-64 sm:w-80 md:w-[420px] max-w-full object-contain pointer-events-none rounded-xl shadow-neon-blue"
          />
        </motion.div>
      </div>

      {/* Decorative blur overlays */}
      <div className="absolute top-[-40px] left-[-90px] w-80 h-80 bg-qs-primary blur-3xl opacity-10 rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-60px] right-[-80px] w-96 h-96 bg-qs-accent blur-2xl opacity-10 rounded-full pointer-events-none z-0"></div>
    </section>
  );
}

