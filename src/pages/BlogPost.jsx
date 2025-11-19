import { useParams, Link, useNavigate } from "react-router-dom";
import blogPosts from "../data/blogPosts";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/common/ScrollToTop";
import PageMeta from "../components/common/PageMeta";
import ResponsiveImage from "../components/common/ResponsiveImage";

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

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-qs-bg">
        <h2 className="font-headline text-2xl text-qs-primary font-bold mb-6">Post Not Found</h2>
        <button
          className="bg-qs-primary text-qs-text font-bold px-8 py-3 rounded-glass shadow-neon hover:bg-qs-accent transition"
          onClick={() => navigate("/blog")}
        >
          Back to Blog
        </button>
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
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.cover,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
            },
            mainEntityOfPage: postUrl,
          })}
        </script>
      </PageMeta>
      <main className="flex-1 py-14 sm:py-16 md:py-24 px-4 flex flex-col items-center" role="main">
        <article className="glass rounded-glass shadow-neon max-w-3xl w-full mx-auto p-5 sm:p-6 md:p-10 lg:p-12">
          {/* Blog cover image */}
          <ResponsiveImage
            src={post.cover}
            alt={post.title}
            className="w-full max-w-full h-56 sm:h-64 md:h-72 object-cover rounded mb-5 sm:mb-7"
          />
          {/* Author details */}
          <div className="flex items-center gap-2 mb-2">
            <ResponsiveImage
              src={post.authorAvatar}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover border-2 border-qs-primary"
              sizes="32px"
            />
            <span className="font-body text-qs-text-section text-sm">{post.author}</span>
            <span className="text-xs text-qs-text-muted ml-auto">{new Date(post.date).toLocaleDateString()}</span>
          </div>
          {/* Title */}
          <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-qs-primary mb-3 sm:mb-4">{post.title}</h1>
          {/* Content (HTML string, safe if sanitized before) */}
          <div
            className="font-body text-qs-text-section text-sm sm:text-base leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-qs-primary/10 text-qs-primary text-xs font-medium rounded px-2 py-0.5 font-body"
              >
                #{tag}
              </span>
            ))}
          </div>
          {/* Back button */}
          <Link
            to="/blog"
            className="inline-block mt-8 bg-qs-primary text-qs-text font-bold px-8 py-3 rounded-glass shadow-neon hover:bg-qs-accent transition text-sm sm:text-base"
          >
            ← Back to Blog
          </Link>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="max-w-3xl w-full mx-auto mt-14 sm:mt-16">
            <h2 className="font-headline text-lg sm:text-xl text-qs-primary font-bold mb-4 sm:mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  to={`/blog/${rel.id}`}
                  key={rel.id}
                  className="glass rounded-glass shadow transition hover:scale-[1.02] flex flex-col overflow-hidden"
                >
                  <ResponsiveImage
                    src={rel.cover}
                    alt={rel.title}
                    className="w-full max-w-full h-32 sm:h-36 object-cover mb-3"
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-headline text-qs-primary text-base sm:text-lg font-semibold mb-1">{rel.title}</h3>
                    <p className="font-body text-qs-text-section text-xs sm:text-sm line-clamp-3">{rel.excerpt}</p>
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
