import { lazy, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Scene3DDeferred from "@/components/three/Scene3DDeferred";
import { trackClick } from "@/utils/analytics";

const HeroScene = lazy(() => import("@/components/three/HeroScene"));

const stats = [
  { value: "15+", label: "Projects Shipped" },
  { value: "99.9%", label: "Uptime Delivered" },
  { value: "24/7", label: "Support Coverage" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36 min-h-[70vh] sm:min-h-[80vh] flex items-center bg-qs-bg grid-backdrop transition-colors duration-300">
      {/* 3D holographic hero scene */}
      <Scene3DDeferred
        className="absolute inset-0 z-0"
        camera={{ position: [0, 0, 6], fov: 45 }}
        fallback={<div className="absolute inset-0 bg-qs-gradient-primary opacity-20" />}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Scene3DDeferred>

      {/* Vignette so text stays legible over the 3D scene */}
      <div className="absolute inset-0 z-1 bg-linear-to-b from-qs-bg/60 via-qs-bg/30 to-qs-bg pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-4 md:px-8">
        <motion.span
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Software &amp; Cloud Engineering
        </motion.span>

        <motion.h1
          className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.1]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <span className="holo-text">Engineering the</span>
          <br />
          Future of Software
        </motion.h1>

        <motion.p
          className="font-body text-base sm:text-lg text-qs-text-muted mb-10 max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          QuantumSync Labs designs and ships secure, scalable software, cloud, and AI
          systems for teams building what&rsquo;s next.
        </motion.p>

        <motion.div
          className="flex flex-col xs:flex-row gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link to="/contact" onClick={() => trackClick("Get Started", "hero")}>
            {/* Solid fill, not the gradient. White on the gradient's cyan
                start measured 1.81:1 — the worst contrast on the site. A solid
                primary with the on-primary label is 11:1 dark, 5.4:1 light. */}
            <button className="bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold rounded-qs-lg shadow-qs-neon px-7 py-3.5 flex items-center justify-center gap-2 hover:shadow-qs-medium transition-colors duration-200 text-sm sm:text-base">
              Get Started <ArrowRight size={18} />
            </button>
          </Link>
          <Link to="/services" onClick={() => trackClick("View Services", "hero")}>
            <button className="bg-transparent text-qs-text font-bold rounded-qs-lg px-7 py-3.5 border border-qs-hairline hover:border-qs-primary/40 hover:text-qs-primary transition text-sm sm:text-base">
              View Services
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-xl sm:text-2xl font-bold text-qs-primary">{stat.value}</span>
              <span className="text-xs uppercase tracking-widest text-qs-text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
