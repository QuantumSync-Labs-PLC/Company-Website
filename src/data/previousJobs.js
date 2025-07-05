// src/data/previousJobs.js

import bankingPlatform from "../assets/images/banking-platform.jpg";
import ecommerceAi from "../assets/images/ecommerce-ai.jpg";
import healthApp from "../assets/images/health-app.jpg";
import supplyChain from "../assets/images/supply-chain.jpg";
import smartIot from "../assets/images/smart-iot.jpg";

const previousJobs = [
  {
    id: "banking-platform",
    title: "NextGen Banking Platform",
    img: bankingPlatform,
    description: "Built a secure, scalable cloud banking platform powering over 250,000 users and real-time fraud detection.",
  },
  {
    id: "ecommerce-ai",
    title: "AI-Powered E-Commerce",
    img: ecommerceAi,
    description: "Delivered a personalized e-commerce engine with ML-driven recommendations, increasing sales by 32%.",
  },
  {
    id: "health-app",
    title: "Mobile Health Tracker",
    img: healthApp,
    description: "Designed a HIPAA-compliant mobile app for real-time health monitoring used by 20+ clinics.",
  },
  {
    id: "supply-chain-optimizer",
    title: "Supply Chain Optimizer",
    img: supplyChain,
    description: "Deployed predictive analytics and dashboarding to cut logistics costs by 18% for a global retailer.",
  },
  {
    id: "smart-iot",
    title: "Smart IoT Integration",
    img: smartIot,
    description: "Connected sensors, analytics, and dashboards for smarter energy management in 50+ factories.",
  },
];

export default previousJobs;
