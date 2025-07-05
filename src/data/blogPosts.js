// src/data/blogPost.js

import tharindu from "../assets/images/tharindu.jpg";
import thamash from "../assets/images/thamash.png";
import ravindu from "../assets/images/ravindu.jpg";
import aiBanking from "../assets/images/secure-online-banking.jpg";
import scalableApps from "../assets/images/building-scalable-apps.jpg";
import ibmQuantum from "../assets/images/IBM-Quantum-Lab.jpg";

const blogPosts = [
  {
    id: "secure-online-banking",
    title: "How We Secure Online Banking with Modern AI",
    excerpt:
      "Discover how QuantumSync Labs uses advanced AI to enhance security in digital banking platforms.",
    content: `
      <p>
        At <strong>QuantumSync Labs</strong>, our banking solutions use cutting-edge AI for real-time fraud detection, advanced risk scoring, and user distress analysis. We blend cybersecurity best practices with adaptive machine learning models to stay ahead of modern threats.
      </p>
      <h2>Our Approach</h2>
      <ul>
        <li>Continuous monitoring with anomaly detection</li>
        <li>End-to-end encryption & biometric authentication</li>
        <li>AI-powered alerting and risk assessment</li>
      </ul>
      <p>
        <strong>Read the full story to see how we build trust with our partners.</strong>
      </p>
    `,
    author: "Ravindu Waduwawala",
    authorAvatar: ravindu,
    date: "2024-07-02",
    tags: ["AI", "Security", "Banking"],
    cover: aiBanking,
  },
  {
    id: "building-scalable-apps",
    title: "Building Scalable Apps with QuantumSync",
    excerpt:
      "See how our engineering team designs apps that scale from startup MVPs to enterprise platforms.",
    content: `
      <p>
        Scalability is about people, process, and architecture. Our stack leverages cloud-native infrastructure, automated CI/CD, and a modular microservices approach for seamless growth.
      </p>
      <ol>
        <li>Microservices design with API-first development</li>
        <li>Cloud deployment for resilience and performance</li>
        <li>Continuous delivery with automated testing</li>
      </ol>
    `,
    author: "Thamash Weragoda",
    authorAvatar: thamash,
    date: "2024-06-19",
    tags: ["Apps", "Scalability", "Cloud"],
    cover: scalableApps,
  },
  {
    id: "quantum-machine-learning",
    title: "Quantum Machine Learning: What’s Next?",
    excerpt:
      "An introduction to quantum machine learning and its game-changing possibilities for business.",
    content: `
      <p>
        Quantum computing is moving from research to real-world use cases. We explore quantum ML frameworks, practical pilot projects, and what this tech means for tomorrow’s enterprises.
      </p>
      <ul>
        <li>IBM Qiskit and Cirq workflows</li>
        <li>Potential business applications</li>
        <li>Limitations and the road ahead</li>
      </ul>
    `,
    author: "Tharindu Gunarathna",
    authorAvatar: tharindu,
    date: "2024-06-01",
    tags: ["Quantum", "ML", "Research"],
    cover: ibmQuantum,
  },
];

export default blogPosts;
