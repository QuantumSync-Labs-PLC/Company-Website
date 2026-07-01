import teamMembers from "../data/teamMembers";
import { Linkedin, Github } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionShell from "../components/common/SectionShell";
import SectionBackgroundBlur from "../components/common/SectionBackgroundBlur";

// Map icon string to component
const ICONS = {
  Linkedin: Linkedin,
  Github: Github,
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 120, damping: 18 }
  }),
};

export default function TeamSection() {
  return (
    <SectionShell
      id="team"
      title="Meet Our Leadership"
      sectionClassName="relative py-20 sm:py-24 lg:py-28 px-4 md:px-6 bg-qs-bg text-qs-text scroll-mt-24 transition-colors duration-300"
      containerClassName="relative max-w-7xl mx-auto section-center z-10"
      titleClassName="font-headline text-4xl md:text-5xl font-bold holo-text text-center mb-12 sm:mb-16"
    >
      <SectionBackgroundBlur />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 60px #22d3ee40" }}
            className="glass rounded-qs-lg shadow-neon border border-qs-primary/10 p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-qs-primary/30"
          >
            <div className="w-32 h-32 mb-5 flex items-center justify-center rounded-full bg-qs-surface shadow-lg overflow-hidden border-3 border-qs-primary ring-2 ring-qs-primary/20">
              <img
                src={member.photoPath}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="font-headline text-qs-primary text-xl font-bold mb-2">{member.name}</div>
            <div className="font-body text-qs-text-muted text-sm sm:text-base mb-4">{member.role}</div>
            <div className="flex gap-4 mt-2">
              {member.socials?.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-qs-primary hover:text-qs-accent text-2xl transition-all duration-200 hover:scale-110"
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
