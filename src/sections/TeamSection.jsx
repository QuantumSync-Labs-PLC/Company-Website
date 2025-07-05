import teamMembers from "../data/teamMembers";
import { FaLinkedin, FaGithub } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Map icon string to component
const ICONS = {
  FaLinkedin: FaLinkedin,
  FaGithub: FaGithub,
};

export default function TeamSection() {
  return (
    <section>
      <h2 className="font-headline text-2xl md:text-3xl text-blue font-bold mb-10 text-center">
        Meet Our Leadership
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: i * 0.07 }}
            className="glass rounded-glass shadow-neon-blue p-8 flex flex-col items-center text-center"
          >
            <div className="w-28 h-28 mb-4 flex items-center justify-center rounded-full bg-navy-dk shadow-md overflow-hidden border-2 border-blue">
              <img
                src={member.photoPath}
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="font-headline text-blue text-lg font-semibold mb-1">{member.name}</div>
            <div className="font-body text-section text-sm mb-2">{member.role}</div>
            <div className="flex gap-3 mt-2">
              {member.socials?.map((s) => {
                const Icon = ICONS[s.icon];
                return (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-blue hover:text-cyan text-xl transition"
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
