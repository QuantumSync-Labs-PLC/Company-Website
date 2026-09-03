/**
 * How QuantumSync Labs is engaged and paid.
 *
 * No figures here by design: the page exists to remove the "can I even work
 * with them?" exit, not to quote. Add a `startingAt` field per model if you
 * later decide to publish ranges — the page renders it if present.
 */
import { Package, Repeat, Users } from "lucide-react";

const engagementModels = [
  {
    id: "fixed-scope",
    name: "Fixed-scope project",
    icon: Package,
    tagline: "A defined outcome, agreed up front.",
    bestFor:
      "A product, platform, or migration with a clear finish line — an MVP, a rebuild, a move to the cloud.",
    howItWorks:
      "We run a paid discovery first, then quote the build against a written scope. You approve the scope and the price before any build work starts, and we invoice against delivery milestones.",
    youGet: [
      "A written scope and delivery plan",
      "A fixed price and a fixed end date",
      "Milestone demos you can stop or redirect at",
      "Handover with documentation and source",
    ],
    watchOut:
      "Changes to scope change the price. That is the trade for the certainty.",
  },
  {
    id: "retainer",
    name: "Monthly retainer",
    icon: Repeat,
    tagline: "A standing block of our time, every month.",
    bestFor:
      "Live products that need continuous work — new features, performance, security, support — without rehiring for each piece.",
    howItWorks:
      "You reserve a set number of engineering days each month. We agree priorities at the start of each cycle and report on what shipped at the end. Either side can end it with 30 days' notice.",
    youGet: [
      "Reserved capacity, not a queue",
      "A named point of contact",
      "Agreed response times for incidents",
      "A monthly report of work delivered",
    ],
    watchOut:
      "Unused days do not roll over indefinitely — the value is in the reserved capacity.",
  },
  {
    id: "staff-augmentation",
    name: "Team extension",
    icon: Users,
    tagline: "Our engineers inside your team.",
    bestFor:
      "In-house teams that need specific skills — cloud, security, mobile, data — without a permanent hire.",
    howItWorks:
      "One or more of our engineers join your standups, your board, and your repositories, reporting to your leads. Billed per engineer per month, with a minimum of one month.",
    youGet: [
      "Engineers who work your process, not ours",
      "Direct day-to-day control of priorities",
      "Scale up or down at each month boundary",
      "Knowledge written down, not held hostage",
    ],
    watchOut:
      "You own delivery management. If you want us to own the outcome, a fixed-scope project fits better.",
  },
];

export default engagementModels;
