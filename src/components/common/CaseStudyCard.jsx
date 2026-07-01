// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "./Button";

const defaultVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 120, damping: 18 },
  }),
};

export default function CaseStudyCard({
  caseStudy,
  index = 0,
  variants = defaultVariants,
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
      whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 60px #22d3ee40" }}
      className="transition-all duration-300"
    >
      <Link to={`/work/${caseStudy.id}`} className="block h-full">
        <div className="glass rounded-qs-lg shadow-neon border border-qs-primary/10 overflow-hidden flex flex-col h-full">
          {/* Cover Image */}
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-qs-surface">
            <img
              src={caseStudy.cover}
              alt={caseStudy.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            {caseStudy.featured && (
              <div className="absolute top-4 right-4 bg-qs-signal text-qs-bg px-3 py-1 rounded-full text-xs font-bold">
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-6 sm:p-7">
            {/* Industry Badge */}
            <div className="inline-flex w-fit mb-3">
              <span className="text-xs font-bold text-qs-accent bg-qs-accent/10 px-3 py-1.5 rounded-full">
                {caseStudy.industry}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-headline text-xl sm:text-2xl font-bold text-qs-text mb-2">
              {caseStudy.title}
            </h3>

            {/* Client */}
            <p className="font-body text-sm text-qs-text-muted mb-3">
              {caseStudy.client}
            </p>

            {/* Summary */}
            <p className="font-body text-sm sm:text-base text-qs-text-section mb-6 flex-grow leading-relaxed">
              {caseStudy.summary}
            </p>

            {/* Key Metrics Preview */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-t border-qs-primary/10">
                {caseStudy.metrics.slice(0, 2).map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-sm font-bold holo-text">
                      {metric.value}{metric.suffix}
                    </div>
                    <div className="text-xs text-qs-text-muted">{metric.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <Button variant="primary" size="sm" className="w-full flex items-center justify-center gap-2">
              Read Case Study <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
