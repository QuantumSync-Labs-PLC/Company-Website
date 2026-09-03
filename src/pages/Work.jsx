import { lazy } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageMeta from "@/components/seo/PageMeta";
import caseStudies from "@/data/caseStudies";
import CaseStudyCard from "@/components/marketing/CaseStudyCard";
import SectionBackgroundBlur from "@/components/layout/SectionBackgroundBlur";

const Spinner = lazy(() => import("@/components/ui/Spinner"));

export default function Work() {
  const featuredStudies = caseStudies.filter((study) => study.featured);
  const otherStudies = caseStudies.filter((study) => !study.featured);

  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Case Studies"
        description="Explore QuantumSync Labs' successful client projects and digital transformation case studies across industries."
        url="/work"
      />

      <main role="main" className="grow">
        {/* Hero Section */}
        <section className="relative py-20 sm:py-24 lg:py-32 flex flex-col items-center justify-center bg-qs-bg min-h-[45vh] sm:min-h-[50vh] px-4">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-10 left-10 w-96 h-96 bg-qs-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-qs-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <span className="eyebrow mb-4">Proven Results</span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text text-center mb-4 sm:mb-6">
              Our Case Studies
            </h1>
            <p className="font-body text-qs-text-section text-lg sm:text-xl text-center max-w-3xl mx-auto leading-relaxed">
              Discover how QuantumSync Labs has transformed businesses across industries with innovative, scalable solutions and strategic digital transformations.
            </p>
          </div>
        </section>

        {/* Featured Case Studies */}
        {featuredStudies.length > 0 && (
          <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg">
            <SectionBackgroundBlur />
            <div className="relative max-w-7xl mx-auto z-10">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-qs-text mb-12 sm:mb-16">
                Featured Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {featuredStudies.map((study, i) => (
                  <CaseStudyCard key={study.id} caseStudy={study} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Case Studies Grid */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg">
          <SectionBackgroundBlur />
          <div className="relative max-w-7xl mx-auto z-10">
            {featuredStudies.length > 0 && (
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-qs-text mb-12 sm:mb-16">
                More Case Studies
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {otherStudies.map((study, i) => (
                <CaseStudyCard key={study.id} caseStudy={study} index={i} />
              ))}
            </div>
            {caseStudies.length === 0 && (
              <div className="text-center py-16">
                <p className="text-qs-text-section text-lg">No case studies found yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
