/**
 * Case Studies Data
 * Each case study cross-references serviceIds from services.js
 * @typedef {Object} CaseStudy
 * @property {string} id - Unique identifier (URL slug)
 * @property {string} title - Case study title
 * @property {string} client - Client company name
 * @property {string} industry - Industry vertical
 * @property {string[]} serviceIds - Array of service IDs from services.js this project used
 * @property {string} summary - Short summary of the project
 * @property {string} challenge - Business challenge the client faced
 * @property {string} solution - How QuantumSync Labs solved it
 * @property {string} results - Outcomes and impact
 * @property {Array} metrics - [{ label, value, suffix }] e.g., [{ label: "Performance Improvement", value: 45, suffix: "%" }]
 * @property {Object} testimonial - { quote, author, role }
 * @property {string} cover - Cover image (imported asset)
 * @property {string[]} gallery - Array of gallery images (imported assets)
 * @property {string} featured - Boolean-like; featured cases appear first in listings
 */

import secureOnlineBankingCover from "../assets/images/secure-online-banking.webp";
import cloudMigrationCover from "../assets/images/cloud-migration.webp";
import cybersecurityCover from "../assets/images/cybersecurity.webp";
import buildingScalableAppsCover from "../assets/images/building-scalable-apps.webp";
import quantumHealthcareCover from "../assets/images/quantum-healthcare.webp";
import ibmQuantumLabCover from "../assets/images/IBM-Quantum-Lab.webp";
import aiTrendsCover from "../assets/images/ai-trends.webp";
import cloudCover from "../assets/images/cloud.webp";
import devopsCover from "../assets/images/devops.webp";

const caseStudies = [
  {
    id: "fintech-platform-modernization",
    title: "FinTech Platform Modernization",
    client: "SecureBank International",
    industry: "Financial Services",
    serviceIds: ["cloud-infrastructure", "custom-software", "security-consulting"],
    summary: "Architected and deployed a modern, scalable cloud-native banking platform for a legacy financial institution.",
    challenge: "A major financial services company was running monolithic systems built in the 1990s. Legacy infrastructure couldn't handle demand, compliance was manual and error-prone, and customer experience was outdated.",
    solution: "QuantumSync Labs designed and built a cloud-native microservices architecture on AWS, implemented automated compliance workflows, and created a modern, responsive web and mobile interface. We used containerization (Docker/Kubernetes), real-time data pipelines, and advanced security protocols.",
    results: "Successfully migrated 50M+ customer records with zero downtime. Reduced infrastructure costs by 35%, improved transaction processing speed by 60%, and achieved full regulatory compliance automation.",
    metrics: [
      { label: "Transaction Speed Improvement", value: 60, suffix: "%" },
      { label: "Cost Reduction", value: 35, suffix: "%" },
      { label: "Uptime Achievement", value: 99.99, suffix: "%" },
      { label: "Records Migrated", value: 50, suffix: "M+" }
    ],
    testimonial: {
      quote: "QuantumSync Labs transformed our legacy platform into a modern, scalable system. Their expertise in cloud architecture and financial compliance was instrumental in our digital transformation.",
      author: "James Mitchell",
      role: "CTO, SecureBank International"
    },
    cover: secureOnlineBankingCover,
    gallery: [cloudMigrationCover, cybersecurityCover, buildingScalableAppsCover],
    featured: true
  },
  {
    id: "healthcare-ai-diagnostic-platform",
    title: "Healthcare AI Diagnostic Platform",
    client: "MediCare Networks",
    industry: "Healthcare & Life Sciences",
    serviceIds: ["ai-machine-learning", "custom-software", "cloud-infrastructure"],
    summary: "Built an AI-powered diagnostic platform that assists radiologists with image analysis and patient data integration.",
    challenge: "Healthcare providers struggled with diagnostic bottlenecks, manual image analysis, and delayed patient results. Integrating AI into clinical workflows while maintaining HIPAA compliance was complex.",
    solution: "Developed a HIPAA-compliant AI platform using TensorFlow and PyTorch for medical image analysis. Integrated with existing EHR systems via HL7/FHIR standards, created an intuitive clinical dashboard, and implemented robust data security and audit trails.",
    results: "Reduced diagnostic review time by 40%, improved accuracy by enabling second-opinion AI analysis, and processed over 100K patient studies in the first year. Achieved zero data breaches and maintained full compliance.",
    metrics: [
      { label: "Diagnostic Time Reduction", value: 40, suffix: "%" },
      { label: "Patient Studies Processed", value: 100, suffix: "K+" },
      { label: "Accuracy Improvement", value: 15, suffix: "%" },
      { label: "Time to Results", value: 24, suffix: "h" }
    ],
    testimonial: {
      quote: "The AI platform QuantumSync Labs built for us has been a game-changer. It's reliable, secure, and our clinicians trust it. The support team was exceptional throughout the deployment.",
      author: "Dr. Sarah Chen",
      role: "Chief Medical Officer, MediCare Networks"
    },
    cover: quantumHealthcareCover,
    gallery: [ibmQuantumLabCover, aiTrendsCover],
    featured: true
  },
  {
    id: "ecommerce-platform-scaling",
    title: "E-Commerce Platform Scaling",
    client: "RetailPro Global",
    industry: "Retail & E-Commerce",
    serviceIds: ["cloud-infrastructure", "custom-software", "performance-optimization"],
    summary: "Scaled an e-commerce platform to handle 10x traffic during peak seasons without performance degradation.",
    challenge: "During Black Friday and Cyber Monday, the platform would slow down or crash under load. Database queries were inefficient, caching was absent, and the infrastructure couldn't auto-scale.",
    solution: "Implemented Redis caching layers, optimized database queries with indexing and query analysis, deployed CDN for static assets, and configured auto-scaling Kubernetes clusters. Also implemented real-time inventory synchronization across multiple warehouses.",
    results: "Handled 500K concurrent users during peak season. Page load time dropped from 8s to 1.2s. Conversion rate increased 22% due to improved performance.",
    metrics: [
      { label: "Concurrent Users Supported", value: 500, suffix: "K" },
      { label: "Load Time Improvement", value: 85, suffix: "%" },
      { label: "Conversion Rate Increase", value: 22, suffix: "%" },
      { label: "Infrastructure Cost Efficiency", value: 40, suffix: "%" }
    ],
    testimonial: {
      quote: "Our peak season performance is now bulletproof. QuantumSync Labs not only solved our scaling issues but also improved the overall platform architecture. Highly recommended.",
      author: "Michael Torres",
      role: "VP Engineering, RetailPro Global"
    },
    cover: cloudCover,
    gallery: [devopsCover],
    featured: false
  },
  {
    id: "saas-migration-enterprise",
    title: "Enterprise SaaS Migration",
    client: "Global Manufacturing Corp",
    industry: "Manufacturing",
    serviceIds: ["cloud-infrastructure", "custom-software", "security-consulting"],
    summary: "Migrated enterprise systems from on-premise data centers to a secure, compliant SaaS platform.",
    challenge: "Legacy on-premise infrastructure was expensive to maintain, difficult to scale, and lacked modern security. The company needed a seamless transition with zero business interruption.",
    solution: "Designed a phased migration strategy using AWS. Implemented database replication, created automated backup and disaster recovery systems, and built a modern SaaS dashboard. Trained staff on new systems and provided 24/7 support during transition.",
    results: "Completed migration in 6 months with zero downtime. Reduced annual infrastructure costs by 60%, improved data security posture significantly, and enabled real-time reporting across the organization.",
    metrics: [
      { label: "Annual Cost Savings", value: 60, suffix: "%" },
      { label: "Migration Completion Time", value: 6, suffix: " months" },
      { label: "Security Score Improvement", value: 45, suffix: "%" },
      { label: "System Uptime", value: 99.95, suffix: "%" }
    ],
    testimonial: {
      quote: "The migration was smoother than expected. QuantumSync Labs' planning and execution were flawless. We're now much more agile and secure.",
      author: "Patricia Williams",
      role: "CIO, Global Manufacturing Corp"
    },
    cover: cloudMigrationCover,
    gallery: [buildingScalableAppsCover],
    featured: false
  }
];

export default caseStudies;
