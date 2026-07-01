import { lazy, Suspense } from "react";
import ScrollToTop from "../components/common/ScrollToTop";
import Header from "../components/layout/Header";
import PageMeta from "../components/common/PageMeta";
import JsonLd, { createOrganizationSchema } from "../components/common/JsonLd";
import HeroSection from "../sections/HeroSection";
import Spinner from "../components/common/Spinner";
import CtaBar from "../components/common/CtaBar";

// Lazy load below-the-fold sections
const ServicesSection = lazy(() => import("../sections/ServicesSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const TechStackSection = lazy(() => import("../sections/TechStackSection"));
const WhyUsSection = lazy(() => import("../sections/WhyUsSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));
const Footer = lazy(() => import("../components/layout/Footer"));

// Lightweight fallback
function SectionFallback() {
  return (
    <div className="py-24 flex items-center justify-center bg-qs-bg">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="w-12 h-12" color="text-qs-primary" />
        <p className="font-body text-sm text-qs-text-muted animate-pulse">Loading section...</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg transition-colors duration-300">
      <PageMeta
        title="QuantumSync Labs"
        description="Empowering digital transformation through innovative, secure, and scalable IT solutions. Cloud, AI, and software engineering services."
        url="/"
      >
        <JsonLd schema={createOrganizationSchema()} />
      </PageMeta>
      <ScrollToTop showButton={true} />
      <Header />
      <main className="flex-grow flex flex-col">
        <HeroSection />
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <WhyUsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TechStackSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <CtaBar />
    </div>
  );
}
