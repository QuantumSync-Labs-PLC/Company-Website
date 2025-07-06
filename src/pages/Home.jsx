import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/layout/Header";
import HeroSection from "../sections/HeroSection";
import ServicesSection from "../sections/ServicesSection";
import ProjectsSection from "../sections/ProjectsSection";
import TechStackSection from "../sections/TechStackSection";
import WhyUsSection from "../sections/WhyUsSection";
import ContactSection from "../sections/ContactSection";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-navy">
      <ScrollToTop showButton={true} />
      <Header />
      <main className="flex-grow flex flex-col">
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <ProjectsSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
