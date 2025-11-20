import teamMembers from "../data/teamMembers";
import { Linkedin, Github } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Map icon string to component
const ICONS = {
  Linkedin: Linkedin,
  Github: Github,
};

export default function TeamSection() {
  return (
    <section>
      <h2 className="font-headline text-3xl md:text-4xl text-qs-primary font-bold mb-12 sm:mb-16 text-center">
        Meet Our Leadership
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: i * 0.07, type: "spring", stiffness: 100 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass rounded-glass shadow-neon-blue border border-qs-primary/10 p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-qs-primary/30 hover:shadow-xl"
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
    </section>
  );
}
