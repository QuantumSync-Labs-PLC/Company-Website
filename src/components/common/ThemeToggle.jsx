import { memo } from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = memo(() => {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return null;
  }

  const iconColor = theme === 'dark' ? '#ffffff' : '#0f172a';

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex items-center justify-center
        w-11 h-11 rounded-glass
        glass border border-qs-primary/20
        hover:bg-qs-primary/10 hover:border-qs-primary/40
        transition-all duration-300 ease-out transform hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-qs-primary focus:ring-offset-2
        dark:focus:ring-offset-qs-bg shadow-md
      `}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        // Sun icon for light mode (white in dark theme)
        <svg className="w-5 h-5" fill={iconColor} viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l-1.414-1.414a2 2 0 10-2.828 2.828l1.414 1.414a2 2 0 102.828-2.828zM2.05 13.536l1.414 1.414a2 2 0 102.828-2.828L4.878 10.65a2 2 0 10-2.828 2.828zm12.728 0l1.414-1.414a2 2 0 100-2.828l-1.414 1.414a2 2 0 102.828 2.828zM13.536 2.05l-1.414 1.414a2 2 0 102.828 2.828l1.414-1.414a2 2 0 10-2.828-2.828z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon for dark mode (dark/black in light theme)
        <svg className="w-5 h-5" fill={iconColor} viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
