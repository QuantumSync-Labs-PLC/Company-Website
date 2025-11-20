/**
 * Customer reviews and testimonials
 * @typedef {Object} Review
 * @property {string} id - Unique identifier
 * @property {string} name - Customer name
 * @property {string} position - Customer job title
 * @property {string} company - Company name
 * @property {string} text - Review content
 * @property {number} rating - Star rating (1-5)
 */

const reviews = [
  {
    id: "review1",
    name: "Ayesha Perera",
    position: "CTO",
    company: "SecureBank Solutions",
    rating: 5,
    text: "QuantumSync Labs delivered our banking solution on time with zero critical bugs. Their security-first approach gave us confidence from day one.",
  },
  {
    id: "review2",
    name: "Dinesh Fernando",
    position: "Head of IT",
    company: "E-Commerce Global",
    rating: 5,
    text: "Our e-commerce platform saw a 32% sales lift after QuantumSync integrated AI recommendations. Amazing team, highly recommended.",
  },
  {
    id: "review3",
    name: "Samantha Karunaratne",
    position: "Director of Operations",
    company: "HealthTech Innovations",
    rating: 5,
    text: "From requirements to rollout, they were professional and proactive. Our health app is now trusted by more than 20 clinics.",
  },
];

export default reviews;
