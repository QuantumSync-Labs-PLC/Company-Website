import { useParams, Link, useNavigate } from "react-router-dom";
import blogPosts from "../data/blogPosts";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const navigate = useNavigate();

  if (!post) {
    // Optionally navigate to 404 or render a custom error message
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-section">
        <h2 className="font-headline text-2xl text-blue font-bold mb-6">Post Not Found</h2>
        <button
          className="bg-blue text-white font-bold px-8 py-3 rounded-glass shadow-neon-blue hover:bg-cyan transition"
          onClick={() => navigate("/blog")}
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-section">
      <ScrollToTop showButton={true} />
      <Header />
      <main className="flex-1 py-16 md:py-28 px-4 flex flex-col items-center">
        <article className="glass rounded-glass shadow-neon-blue max-w-3xl w-full mx-auto p-6 md:p-12">
          {/* Blog cover image */}
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-72 object-cover rounded mb-7"
            loading="lazy"
          />
          {/* Author details */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover border-2 border-blue"
              loading="lazy"
            />
            <span className="font-body text-section text-sm">{post.author}</span>
            <span className="text-xs text-section ml-auto">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          {/* Title */}
          <h1 className="font-headline text-2xl md:text-3xl font-bold text-blue mb-4">{post.title}</h1>
          {/* Content */}
          <div
            className="font-body text-section text-base leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue/10 text-blue text-xs font-medium rounded px-2 py-0.5 font-body"
              >
                #{tag}
              </span>
            ))}
          </div>
          {/* Back button */}
          <Link
            to="/blog"
            className="inline-block mt-8 bg-blue text-white font-bold px-8 py-3 rounded-glass shadow-neon-blue hover:bg-cyan transition text-base"
          >
            ← Back to Blog
          </Link>
        </article>
      </main>
      <Footer />
    </div>
  );
}
