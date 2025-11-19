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
      sectionClassName="relative py-16 sm:py-20 lg:py-24 px-4 md:px-0 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300"
      containerClassName="relative max-w-7xl mx-auto section-center z-10"
      titleClassName="font-headline text-3xl md:text-4xl font-bold text-qs-primary text-center mb-3 sm:mb-4"
      descriptionClassName="font-body text-qs-text-section text-base sm:text-lg text-center mb-10 sm:mb-12 max-w-2xl mx-auto"
    >
      {/* Decorative BG Blurs */}
      <SectionBackgroundBlur topLeftClassName="pointer-events-none absolute top-0 left-0 w-60 h-60 bg-qs-primary blur-3xl opacity-10 z-0" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                icon={<Icon className="text-qs-primary text-4xl" />}
                description={item.text}
                className="h-full"
              />
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

