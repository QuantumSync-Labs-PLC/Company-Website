// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import techStack from "../data/techStack"; // [{ id, name, logoPath }]
import Badge from "../components/common/Badge";

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
    <section
      id="tech-stack"
      className="relative py-20 px-4 md:px-0 bg-section scroll-mt-24"
      aria-labelledby="techstack-heading"
    >
      {/* Decorative BG Blurs */}
      <div className="pointer-events-none absolute top-0 left-0 w-56 h-56 bg-blue blur-3xl opacity-10 z-0" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-64 h-64 bg-cyan blur-2xl opacity-10 z-0" />

      <div className="relative max-w-7xl mx-auto section-center z-10">
        <h2
          id="techstack-heading"
          className="font-headline text-3xl md:text-4xl font-bold text-blue text-center mb-4"
        >
          Our Technology Stack
        </h2>
        <p className="font-body text-section text-lg text-center mb-12 max-w-2xl mx-auto">
          We build on robust, future-proof technologies to ensure security, scalability, and agility for every project.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={cardVariants}
              className="flex flex-col items-center"
            >
              <div className="glass p-5 flex flex-col items-center rounded-glass shadow-neon-blue w-full h-full transition hover:scale-105 duration-300">
                {/* Icon/Image Wrapper with bg and ring */}
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/80 ring-1 ring-blue mb-3 shadow-md">
                  <img
                    src={tech.logoPath}
                    alt={tech.name + " logo"}
                    className="w-10 h-10 object-contain"
                    loading="lazy"
                    draggable={false}
                    onError={handleImgError}
                  />
                </div>
                <Badge className="bg-blue/90 text-white border border-blue text-xs font-semibold px-4 py-1 rounded shadow">
                  {tech.name}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
