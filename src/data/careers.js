// src/data/careers.js

/**
 * Job listings for Careers page
 * @typedef {Object} CareerRole
 * @property {string} id - Unique identifier (URL-friendly slug)
 * @property {string} title - Role title
 * @property {string} team - Team or department
 * @property {string} location - Location or remote status
 * @property {string} type - Employment type (e.g., Internship, Full-time)
 * @property {string} commitment - Commitment level (e.g., Part-time, Full-time)
 * @property {string} summary - Short summary for role cards
 * @property {string} description - Longer description for role detail section
 * @property {string} postedDate - Date posted (YYYY-MM-DD)
 * @property {Array<string>} responsibilities - Role responsibilities
 * @property {Array<string>} requirements - Required qualifications
 * @property {Array<string>} niceToHave - Optional qualifications
 * @property {Array<string>} perks - Perks and benefits
 * @property {Array<string>} tags - Short tags for the role
 * @property {"open"|"closed"} status - Current status
 */

const careers = [
  {
    id: "software-engineering-intern",
    title: "Software Engineering Intern",
    team: "Engineering",
    location: "Remote (Sri Lanka time zone)",
    type: "Internship",
    commitment: "Full-time",
    summary:
      "Work with our engineers to ship real features across web, cloud, and AI projects while learning modern development practices.",
    description:
      "You will collaborate with a small product squad, help build new features, and learn how we deliver secure, scalable systems. This role is hands-on, with mentorship from senior engineers and a clear growth path.",
    postedDate: "2026-05-01",
    responsibilities: [
      "Build and ship product features with React and modern JavaScript",
      "Collaborate on API integrations and data flows",
      "Write clean, testable code and participate in code reviews",
      "Document your work and share progress with the team",
    ],
    requirements: [
      "Strong fundamentals in JavaScript and web development",
      "Familiarity with React or similar component-based frameworks",
      "Basic understanding of Git and collaborative workflows",
      "Good communication and a willingness to learn",
    ],
    niceToHave: [
      "Exposure to Node.js, Vite, or TypeScript",
      "A portfolio, GitHub, or personal project to share",
      "Interest in cloud or AI technologies",
    ],
    perks: [
      "Mentorship from senior engineers",
      "Real-world product experience",
      "Flexible, remote-first environment",
      "Opportunity to transition into a full-time role",
    ],
    tags: ["React", "JavaScript", "Remote", "Intern"],
    status: "open",
  },
];

export default careers;
