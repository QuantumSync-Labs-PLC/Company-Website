import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import heroImg from "../assets/images/heroImage1.jpg"; // Your image

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-navy min-h-[70vh] flex items-center">
      <div className="relative flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 z-10">
        {/* Left: Main Content */}
        <div className="relative flex-1 max-w-xl w-full flex flex-col justify-center items-start md:items-start z-20 py-10 md:py-0">
          {/* Glass Panel behind text */}
          <div className="absolute inset-0 -left-6 -right-6 md:-top-6 md:-bottom-6 bg-glass/80 backdrop-blur-lg rounded-glass shadow-neon-blue -z-10"></div>
          <motion.h1
            className="font-headline text-4xl md:text-5xl font-bold text-white mb-5 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
          >
            Modern IT Solutions<br className="hidden md:block" />
            for Your Digital Future
          </motion.h1>
          <motion.p
            className="font-body text-lg text-white/90 mb-8 drop-shadow"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            QuantumSync Labs empowers forward-thinking organizations with secure, scalable, and innovative software, cloud, and AI solutions.
            <br className="hidden md:block" /> Let’s accelerate your success.
          </motion.p>
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link to="/contact">
              <button className="bg-blue text-white font-bold rounded-glass shadow-neon-blue px-7 py-3 flex items-center gap-2 hover:bg-cyan transition text-base">
                Get Started <FaArrowRight />
              </button>
            </Link>
            <Link to="/services">
              <button className="bg-navy text-blue font-bold rounded-glass px-6 py-3 border border-blue hover:bg-blue hover:text-white transition text-base">
                View Services
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right: Hero Image */}
        <motion.div
          className="flex-1 flex justify-center items-center mb-10 md:mb-0 md:pl-10 z-20 w-full"
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.9, type: "spring" }}
        >
          <img
            src={heroImg}
            alt="Futuristic technology illustration"
            className="w-[300px] sm:w-[350px] md:w-[420px] max-w-full object-contain select-none pointer-events-none rounded-xl shadow-neon-blue"
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* Decorative blur overlays */}
      <div className="absolute top-[-40px] left-[-90px] w-80 h-80 bg-blue blur-3xl opacity-10 rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[-60px] right-[-80px] w-96 h-96 bg-cyan blur-2xl opacity-10 rounded-full pointer-events-none z-0"></div>
    </section>
  );
}

