import { useState, useMemo, useEffect } from "react";
import { Search, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export default function BlogFilterBar({ posts = [], onFilterChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search term and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => post.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [posts, searchTerm, selectedTags]);

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  const hasFilters = searchTerm !== "" || selectedTags.length > 0;

  // Notify parent component of filtered posts
  useEffect(() => {
    onFilterChange?.(filteredPosts);
  }, [filteredPosts, onFilterChange]);

  return (
    <div className="w-full">
      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-qs-text-muted" size={20} />
          <input
            type="text"
            placeholder="Search by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-qs-lg bg-qs-surface border border-qs-primary/20 text-qs-text placeholder-qs-text-muted focus:outline-none focus:ring-2 focus:ring-qs-primary transition font-body"
          />
        </div>
      </motion.div>

      {/* Tag Filters */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="font-body font-semibold text-qs-text text-sm">Filter by tags:</p>
          {hasFilters && (
            <button
              onClick={handleClear}
              className="text-xs font-semibold text-qs-accent hover:text-qs-primary transition flex items-center gap-1"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {allTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <motion.button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-body text-sm font-semibold transition-all duration-300 border ${
                  isSelected
                    ? "bg-qs-primary text-qs-bg border-qs-primary shadow-neon"
                    : "bg-qs-surface/50 text-qs-primary border-qs-primary/20 hover:border-qs-primary/50 hover:bg-qs-surface"
                }`}
              >
                #{tag}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Results count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-body text-qs-text-muted mb-6"
      >
        {filteredPosts.length === 0 ? (
          <span>No posts match your filters. Try adjusting your search.</span>
        ) : (
          <span>
            Showing <span className="font-semibold text-qs-text">{filteredPosts.length}</span>{" "}
            {filteredPosts.length === 1 ? "post" : "posts"}
          </span>
        )}
      </motion.div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-qs-primary/20 via-qs-primary/10 to-transparent mb-8" />
    </div>
  );
}
