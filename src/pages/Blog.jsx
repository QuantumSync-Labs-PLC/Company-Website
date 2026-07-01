import { useState } from "react";
import blogPosts from "../data/blogPosts";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";
import ResponsiveImage from "../components/common/ResponsiveImage";
import BlogFilterBar from "../components/common/BlogFilterBar";

export default function Blog() {
  const [filteredPosts, setFilteredPosts] = useState(blogPosts);

  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Blog"
        description="Insights from QuantumSync Labs on software engineering, cloud, AI, and digital transformation."
        url="/blog"
      />
      <main className="flex flex-1 flex-col items-center py-20 sm:py-24 md:py-32 px-4" role="main">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="eyebrow mb-4">Insights</span>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold holo-text mb-4">
              QuantumSync Labs Blog
            </h1>
            <p className="font-body text-qs-text-section text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Insights on software engineering, cloud, AI, and digital transformation
            </p>
          </div>

          {/* Blog Filter Bar */}
          <BlogFilterBar posts={blogPosts} onFilterChange={setFilteredPosts} />

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
              {filteredPosts.map((post) => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className="glass rounded-qs-lg shadow-neon border border-qs-primary/10 overflow-hidden flex flex-col hover:scale-[1.02] hover:-translate-y-2 hover:border-qs-primary/30 transition-all duration-300"
                  aria-label={`Read blog post: ${post.title}`}
                >
                  {/* Blog Cover */}
                  <div className="w-full h-52 sm:h-56 overflow-hidden">
                    <ResponsiveImage
                      src={post.cover}
                      alt={post.title}
                      className="w-full h-full object-cover object-center transition duration-300 hover:scale-105"
                    />
                  </div>
                  {/* Blog Meta & Preview */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <ResponsiveImage
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover border border-qs-primary shadow-md"
                        sizes="40px"
                      />
                      <div className="flex flex-col">
                        <span className="font-body text-qs-text font-semibold text-sm">
                          {post.author}
                        </span>
                        <span className="text-xs text-qs-text-muted">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h2 className="font-headline text-xl sm:text-2xl text-qs-primary font-bold mb-2 line-clamp-2 leading-snug">{post.title}</h2>
                    <p className="font-body text-qs-text-section text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-qs-primary/15 text-qs-primary text-xs font-semibold rounded-full px-3 py-1 font-body border border-qs-primary/20"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-qs-text-section text-center font-body mt-16">
              No blog posts found. Please check back soon!
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
