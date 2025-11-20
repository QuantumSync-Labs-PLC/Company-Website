# QuantumSync Labs - Official Website

![QuantumSync Labs Logo](./src/assets/images/logo2.png)

> **Empowering digital transformation through innovative, secure, and scalable IT solutions.**

A modern, production-ready website for QuantumSync Labs built with React, Vite, and Tailwind CSS.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](.)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/built_with-Vite-646CFF.svg)](https://vitejs.dev)

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Security](#security)
- [Code Quality](#code-quality)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

**QuantumSync Labs** is a cutting-edge IT solutions provider specializing in cloud infrastructure, AI/ML, and custom software development. This repository contains our official website, showcasing our services, team, and expertise.

The website features:

- **Service Showcase** - Browse our core IT solutions
- **Blog Section** - Read latest insights and tech articles
- **Team Profiles** - Meet the experts behind QuantumSync Labs
- **Contact Form** - Get in touch with our team
- **Responsive Design** - Optimized for all devices

---

## Features

| Feature | Description |
|---------|-------------|
| ⚡ **Ultra-Fast** | Vite-powered builds in ~3.5 seconds |
| 🎨 **Beautiful UI** | Modern responsive design with Tailwind CSS |
| 🌙 **Dark Mode** | Light/dark theme toggle for user preference |
| 🎬 **Smooth Animations** | Framer Motion for delightful interactions |
| 📱 **Mobile-First** | Fully responsive on all screen sizes |
| 🚀 **Code Splitting** | Optimized bundle with lazy-loaded routes |
| 🌍 **SEO Ready** | Meta tags, Open Graph, and structured data |
| 🛡️ **Secure Forms** | EmailJS for secure contact form handling |
| 📚 **Dynamic Content** | Easy-to-manage blog and service data |
| ♿ **Accessible** | WCAG-compliant components and navigation |
| 🔍 **Clean Code** | ESLint + proper React best practices |

---

## Tech Stack

### Frontend Framework & Build Tools

- **[React 19](https://react.dev/)** - Modern UI library with hooks
- **[Vite 6](https://vitejs.dev/)** - Lightning-fast build tool
- **[TypeScript Ready](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI

- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon collections

### Routing & State

- **[React Router 7](https://reactrouter.com/)** - Client-side routing
- **[React Helmet Async](https://github.com/steverichey/react-helmet-async)** - SEO management

### Features & Services

- **[EmailJS](https://www.emailjs.com/)** - Serverless contact forms
- **[React Scroll](https://www.npmjs.com/package/react-scroll)** - Smooth scrolling
- **[React Markdown](https://www.npmjs.com/package/react-markdown)** - Markdown rendering

### Development Tools

- **[ESLint 9](https://eslint.org/)** - Code linting
- **[Postcss](https://postcss.org/)** - CSS processing
- **[Terser](https://terser.org/)** - JavaScript minification

---

## Prerequisites

Ensure you have the following installed:

- **Node.js** - v16.0.0 or higher ([Download](https://nodejs.org))
- **npm** - v7.0.0 or higher (comes with Node.js)

Verify installation:

```bash
node --version  # v19.x or higher
npm --version   # 9.x or higher
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/QuantumSync-Labs-PLC/Company-Website.git
cd Company-Website
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will hot-reload when you make changes.

### 4. View in Browser

The development server automatically opens your default browser. If not, visit:

```
http://localhost:3000
```

---

## Available Scripts

### Development

```bash
npm run dev          # Start development server on port 3000
```

### Production

```bash
npm run build        # Build optimized production bundle
npm run preview      # Preview production build locally on port 5000
```

### Code Quality

```bash
npm run lint         # Run ESLint to check code quality
npm run prepush      # Run lint + build (use before commits)
```

---

## Project Structure

```
Company-Website/
├── public/                    # Static assets
│   ├── assets/
│   │   └── images/
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/                       # Application source code
│   ├── assets/
│   │   ├── icons/             # SVG icons (18 icons)
│   │   └── images/            # Image assets (30+ images)
│   │
│   ├── components/
│   │   ├── common/            # Reusable UI components (17)
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Carousel.jsx
│   │   │   ├── CtaBar.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── NetworkBackground.jsx
│   │   │   ├── PageMeta.jsx
│   │   │   ├── ResponsiveImage.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── SectionBackgroundBlur.jsx
│   │   │   ├── SectionShell.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── SuspenseFallback.jsx
│   │   │   └── ThemeToggle.jsx
│   │   └── layout/            # Layout components (2)
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   │
│   ├── constants/             # Application constants
│   │   ├── routes.js
│   │   └── themeTokens.js
│   │
│   ├── data/                  # Static data files (6)
│   │   ├── blogPosts.js
│   │   ├── reviews.js
│   │   ├── services.js
│   │   ├── teamMembers.js
│   │   ├── techStack.js
│   │   └── whyUs.js
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useTheme.jsx       # Theme management
│   │
│   ├── pages/                 # Full page components (8)
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── ServiceDetail.jsx
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Contact.jsx
│   │   └── 404.jsx
│   │
│   ├── routes/                # Route configuration
│   │   └── index.jsx          # React Router setup
│   │
│   ├── sections/              # Reusable page sections (7)
│   │   ├── HeroSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── WhyUsSection.jsx
│   │   ├── TechStackSection.jsx
│   │   ├── TeamSection.jsx
│   │   └── ContactSection.jsx
│   │
│   ├── theme/                 # Theme system
│   │   ├── index.js           # Theme provider
│   │   └── tailwind.css       # Custom styles
│   │
│   ├── utils/                 # Utility functions
│   │   ├── formatDate.js      # Date formatting
│   │   └── seo.js             # SEO helpers
│   │
│   ├── App.jsx                # Root component
│   └── main.jsx               # React entry point
│
├── dist/                      # Production build output (generated)
├── .env.example               # Environment variables template
├── .env                       # Environment variables (local)
├── .gitignore                 # Git ignore rules
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Dependencies & scripts
├── tailwind.config.js         # Tailwind CSS config
├── vite.config.js             # Vite configuration
├── CLEANUP_SUMMARY.md         # Project cleanup documentation
├── PROJECT_STRUCTURE.md       # Detailed structure reference
└── README.md                  # This file
```

---

## Security

- Do not commit real `.env` files or secrets to the repository.
- Only expose non-sensitive values in the frontend using the `VITE_` prefix (for example, `VITE_EMAILJS_PUBLIC_KEY`).
- Configure all environment variables in Vercel under **Project → Settings → Environment Variables**:
 	- Add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` with the values from your EmailJS dashboard.
 	- Use the same variable names locally in a `.env` file (not committed) for development.
 	- On deploy, Vercel will inject these values at build time for the frontend.
- Never store private API keys, database passwords, or tokens in `VITE_` variables or client-side code.
- Rotate EmailJS and other keys if you suspect they may have been exposed.

### Statistics

- **Total Pages:** 8
- **Total Components:** 19 (17 common + 2 layout)
- **Sections:** 7 reusable sections
- **Data Files:** 6 manageable data modules
- **Directories:** 18 well-organized folders
- **Build Time:** ~3.5 seconds

---

## Environment Variables

Create a `.env` file in the root directory. Use `.env.example` as a template:

```bash
# EmailJS Configuration (for contact form)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Application Settings
VITE_APP_NAME=QuantumSync Labs
VITE_APP_URL=https://www.quantumsynclabs.com
VITE_APP_DESCRIPTION=Empowering digital transformation through innovative, secure, and scalable IT solutions.

# Analytics (Optional)
VITE_GOOGLE_ANALYTICS_ID=
VITE_HOTJAR_ID=

# Feature Flags (Optional)
VITE_ENABLE_ANALYTICS=true
```

### Getting EmailJS Credentials

1. Visit [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Create a service (Gmail, SendGrid, etc.)
4. Create an email template
5. Copy Service ID, Template ID, and Public Key to `.env`

---

## Building for Production

### Development Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Build Output

- **Output Directory:** `dist/`
- **Format:** Optimized HTML, CSS, and JavaScript
- **Size:** ~680 KB (gzipped)
- **Optimization:** Code splitting, tree-shaking, minification

### Build Features

- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ CSS minification
- ✅ JavaScript compression (Terser)
- ✅ Source map generation (optional)
- ✅ Bundle analysis available at `dist/stats.html`

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Vercel auto-deploys on push

```bash
npm run build  # Vercel runs this automatically
```

### Netlify

1. Build the project:

```bash
npm run build
```

2. Drag & drop `dist/` folder to [Netlify](https://netlify.com), or connect GitHub

### GitHub Pages

1. Build the project:

```bash
npm run build
```

2. Push `dist/` folder to GitHub Pages branch:

```bash
git subtree push --prefix dist origin gh-pages
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 5000
CMD ["serve", "-s", "dist"]
```

Build and run:

```bash
docker build -t qslabs-website .
docker run -p 5000:5000 qslabs-website
```

---

## Code Quality

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

### Pre-Push Validation

Before committing, run:

```bash
npm run prepush
```

This runs both lint and build to ensure quality.

### Code Standards

- ES6+ JavaScript
- React functional components with hooks
- Proper prop validation with PropTypes
- Accessible HTML markup (WCAG)
- Responsive Tailwind CSS
- Clean, readable code with comments

---

## Contributing

We welcome contributions! Please follow these steps:

### 1. Fork the Repository

```bash
# Click "Fork" on GitHub
```

### 2. Create Feature Branch

```bash
git checkout -b feature/amazing-feature
```

### 3. Make Changes

- Update code
- Run linting: `npm run lint`
- Test locally: `npm run dev`

### 4. Commit Changes

```bash
git commit -m "Add amazing feature"
```

### 5. Push to Branch

```bash
git push origin feature/amazing-feature
```

### 6. Open Pull Request

- Go to GitHub repository
- Create Pull Request with clear description

### Guidelines

- Follow existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test changes thoroughly
- Keep commits focused and atomic

---

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## Contact & Support

### Get in Touch

- **Email:** [labsquantumsync@gmail.com](mailto:labsquantumsync@gmail.com)
- **Website:** [www.quantumsynclabs.com](https://www.quantumsynclabs.com)
- **LinkedIn:** [QuantumSync Labs](https://www.linkedin.com/company/quantumsync-labs)

### Report Issues

Found a bug? Have a suggestion?
[Open an issue](https://github.com/QuantumSync-Labs-PLC/Company-Website/issues) on GitHub.

---

## Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Guide](https://www.framer.com/motion/)
- [React Router Docs](https://reactrouter.com/en/main)

---

## Project Statistics

| Metric | Value |
|--------|-------|
| **React Version** | 19.1.0 |
| **Vite Version** | 6.3.5 |
| **Tailwind CSS** | 4.1.8 |
| **Build Time** | ~3.5 seconds |
| **Bundle Size** | ~680 KB (gzipped) |
| **Pages** | 8 |
| **Components** | 19 |
| **Lines of Code** | ~5,000+ |
| **Production Ready** | ✅ Yes |

---

## Acknowledgments

- **Vite Team** - For the incredible build tool
- **React Team** - For the powerful UI library
- **Tailwind Labs** - For the amazing CSS framework
- **Framer** - For smooth animations
- **Contributors** - For making this project better

---

<div align="center">

### ⭐ If you found this project helpful, please consider giving it a star

**Built with ❤️ by QuantumSync Labs**

*Accelerating your digital future.*

</div>
