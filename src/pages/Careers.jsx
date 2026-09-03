import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageMeta from "@/components/seo/PageMeta";
import SectionBackgroundBlur from "@/components/layout/SectionBackgroundBlur";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import formatDate from "@/utils/formatDate";
import careers from "@/data/careers";

const APPLY_FORM_URL = "https://forms.gle/fK6DENogbvbDKrwc9";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring", stiffness: 120, damping: 18 },
  }),
};

export default function Careers() {
  const detailsRef = useRef(null);

  const openRoles = careers.filter((role) => role.status === "open");
  const defaultRoleId = openRoles[0]?.id || careers[0]?.id || "";

  const [selectedRoleId, setSelectedRoleId] = useState(defaultRoleId);

  const selectedRole =
    careers.find((role) => role.id === selectedRoleId) || openRoles[0];

  const handleScrollTo = (targetRef, roleId) => {
    if (roleId) setSelectedRoleId(roleId);
    setTimeout(() => {
      targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Careers"
        description="Join QuantumSync Labs. Explore open roles and apply to build secure, scalable, and innovative software with our team."
        url="/careers"
      />

      <main role="main">
        {/* Hero */}
        <section className="relative py-20 sm:py-24 lg:py-32 px-4 flex flex-col items-center justify-center bg-qs-bg min-h-[50vh]">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-10 left-10 w-96 h-96 bg-qs-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-qs-accent rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <Badge pill className="mb-6">Careers</Badge>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-5">
              Build the Future With Us
            </h1>
            <p className="font-body text-qs-text-section text-lg sm:text-xl leading-relaxed">
              We are a small, ambitious team building secure, scalable products for modern businesses. Explore open roles and apply to grow with us.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                type="button"
                onClick={() => handleScrollTo(detailsRef, selectedRole?.id)}
              >
                View Role Details
              </Button>
              <Button
                type="button"
                variant="glass"
                onClick={() => window.open(APPLY_FORM_URL, "_blank", "noopener,noreferrer")}
              >
                Apply Now
              </Button>
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg">
          <SectionBackgroundBlur />
          <div className="relative max-w-6xl mx-auto z-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <h2 className="font-headline text-3xl sm:text-4xl font-bold text-qs-text mb-2">
                  Open Roles
                </h2>
                <p className="font-body text-qs-text-section text-base sm:text-lg">
                  Apply to the role that fits your strengths and ambitions.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Badge outline color="border-qs-primary" textColor="text-qs-primary">
                  {openRoles.length} Open
                </Badge>
                <Badge outline color="border-qs-accent" textColor="text-qs-accent">
                  Remote Friendly
                </Badge>
              </div>
            </div>

            {openRoles.length === 0 ? (
              <div className="glass rounded-glass shadow-neon p-8 text-center">
                <h3 className="font-headline text-2xl text-qs-primary font-bold mb-3">
                  No openings right now
                </h3>
                <p className="font-body text-qs-text-section text-base">
                  We are not hiring at the moment, but you can still reach out via the contact page.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {openRoles.map((role, i) => (
                  <motion.article
                    key={role.id}
                    className="glass rounded-glass shadow-neon p-7 sm:p-8 border border-qs-primary/10 hover:border-qs-primary/30 transition-all duration-300"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-headline text-2xl font-bold text-qs-text mb-2">
                          {role.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge outline color="border-qs-primary" textColor="text-qs-primary">
                            {role.team}
                          </Badge>
                          <Badge outline color="border-qs-accent" textColor="text-qs-accent">
                            {role.location}
                          </Badge>
                          <Badge outline color="border-qs-primary" textColor="text-qs-primary">
                            {role.type}
                          </Badge>
                        </div>
                      </div>
                      <Badge pill className="self-start">Open</Badge>
                    </div>
                    <p className="font-body text-qs-text-section text-base leading-relaxed mb-6">
                      {role.summary}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleScrollTo(detailsRef, role.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        type="button"
                        onClick={() => window.open(APPLY_FORM_URL, "_blank", "noopener,noreferrer")}
                      >
                        Apply
                      </Button>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Role Details */}
        {selectedRole && (
          <section ref={detailsRef} className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg">
            <div className="max-w-5xl mx-auto">
              <div className="glass rounded-glass shadow-neon p-8 sm:p-10 border border-qs-primary/10">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-6">
                  <div>
                    <h2 className="font-headline text-3xl sm:text-4xl font-bold text-qs-text mb-3">
                      {selectedRole.title}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedRole.tags?.map((tag) => (
                        <Badge key={tag} outline color="border-qs-primary" textColor="text-qs-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm font-body text-qs-text-muted">
                    Posted {formatDate(selectedRole.postedDate, { style: "date" })}
                  </div>
                </div>

                <p className="font-body text-qs-text-section text-base sm:text-lg leading-relaxed mb-8">
                  {selectedRole.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass rounded-glass p-6 border border-qs-primary/10">
                    <h3 className="font-headline text-xl text-qs-primary font-bold mb-3">What you will do</h3>
                    <ul className="font-body text-qs-text-section text-sm sm:text-base space-y-2 list-disc list-inside">
                      {selectedRole.responsibilities?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass rounded-glass p-6 border border-qs-primary/10">
                    <h3 className="font-headline text-xl text-qs-primary font-bold mb-3">What we are looking for</h3>
                    <ul className="font-body text-qs-text-section text-sm sm:text-base space-y-2 list-disc list-inside">
                      {selectedRole.requirements?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass rounded-glass p-6 border border-qs-primary/10">
                    <h3 className="font-headline text-xl text-qs-primary font-bold mb-3">Nice to have</h3>
                    <ul className="font-body text-qs-text-section text-sm sm:text-base space-y-2 list-disc list-inside">
                      {selectedRole.niceToHave?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="glass rounded-glass p-6 border border-qs-primary/10">
                    <h3 className="font-headline text-xl text-qs-primary font-bold mb-3">Perks</h3>
                    <ul className="font-body text-qs-text-section text-sm sm:text-base space-y-2 list-disc list-inside">
                      {selectedRole.perks?.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-3 text-sm font-body text-qs-text-muted">
                    <span>{selectedRole.location}</span>
                    <span>•</span>
                    <span>{selectedRole.type}</span>
                    <span>•</span>
                    <span>{selectedRole.commitment}</span>
                  </div>
                  <Button type="button" onClick={() => window.open(APPLY_FORM_URL, "_blank", "noopener,noreferrer")}
                  >
                    Apply for this role
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Application CTA */}
        <section
          id="apply"
          className="relative py-16 sm:py-20 lg:py-24 px-4 md:px-6 bg-qs-bg"
        >
          <SectionBackgroundBlur
            topLeftClassName="pointer-events-none absolute top-0 left-0 w-72 h-72 bg-qs-primary blur-3xl opacity-10 z-0"
            bottomRightClassName="pointer-events-none absolute bottom-0 right-0 w-72 h-72 bg-qs-accent blur-3xl opacity-10 z-0"
          />
          <div className="relative max-w-3xl mx-auto z-10">
            <div className="text-center mb-10">
              <h2 className="font-headline text-3xl sm:text-4xl font-bold text-qs-text mb-3">
                Apply Now
              </h2>
              <p className="font-body text-qs-text-section text-base sm:text-lg">
                Complete the application using our Google Form. It takes about 3 minutes.
              </p>
            </div>

            <div className="glass rounded-glass shadow-neon p-8 sm:p-10 border border-qs-primary/10">
              <div className="flex flex-col items-center text-center gap-6">
                <div>
                  <h3 className="font-headline text-2xl text-qs-primary font-bold mb-2">
                    Ready to apply?
                  </h3>
                  <p className="font-body text-qs-text-section text-base">
                    Click the button below to open the application form in a new tab.
                  </p>
                </div>
                <Button
                  type="button"
                  onClick={() => window.open(APPLY_FORM_URL, "_blank", "noopener,noreferrer")}
                >
                  Open Google Form
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
