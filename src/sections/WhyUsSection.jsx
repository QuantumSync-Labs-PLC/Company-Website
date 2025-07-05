// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import whyUsData from "../data/whyUs"; // [{ id, icon, title, text }]
import Card from "../components/common/Card";

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
    <section
      id="why-us"
      className="relative py-20 px-4 md:px-0 bg-section scroll-mt-24"
      aria-labelledby="whyus-heading"
    >
      {/* Decorative BG Blurs */}
      <div className="pointer-events-none absolute top-0 left-0 w-60 h-60 bg-blue blur-3xl opacity-10 z-0" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 bg-cyan blur-2xl opacity-10 z-0" />

      <div className="relative max-w-7xl mx-auto section-center z-10">
        <h2
          id="whyus-heading"
          className="font-headline text-3xl md:text-4xl font-bold text-blue text-center mb-4"
        >
          Why Choose QuantumSync Labs?
        </h2>
        <p className="font-body text-section text-lg text-center mb-12 max-w-2xl mx-auto">
          We’re more than tech. We’re your partner for security, innovation, and results here’s why leading teams trust us:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUsData.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 6px 32px #0073FF44" }}
                className="transition-transform"
              >
                <Card
                  title={item.title}
                  icon={<Icon className="text-blue text-4xl" />}
                  description={item.text}
                  className="h-full"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
