// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import whyUsData from "../data/whyUs"; // [{ id, icon, title, text }]
import Card from "../components/common/Card";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";
import SectionShell from "../components/common/SectionShell";

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
      title="Why Choose QuantumSync Labs?"
      description="We’re more than tech. We’re your partner for security, innovation, and results here’s why leading teams trust us:"
      sectionClassName="relative py-20 sm:py-24 lg:py-28 px-4 md:px-6 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300"
      containerClassName="relative max-w-7xl mx-auto section-center z-10"
      titleClassName="font-headline text-4xl md:text-5xl font-bold bg-qs-gradient-primary bg-clip-text text-transparent text-center mb-4 sm:mb-5"
      descriptionClassName="font-body text-qs-text-section text-lg sm:text-xl text-center mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed"
    >
      {/* Decorative BG Blurs */}
      <SectionBackgroundBlur topLeftClassName="pointer-events-none absolute top-0 left-0 w-60 h-60 bg-qs-primary blur-3xl opacity-10 z-0" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {whyUsData.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02, boxShadow: "0 12px 48px #0073FF55" }}
              className="transition-all duration-300"
            >
              <Card
                title={item.title}
                icon={<Icon className="text-qs-primary text-4xl sm:text-5xl" />}
                description={item.text}
                className="h-full border border-qs-primary/10 shadow-neon-blue"
              />
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

