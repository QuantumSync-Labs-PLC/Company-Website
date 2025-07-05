import blogPosts from "../data/blogPosts";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function Blog() {
  return (
    <div className="relative min-h-screen flex flex-col bg-section">
      <ScrollToTop showButton={true} />
      <Header />
      <main className="flex flex-1 flex-col items-center py-20 px-4 md:py-32">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-blue text-center mb-12">
            QuantumSync Labs Blog
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link
                to={`/blog/${post.id}`}
                key={post.id}
                className="glass rounded-glass shadow-neon-blue overflow-hidden flex flex-col hover:scale-[1.025] hover:shadow-xl transition"
                aria-label={`Read blog post: ${post.title}`}
              >
                {/* Blog Cover */}
                <img
                  src={post.cover}
                  alt={post.title}
                  className="w-full h-56 object-cover mb-4"
                  loading="lazy"
                />
                {/* Blog Meta & Preview */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      className="w-7 h-7 rounded-full object-cover border-2 border-blue"
                      loading="lazy"
                    />
                    <span className="font-body text-section text-xs">{post.author}</span>
                    <span className="text-xs text-section ml-auto">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="font-headline text-xl text-blue font-semibold mb-1">{post.title}</h2>
                  <p className="font-body text-section text-sm mb-3">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue/10 text-blue text-xs font-medium rounded px-2 py-0.5 font-body"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* If no posts: */}
          {blogPosts.length === 0 && (
            <div className="text-section text-center font-body mt-16">
              No blog posts found. Please check back soon!
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
