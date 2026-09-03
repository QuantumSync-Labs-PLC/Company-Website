/**
 * How an engagement runs, start to finish.
 *
 * Buyers hiring a team they have not met are buying a process as much as a
 * product. Naming the steps, the artefacts and the durations de-risks that.
 */
const processSteps = [
  {
    id: "discovery",
    name: "Discovery",
    duration: "1–2 weeks",
    summary:
      "We learn your domain, your constraints, and what success actually looks like before proposing anything.",
    activities: [
      "Stakeholder interviews and a review of what you already run",
      "Technical assessment of existing systems and data",
      "Risks, dependencies and compliance requirements written down",
    ],
    deliverable: "A scope document, architecture outline, and a fixed quote.",
  },
  {
    id: "design",
    name: "Design & architecture",
    duration: "2–3 weeks",
    summary:
      "Interfaces and system design agreed on paper, where changes are cheap.",
    activities: [
      "Wireframes, then high-fidelity screens for the key journeys",
      "Data model, API contracts and infrastructure plan",
      "Security and access model agreed up front",
    ],
    deliverable: "Approved designs and a technical plan your team can review.",
  },
  {
    id: "build",
    name: "Build",
    duration: "Two-week sprints",
    summary:
      "We ship working software every two weeks, to an environment you can use.",
    activities: [
      "Sprint planning against the agreed scope",
      "Code review, automated tests and CI on every change",
      "A demo at the end of each sprint, open to your whole team",
    ],
    deliverable: "A working build after every sprint — never a single reveal at the end.",
  },
  {
    id: "launch",
    name: "Launch",
    duration: "1–2 weeks",
    summary:
      "Going live, with a plan for the day it does and the week after.",
    activities: [
      "Load, security and acceptance testing",
      "Migration rehearsal, then the real thing with a rollback path",
      "Monitoring, alerting and runbooks in place before traffic arrives",
    ],
    deliverable: "A live system, with your team trained on running it.",
  },
  {
    id: "aftercare",
    name: "Aftercare",
    duration: "Ongoing, optional",
    summary:
      "Support and improvement once it is live — or a clean handover if you would rather run it yourself.",
    activities: [
      "Agreed response times for incidents",
      "Security patching and dependency upgrades",
      "New features under a retainer, at your pace",
    ],
    deliverable: "Documentation, source, and infrastructure access — yours either way.",
  },
];

export default processSteps;
