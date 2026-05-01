// src/data/services.js

import {
  FaCogs,
  FaMobileAlt,
  FaCloud,
  FaPalette,
  FaChartLine,
  FaLock,
  FaSyncAlt,
} from "react-icons/fa";

/**
 * Services offered by QuantumSync Labs
 * @typedef {Object} Service
 * @property {string} id - Unique identifier (URL-friendly)
 * @property {string} title - Service name
 * @property {React.ComponentType} icon - Icon component from react-icons
 * @property {string} excerpt - Short description
 * @property {string} description - Full description (markdown supported)
 * @property {Array<string>} features - Key features list
 * @property {string} link - Internal route to service detail page
 * @property {string} cover - Cover image path
 * @property {boolean} [featured] - Whether service is featured
 */

// Service cover images
import softwareDevCover from "../assets/images/software-dev.webp";
import mobileAppsCover from "../assets/images/mobile-apps.webp";
import cloudCover from "../assets/images/cloud.webp";
import uiuxCover from "../assets/images/ui-ux.webp";
import analyticsCover from "../assets/images/analytics.webp";
import cybersecurityCover from "../assets/images/cybersecurity.webp";
import maintenanceCover from "../assets/images/maintenance.webp";

const services = [
  {
    id: "custom-software-development",
    title: "Custom Software Development",
    icon: FaCogs,
    excerpt: "End-to-end engineering tailored to your business domain.",
    description:
      "From idea to launch, we build secure, scalable, and future-ready software solutions for your unique needs. Our team specializes in web, mobile, and enterprise platforms using modern frameworks and robust engineering practices.",
    features: [
      "Bespoke web & mobile apps",
      "API and microservice architecture",
      "Third-party integrations",
      "Ongoing maintenance & scaling",
    ],
    link: "/services/custom-software-development",
    cover: softwareDevCover,
    featured: true,
  },
  {
    id: "mobile-and-web-apps",
    title: "Mobile & Web Apps",
    icon: FaMobileAlt,
    excerpt:
      "Cross-platform mobile and responsive web applications that scale.",
    description:
      "Launch next-gen mobile and web experiences with React, React Native, Flutter, and PWA. We ensure blazing performance, accessibility, and delightful UX across all devices.",
    features: [
      "iOS/Android native & hybrid",
      "Progressive Web Apps (PWAs)",
      "Performance optimization",
      "Pixel-perfect UI/UX",
    ],
    link: "/services/mobile-and-web-apps",
    cover: mobileAppsCover,
  },
  {
    id: "cloud-architecture",
    title: "Cloud Architecture",
    icon: FaCloud,
    excerpt:
      "Design, deployment, and management of secure cloud infrastructure.",
    description:
      "Modernize with the cloud. We architect, migrate, and manage on AWS, Azure, or GCP for speed, reliability, and cost savings using IaC, containers, and serverless best practices.",
    features: [
      "Cloud migration & DevOps",
      "CI/CD pipelines",
      "Serverless & containerized solutions",
      "24/7 monitoring & support",
    ],
    link: "/services/cloud-architecture",
    cover: cloudCover,
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    icon: FaPalette,
    excerpt:
      "User-centric interfaces and experiences that delight your customers.",
    description:
      "Our design team crafts beautiful, intuitive interfaces that make every interaction enjoyable and effective. We blend business goals with user empathy and brand identity.",
    features: [
      "User research & personas",
      "Wireframes & interactive prototypes",
      "High-fidelity design systems",
      "Usability testing",
    ],
    link: "/services/ui-ux-design",
    cover: uiuxCover,
  },
  {
    id: "data-analytics-ai",
    title: "Data Analytics & AI",
    icon: FaChartLine,
    excerpt: "Actionable insights and AI-driven solutions from your data.",
    description:
      "Unleash your data’s potential. We deliver dashboards, analytics, and ML/AI-powered predictions for smarter decisions and automation.",
    features: [
      "Data visualization & BI",
      "AI/ML consulting & development",
      "Data pipelines & ETL",
      "Predictive analytics",
    ],
    link: "/services/data-analytics-ai",
    cover: analyticsCover,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity Solutions",
    icon: FaLock,
    excerpt: "Enterprise-grade protection for your data and operations.",
    description:
      "Proactive defense for your systems and users. We assess, monitor, and protect your assets—enabling compliance and peace of mind.",
    features: [
      "Vulnerability assessment",
      "Penetration testing",
      "SOC/SIEM integration",
      "Employee security training",
    ],
    link: "/services/cybersecurity",
    cover: cybersecurityCover,
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    icon: FaSyncAlt,
    excerpt: "Continuous improvement and care for your digital products.",
    description:
      "From bug fixes to new features, our team provides prompt, proactive support and maintenance for lasting value.",
    features: [
      "24/7 monitoring",
      "Bug fixes & updates",
      "Performance optimization",
      "Feature enhancements",
    ],
    link: "/services/maintenance-support",
    cover: maintenanceCover,
  },
];

export default services;
