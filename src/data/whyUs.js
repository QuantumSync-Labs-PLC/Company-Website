import {
  Shield,
  Rocket,
  UserCheck,
  Trophy,
  Zap,
  Handshake,
} from "lucide-react";

/**
 * Why choose QuantumSync Labs - Key value propositions
 * @typedef {Object} WhyUsItem
 * @property {string} id - Unique identifier
 * @property {string} title - Feature title
 * @property {React.ComponentType} icon - Icon component from react-icons
 * @property {string} text - Feature description
 */

const whyUs = [
  {
    id: "security",
    title: "Security By Design",
    icon: Shield,
    text: "Your data and reputation are protected with robust, enterprise-grade security from day one.",
  },
  {
    id: "innovation",
    title: "Agile Innovation",
    icon: Rocket,
    text: "We deliver quickly and adapt to your evolving needs, using the latest technology and proven methods.",
  },
  {
    id: "trusted-team",
    title: "Expert Teamwork",
    icon: UserCheck,
    text: "Our senior engineers and project managers are dedicated to your success and clarity at every step.",
  },
  {
    id: "quality",
    title: "Quality Commitment",
    icon: Trophy,
    text: "We hold ourselves to the highest engineering and service standards no compromises.",
  },
  {
    id: "continuous",
    title: "Continuous Support",
    icon: Zap,
    text: "We provide ongoing maintenance and advice long after your project launches.",
  },
  {
    id: "partnership",
    title: "Real Partnership",
    icon: Handshake,
    text: "We treat every client as a long-term partner, not just another contract.",
  },
];

export default whyUs;
