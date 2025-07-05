import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import TeamSection from "../sections/TeamSection";
import WhyUsSection from "../sections/WhyUsSection";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import logo from "../assets/images/logo2.png";

const values = [
  {
    title: "Innovation",
    text: "We push boundaries and embrace new technology to deliver future-proof solutions.",
  },
  {
    title: "Integrity",
    text: "We build trust with honesty, transparency, and a relentless commitment to quality.",
  },
  {
    title: "Collaboration",
    text: "We succeed as a team—working closely with our clients, partners, and each other.",
  },
  {
    title: "Excellence",
    text: "We go the extra mile, always striving for outstanding results in every project.",
  },
];

export default function About() {
  return (
    <div className="relative">
      {/* <BackgroundEffects /> */}
      <ScrollToTop showButton={true} />
      <Header />
      <main className="bg-section">
        {/* About Hero Section */}
        <section className="relative py-24 px-4 md:py-32 flex flex-col items-center justify-center bg-navy min-h-[60vh]">
          <div className="glass rounded-glass shadow-neon-blue p-8 flex flex-col items-center w-full max-w-2xl">
            <img
              src={logo}
              alt="QuantumSync Labs Logo"
              className="h-16 w-16 md:h-20 md:w-20 mb-6 drop-shadow-lg object-contain"
              draggable={false}
            />
            <motion.h1
              className="font-headline text-4xl md:text-5xl font-bold text-blue text-center mb-4"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              About QuantumSync Labs
            </motion.h1>
            <motion.p
              className="font-body text-lg md:text-xl text-section text-center max-w-xl mb-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              We are a passionate team of engineers, designers, and visionaries committed to helping businesses thrive in the digital era. From startups to global enterprises, we deliver secure, scalable, and innovative technology solutions that drive real-world impact.
            </motion.p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="relative py-16 px-4 md:px-0 max-w-5xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-glass shadow-neon-blue p-8"
            >
              <h2 className="font-headline text-2xl text-blue font-bold mb-2">Our Mission</h2>
              <p className="font-body text-section text-lg">
                To empower organizations through technology—delivering secure, high-performance, and innovative solutions that transform ideas into impact.
              </p>
            </motion.div>
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="glass rounded-glass shadow-neon-blue p-8"
            >
              <h2 className="font-headline text-2xl text-blue font-bold mb-2">Our Vision</h2>
              <p className="font-body text-section text-lg">
                To be a trusted global partner for digital transformation, renowned for quality, creativity, and technical excellence.
              </p>
            </motion.div>
          </div>
          <div>
            <h2 className="font-headline text-2xl text-blue font-bold mb-6 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-glass shadow p-5 text-center"
                >
                  <div className="font-headline text-blue text-lg font-semibold mb-2">
                    {val.title}
                  </div>
                  <div className="font-body text-section text-sm">{val.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <WhyUsSection />

        {/* Team/Leadership Section */}
        <section className="relative py-16 px-4 md:px-0 max-w-6xl mx-auto z-10">
          <TeamSection />
        </section>

      </main>
      <Footer />
    </div>
  );
}
