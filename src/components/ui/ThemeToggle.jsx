import { memo } from 'react';
import { useTheme } from '@/hooks/useTheme';

// Rendered unconditionally. It used to return null until mounted, which — now
// that pages are prerendered — meant the button was missing from the served
// HTML and popped into the header after hydration, shifting the layout.
const ThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`
        relative inline-flex items-center justify-center
        w-11 h-11 rounded-glass
        glass border border-qs-primary/20 text-qs-text
        hover:bg-qs-primary/10 hover:border-qs-primary/40
        transition-colors duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-qs-primary focus-visible:ring-offset-2
        focus-visible:ring-offset-qs-bg shadow-md
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        // Sun icon for light mode (white in dark theme)
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-1.414-1.414a2 2 0 10-2.828 2.828l1.414 1.414a2 2 0 102.828-2.828zM2.05 13.536l1.414 1.414a2 2 0 102.828-2.828L4.878 10.65a2 2 0 10-2.828 2.828zm12.728 0l1.414-1.414a2 2 0 100-2.828l-1.414 1.414a2 2 0 102.828 2.828zM13.536 2.05l-1.414 1.414a2 2 0 102.828 2.828l1.414-1.414a2 2 0 10-2.828-2.828z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon for dark mode (dark/black in light theme)
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
