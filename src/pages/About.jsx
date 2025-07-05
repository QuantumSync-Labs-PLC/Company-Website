/* eslint-disable no-unused-vars */
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import TeamSection from "../sections/TeamSection";
import WhyUsSection from "../sections/WhyUsSection";
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
    <div className="relative min-h-screen bg-section">
      <ScrollToTop showButton={true} />
      <Header />

      <main>
        {/* Hero / About Intro */}
        <section className="relative py-24 px-4 md:py-32 flex flex-col items-center justify-center bg-navy min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="glass rounded-glass shadow-neon-blue p-8 flex flex-col items-center w-full max-w-2xl z-10"
          >
            <img
              src={logo}
              alt="QuantumSync Labs Logo"
              className="h-16 w-16 md:h-20 md:w-20 mb-6 drop-shadow-lg object-contain"
              draggable={false}
            />
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-blue text-center mb-4">
              About QuantumSync Labs
            </h1>
            <p className="font-body text-lg md:text-xl text-section text-center max-w-xl">
              We are a passionate team of engineers, designers, and visionaries committed to helping businesses thrive in the digital era. From startups to global enterprises, we deliver secure, scalable, and innovative technology solutions that drive real-world impact.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="relative py-16 px-4 md:px-0 max-w-5xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="glass rounded-glass shadow-neon-blue p-8"
            >
              <h2 className="font-headline text-2xl text-blue font-bold mb-2">
                Our Mission
              </h2>
              <p className="font-body text-section text-lg">
                To empower organizations through technology—delivering secure, high-performance, and innovative solutions that transform ideas into impact.
              </p>
            </motion.div>
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="glass rounded-glass shadow-neon-blue p-8"
            >
              <h2 className="font-headline text-2xl text-blue font-bold mb-2">
                Our Vision
              </h2>
              <p className="font-body text-section text-lg">
                To be a trusted global partner for digital transformation, renowned for quality, creativity, and technical excellence.
              </p>
            </motion.div>
          </div>

          {/* Values */}
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
                  transition={{ delay: i * 0.09 }}
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
