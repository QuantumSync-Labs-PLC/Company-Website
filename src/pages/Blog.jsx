import blogPosts from "../data/blogPosts";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";
import ResponsiveImage from "../components/common/ResponsiveImage";

export default function Blog() {
  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title="Blog"
        description="Insights from QuantumSync Labs on software engineering, cloud, AI, and digital transformation."
        url="/blog"
      />
      <main className="flex flex-1 flex-col items-center py-16 sm:py-20 md:py-28 px-4" role="main">
        <div className="w-full max-w-5xl mx-auto">
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold text-qs-primary text-center mb-8 sm:mb-12">
            QuantumSync Labs Blog
          </h1>
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {blogPosts.map((post) => (
                <Link
                  to={`/blog/${post.id}`}
                  key={post.id}
                  className="glass rounded-glass shadow-neon overflow-hidden flex flex-col hover:scale-[1.03] hover:shadow-xl transition-transform duration-200"
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
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <ResponsiveImage
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-8 h-8 rounded-full object-cover border-2 border-qs-primary shadow"
                        sizes="32px"
                      />
                      <span className="font-body text-qs-text-section text-xs font-semibold">
                        {post.author}
                      </span>
                      <span className="text-xs text-qs-text-muted ml-auto">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h2 className="font-headline text-xl text-qs-primary font-semibold mb-1 line-clamp-2">{post.title}</h2>
                    <p className="font-body text-qs-text-section text-sm mb-3 line-clamp-3">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-qs-primary/10 text-qs-primary text-xs font-medium rounded px-2 py-0.5 font-body"
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
