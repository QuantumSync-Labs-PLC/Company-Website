/* eslint-disable no-unused-vars */
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";
import TeamSection from "../sections/TeamSection";
import WhyUsSection from "../sections/WhyUsSection";
import { motion } from "framer-motion";
import logo from "../assets/images/Logo 3.1.webp";

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
    <div className="relative min-h-screen bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="About"
        description="Learn about QuantumSync Labs, our mission, vision, and the team behind our modern IT solutions."
        url="/about"
      />

      <main role="main">
        {/* Hero / About Intro */}
        <section className="relative py-20 sm:py-24 lg:py-32 px-4 flex flex-col items-center justify-center bg-qs-bg min-h-[55vh] sm:min-h-[60vh]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-10 left-10 w-96 h-96 bg-qs-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-qs-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="glass rounded-qs-lg shadow-neon border border-qs-primary/10 p-8 sm:p-10 md:p-12 flex flex-col items-center w-full max-w-3xl z-10"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-qs-primary/10 border border-qs-primary mb-6 shadow-lg">
              <img
                src={logo}
                alt="QuantumSync Labs Logo"
                className="h-14 w-14 md:h-16 md:w-16 drop-shadow-lg object-contain"
                draggable={false}
              />
            </div>
            <span className="eyebrow mb-4">Our Story</span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text text-center mb-5 sm:mb-6">
              About QuantumSync Labs
            </h1>
            <p className="font-body text-lg sm:text-xl md:text-2xl text-qs-text-section text-center max-w-2xl leading-relaxed">
              We are a passionate team of engineers, designers, and visionaries committed to helping businesses thrive in the digital era. From startups to global enterprises, we deliver secure, scalable, and innovative technology solutions that drive real-world impact.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="relative py-14 sm:py-16 lg:py-20 px-4 md:px-0 max-w-5xl mx-auto z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-12 sm:mb-14">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="glass rounded-qs-lg shadow-neon p-6 sm:p-8"
            >
              <h2 className="font-headline text-2xl text-qs-primary font-bold mb-2">
                Our Mission
              </h2>
              <p className="font-body text-qs-text-section text-base sm:text-lg">
                To empower organizations through technology—delivering secure, high-performance, and innovative solutions that transform ideas into impact.
              </p>
            </motion.div>
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="glass rounded-qs-lg shadow-neon p-6 sm:p-8"
            >
              <h2 className="font-headline text-2xl text-qs-primary font-bold mb-2">
                Our Vision
              </h2>
              <p className="font-body text-qs-text-section text-base sm:text-lg">
                To be a trusted global partner for digital transformation, renowned for quality, creativity, and technical excellence.
              </p>
            </motion.div>
          </div>

          {/* Values */}
          <div>
            <div className="flex justify-center mb-4">
              <span className="eyebrow">What Drives Us</span>
            </div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold holo-text mb-10 sm:mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {values.map((val, i) => (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: i * 0.09, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 60px #22d3ee40" }}
                  className="glass rounded-qs-lg shadow-neon border border-qs-primary/10 p-6 sm:p-7 text-center transition-all duration-300 hover:border-qs-primary/30"
                >
                  <div className="font-headline text-qs-primary text-xl font-bold mb-3">
                    {val.title}
                  </div>
                  <div className="font-body text-qs-text-section text-sm sm:text-base leading-relaxed">{val.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <WhyUsSection />

        {/* Team/Leadership Section */}
        <section className="relative py-20 sm:py-24 lg:py-28 px-4 md:px-6 max-w-7xl mx-auto z-10">
          <TeamSection />
        </section>
      </main>

      <Footer />
    </div>
  );
}
