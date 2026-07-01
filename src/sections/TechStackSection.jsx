import { lazy, Suspense } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import techStack from "../data/techStack"; // [{ id, name, logoPath }]
import Badge from "../components/common/Badge";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";
import SectionShell from "../components/common/SectionShell";
import Scene3D from "../components/three/Scene3D";

const FloatingObjects = lazy(() => import("../components/three/FloatingObjects"));

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, type: "spring", stiffness: 110, damping: 18 }
  }),
};

function handleImgError(e) {
  e.target.src = "https://via.placeholder.com/56x56?text=?";
  e.target.style.background = "#e0e7ef"; // fallback bg
}

export default function TechStackSection() {
  return (
    <SectionShell
      id="tech-stack"
      eyebrow="03 — Stack"
      title="Our Technology Stack"
      description="We build on robust, future-proof technologies to ensure security, scalability, and agility for every project."
    >
      {/* Decorative BG Blurs */}
      <SectionBackgroundBlur topLeftClassName="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-qs-primary blur-3xl opacity-10 z-0" />

      {/* Ambient 3D accent */}
      <Scene3D className="absolute inset-0 z-0 opacity-60" camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <FloatingObjects count={4} />
        </Suspense>
      </Scene3D>

      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
        {techStack.map((tech, i) => (
          <motion.div
            key={tech.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardVariants}
            className="flex flex-col items-center"
          >
            <div className="glass p-6 flex flex-col items-center rounded-qs-lg shadow-neon border border-qs-primary/10 w-full h-full transition-all duration-300 hover:scale-105 hover:border-qs-primary/30">
              {/* Icon/Image Wrapper with bg and ring */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-qs-surface ring-2 ring-qs-primary/50 mb-3 shadow-lg">
                <img
                  src={tech.logoPath}
                  alt={tech.name + " logo"}
                  className="w-10 h-10 object-contain"
                  loading="lazy"
                  draggable={false}
                  onError={handleImgError}
                />
              </div>
              <Badge
                textColor="text-qs-bg"
                className="border border-qs-primary/20 text-xs font-bold px-4 py-1.5 rounded-full"
              >
                {tech.name}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
