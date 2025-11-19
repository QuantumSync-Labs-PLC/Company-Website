import { useTheme } from '../hooks/useTheme';

/**
 * ThemeShowcase - Demonstrates theme system in action
 */
export default function ThemeShowcase() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-qs-bg text-qs-text transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-qs-primary">
          Theme System Showcase
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Color Variables Demo */}
          <div className="p-6 rounded-lg bg-qs-surface border border-qs-border shadow-qs-soft">
            <h3 className="text-lg font-semibold text-qs-primary mb-4">
              Primary Color
            </h3>
            <div className="h-32 rounded bg-qs-primary"></div>
            <p className="mt-3 text-qs-text-muted">bg-qs-primary</p>
          </div>

          <div className="p-6 rounded-lg bg-qs-surface border border-qs-border shadow-qs-soft">
            <h3 className="text-lg font-semibold text-qs-accent mb-4">
              Accent Color
            </h3>
            <div className="h-32 rounded bg-qs-accent"></div>
            <p className="mt-3 text-qs-text-muted">bg-qs-accent</p>
          </div>

          <div className="p-6 rounded-lg bg-qs-surface border border-qs-border shadow-qs-soft">
            <h3 className="text-lg font-semibold text-qs-success mb-4">
              Success Color
            </h3>
            <div className="h-32 rounded bg-qs-success"></div>
            <p className="mt-3 text-qs-text-muted">bg-qs-success</p>
          </div>

          <div className="p-6 rounded-lg bg-qs-surface border border-qs-border shadow-qs-soft">
            <h3 className="text-lg font-semibold text-qs-danger mb-4">
              Danger Color
            </h3>
            <div className="h-32 rounded bg-qs-danger"></div>
            <p className="mt-3 text-qs-text-muted">bg-qs-danger</p>
          </div>

          <div className="p-6 rounded-lg bg-qs-surface border border-qs-border shadow-qs-soft">
            <h3 className="text-lg font-semibold text-qs-primary mb-4">
              Surface Color
            </h3>
            <div className="h-32 rounded bg-qs-surface-elevated border border-qs-border"></div>
            <p className="mt-3 text-qs-text-muted">bg-qs-surface-elevated</p>
          </div>

          <div className="p-6 rounded-lg bg-qs-surface border border-qs-border shadow-qs-soft">
            <h3 className="text-lg font-semibold text-qs-primary mb-4">
              Current Theme
            </h3>
            <p className="text-5xl font-bold text-qs-accent mb-3">
              {theme === 'dark' ? '🌙' : '☀️'}
            </p>
            <p className="text-qs-text-muted capitalize">Mode: {theme}</p>
          </div>
        </div>

        {/* Text Styles */}
        <div className="mt-12 p-6 rounded-lg bg-qs-surface border border-qs-border">
          <h2 className="text-2xl font-bold text-qs-primary mb-4">Text Styles</h2>
          <p className="text-qs-text mb-3">Primary text (text-qs-text)</p>
          <p className="text-qs-text-muted mb-3">Muted text (text-qs-text-muted)</p>
          <p className="text-qs-primary">Primary text (text-qs-primary)</p>
        </div>

        {/* Buttons Demo */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-qs-primary mb-6">Button Styles</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 rounded-lg bg-qs-primary text-white hover:bg-qs-primary-soft transition">
              Primary Button
            </button>
            <button className="px-6 py-3 rounded-lg bg-qs-accent text-white hover:bg-qs-accent-soft transition">
              Accent Button
            </button>
            <button className="px-6 py-3 rounded-lg bg-qs-success text-white transition">
              Success Button
            </button>
            <button className="px-6 py-3 rounded-lg border-2 border-qs-primary text-qs-primary hover:bg-qs-primary hover:text-white transition">
              Outline Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
