import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import blogPosts from "@/data/blogPosts";
import { trackBlogPostView } from "@/utils/analytics";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import PageMeta from "@/components/seo/PageMeta";
import JsonLd, {
  createArticleSchema,
  createBreadcrumbSchema,
  createGraph,
} from "@/components/seo/JsonLd";
import ResponsiveImage from "@/components/ui/ResponsiveImage";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);
  const navigate = useNavigate();

  // Find related posts by sharing at least one tag, but not itself
  const relatedPosts = post
    ? blogPosts
        .filter(
          (p) =>
            p.id !== post.id &&
            p.tags.some((tag) => post.tags.includes(tag))
        )
        .slice(0, 2)
    : [];

  useEffect(() => {
    if (post) trackBlogPostView(post.id, post.title);
  }, [post]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-qs-bg px-4">
        <div className="glass rounded-glass shadow-neon-blue border border-qs-primary/20 p-10 sm:p-12 max-w-lg w-full text-center">
          <h2 className="font-headline text-3xl sm:text-4xl text-qs-primary font-bold mb-4">Post Not Found</h2>
          <p className="font-body text-qs-text-section mb-8 text-lg">The blog post you're looking for doesn't exist.</p>
          <button
            className="bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold px-10 py-4 rounded-glass shadow-neon-blue transition-all duration-300 transform hover:scale-105"
            onClick={() => navigate("/blog")}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const appUrl = import.meta.env.VITE_APP_URL || "https://www.quantumsynclabs.com";
  const postUrl = `${appUrl}/blog/${post.id}`;

  return (
    <div className="relative min-h-screen flex flex-col bg-qs-bg">
      <ScrollToTop showButton={true} />
      <Header />
      <PageMeta
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        ogImage={post.cover}
      >
        <JsonLd
          schema={createGraph(
            createArticleSchema(post),
            createBreadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.title, path: `/blog/${post.id}` },
            ])
          )}
        />
      </PageMeta>
      <main className="flex-1 py-16 sm:py-20 md:py-28 px-4 flex flex-col items-center" role="main">
        <article className="glass rounded-glass shadow-neon-blue border border-qs-primary/10 max-w-4xl w-full mx-auto p-6 sm:p-8 md:p-12 lg:p-14">
          {/* Blog cover image */}
          <ResponsiveImage
            src={post.cover}
            alt={post.title}
            className="w-full max-w-full h-64 sm:h-72 md:h-80 object-cover rounded-glass shadow-lg mb-6 sm:mb-8 border border-qs-primary/20"
          />
          {/* Author details */}
          <div className="flex items-center gap-3 mb-4">
            <ResponsiveImage
              src={post.authorAvatar}
              alt={post.author}
              className="w-12 h-12 rounded-full object-cover border border-qs-primary shadow-md"
              sizes="48px"
            />
            <div className="flex flex-col">
              <span className="font-body text-qs-text font-semibold text-sm sm:text-base">{post.author}</span>
              <span className="text-xs sm:text-sm text-qs-text-muted">{new Date(post.date).toLocaleDateString()}</span>
            </div>
          </div>
          {/* Title */}
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold holo-text mb-6 sm:mb-8 leading-tight">{post.title}</h1>
          {/* Content (HTML string, safe if sanitized before) */}
          <div
            className="font-body text-qs-text-section text-base sm:text-lg leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-qs-primary/20">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-qs-primary/15 text-qs-primary text-xs sm:text-sm font-semibold rounded-full px-3 py-1.5 font-body border border-qs-primary/20"
              >
                #{tag}
              </span>
            ))}
          </div>
          {/* Back button */}
          <Link
            to="/blog"
            className="inline-block mt-10 bg-qs-primary hover:bg-qs-primary-hover text-qs-on-primary font-bold px-10 py-4 rounded-glass shadow-neon-blue transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            ← Back to Blog
          </Link>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl w-full mx-auto mt-20 sm:mt-24">
            <h2 className="font-headline text-2xl sm:text-3xl font-bold holo-text mb-8 sm:mb-10">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {relatedPosts.map((rel) => (
                <Link
                  to={`/blog/${rel.id}`}
                  key={rel.id}
                  className="glass rounded-glass shadow-neon-blue border border-qs-primary/10 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-2 hover:border-qs-primary/30 hover:shadow-xl flex flex-col overflow-hidden"
                >
                  <ResponsiveImage
                    src={rel.cover}
                    alt={rel.title}
                    className="w-full max-w-full h-40 sm:h-44 object-cover"
                  />
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <h3 className="font-headline text-qs-primary text-lg sm:text-xl font-bold mb-2 leading-snug">{rel.title}</h3>
                    <p className="font-body text-qs-text-section text-sm sm:text-base line-clamp-3 leading-relaxed">{rel.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
