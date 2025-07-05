import { Routes, Route } from "react-router-dom";

// Page imports
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Contact from "../pages/Contact";
import NotFoundPage from "../pages/404"; // Uncomment for custom 404 page

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:id" element={<ServiceDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<BlogPost />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/blog/:slug" element={<BlogPost />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

