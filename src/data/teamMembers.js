// Team member images
import tharindu from "../assets/images/tharindu.webp";
import kaveesha from "../assets/images/kaveesha.webp";
import thamash from "../assets/images/thamash.webp";
import ravindu from "../assets/images/ravindu.webp";

/**
 * Team members and leadership information
 * @typedef {Object} TeamMember
 * @property {string} name - Full name
 * @property {string} role - Job title and responsibilities
 * @property {string} photoPath - Path to profile photo
 * @property {Array<Social>} socials - Social media links
 */

/**
 * @typedef {Object} Social
 * @property {string} icon - Icon name (Linkedin, Github, etc.)
 * @property {string} url - Profile URL
 * @property {string} label - Accessibility label
 */

const teamMembers = [
  {
    name: "Tharindu Gunarathna",
    role: "Co-Founder & Chief Executive Officer",
    photoPath: tharindu,
    socials: [
      {
        icon: "Linkedin",
        url: "https://www.linkedin.com/in/tharindu-danushka/",
        label: "LinkedIn",
      },
      { icon: "Github", url: "https://github.com/DATDSG", label: "GitHub" },
    ],
  },
  {
    name: "Thamash Weragoda",
    role: "Co-Founder & Chief Technology Officer",
    photoPath: thamash,
    socials: [
      {
        icon: "Linkedin",
        url: "https://www.linkedin.com/in/thamash-weragoda",
        label: "LinkedIn",
      },
      {
        icon: "Github",
        url: "https://github.com/Thamashwerago",
        label: "GitHub",
      },
    ],
  },
  {
    name: "Ravindu Waduwawala",
    role: "Co-Founder & Chief Marketing Officer",
    photoPath: ravindu,
    socials: [
      {
        icon: "Linkedin",
        url: "https://www.linkedin.com/in/wrswaduwawala/",
        label: "LinkedIn",
      },
      {
        icon: "Github",
        url: "https://github.com/RavinduSandaruwan",
        label: "GitHub",
      },
    ],
  },
  {
    name: "Kaveesha Nethmini",
    role: "Software Security Engineer",
    photoPath: kaveesha,
    socials: [
      {
        icon: "Linkedin",
        url: "https://www.linkedin.com/in/v-k-nethmini-444642262",
        label: "LinkedIn",
      },
      { icon: "Github", url: "https://github.com/dinesh", label: "GitHub" },
    ],
  },
];

export default teamMembers;
