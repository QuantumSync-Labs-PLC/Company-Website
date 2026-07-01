import { lazy, Suspense } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import whyUsData from "../data/whyUs"; // [{ id, icon, title, text }]
import Card from "../components/common/Card";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";
import SectionShell from "../components/common/SectionShell";
import Scene3D from "../components/three/Scene3D";

const FloatingObjects = lazy(() => import("../components/three/FloatingObjects"));

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.14, type: "spring", stiffness: 120, damping: 20 }
  }),
};

export default function WhyUsSection() {
  return (
    <SectionShell
      id="why-us"
      eyebrow="02 — Why Us"
      title="Why Choose QuantumSync Labs?"
      description="We’re more than tech. We’re your partner for security, innovation, and results here’s why leading teams trust us:"
    >
      {/* Decorative BG Blurs */}
      <SectionBackgroundBlur topLeftClassName="pointer-events-none absolute top-0 left-0 w-60 h-60 bg-qs-primary blur-3xl opacity-10 z-0" />

      {/* Ambient 3D accent */}
      <Scene3D className="absolute inset-0 z-0 opacity-70" camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <FloatingObjects count={3} />
        </Suspense>
      </Scene3D>

      {/* Bento Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
        {whyUsData.map((item, i) => {
          const Icon = item.icon;
          const isFeatured = i === 0 || i === 3;
          const colSpan = isFeatured ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-1 lg:col-span-2";
          return (
            <div key={item.id} className={colSpan}>
              <motion.div
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 60px #22d3ee40" }}
                className="transition-all duration-300"
              >
                <Card
                  title={item.title}
                  icon={<Icon className="text-qs-primary text-4xl sm:text-5xl" />}
                  description={item.text}
                  className={`h-full border border-qs-primary/10 shadow-neon ${isFeatured ? 'p-8 sm:p-10' : 'p-6 sm:p-8'}`}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

