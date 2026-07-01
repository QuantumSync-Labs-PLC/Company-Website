import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SuspenseFallback from "../components/common/SuspenseFallback";

// Lazy load page components for optimal code splitting and performance
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Careers = lazy(() => import("../pages/Careers"));
const Services = lazy(() => import("../pages/Services"));
const ServiceDetail = lazy(() => import("../pages/ServiceDetail"));
const Work = lazy(() => import("../pages/Work"));
const WorkDetail = lazy(() => import("../pages/WorkDetail"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogPost = lazy(() => import("../pages/BlogPost"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFoundPage = lazy(() => import("../pages/404"));

/**
 * Application routing configuration
 * Uses React Router v6 with lazy-loaded components for better performance
 * @returns {JSX.Element} Application routes
 */
export default function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <Routes>
        {/* Main pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        
        {/* Services */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />

        {/* Work / Case Studies */}
        <Route path="/work" element={<Work />} />
        <Route path="/work/:id" element={<WorkDetail />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        
        {/* Contact */}
        <Route path="/contact" element={<Contact />} />
        
        {/* 404 - Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

